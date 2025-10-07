import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  const to = searchParams.get("to"); // URL marchande finale

  if (!productId || !to) {
    return NextResponse.json({ error: "productId et to requis" }, { status: 400 });
  }

  const ua = req.headers.get("user-agent") || "";
  const ip =
    req.headers.get("x-forwarded-for") ||
    (req as any).ip ||
    "";

    // dedupe simple: si même IP a cliqué ce produit il y a < 2 min, on loggue pas
const recent = await supabase
  .from("clicks")
  .select("id", { count: "exact", head: true })
  .eq("product_id", productId)
  .gte("created_at", new Date(Date.now() - 2 * 60 * 1000).toISOString())
  .eq("ip", (req.headers.get("x-forwarded-for") ?? "unknown").toString());

if (!recent.error && (recent.count ?? 0) > 0) {
  return NextResponse.redirect(to); // redirige sans ré-insérer
}


  await supabase.from("clicks").insert({
    product_id: productId,
    destination: to,
    user_agent: ua,
    ip: Array.isArray(ip) ? ip[0] : String(ip),
  });

  try {
    const safeTo = to.trim();
    return NextResponse.redirect(safeTo, { status: 302 });
  } catch {
    return NextResponse.json({ error: "URL invalide" }, { status: 400 });
  }
}
