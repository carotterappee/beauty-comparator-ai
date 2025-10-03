import ProductCard from "@/components/ProductCard";

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
    drawbacks: ["Peut picoter les peaux sensibles", "Odeur d’agrume un peu marquée"],
    buyUrl: "#",
  },
  {
    id: "p2",
    name: "Masque Hydratation Intense",
    brand: "CurlCare",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e1e92?q=80&w=800",
    price: "18,50 €",
    rating: 4.6,
    highlights: ["Définit bien les boucles", "Démêlage facile", "Sans silicones"],
    drawbacks: ["Peut alourdir cheveux fins"],
    buyUrl: "#",
  },
];

export default function Products() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-purple-600">Nos Produits</h1>
      <p className="mb-8 text-gray-700">
        Aperçu des cartes produit. Les résumés IA viendront alimenter les points forts/faibles.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
