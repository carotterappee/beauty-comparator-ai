"use client";

export default function OrnateFrame() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
      {/* ===== Panneau de l'en-tête (teinte un peu différente) ===== */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff7f4] via-[#feecea] to-[#fae7de]" />

      {/* ===== LIGNES DÉLIMITANTES chic (haut) ===== */}
      <div className="absolute inset-x-0 top-[18px]">
        <div className="h-[2px] bg-gradient-to-r from-[#e3bfae] via-[#cf9f87] to-[#edd6cb] shadow-[0_1px_3px_rgba(181,125,105,0.25)]" />
        <div className="mt-[4px] h-px bg-gradient-to-r from-[#e3bfae] via-[#cf9f87] to-[#edd6cb] opacity-80" />
      </div>

      {/* ===== LIGNES DÉLIMITANTES chic (bas) ===== */}
      <div className="absolute inset-x-0 bottom-[18px]">
        <div className="h-[2px] bg-gradient-to-r from-[#e3bfae] via-[#cf9f87] to-[#edd6cb] shadow-[0_-1px_3px_rgba(181,125,105,0.25)]" />
        <div className="mt-[4px] h-px bg-gradient-to-r from-[#e3bfae] via-[#cf9f87] to-[#edd6cb] opacity-80" />
      </div>
    </div>
  );
}
