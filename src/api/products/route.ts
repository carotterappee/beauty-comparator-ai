import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";  // 👈 import du client

export async function GET() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ products: data });
}
