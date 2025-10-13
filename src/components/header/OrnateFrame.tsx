// src/components/header/OrnateFrame.tsx
"use client";

export default function OrnateFrame() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 -z-10 w-full h-full"
      viewBox="0 0 1440 360"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Fond poudré */}
        <linearGradient id="marble" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff9f6" />
          <stop offset="60%" stopColor="#fdf0ea" />
          <stop offset="100%" stopColor="#fae7de" />
        </linearGradient>

        {/* Métal rose-gold */}
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e7c9b7" />
          <stop offset="55%" stopColor="#d5a990" />
          <stop offset="100%" stopColor="#f0ddd2" />
        </linearGradient>

        {/* ombre douce */}
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="rgba(181,125,105,0.18)" />
        </filter>
      </defs>

      {/* --- arrière-plan marbré --- */}
      <rect width="1440" height="360" fill="url(#marble)" />

      {/* --- arabesques dorées (coins) --- */}
      {/* haut-gauche */}
      <g filter="url(#soft)" opacity="0.92">
        <path
          d="M36,64 
             Q84,46 128,64 
             Q92,82 116,98 
             Q72,98 52,122 
             Q60,96 36,64 Z"
          fill="none" stroke="url(#metal)" strokeWidth="5" strokeLinecap="round"
        />
        <path d="M118,66 q-18,10 -22,30" fill="none" stroke="url(#metal)" strokeWidth="4" strokeLinecap="round"/>

        {/* haut-droite (miroir) */}
        <g transform="translate(1440,0) scale(-1,1)">
          <path
            d="M36,64 
               Q84,46 128,64 
               Q92,82 116,98 
               Q72,98 52,122 
               Q60,96 36,64 Z"
            fill="none" stroke="url(#metal)" strokeWidth="5" strokeLinecap="round"
          />
          <path d="M118,66 q-18,10 -22,30" fill="none" stroke="url(#metal)" strokeWidth="4" strokeLinecap="round"/>
        </g>

        {/* bas-gauche */}
        <g transform="translate(0,360) scale(1,-1)">
          <path
            d="M36,64 
               Q84,46 128,64 
               Q92,82 116,98 
               Q72,98 52,122 
               Q60,96 36,64 Z"
            fill="none" stroke="url(#metal)" strokeWidth="5" strokeLinecap="round"
          />
          <path d="M118,66 q-18,10 -22,30" fill="none" stroke="url(#metal)" strokeWidth="4" strokeLinecap="round"/>
        </g>

        {/* bas-droite */}
        <g transform="translate(1440,360) scale(-1,-1)">
          <path
            d="M36,64 
               Q84,46 128,64 
               Q92,82 116,98 
               Q72,98 52,122 
               Q60,96 36,64 Z"
            fill="none" stroke="url(#metal)" strokeWidth="5" strokeLinecap="round"
          />
          <path d="M118,66 q-18,10 -22,30" fill="none" stroke="url(#metal)" strokeWidth="4" strokeLinecap="round"/>
        </g>
      </g>
    </svg>
  );
}
