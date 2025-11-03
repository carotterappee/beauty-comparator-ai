"use client";

import SubHeader from "@/components/SubHeader"; // ⬅️ on branche le sous-header

export default function Home() {
  return (
    <main className="relative min-h-[90vh] bg-[#fdf8f9]">
      {/* arrière-plan soyeux du main (on garde) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-300/40 to-violet-300/40 blur-3xl animate-glow" />
      </div>

      {/* 👉 Sous-header : menu vertical + barre de recherche translucide */}
      <SubHeader />

      {/* zone de contenu de ta page */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* ton contenu arrive ici */}
      </div>
    </main>
  );
}
