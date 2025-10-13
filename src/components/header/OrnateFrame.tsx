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

        {/* Arabesque de référence (inspirée de ton visuel) – dessinée vers le haut, ~170x120px */}
        <path
          id="arabesque"
          d="
            M0,0
            C36,-18 82,-20 120,-2
            C86,12 66,24 60,44
            C52,70 70,92 92,104
            C66,98 46,88 30,66
            C16,46 8,26 12,10

            M26,6
            C40,-4 60,-8 78,-4

            M88,14
            C112,8 132,16 148,34

            M102,36
            C118,50 126,70 122,90

            M42,34
            C30,48 24,66 28,84
          "
        />
      </defs>

      {/* Arrière-plan */}
      <rect width="1440" height="360" fill="url(#marble)" />

      {/* Arabesques bas-gauche & bas-droite */}
      <g filter="url(#soft)" stroke="url(#metal)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.95">
        {/* bas-gauche */}
        <g transform="translate(28,338) scale(1,-1)">
          <use href="#arabesque" />
        </g>

        {/* bas-droite (miroir) */}
        <g transform="translate(1412,338) scale(-1,-1)">
          <use href="#arabesque" />
        </g>
      </g>
    </svg>
  );
}
