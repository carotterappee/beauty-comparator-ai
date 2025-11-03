"use client";

import { useState } from "react";

const CATEGORIES = [
  "Soins du visage",
  "Cheveux",
  "Maquillage",
  "Parfums",
  "Corps",
  "Solaire",
  "Bien-être",
];

export default function SubHeader() {
  const [q, setQ] = useState("");

  return (
    <section className="relative z-[35]">
      {/* MENU VERTICAL (gauche) */}
      <aside
        className="
          pointer-events-auto
          hidden md:block
          sticky top-[88px]
          ml-4
        "
      >
        <div
          className="
            w-60 rounded-3xl
            bg-white/30 backdrop-blur-xl
            ring-1 ring-white/50
            shadow-[0_10px_30px_rgba(181,125,105,0.18)]
            p-4
          "
        >
          <p className="px-2 pb-2 text-sm tracking-wide text-stone-700/80">
            Catégories
          </p>
          <ul className="space-y-1">
            {CATEGORIES.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className="
                    flex items-center gap-2
                    rounded-2xl px-3 py-2
                    text-[15px] text-stone-800/90
                    hover:bg-white/60 hover:shadow
                    transition
                  "
                >
                  <span className="text-stone-600/70">•</span>
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* BARRE DE RECHERCHE (centrée, translucide) */}
      <div className="mx-auto max-w-3xl px-4 md:pl-[17rem] md:pr-6 -mt-6 md:-mt-10">
        <div
          className="
            rounded-full
            bg-white/35 backdrop-blur-xl
            ring-1 ring-white/50
            shadow-[0_10px_35px_rgba(181,125,105,0.20)]
            px-4 py-2 md:px-6 md:py-3
            flex items-center gap-3
          "
        >
          {/* Icône loupe simple en SVG (pas de dépendance) */}
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-5 w-5 md:h-6 md:w-6 text-stone-700/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-3.8-3.8" />
          </svg>

          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un produit, une marque, un soin…"
            className="
              flex-1 bg-transparent outline-none
              placeholder:text-stone-700/60
              text-stone-900/90
            "
          />

          <button
            onClick={() => {
              const query = q.trim();
              if (!query) return;
              window.location.href = `/products?q=${encodeURIComponent(query)}`;
            }}
            className="
              rounded-full px-4 py-2 text-sm md:text-[15px]
              bg-[#fff7f4] text-stone-800/90
              ring-1 ring-[#e9c9b8] shadow
              hover:bg-white transition
            "
          >
            Rechercher
          </button>
        </div>
      </div>
    </section>
  );
}
