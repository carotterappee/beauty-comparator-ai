"use client";

export default function Home() {
  return (
    <>
    {/* ——— Séparation décorative HAUTE (version floutée et douce) ——— */}
<div className="relative w-full h-[70px] flex items-start justify-center bg-transparent">
  <svg
    viewBox="0 0 1440 80"
    preserveAspectRatio="none"
    className="w-full h-full opacity-85 blur-[1px]"
  >
    <defs>
      <linearGradient id="velvetTop" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#e7c9b7" />
        <stop offset="50%" stopColor="#d5a990" />
        <stop offset="100%" stopColor="#f0ddd2" />
      </linearGradient>
      <filter id="softTopGlow" x="-20%" y="-50%" width="140%" height="220%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(181,125,105,0.2)" />
      </filter>
    </defs>

    {/* Ruban diffusé doux */}
    <rect x="0" y="46" width="1440" height="22" fill="url(#velvetTop)" opacity="0.1" />

    {/* Ligne lumineuse floutée */}
    <path
      d="M0,50 L1440,50"
      stroke="url(#velvetTop)"
      strokeWidth="2.5"
      opacity="0.65"
      filter="url(#softTopGlow)"
    />

    {/* Ornement central atténué */}
    <g transform="translate(720,50)" fill="none" stroke="url(#velvetTop)" strokeWidth="2" opacity="0.7">
      <path d="M-80,0 Q0,28 80,0" />
      <path d="M-60,2 Q0,18 60,2" />
      <circle cx="0" cy="0" r="2.2" fill="#d8a58f" opacity="0.8" />
    </g>
  </svg>
</div>

      {/* —— Séparation décorative entre header et contenu —— */}
      <div className="relative w-full h-[96px] flex items-end justify-center bg-transparent">
  <svg viewBox="0 0 1440 96" preserveAspectRatio="none" className="w-full h-full">
    <defs>
      <linearGradient id="velvetLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#e7c9b7" />
        <stop offset="50%" stopColor="#d5a990" />
        <stop offset="100%" stopColor="#f0ddd2" />
      </linearGradient>
      <radialGradient id="softBand" cx="50%" cy="0%" r="90%">
        <stop offset="0%" stopColor="rgba(181,125,105,0.15)" />
        <stop offset="65%" stopColor="rgba(181,125,105,0.06)" />
        <stop offset="100%" stopColor="rgba(181,125,105,0)" />
      </radialGradient>
      <filter id="softGlow" x="-20%" y="-50%" width="140%" height="220%">
        <feDropShadow dx="0" dy="-1.5" stdDeviation="2.5" floodColor="rgba(181,125,105,0.25)" />
      </filter>
    </defs>

    {/* Ruban doux (ombre qui marque la transition) */}
    <rect x="0" y="56" width="1440" height="28" fill="url(#softBand)" />

    {/* Double ligne élégante */}
    <path d="M0,64 L1440,64" stroke="url(#velvetLine)" strokeWidth="2.25" opacity="0.9" />
    <path d="M0,69 L1440,69" stroke="url(#velvetLine)" strokeWidth="1" opacity="0.65" />

    {/* Ornement central amélioré */}
    <g transform="translate(720,64)" fill="none" stroke="url(#velvetLine)" strokeWidth="2.5" filter="url(#softGlow)" opacity="0.98">
      {/* arc supérieur & inférieur */}
      <path d="M-110,0 Q0,-34 110,0" />
      <path d="M-86,5  Q0,-16  86,5" />
      {/* petite perle + 2 mini perles */}
      <circle cx="0" cy="3.5" r="3.5" fill="#d8a58f" />
      <circle cx="-10" cy="7" r="2" fill="#e8c5b4" />
      <circle cx="10" cy="7" r="2" fill="#e8c5b4" />
    </g>

    {/* Mini-volutes latérales (gauche/droite) */}
    <g fill="none" stroke="url(#velvetLine)" strokeWidth="2" opacity="0.9" filter="url(#softGlow)">
      {/* gauche (~22% de largeur) */}
      <path d="M320,64 q-26,-10 -42,6 q12,4 8,16" />
      {/* droite (miroir) */}
      <path d="M1120,64 q26,-10 42,6 q-12,4 -8,16" />
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
