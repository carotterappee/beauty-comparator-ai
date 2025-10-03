import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { reviews } = await req.json(); // ex: tableau de textes
  // Mock: renvoie un résumé bidon mais structuré
  const highlights = ["Hydrate bien", "Bon rapport qualité/prix"];
  const drawbacks = ["Peut irriter peaux très sensibles"];
  return NextResponse.json({ highlights, drawbacks });
}
