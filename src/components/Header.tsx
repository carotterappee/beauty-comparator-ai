"use client";

import Link from "next/link";
import VMBadgeSVG from "@/components/VMBadgeSVG";

export default function Header() {
  return (
    <header className="w-full">
      <div className="relative mx-auto max-w-7xl px-6 py-6">

        {/* Logo cliquable en haut-gauche */}
        <div className="absolute left-6 top-0">
        <Link
          href="/"
          aria-label="Accueil"
          className="absolute left-6 top-0"
          >
          <VMBadgeSVG size={96} className="shrink-0" />
        </Link>
        </div>

        {/* Wordmark centré (utilise <img> pour éviter le blocage SVG de next/image) */}
        <div>
        <img
          src="/velvetmind/vm-wordmark.svg"  
          alt="VelvetMind Wordmark"
          className="block mx-auto mt-[5rem] h-[140px] w-auto select-none"
        />
        </div>
      </div>
    </header>
  );
}
