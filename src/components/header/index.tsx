"use client";

import LogoPin from "./LogoPin";
import WordmarkHeader from "./WordmarkHeader";
import OrnateFrame from "./OrnateFrame";
import Ornament from "./Ornament"; // <- ton image d'arabesque via <img>

export default function Header() {
  return (
    <header className="relative z-10 w-full h-[360px] md:h-[400px] lg:h-[440px] overflow-hidden">
      {/* Fond décoratif (garde) */}
      <OrnateFrame />

      {/* Logo en haut-gauche */}
      <div className="absolute left-6 top-[68px] md:top-[72px] lg:top-[80px]">
        <LogoPin />
      </div>

      {/* Wordmark + arabesques (TON SVG), centrés */}
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-6 flex justify-center">
        {/* AU-DESSUS */}
        <Ornament
          src="/velvetmind/arabesque-small.svg"
          width={220} // ajuste la largeur ici (200–260)
          className="absolute left-1/2 -translate-x-1/2 -top-4 md:-top-5 z-30"
        />

        {/* le mot */}
        <div className="relative z-10">
          <WordmarkHeader />
        </div>

        {/* EN-DESSOUS */}
        <Ornament
          src="/velvetmind/arabesque-small.svg"
          width={220}
          className="absolute left-1/2 -translate-x-1/2 -bottom-4 md:-bottom-5 z-30"
        />
      </div>
    </header>
  );
}
