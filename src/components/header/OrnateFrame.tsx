// src/components/header/OrnateFrame.tsx
"use client";

export default function OrnateFrame() {
  // largeur 1440 x hauteur 360 (format paysage d'en-tête)
  const beads = Array.from({ length: 60 }, (_, i) => i);

  return (
    <svg
      className="pointer-events-none absolute inset-0 -z-10 w-full h-full"
      viewBox="0 0 1440 360"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Fond marbré très doux */}
        <linearGradient id="marble" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff9f6" />
          <stop offset="60%" stopColor="#fdf0ea" />
          <stop offset="100%" stopColor="#fae7de" />
        </linearGradient>

        {/* Métal rose-gold */}
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e7c9b7" />
          <stop offset="50%" stopColor="#dab39d" />
          <stop offset="100%" stopColor="#eed9cc" />
        </linearGradient>

        {/* Rose poudrée */}
        <linearGradient id="rose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f2c3b5" />
          <stop offset="100%" stopColor="#e7a99b" />
        </linearGradient>

        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="rgba(181,125,105,0.25)" />
        </filter>
      </defs>

      {/* Arrière-plan */}
      <rect width="1440" height="360" fill="url(#marble)" />

      {/* Frise supérieure (liserés + rang de perles) */}
      <rect x="0" y="0" width="1440" height="14" fill="url(#metal)" />
      <rect x="0" y="20" width="1440" height="12" fill="url(#metal)" />
      <g transform="translate(12,42)">
        {beads.map((b) => (
          <circle
            key={`t${b}`}
            cx={b * 24}
            cy={0}
            r={5.5}
            fill="url(#metal)"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth={1}
          />
        ))}
      </g>

      {/* Motif central simplifié (arabesques + rose) */}
      <g filter="url(#softShadow)" opacity="0.9">
        <path
          d="M720,96c80,40,120,80,120,120 0,0-48-36-120-36s-120,36-120,36c0-40,40-80,120-120Z"
          fill="none"
          stroke="url(#metal)"
          strokeWidth={6}
          strokeLinecap="round"
        />
        <circle cx="720" cy="150" r="18" fill="url(#rose)" stroke="url(#metal)" strokeWidth={4} />
        <path d="M620,160c-30,20-60,48-84,78" fill="none" stroke="url(#metal)" strokeWidth={5} strokeLinecap="round" />
        <path d="M820,160c30,20 60,48 84,78"   fill="none" stroke="url(#metal)" strokeWidth={5} strokeLinecap="round" />
      </g>

      {/* Frise inférieure (liseré + perles + petites volutes) */}
      <rect x="0" y="320" width="1440" height="12" fill="url(#metal)" />
      <g transform="translate(12,340)">
        {beads.map((b) => (
          <circle
            key={`b${b}`}
            cx={b * 24}
            cy={0}
            r={5.5}
            fill="url(#metal)"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth={1}
          />
        ))}
      </g>
      <path d="M60,318c40,10,70,0,100-24"  fill="none" stroke="url(#metal)" strokeWidth={5} strokeLinecap="round" />
      <path d="M1380,318c-40,10-70,0-100-24" fill="none" stroke="url(#metal)" strokeWidth={5} strokeLinecap="round" />
      <circle cx="120"  cy="300" r="9"  fill="url(#rose)" stroke="url(#metal)" strokeWidth={3} />
      <circle cx="1320" cy="300" r="9"  fill="url(#rose)" stroke="url(#metal)" strokeWidth={3} />
    </svg>
  );
}
