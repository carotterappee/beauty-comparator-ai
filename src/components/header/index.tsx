"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="relative w-full h-[300px] md:h-[340px] bg-[#f7eaf2] flex flex-col items-center justify-center shadow-[0_8px_24px_rgba(181,125,105,0.08)]">
      {/* Actions top-right */}
     <div
  style={{
    position: "absolute",
    top: "20px",     // distance depuis le haut
    right: "40px",   // distance depuis le bord droit
    display: "flex",
    alignItems: "center",
    gap: "20px",     // espace entre les éléments
    color: "#6b4a3f",
  }}
>
  {/* Favoris (cœur) */}
  <Link
    href="/favorites"
    aria-label="Favoris"
    title="Favoris"
    style={{
      padding: "6px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.7)",
      border: "1px solid #e7c7b6",
      boxShadow: "0 2px 6px rgba(181,125,105,0.15)",
      transition: "all 0.3s ease",
    }}
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
      style={{ color: "#6b4a3f" }}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  </Link>

  {/* Panier */}
  <Link
    href="/cart"
    aria-label="Panier"
    title="Panier"
    style={{
      padding: "6px",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.7)",
      border: "1px solid #e7c7b6",
      boxShadow: "0 2px 6px rgba(181,125,105,0.15)",
      transition: "all 0.3s ease",
    }}
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
      style={{ color: "#6b4a3f" }}
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L21 6H6" />
    </svg>
  </Link>

  {/* Se connecter */}
  <Link
    href="/login"
    style={{
      textDecoration: "none",
      borderRadius: "999px",
      padding: "6px 14px",
      fontSize: "14px",
      fontWeight: 500,
      color: "#6b4a3f",
      background: "rgba(255,255,255,0.8)",
      border: "1px solid #e7c7b6",
      boxShadow: "0 2px 6px rgba(181,125,105,0.15)",
      transition: "all 0.3s ease",
    }}
  >
    Se connecter
  </Link>

  {/* Créer un compte */}
  <Link
    href="/signup"
    style={{
      textDecoration: "none",
      borderRadius: "999px",
      padding: "6px 14px",
      fontSize: "14px",
      fontWeight: 500,
      color: "#fff",
      background: "#b57d69",
      boxShadow: "0 4px 12px rgba(181,125,105,0.25)",
      transition: "all 0.3s ease",
    }}
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
