"use client";

import { useEffect, useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import FilterPills from "@/components/FilterPills";
import { supabase } from "@/lib/supabaseClient";

export default function Products() {
  // produits qui viennent de Supabase
  const [products, setProducts] = useState<any[]>([]);
  // filtres
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (!error && data) setProducts(data);
    };
    load();
  }, []);

  const toggle = (k: string) =>
    setFilters((f) => (f.includes(k) ? f.filter((x) => x !== k) : [...f, k]));

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const tagsOk = !filters.length || (p.tags || []).some((t: string) => filters.includes(t));
      return tagsOk;
    });
  }, [products, filters]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-purple-600">Nos Produits</h1>

  {/* compteur produits */}
    <p className="mt-2 text-sm text-gray-500">
      reçus: {products.length} • affichés: {filtered.length}
    </p>

      {/* filtres */}
      <div className="mb-6">
        <FilterPills active={filters} toggle={toggle} />
      </div>

      {/* affichage des produits */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
