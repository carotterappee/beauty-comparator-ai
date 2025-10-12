"use client";

import Link from "next/link";
import VMBadgeSVG from "@/components/VMBadgeSVG";

export default function Header() {
  return (
    <header className="relative w-full">

      {/* === LOGO FIXÉ === */}
      <div className="fixed left-6 top-6 z-50">
        <Link href="/" aria-label="Accueil">
          <VMBadgeSVG size={96} className="shrink-0" />
        </Link>
      </div>

      {/* === MOT “VelvetMind” CENTRÉ ET DESCENDU === */}
      <div className="mx-auto max-w-7xl px-6 pb-6">
        <img
          src="/velvetmind/vm-wordmark.svg"
          alt="VelvetMind Wordmark"
          className="block mx-auto mt - [6rem] h-[201px] w-auto select-none"
        />
      </div>

    </header>
  );
}
