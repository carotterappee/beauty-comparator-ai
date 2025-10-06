import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/components/ProductCard";
import ReviewList from "@/components/ReviewList";

export const revalidate = 0; // pour forcer le refresh à chaque chargement

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !product)
    return (
      <div className="p-10 text-center text-gray-600">
        <p>❌ Produit introuvable.</p>
      </div>
    );

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <ProductCard product={product} />
      <div className="mt-8">
        <h2 className="mb-3 text-xl font-semibold text-purple-700">
          Avis et retours
        </h2>
        <ReviewList productId={product.id} />
      </div>
    </div>
  );
}
