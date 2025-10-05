"use client";
import { useState } from "react";

export default function ReviewForm({
  productId,
  onCreated,
}: { productId: string; onCreated?: () => void }) {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState<number | "">("");
  const [body, setBody] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          author: author || undefined,
          rating: rating === "" ? undefined : Number(rating),
          body,
          source: source || undefined,
        }),
      });
      if (!res.ok) throw new Error("Erreur soumission");
      setAuthor(""); setRating(""); setBody(""); setSource("");
      onCreated?.(); // recharge la liste
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-3 grid gap-2 rounded-lg border p-3">
      <div className="grid gap-2 sm:grid-cols-2">
        <input className="rounded-md border p-2" placeholder="Votre nom (optionnel)"
               value={author} onChange={(e)=>setAuthor(e.target.value)} />
        <input className="rounded-md border p-2" placeholder="Note 0–5 (optionnel)"
               value={rating} onChange={(e)=>setRating(e.target.value as any)} />
      </div>
      <input className="rounded-md border p-2" placeholder="Source ex: tiktok / sephora (optionnel)"
             value={source} onChange={(e)=>setSource(e.target.value)} />
      <textarea required className="rounded-md border p-2" rows={3}
                placeholder="Votre avis…" value={body} onChange={(e)=>setBody(e.target.value)} />
      <div className="text-right">
        <button disabled={loading} className="rounded-md bg-purple-600 px-3 py-2 text-white hover:bg-purple-700 disabled:opacity-50">
          {loading ? "Envoi…" : "Publier l’avis"}
        </button>
      </div>
    </form>
  );
}
