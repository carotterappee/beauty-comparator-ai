"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-[90vh] bg-[#fdf8f9]">
      {/* L’arrière-plan de la page reste blanc ; la partie rose est dans Header */}

      {/* BARRE DE CATÉGORIES – pile sur la jonction */}
      <section className="relative -mt-6 md:-mt-8 z-20">
        <div className="mx-auto max-w-5xl px-4">
          <nav className="rounded-2xl bg-white/85 backdrop-blur-xl ring-1 ring-[#e8cfc3] shadow-[0_10px_28px_rgba(181,125,105,0.12)] px-4 md:px-6 py-3">
          <ul className="list-none flex flex-row flex-wrap items-center justify-center space-x-8 md:space-x-12">
  {[
    { label: "Accueil", href: "/" },
    { label: "Tendances", href: "/tendances" },
    { label: "Comparateur", href: "/comparateur" },
    { label: "Profil beauté", href: "/profil beauté" },
    { label: "A propos", href: "/à propos" },
    { label: "Nous contacter", href: "/nous contacter" },
  ].map((item) => (
    <li key={item.label}>
      <Link
        href={item.href}
        className="no-underline text-[#5b3e37] hover:text-[#b57d69] text-sm md:text-base font-medium px-2 py-1.5 rounded-full hover:bg-[#fff] hover:ring-1 hover:ring-[#e7c7b6] transition"
      >
        {item.label}
      </Link>
    </li>
  ))}
</ul>
          </nav>
        </div>
      </section>

      {/* Contenu de la page ici */}
      <div className="mx-auto max-w-6xl px-4 py-12" />
    </main>
  );
}
