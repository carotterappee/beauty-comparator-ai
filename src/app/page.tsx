"use client";

export default function Home() {
  return (
    <>
      {/* —— Séparation décorative entre header et contenu —— */}
      <div className="relative w-full h-[80px] flex items-center justify-center bg-transparent">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="velvetLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e7c9b7" />
              <stop offset="50%" stopColor="#d5a990" />
              <stop offset="100%" stopColor="#f0ddd2" />
            </linearGradient>
            <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(181,125,105,0.25)" />
            </filter>
          </defs>

          {/* Ligne dégradée */}
          <path d="M0,50 L1440,50" stroke="url(#velvetLine)" strokeWidth="2" opacity="0.8" />

          {/* Petit ornement central */}
          <g transform="translate(720,50)" fill="none" stroke="url(#velvetLine)" strokeWidth="2.5" filter="url(#softGlow)" opacity="0.95">
            <path d="M-80,0 Q0,-30 80,0" />
            <path d="M-60,0 Q0,-18 60,0" />
            <circle cx="0" cy="0" r="3" fill="#d8a58f" />
          </g>
        </svg>
      </div>

      {/* —— Contenu principal —— */}
      <main className="relative min-h-[90vh] bg-[#fdf8f9]">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-300/40 to-violet-300/40 blur-3xl animate-glow" />
        </div>

        <div className="mx-auto max-w-5xl px-4 py-10">
          <div className="mt-6 flex items-center gap-3 animate-in" style={{ animationDelay: "120ms" } as React.CSSProperties}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement | null)?.value?.trim();
                window.location.href = q ? `/products?q=${encodeURIComponent(q)}` : "/products";
              }}
              className="hidden sm:flex items-center gap-2"
            >
              <input
                name="q"
                placeholder="Rechercher un soin, une marque…"
                className="w-64 rounded-full border px-4 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <button type="submit" className="rounded-full border px-4 py-2 text-gray-700 hover:bg-white">
                Rechercher
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
