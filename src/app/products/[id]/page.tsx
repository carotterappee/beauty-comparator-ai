// @ts-nocheck   <-- on désactive TS sur CE fichier pour contourner le conflit de types

import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function ProductDetail(props: any) {
  const id = props?.params?.id as string;

  // 1) produit
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  // 2) stats (si la vue product_stats existe)
  const { data: stats } = await supabase
    .from("product_stats")
    .select("*")
    .eq("product_id", id)
    .single();

  // 3) avis
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", id)
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <a href="/products" className="text-purple-600 underline">← Retour</a>

      <section className="mt-4 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-gray-100 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} className="w-full h-auto" />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 uppercase mt-1">{product.brand}</p>

          <div className="mt-2 text-sm text-gray-700 flex flex-wrap gap-3">
            {product.price && <span>💶 {product.price}</span>}
            {typeof product.rating === "number" && (
              <span>Note fiche: {product.rating.toFixed(1)}/5</span>
            )}
            {typeof stats?.avg_rating === "number" && (
              <span>Moyenne avis: {Number(stats.avg_rating).toFixed(2)}⭐</span>
            )}
            {typeof stats?.reviews_count === "number" && (
              <span>{stats.reviews_count} avis</span>
            )}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border bg-green-50 p-3">
              <p className="mb-1 text-xs font-semibold text-green-700">Points forts</p>
              <ul className="list-disc pl-4 text-sm text-green-900">
                {(product.highlights || []).slice(0, 6).map((x: string, i: number) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border bg-red-50 p-3">
              <p className="mb-1 text-xs font-semibold text-red-700">Points faibles</p>
              <ul className="list-disc pl-4 text-sm text-red-900">
                {(product.drawbacks || []).slice(0, 6).map((x: string, i: number) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          </div>

          {product.buyUrl ? (
            <a
              href={product.buyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-xl bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
            >
              Voir l’offre
            </a>
          ) : null}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Avis</h2>
        {(!reviews || reviews.length === 0) && (
          <p className="text-sm text-gray-500">Pas encore d’avis.</p>
        )}
        <div className="space-y-4">
          {(reviews || []).map((r: any) => (
            <div key={r.id} className="rounded-lg border p-3">
              <div className="text-sm text-gray-600 flex gap-2">
                <span className="font-medium">{r.author ?? "Anonyme"}</span>
                {r.rating != null && <span>• {Number(r.rating).toFixed(1)}/5</span>}
                {r.source && (
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">{r.source}</span>
                )}
                <span className="text-gray-400">
                  • {new Date(r.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-800 mt-1">{r.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
