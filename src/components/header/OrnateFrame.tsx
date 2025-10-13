"use client";

export default function OrnateFrame() {
  return (
    <>
      {/* Fond poudré uniforme */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#fff9f6] via-[#fdf0ea] to-[#fae7de]"
      />

      {/* Arabesques bas-gauche et bas-droite */}
      <svg
        className="pointer-events-none absolute bottom-0 left-0 w-[180px] h-[130px] z-[-1]"
        viewBox="0 0 170 120"
        preserveAspectRatio="xMinYMin meet"
      >
        <defs>
          <linearGradient id="metalL" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e7c9b7" />
            <stop offset="55%" stopColor="#d5a990" />
            <stop offset="100%" stopColor="#f0ddd2" />
          </linearGradient>
          <filter id="softL" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(181,125,105,0.15)" />
          </filter>
        </defs>
        <g
          filter="url(#softL)"
          fill="none"
          stroke="url(#metalL)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        >
          <path d="M0,0 C36,-18 82,-20 120,-2 C86,12 66,24 60,44 C52,70 70,92 92,104 C66,98 46,88 30,66 C16,46 8,26 12,10" />
          <path d="M26,6 C40,-4 60,-8 78,-4" />
          <path d="M88,14 C112,8 132,16 148,34" />
          <path d="M102,36 C118,50 126,70 122,90" />
          <path d="M42,34 C30,48 24,66 28,84" />
        </g>
      </svg>

      <svg
        className="pointer-events-none absolute bottom-0 right-0 w-[180px] h-[130px] z-[-1]"
        viewBox="0 0 170 120"
        preserveAspectRatio="xMinYMin meet"
      >
        <defs>
          <linearGradient id="metalR" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e7c9b7" />
            <stop offset="55%" stopColor="#d5a990" />
            <stop offset="100%" stopColor="#f0ddd2" />
          </linearGradient>
          <filter id="softR" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(181,125,105,0.15)" />
          </filter>
        </defs>
        <g
          transform="translate(170,0) scale(-1,1)"
          filter="url(#softR)"
          fill="none"
          stroke="url(#metalR)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        >
          <path d="M0,0 C36,-18 82,-20 120,-2 C86,12 66,24 60,44 C52,70 70,92 92,104 C66,98 46,88 30,66 C16,46 8,26 12,10" />
          <path d="M26,6 C40,-4 60,-8 78,-4" />
          <path d="M88,14 C112,8 132,16 148,34" />
          <path d="M102,36 C118,50 126,70 122,90" />
          <path d="M42,34 C30,48 24,66 28,84" />
        </g>
      </svg>
    </>
  );
}
