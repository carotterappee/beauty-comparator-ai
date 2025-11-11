"use client";

import Link from "next/link";
// Si tu veux garder ton composant actuel de mot-symbole :
// import WordmarkHeader from "./WordmarkHeader";

export default function Header() {
  return (
    <header className="relative w-full h-[260px] md:h-[300px] lg:h-[340px] bg-[#f9eef4]">
      {/* Actions haut-droite */}
      <div className="absolute right-6 top-5 flex items-center gap-3 md:gap-4">
        <Link
          href="/login"
          className="rounded-full px-4 py-1.5 text-sm font-medium text-[#6b4a3f] bg-white/80 ring-1 ring-[#e7c7b6] shadow-[0_2px_8px_rgba(181,125,105,0.12)] hover:bg-white transition"
        >
          Se connecter
        </Link>
        <Link
          href="/signup"
          className="rounded-full px-4 py-1.5 text-sm font-medium text-white bg-[#b57d69] shadow-[0_6px_18px_rgba(181,125,105,0.25)] hover:brightness-105 transition"
        >
          Créer un compte
        </Link>

        {/* Favoris */}
        <Link
          href="/favorites"
          aria-label="Favoris"
          className="grid place-items-center size-9 rounded-full bg-white/80 ring-1 ring-[#e7c7b6] hover:bg-white transition"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#b57d69" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/>
          </svg>
        </Link>

        {/* Panier */}
        <Link
          href="/cart"
          aria-label="Panier"
          className="grid place-items-center size-9 rounded-full bg-white/80 ring-1 ring-[#e7c7b6] hover:bg-white transition"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#b57d69" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1.5" />
            <circle cx="18" cy="21" r="1.5" />
            <path d="M3 3h2l2.6 12.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L21 7H6" />
          </svg>
        </Link>
      </div>

      {/* Bloc central : VELVETMIND + nav */}
      <div className="h-full w-full flex flex-col items-center justify-center px-6">
        {/* Si tu préfères ton composant WordmarkHeader, dé-commente la ligne dessous et supprime le <h1> */}
        {/* <WordmarkHeader /> */}
        <h1
          className="text-[40px] md:text-[56px] lg:text-[64px] tracking-[0.12em] text-[#5b3e37]"
          style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif", letterSpacing: ".18em" }}
        >
          VELVETMIND
        </h1>

        <nav className="mt-4 md:mt-6">
          <ul className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {[
              { label: "Accueil", href: "/" },
              { label: "Soins visage", href: "/products?cat=visage" },
              { label: "Cheveux", href: "/products?cat=cheveux" },
              { label: "Maquillage", href: "/products?cat=maquillage" },
              { label: "Parfums", href: "/products?cat=parfums" },
              { label: "Corps", href: "/products?cat=corps" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="no-underline text-[#6b4a3f] hover:text-[#b57d69] text-sm md:text-base font-medium px-3 py-1.5 rounded-full hover:bg-white/70 ring-1 ring-transparent hover:ring-[#e7c7b6] transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
