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

      {/* — Séparateur HAUT avec ruban flouté rosé — */}
<div className="absolute inset-x-0 top-0 z-20">
  <svg viewBox="0 0 1440 96" preserveAspectRatio="none" className="w-full h-24">
    <defs>
      <linearGradient id="velvetTopLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#e7c9b7" />
        <stop offset="50%" stopColor="#d5a990" />
        <stop offset="100%" stopColor="#f0ddd2" />
      </linearGradient>
      {/* ruban qui s’estompe vers le bas */}
      <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"  stopColor="rgba(181,125,105,0.18)" />
        <stop offset="70%" stopColor="rgba(181,125,105,0.08)" />
        <stop offset="100%" stopColor="rgba(181,125,105,0)" />
      </linearGradient>
      <filter id="topGlow" x="-20%" y="-50%" width="140%" height="220%">
        <feDropShadow dx="0" dy="1.2" stdDeviation="2.5" floodColor="rgba(181,125,105,0.28)" />
      </filter>
    </defs>

    {/* ruban/ombre douce sous le bord haut */}
    <rect x="0" y="0" width="1440" height="28" fill="url(#topFade)" />

    {/* double ligne élégante */}
    <path d="M0,28 L1440,28" stroke="url(#velvetTopLine)" strokeWidth="2.25" opacity="0.9" filter="url(#topGlow)" />
    <path d="M0,33 L1440,33" stroke="url(#velvetTopLine)" strokeWidth="1" opacity="0.65" />

  </svg>
</div>


      {/* Logo en haut-gauche */}
      <div className="absolute left-6 top-[0.5px] md:top-[72px] lg:top-[80px]">
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
