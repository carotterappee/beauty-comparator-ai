"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import FilterPills from "@/components/FilterPills";

export default function Products() {
  // état
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 9;
  const searchParams = useSearchParams();
  const [q, setQ] = useState("");
  const [order, setOrder] = useState("created_at.desc");



  // 1er chargement
  useEffect(() => {
    const initialQ = searchParams.get("q") ?? "";
    setQ(initialQ);
    loadMore(true, initialQ); // ← on passe q pour le 1er fetch
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [searchParams]);

  async function loadMore(reset = false, qParam?: string) {
  const nextOffset = reset ? 0 : offset;

  const params = new URLSearchParams({
    limit: String(LIMIT),
    offset: String(nextOffset),
    order,
  });
  const qEff = (qParam ?? q)?.trim();
  if (qEff) params.set("q", qEff);
  if (filters.length) params.set("tags", filters.join(","));

  const res = await fetch(`/api/products?${params.toString()}`, { cache: "no-store" });
  if (!res.ok) {
    setHasMore(false);
    return;
  }
  const json = await res.json();
  const list = json.products ?? json;

  if (reset) {
    setProducts(list);
    setOffset(LIMIT);
  } else {
    setProducts(prev => [...prev, ...list]);
    setOffset(nextOffset + LIMIT);
  }
  setHasMore(list.length === LIMIT);
}

 const toggle = (k: string) => {
  setFilters((prev) => {
    const next = prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k];
    // reset & reload serveur avec les nouveaux filtres
    setProducts([]);
    setOffset(0);
    setHasMore(true);
    loadMore(true);
    return next;
  });
};
const filtered = products; // plus de double-filtrage côté client

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-purple-600">Nos Produits</h1>
      {q && <p className="mb-2 text-xs text-gray-500">Recherche : “{q}”</p>}

      <p className="mb-6 text-sm text-gray-500">
        reçus: {products.length} • affichés: {filtered.length}
      </p>

      {/* filtres */}
      <div className="mb-6">
        <FilterPills active={filters} toggle={toggle} />
      </div>

      {/* grille produits */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* pagination */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={() => loadMore(false)}
            className="rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Charger plus
          </button>
        </div>
      )}
    </div>
  );
}
