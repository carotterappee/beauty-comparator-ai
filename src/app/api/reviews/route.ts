import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

/**
 * GET /api/reviews?productId=UUID
 * Renvoie la liste des avis pour un produit, triés du plus récent au plus ancien.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ reviews: data ?? [] });
}

/**
 * POST /api/reviews
 * Body:
 * {
 *   "productId": "uuid",          // requis
 *   "author": "string|null",      // optionnel
 *   "rating": number 0..5|null,   // optionnel
 *   "body": "string",             // requis
 *   "source": "tiktok|youtube|..."// optionnel
 * }
 */
export async function POST(req: Request) {
  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { productId, author, rating, body: text, source } = payload ?? {};

  // Vérifs de base
  if (!productId || typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json(
      { error: "productId et 'body' (texte) sont requis." },
      { status: 400 }
    );
  }

  // Anti-spam / qualité
  if (text.trim().length < 10) {
    return NextResponse.json(
      { error: "Le texte de l’avis est trop court (minimum 10 caractères)." },
      { status: 400 }
    );
  }

  if (rating != null) {
    const n = Number(rating);
    if (Number.isNaN(n) || n < 0 || n > 5) {
      return NextResponse.json(
        { error: "La note doit être comprise entre 0 et 5." },
        { status: 400 }
      );
    }
  }

  if (source && !["tiktok", "youtube", "sephora", "instagram", "autre"].includes(String(source).toLowerCase())) {
    return NextResponse.json({ error: "Source invalide." }, { status: 400 });
  }

  // Insertion
  const { data, error } = await supabase
    .from("reviews")
    .insert({
      product_id: productId,
      author: author ?? null,
      rating: rating ?? null,
      body: text.trim(),
      source: source ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ review: data }, { status: 201 });
}
