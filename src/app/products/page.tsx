"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import FilterPills from "@/components/FilterPills";

export default function Products() {
  // état
  const [products, setProducts] = useState<any[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 9;

  // 1er chargement
  useEffect(() => {
    loadMore(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadMore(reset = false) {
    const nextOffset = reset ? 0 : offset;
    try {
      const res = await fetch(
        `/api/products?limit=${LIMIT}&offset=${nextOffset}&order=created_at.desc`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("fetch /api/products failed");
      const json = await res.json();
      const list = json.products ?? json; // compat
      if (reset) {
        setProducts(list);
        setOffset(LIMIT);
      } else {
        setProducts((prev) => [...prev, ...list]);
        setOffset(nextOffset + LIMIT);
      }
      setHasMore(list.length === LIMIT);
    } catch (e) {
      console.error(e);
      setHasMore(false);
    }
  }

  const toggle = (k: string) =>
    setFilters((f) => (f.includes(k) ? f.filter((x) => x !== k) : [...f, k]));

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const tagsOk =
        !filters.length || (p.tags || []).some((t: string) => filters.includes(t));
      return tagsOk;
    });
  }, [products, filters]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-purple-600">Nos Produits</h1>
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
