// src/app/api/admin/stats/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function bucketLast7Days(rows: { created_at: string }[]) {
  const today = new Date();
  const map = new Map<string, number>();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    map.set(key, 0);
  }
  for (const r of rows) {
    const key = r.created_at.slice(0, 10);
    if (map.has(key)) map.set(key, (map.get(key) || 0) + 1);
  }
  return Array.from(map.entries()).map(([date, count]) => ({ date, count }));
}

export async function GET() {
  // nb produits
  const prodQ = await supabaseAdmin
    .from("products")
    .select("id", { count: "exact", head: true });
  const totalProducts = prodQ.count ?? 0;

  // avis (total + 7j)
  const last7 = new Date();
  last7.setDate(last7.getDate() - 7);

  const revQ = await supabaseAdmin
    .from("reviews")
    .select("rating,created_at", { count: "exact" })
    .gte("created_at", last7.toISOString());

  const revAllQ = await supabaseAdmin
    .from("reviews")
    .select("rating", { count: "exact" });

  const totalReviews = revAllQ.count ?? 0;

  const allRatings = (revAllQ.data ?? [])
    .map((r: any) => Number(r.rating))
    .filter((n) => Number.isFinite(n));
  const avgRating =
    allRatings.length > 0
      ? Math.round(
          (allRatings.reduce((a, b) => a + b, 0) / allRatings.length) * 100
        ) / 100
      : null;

  const last7Rows = (revQ.data ?? []).map((r: any) => ({
    created_at: r.created_at,
  }));
  const reviews7d = bucketLast7Days(last7Rows);

  // top produits via la vue product_stats si dispo
  let topProducts: any[] = [];
  const topQ = await supabaseAdmin
    .from("product_stats")
    .select("product_id,avg_rating,reviews_count,products!inner(name,brand,image)")
    .order("avg_rating", { ascending: false })
    .limit(5);

  if (!topQ.error && topQ.data) {
    topProducts = topQ.data.map((row: any) => ({
      id: row.product_id,
      name: row.products?.name,
      brand: row.products?.brand,
      image: row.products?.image,
      avgRating: row.avg_rating,
      reviewsCount: row.reviews_count,
    }));
  }

  // clics 7j (si table existe)
  let clicks7d = 0;
  try {
    const clicksQ = await supabaseAdmin
      .from("clicks")
      .select("id", { count: "exact", head: true })
      .gte("created_at", last7.toISOString());
    clicks7d = clicksQ.count ?? 0;
  } catch {
    clicks7d = 0;
  }

  return NextResponse.json({
    totalProducts,
    totalReviews,
    avgRating,
    reviews7d,
    clicks7d,
    topProducts,
  });
}
