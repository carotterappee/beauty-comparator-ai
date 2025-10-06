import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

function parseQuery(searchParams: URLSearchParams) {
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "12", 10), 1), 24);
  const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);
  const orderRaw = (searchParams.get("order") || "created_at.desc").split(".");
  const orderBy = ["created_at", "rating", "name"].includes(orderRaw[0]) ? orderRaw[0] : "created_at";
  const dir = orderRaw[1] === "asc" ? "asc" : "desc";
  const q = (searchParams.get("q") || "").slice(0, 100);
  const tags = (searchParams.get("tags") || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 10);
  return { limit, offset, orderBy, dir, q, tags };
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const { limit, offset, orderBy, dir, q, tags } = parseQuery(searchParams);

    let query = supabase.from("products").select("*", { count: "exact" });

    if (q) query = query.ilike("name", `%${q}%`);
    if (tags.length) query = query.contains("tags", tags);

    query = query.order(orderBy, { ascending: dir === "asc" }).range(offset, offset + limit - 1);

    const { data, error, count } = await query;
    if (error) throw error;

    // enrichissement optionnel avec les stats
    const ids = (data ?? []).map(p => p.id);
    let enriched = data ?? [];
    if (ids.length) {
      const { data: stats } = await supabase.from("product_stats").select("*").in("product_id", ids);
      if (stats) {
        const byId = new Map(stats.map(s => [s.product_id, s]));
        enriched = enriched.map(p => ({
          ...p,
          reviewsCount: byId.get(p.id)?.reviews_count ?? 0,
          avgRating: byId.get(p.id)?.avg_rating ?? null,
        }));
      }
    }

    return NextResponse.json({ products: enriched, count, limit, offset });
  } catch (err: any) {
    console.error("❌ API error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
