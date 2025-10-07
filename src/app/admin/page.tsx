"use client";
import { useEffect, useState } from "react";

type Review = {
  id: string;
  product_id: string;
  author: string | null;
  rating: number | null;
  body: string;
  source: string | null;
  created_at: string;
};

export default function AdminPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/reviews", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Load failed");
      setReviews(json.reviews ?? []);
    } catch (e: any) {
      setError(e.message || "Erreur");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Supprimer cet avis ?")) return;
    setDeleting(id);
    setError(null);
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Delete failed");
      setReviews((r) => r.filter((x) => x.id !== id));
    } catch (e: any) {
      setError(e.message || "Erreur");
    } finally {
      setDeleting(null);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold">Admin — Avis</h1>
      <p className="text-sm text-gray-500">Zone protégée par Basic Auth.</p>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={load}
          className="rounded bg-gray-900 text-white px-3 py-1 text-sm hover:opacity-90 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Chargement..." : "Rafraîchir"}
        </button>
        {error && <span className="text-sm text-red-600">{error}</span>}
      </div>

      <div className="mt-6 space-y-3">
        {reviews.length === 0 && !loading && (
          <p className="text-gray-500 text-sm">Aucun avis.</p>
        )}

        {reviews.map((r) => (
          <div key={r.id} className="rounded border p-3">
            <div className="text-xs text-gray-500 flex flex-wrap gap-2">
              <span><b>ID</b> {r.id}</span>
              <span>• <b>Produit</b> {r.product_id}</span>
              {r.rating != null && <span>• {Number(r.rating).toFixed(1)}/5</span>}
              {r.source && <span>• {r.source}</span>}
              <span>• {new Date(r.created_at).toLocaleString()}</span>
            </div>
            <div className="mt-1 text-sm">
              <span className="font-medium">{r.author ?? "Anonyme"}:</span>{" "}
              {r.body}
            </div>
            <div className="mt-2">
              <button
                onClick={() => remove(r.id)}
                disabled={deleting === r.id}
                className="rounded bg-red-600 text-white px-3 py-1 text-sm hover:bg-red-700 disabled:opacity-60"
              >
                {deleting === r.id ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
