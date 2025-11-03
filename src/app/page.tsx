"use client";

export default function Home() {
  return (
    <main className="relative min-h-[90vh] bg-[#fdf8f9]">
      {/* arrière-plan soyeux du main (on garde) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-300/40 to-violet-300/40 blur-3xl animate-glow" />
      </div>

     {/* — Sous-header translucide avec barre de recherche centrée — */}
<div className="relative z-20 w-full py-6">
  <div className="mx-auto max-w-5xl px-4">
    {/* Panneau doux + ombre */}
    <div className="rounded-2xl bg-white/50 backdrop-blur-xl ring-1 ring-[#e8cfc3] shadow-[0_8px_30px_rgba(181,125,105,0.12)] p-4">
      {/* Barre de recherche */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement | null)
            ?.value
            ?.trim();
          window.location.href = q ? `/products?q=${encodeURIComponent(q)}` : "/products";
        }}
        className="mx-auto flex w-full max-w-2xl items-center gap-3 rounded-full border border-[#e7c7b6] bg-white/90 px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#e6b9a5] focus-within:ring-offset-0"
      >
        {/* Loupe (SVG inline, aucun module requis) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-[#b57d69] opacity-80 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-3.5-3.5" />
        </svg>

        {/* Champ de recherche */}
        <input
          name="q"
          type="search"
          placeholder="Rechercher un soin, une marque…"
          className="w-full bg-transparent placeholder-[#a78575]/70 text-[#543e38] outline-none"
        />

        {/* Bouton */}
        <button
          type="submit"
          className="rounded-full px-4 py-1.5 text-sm font-medium text-[#6b4a3f] bg-gradient-to-b from-[#fdebe3] to-[#f6d5c7] ring-1 ring-[#e7c7b6] shadow-[0_2px_8px_rgba(181,125,105,0.15)] hover:brightness-105 active:scale-[0.99] transition"
        >
          Rechercher
        </button>
      </form>
    </div>
  </div>
</div>

      {/* zone de contenu de ta page */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* ton contenu arrive ici */}
      </div>
    </main>
  );
}
