"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type NewsItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  publishedAt: string; // ISO
  excerpt: string;
  tags: string[];
};

const TAGS = ["Tous", "Réglementaire", "Contraception", "Compléments", "Peau/Dermato"];

export default function NewsSection() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState("Tous");
  const [q, setQ] = useState("");

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const res = await fetch("/api/news", { cache: "no-store" });
      const json = await res.json();
      setItems(json.items || []);
      setLoading(false);
    };
    run();
  }, []);

  const filtered = useMemo(() => {
    return items.filter((n) => {
      const okTag = tag === "Tous" ? true : n.tags.includes(tag);
      const okSearch = q
        ? (n.title + " " + n.excerpt + " " + n.source).toLowerCase().includes(q.toLowerCase())
        : true;
      return okTag && okSearch;
    });
  }, [items, tag, q]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold text-[#5b3e37]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Actualités santé & produits
          </h2>
          <p className="opacity-75 text-sm">
            Sources officielles (ANSM, EMA, OMS, FDA, Inserm…). Triées par pertinence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-3 py-1.5 rounded-full ring-1 ring-[#e8cfc3] ${
                tag === t ? "bg-white" : "bg-white/70"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher (ex.: niacinamide, contraception, rappel…)"
          className="w-full md:w-1/2 rounded-full bg-white/80 ring-1 ring-[#e8cfc3] px-4 py-2 outline-none"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-2xl bg-white/70 ring-1 ring-[#f1ddcf] animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-[#5b3e37] opacity-80">Aucun article pour ce filtre.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((n) => (
            <a
              key={n.id}
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl bg-white/85 backdrop-blur-xl ring-1 ring-[#e8cfc3]/60 shadow-[0_8px_28px_rgba(181,125,105,0.12)] p-5 hover:shadow-[0_12px_32px_rgba(181,125,105,0.18)] transition"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded-full bg-[#fff6f4] ring-1 ring-[#e8cfc3]">
                  {n.source}
                </span>
                <span className="text-xs opacity-70">
                  {format(new Date(n.publishedAt), "d MMM yyyy", { locale: fr })}
                </span>
              </div>
              <h3 className="font-semibold text-[#5b3e37] group-hover:text-[#b57d69]">
                {n.title}
              </h3>
              {n.excerpt && <p className="mt-2 text-sm opacity-80 line-clamp-3">{n.excerpt}</p>}
              {n.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {n.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full ring-1 ring-[#e8cfc3] bg-white/70">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
