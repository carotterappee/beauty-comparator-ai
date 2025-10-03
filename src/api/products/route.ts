import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products.mock";

export async function GET() {
  return NextResponse.json({ products: PRODUCTS });
}
