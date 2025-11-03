"use client";

export default function Home() {
  return (
    <main className="relative min-h-[90vh] bg-[#fdf8f9]">
      {/* arrière-plan soyeux du main (on garde) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-300/40 to-violet-300/40 blur-3xl animate-glow" />
      </div>

<div className="relative z-20 w-full py-6 mt-6 md:mt-10">
    <div className="mx-auto max-w-5xl px-4">
    <div className="rounded-2xl bg-white/50 backdrop-blur-xl ring-1 ring-[#e8cfc3] shadow-[0_8px_30px_rgba(181,125,105,0.12)] p-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement | null)
            ?.value?.trim();
          window.location.href = q ? `/products?q=${encodeURIComponent(q)}` : "/products";
        }}
className="mx-auto w-full max-w-2xl h-11 flex items-center gap-3 rounded-full border border-[#e7c7b6] bg-white/95 px-4 shadow-sm focus-within:ring-2 focus-within:ring-[#e6b9a5] focus-within:ring-offset-0"      >
        {/* Loupe — taille forcée pour éviter tout override global */}
        <svg
          width="20" height="20"
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
  </div>
</div>
    </main>
  );
}
