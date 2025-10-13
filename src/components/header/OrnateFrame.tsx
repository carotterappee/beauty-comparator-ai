export default function OrnateFrame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[180px] md:h-[220px]"
    >
      {/* Cadre intérieur doux */}
      <div className="absolute inset-x-6 top-4 bottom-4 rounded-[28px]
                      border border-[#c49a86]/30
                      shadow-[inset_0_0_30px_#fff,inset_0_10px_40px_#e7d0c4]
                      bg-gradient-to-b from-white/70 to-[#fff6f2]/60" />

      {/* Capot supérieur mouluré */}
      <div className="absolute left-10 right-10 top-0 h-16 rounded-b-[40px]
                      bg-gradient-to-b from-[#ead6ca] to-[#dfc6b8]
                      shadow-[0_6px_20px_rgba(181,125,105,.25)]" />

      {/* Liseré bas du cadre */}
      <div className="absolute left-10 right-10 bottom-0 h-[2px] bg-[#d4b3a1]/40 rounded-full" />
    </div>
  );
}
