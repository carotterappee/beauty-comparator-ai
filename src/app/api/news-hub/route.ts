
import { NextResponse } from "next/server";
import Parser from "rss-parser";

type FeedItem = {
  title?: string;
  link?: string;
  isoDate?: string;
  pubDate?: string;
  contentSnippet?: string;
};

type Category =
  | "Tous"
  | "Cheveux"
  | "Peau"
  | "Maquillage"
  | "Contraception"
  | "Règles"
  | "Hormones"
  | "Compléments"
  | "Bien-être"
  | "Réglementaire";

type News = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string; // ISO
  excerpt: string;
  cats: Category[];
};

const CATEGORIES: Category[] = [
  "Tous",
  "Cheveux",
  "Peau",
  "Maquillage",
  "Contraception",
  "Règles",
  "Hormones",
  "Compléments",
  "Bien-être",
  "Réglementaire",
];

const parser = new Parser<unknown, FeedItem>();

// ---------- Flux FR PAR CATÉGORIE (hors "Tous") ----------
type FeedDef = { source: string; url: string };

const BASE_FEEDS: Omit<Record<Category, FeedDef[]>, "Tous"> = {
  Cheveux: [
    { source: "UFC-Que Choisir", url: "https://www.quechoisir.org/rss/cosmetiques-t679/" },
    { source: "60 Millions", url: "https://www.60millions-mag.com/rss.xml" },
    { source: "INRS", url: "https://www.inrs.fr/footer/actualites.rss" },
  ],
  Peau: [
    { source: "ANSM", url: "https://ansm.sante.fr/rss/actualites" },
    { source: "Inserm", url: "https://www.inserm.fr/feed/" },
    { source: "Vidal", url: "https://www.vidal.fr/actualites/rss.xml" },
  ],
  Maquillage: [
    { source: "UFC-Que Choisir", url: "https://www.quechoisir.org/rss/cosmetiques-t679/" },
    { source: "60 Millions", url: "https://www.60millions-mag.com/rss.xml" },
  ],
  Contraception: [
    { source: "HAS", url: "https://www.has-sante.fr/jcms/c_1713824/fr/actualites?portal=rss" },
    { source: "ANSM", url: "https://ansm.sante.fr/rss/actualites" },
    { source: "Inserm", url: "https://www.inserm.fr/feed/" },
  ],
  "Règles": [
    { source: "Inserm", url: "https://www.inserm.fr/feed/" },
    { source: "ANSES", url: "https://www.anses.fr/fr/rss.xml" },
  ],
  Hormones: [
    { source: "Inserm", url: "https://www.inserm.fr/feed/" },
    { source: "HAS", url: "https://www.has-sante.fr/jcms/c_1713824/fr/actualites?portal=rss" },
  ],
  "Compléments": [
    { source: "ANSES", url: "https://www.anses.fr/fr/rss.xml" },
    { source: "UFC-Que Choisir", url: "https://www.quechoisir.org/rss/complements-alimentaires-t617/" },
  ],
  "Bien-être": [
    { source: "Santé publique France", url: "https://www.santepubliquefrance.fr/rss/actualites" },
    { source: "Inserm", url: "https://www.inserm.fr/feed/" },
  ],
  "Réglementaire": [
    { source: "ANSM", url: "https://ansm.sante.fr/rss/actualites" },
    { source: "HAS", url: "https://www.has-sante.fr/jcms/c_1713824/fr/actualites?portal=rss" },
    { source: "ANSES", url: "https://www.anses.fr/fr/rss.xml" },
  ],
};

// "Tous" = tous les flux mélangés
const FEEDS: Record<Category, FeedDef[]> = {
  Tous: Object.values(BASE_FEEDS).flat(),
  ...BASE_FEEDS,
};

// ---------- Tagging par mots-clés ----------
const KW: { cat: Category; rx: RegExp[] }[] = [
  { cat: "Cheveux", rx: [/cheveu|shampoing|shampooing|capillaire|cuir chevelu|pellicule/i] },
  { cat: "Peau", rx: [/dermat|peau|ecz[eè]me|acn[ée]|psoriasis|UV|solaire/i] },
  { cat: "Maquillage", rx: [/maquillage|mascara|fond de teint|rouge [àa] l[eé]vres|palette/i] },
  { cat: "Contraception", rx: [/contracept|pilule|implant|DIU|st[eé]ril/i] },
  { cat: "Règles", rx: [/menstru|r[eè]gles|cycle|endometr|syndrome pr[eé]menstru/i] },
  { cat: "Hormones", rx: [/hormone|thyro[iï]de|o[eœ]strog|progest|androg|cortisol/i] },
  { cat: "Compléments", rx: [/compl[ée]ment|vitamine|min[eé]ral|probiotique|om[eé]ga|magn[eé]sium|zinc|fer/i] },
  { cat: "Bien-être", rx: [/bien[- ]?[eê]tre|sommeil|stress|activit[eé] physique|hygi[eè]ne de vie/i] },
  { cat: "Réglementaire", rx: [/rappel|retrait|AMM|autorisation|r[eé]glement|pharmacovigilance/i] },
];

function labelCats(title: string, excerpt: string, seedCat: Category): Category[] {
  const text = `${seedCat} ${title} ${excerpt}`;
  const cats = new Set<Category>();

  for (const k of KW) {
    if (k.rx.some((r) => r.test(text))) {
      cats.add(k.cat);
    }
  }
  if (seedCat && seedCat !== "Tous") cats.add(seedCat);

  return Array.from(cats);
}

function normalize(item: FeedItem, source: string, seedCat: Category): News {
  const rawDate = item.isoDate || item.pubDate || new Date().toISOString();
  const excerpt = (item.contentSnippet || "").replace(/\s+/g, " ").trim().slice(0, 220);

  return {
    id: `${source}:${item.link}`,
    title: item.title || "(Sans titre)",
    url: item.link || "#",
    source,
    publishedAt: new Date(rawDate).toISOString(),
    excerpt,
    cats: labelCats(item.title ?? "", excerpt, seedCat),
  };
}

export const revalidate = 600; // 10 minutes

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const param = (searchParams.get("cat") || "Tous") as Category;
  const cat: Category = CATEGORIES.includes(param) ? param : "Tous";

  const feeds = FEEDS[cat] ?? FEEDS["Tous"];

  const results = await Promise.all(
    feeds.map(async (f) => {
      try {
        const feed = await parser.parseURL(f.url);
        const items = (feed.items || []).slice(0, 12) as FeedItem[];
        return items.map((i) => normalize(i, f.source, cat));
      } catch {
        return [] as News[];
      }
    })
  );

  const flat = results.flat();

  // dédoublonnage par URL
  const seen = new Set<string>();
  const unique = flat.filter((n) => {
    if (!n.url) return false;
    if (seen.has(n.url)) return false;
    seen.add(n.url);
    return true;
  });

  // tri du plus récent au plus ancien
  unique.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const limited = unique.slice(0, 48);

  return NextResponse.json({ items: limited, categories: CATEGORIES });
}
