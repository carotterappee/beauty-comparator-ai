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
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-[60px] drop-shadow-sm">
    <defs>
      <linearGradient id="velvetTopLine" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#d9a88f" />
        <stop offset="50%" stopColor="#c68f73" />
        <stop offset="100%" stopColor="#e9cbb8" />
      </linearGradient>
      <filter id="glowTop" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="1" stdDeviation="2.5" floodColor="rgba(181,125,105,0.35)" />
      </filter>
    </defs>

    {/* ruban diffus */}
    <rect x="0" y="0" width="1440" height="16" fill="url(#velvetTopLine)" opacity="0.07" />

    {/* double ligne or rosé */}
    <path
      d="M0,10 L1440,10"
      stroke="url(#velvetTopLine)"
      strokeWidth="2"
      opacity="0.9"
      filter="url(#glowTop)"
    />
    <path
      d="M0,14 L1440,14"
      stroke="url(#velvetTopLine)"
      strokeWidth="1"
      opacity="0.7"
    />

    {/* ornement central */}
    <g transform="translate(720,10)" fill="none" stroke="url(#velvetTopLine)" strokeWidth="2">
      <path d="M-60,0 Q0,10 60,0" />
      <path d="M-40,0 Q0,6 40,0" />
      <circle cx="0" cy="0" r="2" fill="#d8a58f" opacity="0.9" />
    </g>
  </svg>
</div> 

      {/* Logo en haut-gauche */}
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
