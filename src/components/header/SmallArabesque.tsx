"use client";

type Props = { className?: string };

export default function SmallArabesque({ className }: Props) {
  return (
    <svg
      viewBox="0 0 220 28"
      className={className}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        {/* dégradé or rosé */}
        <linearGradient id="vaLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e7c9b7" />
          <stop offset="50%" stopColor="#d5a990" />
          <stop offset="100%" stopColor="#f0ddd2" />
        </linearGradient>
        {/* lueur très douce */}
        <filter id="vaGlow" x="-20%" y="-120%" width="140%" height="300%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.8" floodColor="rgba(181,125,105,0.28)" />
        </filter>
      </defs>

      {/* double courbe + micro perles centrales */}
      <g fill="none" stroke="url(#vaLine)" strokeWidth="2" filter="url(#vaGlow)" opacity="0.95">
        {/* arc principal */}
        <path d="M6,18 Q110,6 214,18" />
        {/* arc secondaire (plus fin) */}
        <path d="M22,22 Q110,10 198,22" strokeWidth="1.4" opacity="0.85" />
      </g>
      {/* trois petits points au centre (perles) */}
      <g fill="#d8a58f" opacity="0.95">
        <circle cx="110" cy="20.2" r="1.7" />
        <circle cx="104.5" cy="20.2" r="1.2" opacity="0.85" />
        <circle cx="115.5" cy="20.2" r="1.2" opacity="0.85" />
      </g>
    </svg>
  );
}
