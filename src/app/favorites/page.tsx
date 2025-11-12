"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "@/lib/useFavorites";

export default function FavoritesPage() {
  const { items, remove, clear, ready } = useFavorites();

  const EmptyState = () => (
    <div className="text-center px-6 py-16 bg-white/80 backdrop-blur-xl rounded-2xl ring-1 ring-[#e8cfc3]/60 shadow-[0_8px_28px_rgba(181,125,105,0.12)]">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-[#e8cfc3] bg-white">
        {/* icône coeur */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="text-[#b57d69]">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </div>
      <h1 className="text-2xl font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Tes favoris sont vides
      </h1>
      <p className="opacity-80 mb-6">Ajoute des produits depuis le comparateur pour les retrouver ici.</p>
      <Link
        href="/comparateur"
        className="inline-block rounded-full px-4 py-2 bg-[#b57d69] text-white font-medium shadow-[0_4px_12px_rgba(181,125,105,0.25)] hover:brightness-105 transition"
      >
        Explorer les produits
      </Link>
    </div>
  );

  const Card = ({ id, name, brand, image, price, rating, tags }: (typeof items)[number]) => (
    <div className="group rounded-2xl bg-white/85 backdrop-blur-xl ring-1 ring-[#e8cfc3]/60 shadow-[0_8px_28px_rgba(181,125,105,0.12)] overflow-hidden hover:shadow-[0_12px_32px_rgba(181,125,105,0.18)] transition">
      <div className="relative w-full aspect-[4/3] bg-[#f9efef]">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#b57d69]/70">
            <span className="text-sm">Aperçu indisponible</span>
          </div>
        )}
        {/* bouton retirer */}
        <button
          onClick={() => remove(id)}
          className="absolute top-3 right-3 rounded-full bg-white/90 ring-1 ring-[#e7c7b6] p-2 shadow hover:bg-white"
          title="Retirer des favoris"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
               className="text-[#6b4a3f]">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="text-xs uppercase tracking-wide opacity-70">{brand || "Marque inconnue"}</div>
        <h3 className="text-base font-semibold text-[#5b3e37] line-clamp-2">{name}</h3>

        <div className="mt-2 flex items-center gap-3">
          {/* rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
                   className={i < (rating ?? 0) ? "text-[#b57d69]" : "text-[#e8cfc3]"}>
                <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.786 1.4 8.168L12 18.896l-7.334 3.869 1.4-8.168L.132 9.211l8.2-1.193z"/>
              </svg>
            ))}
          </div>

          {/* price */}
          {price != null && <div className="text-sm font-medium">{price.toFixed(2)} €</div>}
        </div>

        {/* tags */}
        {tags?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full ring-1 ring-[#e8cfc3] bg-white/70">
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {/* actions */}
        <div className="mt-4 flex items-center gap-3">
          <Link
            href={`/produit/${id}`}
            className="rounded-full px-3 py-1.5 text-sm bg-white/80 ring-1 ring-[#e8cfc3] hover:bg-white"
          >
            Fiche produit
          </Link>
          <Link
            href={`/comparateur?add=${encodeURIComponent(id)}`}
            className="rounded-full px-3 py-1.5 text-sm bg-[#b57d69] text-white shadow-[0_4px_12px_rgba(181,125,105,0.25)] hover:brightness-105"
          >
            Comparer
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fdf8f9]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#5b3e37]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Mes favoris
            </h1>
            <p className="text-sm opacity-75">Ajoute des produits pour les retrouver ici et les comparer facilement.</p>
          </div>

          {items.length > 0 && (
            <button
              onClick={clear}
              className="rounded-full px-4 py-2 bg-white/80 ring-1 ring-[#e8cfc3] hover:bg-white"
            >
              Tout retirer
            </button>
          )}
        </div>

        {/* État vide / Grille */}
        {!ready ? (
          <div className="text-[#5b3e37] opacity-80">Chargement…</div>
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((it) => (
              <Card key={it.id} {...it} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
