"use client";

import LogoPin from "./LogoPin";
import WordmarkHeader from "./WordmarkHeader";
import OrnateFrame from "./OrnateFrame";

export default function Header() {
  return (
    // header au-dessus, on ne touche pas
<header className="relative isolate z-[40] w-full h-[360px] md:h-[400px] lg:h-[440px] overflow-visible">      <OrnateFrame />

      {/* Logo */}
      <div className="absolute left-6 top-8">
        <LogoPin />
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
            top-[8px] md:top-[44px]   /* proche du haut, pas de rotation */
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
            bottom-[-100px] md:bottom-[26px]  /* valeur POSITIVE, bien dans le header */
            w-[320px] md:w-[340px] aspect-[16/5] h-auto object-contain
            rotate-180 z-[60]
          "
        />
      </div>
    </header>
  );
}
