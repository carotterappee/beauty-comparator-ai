import Link from "next/link";

export default function VelvetHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="group inline-flex items-baseline gap-2">
          <span className="text-2xl tracking-wide 
                           bg-gradient-to-r from-[#d1a38b] to-[#b9805c]
                           bg-clip-text text-transparent">
            VelvetMind
          </span>
          <span className="text-xs uppercase tracking-[0.22em] text-neutral-500 group-hover:text-neutral-700 transition">
            Beauty meets intelligence
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-neutral-700 hover:text-neutral-900">Accueil</Link>
          <Link href="/products" className="text-neutral-700 hover:text-neutral-900">Produits</Link>
          <Link href="/products?tags=body" className="text-neutral-700 hover:text-neutral-900">Body care</Link>
        </nav>
      </div>
    </header>
  );
}
