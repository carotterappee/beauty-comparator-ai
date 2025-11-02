"use client";

export default function OrnateFrame() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
      {/* ===== Panneau de l'en-tête (teinte un peu différente) ===== */}
{/* Fond rose poudré nacré */}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,#fbe7e2_0%,#f9dcd6_40%,#f7d1c9_75%,#f6c7be_100%)]" />

{/* Lueur satinée subtile */}
<div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-[#f8e1da]/60 mix-blend-overlay opacity-60" />

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
