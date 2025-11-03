"use client";

import LogoPin from "./LogoPin";
import WordmarkHeader from "./WordmarkHeader";
import OrnateFrame from "./OrnateFrame";

export default function Header() {
  return (
    // header au-dessus, on ne touche pas
<header className="relative isolate z-[40] w-full h-[380px] md:h-[420px] lg:h-[480px] overflow-hidden pb-24">
  
      {/* Logo */}
      <div className="absolute left-6 top-8">
        <LogoPin />
        </div>
{/* Boutons en haut-droite raffinés */}
<div
  className="z-[80] flex items-center gap-4"
  style={{ position: "absolute", top: "2rem", right: "2rem", left: "auto" }}
>
  <a
    href="/signup"
    className="no-underline px-5 py-2 rounded-full text-[14px] font-medium tracking-wide
               bg-gradient-to-b from-[#fff8f2] via-[#fff0e6] to-[#ffe6d8]
               text-[#804c3a] border border-[#e6c2b3]
               shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_3px_6px_rgba(181,125,105,0.2)]
               hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_4px_10px_rgba(181,125,105,0.3)]
               hover:-translate-y-[2px] transition-all duration-300 ease-out
               backdrop-blur-[2px]"
  >
    Créer un compte
  </a>
  <a
    href="/login"
    className="no-underline px-5 py-2 rounded-full text-[14px] font-medium tracking-wide
               bg-gradient-to-b from-[#fff6f9] via-[#fde8f1] to-[#f9dbe8]
               text-[#7a405a] border border-[#e3b3c5]
               shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_3px_6px_rgba(181,125,105,0.2)]
               hover:shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_4px_10px_rgba(181,125,105,0.3)]
               hover:-translate-y-[2px] transition-all duration-300 ease-out
               backdrop-blur-[2px]"
  >
    Se connecter
  </a>
</div>




      {/* Wordmark + arabesques */}
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-6 flex justify-center">
        {/* ARABESQUE HAUTE (normale) */}
        <img
          src="/velvetmind/arabesque-small.svg"
          alt=""
          aria-hidden
          draggable={false}
          className="
            select-none pointer-events-none absolute left-1/2 -translate-x-1/2
            top-[-20px] md:top-[44px]   /* proche du haut, pas de rotation */
            w-[320px] md:w-[340px] aspect-[16/5] h-auto object-contain
            z-[50]
          "
        />

        {/* Mot central */}
        <div className="relative z-[45]">
          <WordmarkHeader />
        </div>

        {/* ARABESQUE BASSE (retournée, sur la bande) */}
        <img
          src="/velvetmind/arabesque-small.svg"
          alt=""
          aria-hidden
          draggable={false}
className="
            select-none pointer-events-none absolute left-1/2 -translate-x-1/2
            bottom-[-80px] md:bottom-[26px]  /* valeur POSITIVE, bien dans le header */
            w-[320px] md:w-[340px] aspect-[16/5] h-auto object-contain
            rotate-180 z-[60]
          "
        />
      </div>
    </header>
  );
}
