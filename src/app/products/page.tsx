import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-10">Chargement…</div>}>
      <ProductsClient />
    </Suspense>
  );
}
