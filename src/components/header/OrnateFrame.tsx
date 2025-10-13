// src/components/header/OrnateFrame.tsx
export default function OrnateFrame() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none absolute inset-x-0 top-0
        z-0              /* sous le logo/wordmark */
        h-[220px] md:h-[260px] lg:h-[300px]
      "
    >
      {/* ----- panneau central doux (fond) ----- */}
      <div
        className="
          absolute inset-x-4 md:inset-x-6 top-5 bottom-5
          rounded-[26px] md:rounded-[30px]
          border border-[#c49a86]/35
          bg-gradient-to-b from-white/75 via-[#fff6f2]/70 to-[#fcefe9]/60
          shadow-[inset_0_0_40px_rgba(255,255,255,0.9),inset_0_18px_44px_rgba(231,208,196,0.75)]
        "
      />

      {/* ----- listels (moulures) latéraux ----- */}
      <div
        className="
          absolute top-7 bottom-7 left-6 w-[14px] md:w-[16px]
          rounded-l-[20px]
          bg-gradient-to-r from-[#dcbca9] to-[#e9d3c8]
          shadow-[inset_-2px_0_6px_rgba(255,255,255,0.7)]
          opacity-90
        "
      />
      <div
        className="
          absolute top-7 bottom-7 right-6 w-[14px] md:w-[16px]
          rounded-r-[20px]
          bg-gradient-to-l from-[#dcbca9] to-[#e9d3c8]
          shadow-[inset_2px_0_6px_rgba(255,255,255,0.7)]
          opacity-90
        "
      />

      {/* ----- capot supérieur bombé ----- */}
      <div
        className="
          absolute left-10 right-10 top-0
          h-16 md:h-20
          rounded-b-[42px]
          bg-gradient-to-b from-[#ead6ca] via-[#e6cfc1] to-[#dfc6b8]
          shadow-[0_10px_28px_rgba(181,125,105,0.25)]
        "
      />

      {/* petit filet sous le capot (renforce la tranche) */}
      <div
        className="
          absolute left-14 right-14 top-[64px] md:top-[82px]
          h-[2px] bg-[#d4b3a1]/50 rounded-full
        "
      />

      {/* ----- capot inférieur bombé ----- */}
      <div
        className="
          absolute left-10 right-10 bottom-0
          h-16 md:h-20
          rounded-t-[42px]
          bg-gradient-to-t from-[#ead6ca] via-[#e6cfc1] to-[#dfc6b8]
          shadow-[0_-10px_28px_rgba(181,125,105,0.25)]
        "
      />

      {/* petit filet au-dessus du capot bas */}
      <div
        className="
          absolute left-14 right-14 bottom-[64px] md:bottom-[82px]
          h-[2px] bg-[#d4b3a1]/50 rounded-full
        "
      />
    </div>
  );
}
