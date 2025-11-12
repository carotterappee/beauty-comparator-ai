"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/useCart";

function money(n: number) {
  return n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

export default function CartPage() {
  const { items, ready, inc, dec, setQty, remove, clear, subtotal, vat, total, VAT_RATE } = useCart();

  const Empty = () => (
    <div className="text-center px-6 py-16 bg-white/80 backdrop-blur-xl rounded-2xl ring-1 ring-[#e8cfc3]/60 shadow-[0_8px_28px_rgba(181,125,105,0.12)]">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-[#e8cfc3] bg-white">
        {/* icône panier */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="text-[#b57d69]">
          <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L21 6H6"/>
        </svg>
      </div>
      <h1 className="text-2xl font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
        Ton panier est vide
      </h1>
      <p className="opacity-80 mb-6">Ajoute des produits depuis le comparateur pour passer commande.</p>
      <Link
        href="/comparateur"
        className="inline-block rounded-full px-4 py-2 bg-[#b57d69] text-white font-medium shadow-[0_4px_12px_rgba(181,125,105,0.25)] hover:brightness-105 transition"
      >
        Découvrir les produits
      </Link>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fdf8f9]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold text-[#5b3e37] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Mon panier
        </h1>

        {!ready ? (
          <div className="text-[#5b3e37] opacity-80">Chargement…</div>
        ) : items.length === 0 ? (
          <Empty />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste articles */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((it) => (
                <div key={it.id} className="flex gap-4 p-4 bg-white/85 rounded-2xl ring-1 ring-[#e8cfc3]/60 backdrop-blur-xl shadow-[0_8px_28px_rgba(181,125,105,0.12)]">
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-[#f9efef] shrink-0">
                    {it.image ? (
                      <Image src={it.image} alt={it.name} fill className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-[#b57d69]/70 text-xs px-2 text-center">
                        Image indisponible
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-wide opacity-70">{it.brand || "Marque"}</div>
                    <div className="font-semibold text-[#5b3e37] line-clamp-2">{it.name}</div>
                    <div className="mt-1 text-sm opacity-80">{money(it.price)} / u</div>

                    {it.tags?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {it.tags.map((t) => (
                          <span key={t} className="text-xs px-2 py-1 rounded-full ring-1 ring-[#e8cfc3] bg-white/70">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* Quantité */}
                    <div className="mt-3 flex items-center gap-2">
                      <button onClick={() => dec(it.id)} className="w-8 h-8 rounded-full ring-1 ring-[#e8cfc3] bg-white/80 hover:bg-white">-</button>
                      <input
                        value={it.qty}
                        onChange={(e) => {
                          const v = parseInt(e.target.value || "1", 10);
                          if (!Number.isNaN(v)) setQty(it.id, v);
                        }}
                        className="w-12 text-center rounded-lg ring-1 ring-[#e8cfc3] bg-white/80 py-1"
                      />
                      <button onClick={() => inc(it.id)} className="w-8 h-8 rounded-full ring-1 ring-[#e8cfc3] bg-white/80 hover:bg-white">+</button>

                      <div className="ml-auto font-medium">{money(it.price * it.qty)}</div>
                    </div>
                  </div>

                  {/* Supprimer */}
                  <button
                    onClick={() => remove(it.id)}
                    className="self-start rounded-full bg-white/90 ring-1 ring-[#e7c7b6] p-2 shadow hover:bg-white"
                    title="Retirer du panier"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="text-[#6b4a3f]">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}

              <div className="flex justify-end">
                <button onClick={clear} className="rounded-full px-4 py-2 bg-white/80 ring-1 ring-[#e8cfc3] hover:bg-white">
                  Vider le panier
                </button>
              </div>
            </div>

            {/* Récap / Paiement */}
            <aside className="p-6 bg-white/85 rounded-2xl ring-1 ring-[#e8cfc3]/60 backdrop-blur-xl shadow-[0_8px_28px_rgba(181,125,105,0.12)] h-fit">
              <h2 className="text-xl font-semibold text-[#5b3e37]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Récapitulatif
              </h2>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Sous-total</span><span>{money(subtotal)}</span></div>
                {/* Si tu utilises des prix HT, décommente les 2 lignes suivantes :
                <div className="flex justify-between"><span>TVA ({Math.round(VAT_RATE*100)}%)</span><span>{money(vat)}</span></div>
                <div className="flex justify-between font-medium"><span>Total TTC</span><span>{money(total)}</span></div>
                */}
                {/* Si tes prix sont déjà TTC : */}
                <div className="flex justify-between font-medium"><span>Total</span><span>{money(total)}</span></div>
              </div>

              <button
                disabled
                className="mt-6 w-full rounded-full py-2.5 bg-[#b57d69] text-white font-medium opacity-70 cursor-not-allowed"
                title="Paiement à venir"
              >
                Passer la commande
              </button>

              <p className="mt-3 text-xs opacity-70">
                Paiement sécurisé bientôt disponible (Stripe). Tu pourras finaliser l’achat ici.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
