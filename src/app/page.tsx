"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-[90vh] bg-[#fdf8f9]">
      {/* --- arrière-plan soyeux --- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-300/40 to-violet-300/40 blur-3xl animate-glow" />
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div
          className="mt-6 flex items-center gap-3 animate-in"
          style={{ animationDelay: "120ms" } as React.CSSProperties}
        >
          <Link
            href="/products"
            className="rounded-full bg-pink-600 px-5 py-2.5 text-white shadow-lg shadow-pink-600/20 transition hover:bg-pink-700"
          >
            Explorer les produits
          </Link>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement | null)
                ?.value
                ?.trim();
              window.location.href = q
                ? `/products?q=${encodeURIComponent(q)}`
                : "/products";
            }}
            className="hidden sm:flex items-center gap-2"
          >
            <input
              name="q"
              placeholder="Rechercher un soin, une marque…"
              className="w-64 rounded-full border px-4 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              type="submit"
              className="rounded-full border px-4 py-2 text-gray-700 hover:bg-white"
            >
              Rechercher
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
