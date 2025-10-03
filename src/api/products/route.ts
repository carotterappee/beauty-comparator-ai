import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products.mock";

export async function GET() {
  const { data, error } = await supabase.from("products").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products: data });
}