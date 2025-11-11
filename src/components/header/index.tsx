"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="relative w-full h-[300px] md:h-[340px] bg-[#f7eaf2] flex flex-col items-center justify-center shadow-[0_8px_24px_rgba(181,125,105,0.08)]">
      {/* Actions top-right */}
     <div className="absolute right-8 top-5 flex items-center gap-4 md:gap-6 text-[#6b4a3f]">
  {/* Favoris (cœur) */}
  <Link
    href="/favorites"
    aria-label="Favoris"
    title="Favoris"
    className="group p-2 rounded-full bg-white/70 ring-1 ring-[#e7c7b6] hover:bg-white shadow-sm transition"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#6b4a3f] group-hover:text-[#b57d69]"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  </Link>

  {/* Panier */}
  <Link
    href="/cart"
    aria-label="Panier"
    title="Panier"
    className="group p-2 rounded-full bg-white/70 ring-1 ring-[#e7c7b6] hover:bg-white shadow-sm transition"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#6b4a3f] group-hover:text-[#b57d69]"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L21 6H6" />
    </svg>
  </Link>

  {/* Se connecter */}
  <Link
    href="/login"
    className="no-underline rounded-full px-3.5 py-1.5 text-sm font-medium text-[#6b4a3f] bg-white/80 ring-1 ring-[#e7c7b6] shadow-[0_2px_8px_rgba(181,125,105,0.12)] hover:bg-white hover:text-[#b57d69] transition"
  >
    Se connecter
  </Link>

  {/* Créer un compte */}
  <Link
    href="/signup"
    className="no-underline rounded-full px-3.5 py-1.5 text-sm font-medium text-white bg-[#b57d69] shadow-[0_6px_18px_rgba(181,125,105,0.25)] hover:brightness-105 transition"
  >
    Créer un compte
  </Link>
</div>

      {/* Titre */}
      <h1
        className="text-[44px] md:text-[58px] lg:text-[64px] tracking-[0.14em] text-[#5b3e37] select-none"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        VELVETMIND
      </h1>
    </header>
  );
}
