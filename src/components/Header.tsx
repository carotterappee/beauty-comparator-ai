"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-50 w-full border-b border-black/10">
      {/* Calque décoratif (n’affecte pas l’image) */}
      // dans ton Header, remplace le calque décoratif par :
<div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
  <div className="absolute inset-0 bg-[linear-gradient(180deg,#f7ece8_0%,#fdf8f9_35%,#f3e4de_100%)]" />
  <div
    className="absolute inset-0 mix-blend-multiply opacity-50"
    style={{ backgroundImage: "url(/velvetmind/paper.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
  />
</div>


      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        {/* Bloc logo — aucune classe qui modifie les couleurs */}
        <Link href="/" aria-label="VelvetMind — Accueil" className="flex items-center gap-3">
  {/* Badge monogramme */}
  <img
    src="/velvetmind/vm-badge.svg"
    alt="VM"
    width={36}
    height={36}
    className="block"
  />

  {/* Wordmark (peut être masqué sur mobile si tu veux) */}
  <img
    src="/velvetmind/vm-wordmark.png?v=3"
    alt="VelvetMind"
    width={220}
    height={36}
    className="hidden sm:block"
  />
</Link>

        {/* Nav simple (tu peux l’enlever si tu n’en veux pas) */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="/" className="text-sm text-[#3b2d2b]/80 hover:text-[#b47e6a] transition">Accueil</a>
          <a href="/decouvrir" className="text-sm text-[#3b2d2b]/80 hover:text-[#b47e6a] transition">Découvrir</a>
          <a href="/tendances" className="text-sm text-[#3b2d2b]/80 hover:text-[#b47e6a] transition">Tendances</a>
          <a href="/profil" className="text-sm text-[#3b2d2b]/80 hover:text-[#b47e6a] transition">Profil</a>
        </nav>
      </div>
    </header>
  );
}
