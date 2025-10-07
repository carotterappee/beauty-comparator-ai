// src/app/api/admin/reviews/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// pour éviter tout cache côté Vercel
export const revalidate = 0;
export const dynamic = "force-dynamic";

/**
 * GET /api/admin/reviews?limit=200
 * Retourne la liste des avis (JSON) en utilisant la clé Service Role.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") ?? 200);

  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ reviews: data ?? [] });
}
