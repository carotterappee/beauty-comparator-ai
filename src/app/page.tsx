"use client";

export default function Home() {
  return (
    <main className="relative min-h-[90vh] bg-[#fdf8f9]">
      {/* arrière-plan soyeux du main (on garde) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-300/40 to-violet-300/40 blur-3xl animate-glow" />
      </div>

      {/* — Sous-header: petite barre de recherche “princesse” centrée — */}
      <div className="relative z-20 w-full py-8" style={{ marginTop: "50px" }}>
        <div className="mx-auto max-w-[580px] px-4">
          <div className="rounded-2xl bg-white/55 backdrop-blur-xl ring-1 ring-[#e8cfc3] shadow-[0_8px_30px_rgba(181,125,105,0.12)] p-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement | null)
                  ?.value?.trim();
                window.location.href = q ? `/products?q=${encodeURIComponent(q)}` : "/products";
              }}
              className="mx-auto flex items-center gap-3 rounded-full border border-[#e7c7b6] bg-white/95 px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#e6b9a5] focus-within:ring-offset-0"
            >
              {/* Loupe */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-none text-[#b57d69] opacity-80"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-3.5-3.5" />
              </svg>

              <input
                name="q"
                type="search"
                placeholder="Rechercher un soin, une marque…"
                className="w-full bg-transparent placeholder-[#a78575]/70 text-[#543e38] outline-none"
              />

              <button
                type="submit"
                className="flex-none rounded-full px-4 py-1.5 text-sm font-medium text-[#6b4a3f] bg-gradient-to-b from-[#fdebe3] to-[#f6d5c7] ring-1 ring-[#e7c7b6] shadow-[0_2px_8px_rgba(181,125,105,0.15)] hover:brightness-105 active:scale-[0.99] transition"
              >
                Rechercher
              </button>
            </form>
          </div>

          {/* ESPACE supplémentaire entre recherche et menu */}
          <div className="h-8 md:h-10" />
          {/* CARTOUCHE CATÉGORIES – cadre doux */}
          <div className="mx-auto max-w-5xl px-2 sm:px-4">
            {/* Bordure dégradée rose-gold */}
            <div className="rounded-[30px] p-[1.6px] bg-gradient-to-r from-[#f0d6cc] via-[#e2b8a4] to-[#f0d6cc] shadow-[0_14px_44px_rgba(181,125,105,0.12)]">
              {/* Intérieur nacré translucide */}
              <div className="rounded-[28px] bg-white/75 backdrop-blur-xl p-6 md:p-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#b57d69]/70" />
                  <h3
                    className="text-xl md:text-2xl font-semibold tracking-wide text-[#5b3e37]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Catégories
                  </h3>
                </div>

                {/* LISTE DES CATÉGORIES (sans accessoires/ nouveautés) */}
                <div className="space-y-4">
                  {["Soins visage", "Cheveux", "Maquillage", "Parfums", "Corps"].map((label) => (
                    <a
                      key={label}
                      href="#"
                      className="
                        no-underline
                        block w-full
                        rounded-2xl px-6 py-4
                        bg-white/90 hover:bg-white
                        ring-1 ring-[#e7c7b6]
                        shadow-[0_2px_12px_rgba(181,125,105,0.10)]
                        hover:shadow-[0_10px_26px_rgba(181,125,105,0.18)]
                        transition
                        text-[#5b3e37]
                      "
                      style={{ fontFamily: "Marcellus, serif" }}
                    >
                      <span className="flex items-center gap-3">
                        <span className="inline-block h-3.5 w-3.5 rounded-full bg-gradient-to-b from-[#f4dfd6] to-[#e7c7b6] ring-1 ring-[#d9b6a5]/60 shadow-[0_1px_3px_rgba(181,125,105,0.25)]" />
                        <span className="text-lg md:text-[1.25rem] font-medium">
                          {label}
                        </span>
                      </span>
                      {/* (aucune flèche à droite) */}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* /cartouche catégories */}
        </div>
      </div>
    </main>
  );
}
