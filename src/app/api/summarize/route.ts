import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const _ = await req.json(); // {reviews: string[]} – ignoré ici
  return NextResponse.json({
    highlights: ["Hydrate bien", "Bon rapport qualité/prix"],
    drawbacks: ["Peut irriter peaux très sensibles"],
  });
}
