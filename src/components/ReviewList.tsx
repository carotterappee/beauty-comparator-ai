"use client";
import { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";


export default function ReviewList({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`, { cache: "no-store" });
      const data = await res.json();
      setReviews(data.reviews ?? []);
    } finally {
      setLoading(false);
    }
  };

  const toggle = async () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen && reviews.length === 0) await load();
  };

  return (
    <div className="mt-4">
      <button
        onClick={toggle}
        className="text-sm underline text-purple-700 hover:opacity-80"
      >
        {open ? "Masquer les avis" : `Voir les avis (${reviews.length})`}
      </button>

      {open && (
        <div className="mt-3 space-y-3 rounded-lg border p-3 bg-white">
          {loading && <p className="text-sm text-gray-500">Chargement…</p>}
          {!loading && reviews.length === 0 && (
            <p className="text-sm text-gray-500">Pas encore d’avis.</p>
          )}
          {!loading &&
            reviews.map((r) => (
              <div key={r.id} className="text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{r.author ?? "Anonyme"}</span>
                  {r.rating != null && <span>• {Number(r.rating).toFixed(1)}/5</span>}
                  {r.source && <span className="text-gray-500">• {r.source}</span>}
                </div>
                <p className="text-gray-700">{r.body}</p>
                <p className="text-xs text-gray-400">{new Date(r.created_at).toLocaleDateString()}</p>
              </div>
            ))}
            <ReviewForm productId={productId} onCreated={load} />
        </div>
      )}
    </div>
  );
}
