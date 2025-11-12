"use client";

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type News = { id:string; title:string; url:string; source:string; publishedAt:string; excerpt:string; cats:string[]; };

const TABS = ["Tous","Cheveux","Peau","Maquillage","Contraception","Règles","Hormones","Compléments","Bien-être","Réglementaire"] as const;

export default function NewsHub() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Tous");
  const [q, setQ] = useState("");
  const [items, setItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const res = await fetch(`/api/news-hub?cat=${encodeURIComponent(tab)}`, { cache:"no-store" });
      const json = await res.json();
      if (!alive) return;
      setItems(json.items || []);
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [tab]);

  const filtered = useMemo(() => {
    if (!q) return items;
    const s = q.toLowerCase();
    return items.filter(n => (n.title+" "+n.excerpt+" "+n.source).toLowerCase().includes(s));
  }, [items, q]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {/* onglets */}
      <div className="sticky top-[64px] z-10 bg-[#fdf8f9]/90 backdrop-blur-md">
        <div className="flex flex-wrap gap-2 py-3">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-full ring-1 ring-[#e8cfc3] transition
                 ${tab===t ? "bg-white shadow" : "bg-white/70 hover:bg-white"}`}
            >
              {t}
            </button>
          ))}
          <div className="ml-auto">
            <input
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              placeholder="Rechercher un sujet…"
              className="rounded-full bg-white/80 ring-1 ring-[#e8cfc3] px-4 py-1.5 outline-none w-56"
            />
          </div>
        </div>
      </div>

      {/* grille */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {Array.from({length:9}).map((_,i)=>(
            <div key={i} className="h-44 rounded-2xl bg-white/70 ring-1 ring-[#f1ddcf] animate-pulse"/>
          ))}
        </div>
      ) : filtered.length===0 ? (
        <p className="opacity-80">Aucun article trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filtered.map(n=>(
            <a key={n.id} href={n.url} target="_blank" rel="noopener noreferrer"
               className="group block rounded-2xl bg-white/85 backdrop-blur-xl ring-1 ring-[#e8cfc3]/60
                          shadow-[0_8px_28px_rgba(181,125,105,0.12)] p-5 hover:shadow-[0_12px_32px_rgba(181,125,105,0.18)] transition">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs px-2 py-1 rounded-full bg-[#fff6f4] ring-1 ring-[#e8cfc3]">{n.source}</span>
                <span className="text-xs opacity-70">{format(new Date(n.publishedAt),"d MMM yyyy",{locale:fr})}</span>
              </div>
              <h3 className="font-semibold text-[#5b3e37] group-hover:text-[#b57d69]">{n.title}</h3>
              {n.excerpt && <p className="mt-2 text-sm opacity-80 line-clamp-3">{n.excerpt}</p>}
              {n.cats.length>0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {n.cats.slice(0,3).map(c=>(
                    <span key={c} className="text-xs px-2 py-1 rounded-full ring-1 ring-[#e8cfc3] bg-white/70">{c}</span>
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
