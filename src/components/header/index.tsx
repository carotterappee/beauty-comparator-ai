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

         {/* Boutons en haut-droite (forcés) */}
<div
  className="z-[80] flex items-center gap-3"
  style={{ position: "absolute", top: "2rem", right: "2rem", left: "auto", bottom: "auto" }}
>
  <a
    href="/signup"
    className="rounded-full px-4 py-2 text-[13px] md:text-sm
               bg-[#fff6ec] border border-[#e7c9b7]
               text-[#7a4b3a]
               shadow-[0_2px_8px_rgba(181,125,105,0.18)]
               hover:shadow-[0_4px_14px_rgba(181,125,105,0.28)]
               hover:-translate-y-0.5 transition-all duration-200"
  >
    Créer un compte
  </a>
  <a
    href="/login"
    className="rounded-full px-4 py-2 text-[13px] md:text-sm
               bg-gradient-to-b from-[#fff2e6] to-[#ffe7d4]
               border border-[#e7c9b7]
               text-[#6c3f30]
               shadow-[0_2px_8px_rgba(181,125,105,0.2)]
               hover:shadow-[0_4px_14px_rgba(181,125,105,0.3)]
               hover:-translate-y-0.5 transition-all duration-200"
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
