"use client";

import LogoPin from "./LogoPin";
import WordmarkHeader from "./WordmarkHeader";
import OrnateFrame from "./OrnateFrame";

export default function Header() {
  return (
    <header className="relative z-10 w-full h-[360px] md:h-[400px] lg:h-[440px] overflow-hidden">
      <OrnateFrame />

      {/* — Séparation HAUTE décorative visible au-dessus du logo et du mot — */}
<div className="absolute inset-x-0 top-0 z-20 flex items-start justify-center">
  <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-[72px]">
    <defs>
      <linearGradient id="velvetTopLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#e7c9b7" />
        <stop offset="50%" stopColor="#d5a990" />
        <stop offset="100%" stopColor="#f0ddd2" />
      </linearGradient>
       {/* ruban qui s’estompe vers le bas */}
      <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%"  stopColor="#B57D69" stopOpacity="0.18" />
        <stop offset="100%" stopColor="#B57D69" stopOpacity="0" />
      </linearGradient>

      {/* flou doux du ruban */}
      <filter id="topBandBlur" x="-10%" y="-10%" width="120%" height="140%">
        <feGaussianBlur stdDeviation="6" />
      </filter>

      {/* légère lueur des lignes */}
      <filter id="topGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="1" stdDeviation="2.5" floodColor="rgba(181,125,105,0.28)" />
      </filter>
    </defs>

    {/* ruban flouté sous la ligne (comme en bas) */}
    <rect x="0" y="22" width="1440" height="28" fill="url(#topFade)" filter="url(#topBandBlur)" />

    {/* double ligne élégante */}
    <path d="M0,18 L1440,18" stroke="url(#velvetTopLine)" strokeWidth="2" opacity="0.9"  filter="url(#topGlow)" />
    <path d="M0,22 L1440,22" stroke="url(#velvetTopLine)" strokeWidth="1" opacity="0.7" />

    {/* petit ornement central (discret) */}
    <g transform="translate(720,20)" fill="none" stroke="url(#velvetTopLine)" strokeWidth="2" opacity="0.9">
      <path d="M-60,0 Q0,10 60,0" />
      <path d="M-40,0 Q0,6 40,0" />
      <circle cx="0" cy="0" r="2" fill="#d8a58f" />
    </g>
  </svg>
</div>

      {/* Logo en haut-gauche */}
      <div className="absolute left-6 top-8">
        <LogoPin />
      </div>

      {/* Wordmark centré */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-6">
        <WordmarkHeader />
      </div>
    </header>
  );
}
