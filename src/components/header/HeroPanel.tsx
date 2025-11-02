"use client";
import Header from ".";        
export default function HeroPanel() {
  const panelBg = "#f8d9f79e";
  const pageBg = "#fcf9e781";

  return (
    <section className="relative isolate">
      {/* Bloc entête coloré */}
      <div className="relative" style={{ backgroundColor: panelBg }}>
        <Header />
      </div>

      {/* Transition douce vers la couleur de page */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute left-0 -bottom-px w-full h-20"
        aria-hidden
      >
        <defs>
          <linearGradient id="softEdge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B57D69" stopOpacity="0.12" />
            <stop offset="100%" stopColor={pageBg} stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect x="0" y="48" width="1440" height="32" fill="url(#softEdge)" />
        <path
          d="M0,50 C360,65 1080,65 1440,50 L1440,80 L0,80 Z"
          fill={pageBg}
        />
      </svg>
    </section>
  );
}
