// src/app/admin/AdminClient.tsx
"use client";

import { useEffect, useState } from "react";

/* ---------- Composants & types ---------- */

type Review = {
  id: string;
  product_id: string;
  author: string | null;
  rating: number | null;
  body: string;
  source: string | null;
  created_at: string;
};

function AdminStats() {
  const [stats, setStats] = useState<any>(null);
  const [err, setErr] = useState<string>("");

  async function load() {
    setErr("");
    try {
      const res = await fetch("/api/admin/stats", { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setStats(json);
    } catch (e: any) {
      setErr(e?.message ?? "Erreur chargement stats");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Stats (7 derniers jours)</h2>
        <button
          onClick={load}
          className="rounded-md bg-purple-600 px-3 py-1.5 text-white hover:bg-purple-700"
        >
          Rafraîchir
        </button>
      </div>

      {err && <p className="text-red-600 mt-2">{err}</p>}
      {!stats && !err && <p className="text-gray-500 mt-2">Chargement…</p>}

      {stats && (
        <>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border p-4">
              <p className="text-xs text-gray-500">Produits</p>
              <p className="text-2xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs text-gray-500">Avis (total)</p>
              <p className="text-2xl font-bold">{stats.totalReviews}</p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs text-gray-500">Note moyenne</p>
              <p className="text-2xl font-bold">
                {stats.avgRating != null ? Number(stats.avgRating).toFixed(2) : "—"}
              </p>
            </div>
            <div className="rounded-xl border p-4">
              <p className="text-xs text-gray-500">Clics (7j)</p>
              <p className="text-2xl font-bold">{stats.clicks7d}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Avis / jour (7j)
            </p>
            <div className="grid grid-cols-7 gap-2">
              {stats.reviews7d.map((d: any) => (
                <div key={d.date} className="flex flex-col items-center">
                  <div
                    className="w-6 rounded bg-purple-500"
                    style={{ height: `${Math.min(100, d.count * 12)}px` }}
                    title={`${d.date} : ${d.count}`}
                  />
                  <span className="mt-1 text-[10px] text-gray-500">
                    {d.date.slice(5)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Top produits (moy. avis)
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {stats.topProducts.map((p: any) => (
                <div key={p.id} className="flex items-center gap-3 rounded-xl border p-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.brand}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">⭐ {Number(p.avgRating).toFixed(2)}</div>
                    <div className="text-xs text-gray-500">{p.reviewsCount} avis</div>
                  </div>
                </div>
              ))}
              {stats.topProducts.length === 0 && (
                <p className="text-sm text-gray-500">Aucun produit notable.</p>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

/* ---------- Page Admin (liste + suppression avis) ---------- */

export default function AdminClient() {
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

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold">Admin — Avis</h1>
      <p className="mb-6 text-sm text-gray-500">Zone protégée par Basic Auth.</p>

      <AdminStats />

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
