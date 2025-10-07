"use client";
import Link from "next/link";

export default function RoomScene() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded-2xl border bg-pink-50 p-6">
        <p className="mb-4 text-sm text-gray-600">
          Chambre maquette — clique un coin pour explorer 👇
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card title="Coiffeuse (maquillage)" href="/products?tags=maquillage" />
          <Card title="Mini frigo (skincare)" href="/products?tags=skincare" />
          <Card title="Étagère (cheveux)" href="/products?tags=cheveux" />
        </div>

        {/* Option : un lien vers tout */}
        <div className="mt-6">
          <Link
            href="/products"
            className="inline-block rounded-xl bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Tout voir →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Card({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border bg-white p-4 transition hover:shadow-md"
    >
      <div className="text-base font-medium">{title}</div>
      <div className="mt-1 text-xs text-gray-500">Voir les produits →</div>
    </Link>
  );
}
