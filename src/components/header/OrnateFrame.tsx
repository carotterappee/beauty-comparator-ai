"use client";

export default function OrnateFrame() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      {/* --- Fond poudré doux --- */}
      <div className="w-full h-full bg-gradient-to-b from-[#fff9f6] via-[#fdf0ea] to-[#fae7de]" />

      {/* --- Ligne de démarcation chic (bas de l'entête) --- */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[40px]"
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Dégradé rose-gold */}
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#e7c9b7" />
            <stop offset="50%" stopColor="#d5a990" />
            <stop offset="100%" stopColor="#f0ddd2" />
          </linearGradient>

          {/* Lueur douce */}
          <filter id="softShadow" x="-10%" y="-50%" width="120%" height="200%">
            <feDropShadow dx="0" dy="-1" stdDeviation="4" floodColor="rgba(181,125,105,0.2)" />
          </filter>
        </defs>

        {/* Fine double ligne + léger arrondi central */}
        <path
          d="M0,20 Q720,40 1440,20 L1440,25 Q720,45 0,25 Z"
          fill="url(#line)"
          filter="url(#softShadow)"
          opacity="0.85"
        />
      </svg>
    </div>
  );
}
