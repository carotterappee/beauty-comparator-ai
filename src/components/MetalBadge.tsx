"use client";

type Props = {
  size?: number;            // Taille finale en px
  ringWidth?: number;       // Épaisseur de l’anneau
  strokeMain?: number;      // Épaisseur des traits principaux V/M
  strokeFine?: number;      // Épaisseur des creux (traits clairs)
  shine?: boolean;          // Balayage brillant
  className?: string;
};

export default function VMBadge({
  size = 160,
  ringWidth = 26,
  strokeMain = 38,
  strokeFine = 8,
  shine = true,
  className,
}: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="VelvetMind badge"
      role="img"
    >
      <defs>
        {/* Dégradé rose-gold */}
        <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#cfa088"/>
          <stop offset="32%"  stopColor="#d8b39e"/>
          <stop offset="60%"  stopColor="#b47e6a"/>
          <stop offset="88%"  stopColor="#e4cabc"/>
          <stop offset="100%" stopColor="#b47e6a"/>
        </linearGradient>

        {/* Vernis global doux */}
        <radialGradient id="gloss" cx="30%" cy="28%" r="70%">
          <stop offset="0%"  stopColor="rgba(255,255,255,0.55)"/>
          <stop offset="55%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>

        {/* Relief (specular) */}
        <filter id="bevel" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="a"/>
          <feSpecularLighting in="a" surfaceScale="2.5" specularConstant="0.7" specularExponent="22" lighting-color="#fff" result="s">
            <fePointLight x="-300" y="-260" z="220"/>
          </feSpecularLighting>
          <feComposite in="s" in2="SourceAlpha" operator="in" result="spec"/>
          <feMerge>
            <feMergeNode in="spec"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Ombre posée */}
        <filter id="drop" x="-20%" y="-20%" width="140%" height="140%">
          <feOffset dx="0" dy="8" in="SourceAlpha" result="o"/>
          <feGaussianBlur in="o" stdDeviation="8" result="b"/>
          <feColorMatrix in="b" type="matrix"
            values="0 0 0 0 0.52  0 0 0 0 0.40  0 0 0 0 0.36  0 0 0 0.25 0" result="shadow"/>
          <feMerge>
            <feMergeNode in="shadow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Shine animé */}
        <linearGradient id="shineGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"  stopColor="rgba(255,255,255,0)"/>
          <stop offset="48%" stopColor="rgba(255,255,255,0.75)"/>
          <stop offset="55%" stopColor="rgba(255,255,255,0)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </linearGradient>
        <mask id="shineMask">
          <rect x="-1024" y="0" width="1024" height="1024" fill="url(#shineGrad)">
            <animate attributeName="x" values="-1024;1024" dur="2.2s" repeatCount="indefinite"/>
          </rect>
        </mask>
      </defs>

      {/* Fond papier léger (optionnel) */}
      <rect width="1024" height="1024" fill="#f4e6df"/>

      <g filter="url(#drop)">
        {/* Anneau */}
        <circle cx="512" cy="512" r="382" fill="none" stroke="url(#rg)" strokeWidth={ringWidth} filter="url(#bevel)"/>

        {/* --- TRACÉS + proportions proches de la ref --- */}
        {/* V – hampe + contre-courbe basse */}
        <path
          d="
            M 300 320
            C 380 330, 420 360, 450 420
            L 520 600
            C 540 645, 545 700, 530 750
            C 520 785, 500 815, 475 840
          "
          fill="none" stroke="url(#rg)" strokeWidth={strokeMain} strokeLinecap="round" filter="url(#bevel)"/>

        <path
          d="
            M 305 695
            C 360 765, 480 770, 540 705
          "
          fill="none" stroke="url(#rg)" strokeWidth={strokeMain * 0.65} strokeLinecap="round" filter="url(#bevel)"/>

        {/* M – jambe gauche courbe + trait intérieur clair */}
        <path
          d="
            M 500 835
            C 640 720, 675 560, 650 445
            C 632 360, 595 320, 560 305
          "
          fill="none" stroke="url(#rg)" strokeWidth={strokeMain} strokeLinecap="round" filter="url(#bevel)"/>

        {/* Jambe droite du M */}
        <path
          d="M 715 365 C 715 530, 715 635, 715 748"
          fill="none" stroke="url(#rg)" strokeWidth={strokeMain} strokeLinecap="round" filter="url(#bevel)"/>

        {/* Empattement droit */}
        <path
          d="M 660 750 L 775 750"
          fill="none" stroke="url(#rg)" strokeWidth={strokeMain * 0.7} strokeLinecap="round" filter="url(#bevel)"/>

        {/* Traits clairs (creux) pour accent métal */}
        <path
          d="M 570 325 C 615 355, 650 425, 642 515"
          fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth={strokeFine} strokeLinecap="round"/>

        <path
          d="M 715 430 C 715 545, 715 640, 715 720"
          fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={strokeFine} strokeLinecap="round"/>
      </g>

      {/* Vernis global */}
      <rect width="1024" height="1024" fill="url(#gloss)" pointerEvents="none"/>

      {/* Shine (désactivable) */}
      {shine && (
        <g mask="url(#shineMask)" pointerEvents="none" opacity="0.08">
          <circle cx="512" cy="512" r="392" fill="#fff"/>
        </g>
      )}
    </svg>
  );
}
