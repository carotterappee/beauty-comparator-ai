// src/components/header/OrnateFrame.tsx
"use client";

export default function OrnateFrame() {
  return (
    <div
      className="
        relative
        w-full
        h-[240px]           /* hauteur du bandeau */
        -z-10               /* passe derrière le logo & le mot */
        select-none
      "
      aria-hidden
    >
      {/* Fond soyeux */}
      <div
        className="
          absolute inset-0
          rounded-none
          bg-[linear-gradient(135deg,#f6ece6_0%,#f2e3da_100%)]
        "
      />

      {/* Grand cadre biseauté (bord extérieur) */}
      <div
        className="
          absolute inset-[10px]
          rounded-[28px]
          border border-[#eadad0]
          shadow-[inset_0_1px_0_#fff,inset_0_-1px_0_#dccac0]
          bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0))]
        "
      />

      {/* Liseré intérieur + ombre douce pour l'effet 'moulure' */}
      <div
        className="
          absolute inset-[22px]
          rounded-[22px]
          border border-[#e8d6cb]
          shadow-[inset_0_10px_30px_rgba(59,45,43,0.08)]
          bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0))]
        "
      />

      {/* 'Fronton' supérieur arrondi (petit bombé) */}
      <div
        className="
          absolute left-1/2 -translate-x-1/2 top-[6px]
          w-[min(1200px,92%)]
          h-[86px]
          rounded-b-[60px]
          bg-[linear-gradient(180deg,#f6ede7,#ead6ca)]
          shadow-[0_10px_28px_rgba(59,45,43,0.10),inset_0_1px_0_#fff,inset_0_-6px_12px_rgba(181,125,105,0.30)]
          border border-[#e9d9cd]
        "
      />
    </div>
  );
}
