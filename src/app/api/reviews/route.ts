import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// ✅ Récupération des avis d’un produit
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "productId requis" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ reviews: data });
}

// ✅ Ajout d’un avis (optionnel, pour test)
export async function POST(req: Request) {
  const body = await req.json();
  const { product_id, author, rating, body: text, source } = body;

  if (!product_id || !text) {
    return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert([{ product_id, author, rating, body: text, source }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ review: data[0] });
}
