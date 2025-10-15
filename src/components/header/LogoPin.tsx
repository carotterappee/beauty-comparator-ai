"use client";

import Link from "next/link";
import VMBadgeSVG from "@/components/VMBadgeSVG";

export default function Header() {
  return (
    <header className="relative w-full  h-[360px] md:h-[400px] lg:h-[440px]">

      {/* Logo: sticks to the top-left of the header */}
      <Link
        href="/"
        aria-label="Accueil"
        className="absolute left-6 top-[40px] md:top-[56px] lg:top-[64px]"
      >
        <VMBadgeSVG size={96} className="shrink-0" />
      </Link>
    </header>
  );
}

