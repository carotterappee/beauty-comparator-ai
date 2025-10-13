"use client";

import LogoPin from "./LogoPin";
import WordmarkHeader from "./WordmarkHeader";
import OrnateFrame from "./OrnateFrame";

export default function Header() {
  return (
    // important: relative + hauteur non nulle + z-10
    <header className="relative z-10 w-full h-[420px] overflow-hidden">
      <OrnateFrame />
      {/* Logo en haut-gauche, indépendant */}
      <div className="absolute left-6 top-0">
        <LogoPin />
      </div>
      {/* Wordmark centré */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-6">
        <WordmarkHeader />
      </div>
    </header>
  );
}
