type Product = {
  id: string;
  name: string;
  brand: string;
  image: string;
  price?: string;
  rating?: number;
  highlights: string[];
  drawbacks: string[];
  buyUrl?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { name, brand, image, price, rating, highlights, drawbacks, buyUrl } = product;

  return (
    <article className="group rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-sm uppercase tracking-wide text-gray-500">{brand}</h3>
        <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {typeof rating === "number" && <span>★ {rating.toFixed(1)}/5</span>}
          {price && <span>• {price}</span>}
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border bg-green-50 p-3">
          <p className="mb-1 text-xs font-semibold text-green-700">Points forts</p>
          <ul className="list-disc pl-4 text-sm text-green-900">
            {highlights.slice(0, 4).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-red-50 p-3">
          <p className="mb-1 text-xs font-semibold text-red-700">Points faibles</p>
          <ul className="list-disc pl-4 text-sm text-red-900">
            {drawbacks.slice(0, 4).map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        {buyUrl ? (
          <a
            href={buyUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-pink-600 px-4 py-2 text-white transition hover:bg-pink-700"
          >
            Acheter
          </a>
        ) : (
          <button
            disabled
            className="cursor-not-allowed rounded-xl bg-gray-200 px-4 py-2 text-gray-600"
          >
            Bientôt disponible
          </button>
        )}
      </div>
    </article>
  );
}
