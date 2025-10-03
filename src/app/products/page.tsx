"use client";

import ProductCard from "@/components/ProductCard";
import FilterPills from "@/components/FilterPills";
import { useMemo, useState } from "react";
import { PRODUCTS as MOCK_PRODUCTS } from "@/lib/products.mock";

export default function Products() {

  const [filters, setFilters] = useState<string[]>([]);
  const toggle = (k: string) =>
  setFilters((f) => (f.includes(k) ? f.filter((x) => x !== k) : [...f, k]));

  const filtered = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      const tagsOk = !filters.length || (p.tags || []).some((t) => filters.includes(t));
      return tagsOk;
    });
  }, [filters]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-purple-600">Nos Produits</h1>

      {/* 👇 affichage des filtres */}
      <div className="mb-6">
        <FilterPills active={filters} toggle={toggle} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}