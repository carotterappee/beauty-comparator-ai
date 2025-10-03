"use client";

import ProductCard from "@/components/ProductCard";
import FilterPills from "@/components/FilterPills";
import { useMemo, useState } from "react";


const MOCK_PRODUCTS = [
  {
    id: "p1",
    name: "Sérum Vitamine C 15%",
    brand: "LumiSkin",
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=800",
    price: "29,90 €",
    rating: 4.4,
    highlights: [
      "Teint plus éclatant en 2–3 semaines",
      "Texture légère, non collante",
      "Bon rapport qualité/prix",
    ],
    drawbacks: [
      "Peut picoter les peaux sensibles",
      "Odeur d’agrume un peu marquée",
    ],
    buyUrl: "#",
    tags: ["peau:mixte", "besoin:éclat"],  // ✅ tags bien placés
  },
  {
    id: "p2",
    name: "Masque Hydratation Intense",
    brand: "CurlCare",
    image:
      "https://images.unsplash.com/photo-1611930021700-3f2e0c36f7e6?q=80&w=800",
    price: "18,50 €",
    rating: 4.6,
    highlights: [
      "Définit bien les boucles",
      "Démêlage facile",
      "Sans silicones",
    ],
    drawbacks: ["Peut alourdir cheveux fins"],
    buyUrl: "#",
    tags: ["cheveux:bouclés", "besoin:hydratation"],  // ✅ tags ici aussi
  },
];

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