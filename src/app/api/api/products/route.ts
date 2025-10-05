import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") ?? 12);
  const offset = Number(searchParams.get("offset") ?? 0);
  const [orderBy, dir] = (searchParams.get("order") ?? "created_at.desc")
    .split(".") as [string, "asc" | "desc"];

  const { data, error, count } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .order(orderBy, { ascending: dir === "asc" })
    .range(offset, offset + limit - 1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const ids = (data ?? []).map((p: any) => p.id);
  let enriched = data ?? [];
  if (ids.length > 0) {
    const { data: stats, error: e2 } = await supabase
      .from("product_stats")
      .select("*")
      .in("product_id", ids);

    if (!e2 && stats) {
      const byId = new Map(stats.map((s: any) => [s.product_id, s]));
      enriched = enriched.map((p: any) => ({
        ...p,
        reviewsCount: byId.get(p.id)?.reviews_count ?? 0,
        avgRating: byId.get(p.id)?.avg_rating ?? null,
      }));
    }
  }
  return NextResponse.json({ products: data, count, limit, offset });
}
