import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

// Empêche le prerender statique si nécessaire
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10 text-gray-500">
          Chargement des produits…
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
