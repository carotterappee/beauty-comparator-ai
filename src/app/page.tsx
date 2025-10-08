"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold text-pink-600">Beauty Comparator AI</h1>
      <p className="mt-4 text-gray-700">
        Comparateur intelligent de produits beauté ✨
      </p>

      <div className="mt-8">
        <Link
          href="/products"
          className="rounded-xl bg-pink-600 px-5 py-3 text-white hover:bg-pink-700 transition"
        >
          Voir les produits
        </Link>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value.trim();
          window.location.href = q
            ? `/products?q=${encodeURIComponent(q)}`
            : "/products";
        }}
        className="mt-6 flex w-full max-w-md gap-2"
      >
        <input
          name="q"
          placeholder="Rechercher un produit…"
          className="flex-1 rounded border px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        >
          Rechercher
        </button>
      </form>
    </main>
  );
}
