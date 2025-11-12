import { NextResponse } from "next/server";
import Parser from "rss-parser";

type FeedItem = {
  title: string;
  link: string;
  isoDate?: string;
  pubDate?: string;
  contentSnippet?: string;
};

type NewsItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string; // ISO
  excerpt: string;
  tags: string[];
};

const parser = new Parser<unknown, FeedItem>();

// ---- Flux RSS (ajoute/enlève ce que tu veux) ----
const FEEDS: { source: string; url: string }[] = [
  { source: "ANSM", url: "https://ansm.sante.fr/rss/actualites" },
  { source: "EMA", url: "https://www.ema.europa.eu/en/news-events/press-releases?format=feed&type=rss" },
  { source: "OMS", url: "https://www.who.int/rss-feeds/news-english.xml" },
  { source: "FDA", url: "https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/press-releases/rss.xml" },
  { source: "Inserm", url: "https://www.inserm.fr/feed/" },
  // { source: "HAS", url: "https://www.has-sante.fr/jcms/c_2874291/fr/actualites?portal=rss" }, // si dispo
];

// ---- Tagging simple par mots-clés ----
const KEYWORDS: { tag: string; patterns: RegExp[] }[] = [
  {
    tag: "Réglementaire",
    patterns: [/autorisation|retrait|rappel|réglement|evaluation|AMM|pharmacovigilance/i],
  },
  {
    tag: "Contraception",
    patterns: [/contraceptif|contraception|pilule|DIU|implant|anneau/i],
  },
  {
    tag: "Compléments",
    patterns: [/complément alimentaire|vitamine|minéral|probiotique|omega|magnésium|fer|zinc/i],
  },
  {
    tag: "Peau/Dermato",
    patterns: [/dermat|peau|eczéma|acné|psoriasis|UV|solaire|melasma|taches/i],
  },
];

function tagify(text: string): string[] {
  const tags: string[] = [];
  for (const t of KEYWORDS) {
    if (t.patterns.some((r) => r.test(text))) tags.push(t.tag);
  }
  return tags;
}

function normalize(i: FeedItem, source: string): NewsItem {
  const publishedAt =
    i.isoDate || i.pubDate || new Date().toISOString();

  const excerpt = (i.contentSnippet || "").replace(/\s+/g, " ").trim().slice(0, 220);

  const text = `${i.title ?? ""} ${excerpt}`;
  const tags = tagify(text);

  return {
    id: `${source}:${i.link}`,
    title: i.title || "(Sans titre)",
    url: i.link || "#",
    source,
    publishedAt: new Date(publishedAt).toISOString(),
    excerpt,
    tags,
  };
}

export const revalidate = 60 * 15; // 15 minutes (ISR)

export async function GET() {
  try {
    const results = await Promise.all(
      FEEDS.map(async (f) => {
        try {
          const feed = await parser.parseURL(f.url);
          const items = (feed.items || []).slice(0, 12).map((it) => normalize(it as FeedItem, f.source));
          return items;
        } catch {
          return [] as NewsItem[];
        }
      })
    );

    // Flat + tri récent → ancien + dédoublonnage par URL
    const flat = results.flat();
    const seen = new Set<string>();
    const unique = flat.filter((n) => {
      if (seen.has(n.url)) return false;
      seen.add(n.url);
      return true;
    });
    unique.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));

    return NextResponse.json({ items: unique.slice(0, 36) }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
