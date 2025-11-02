"use client";

export default function OrnateFrame() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
      {/* ===== FOND ROSE POUDRÉ NACRÉ (avec effet scintillant subtil) ===== */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 95% at 50% 20%, #e9bed8ff 0%, #ecc0e2ff 40%, #f5c2e8ff 70%, #eac2d7ff 100%)",
        }}
      />

      {/* voile nacré brillant */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-70"
        style={{
          background:
            "linear-gradient(180deg, rgba(187, 136, 166, 0.65) 0%, rgba(213, 181, 209, 0) 50%, rgba(255,230,225,0.5) 100%)",
        }}
      />

      {/* scintillement doux (effet pailleté léger) */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.7) 0 0.6px, transparent 1.2px)",
          backgroundSize: "120px 120px",
        }}
      />

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
