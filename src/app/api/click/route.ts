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

  // log best-effort (on ignore l'erreur volontairement)
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
