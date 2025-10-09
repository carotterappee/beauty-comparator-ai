"use client";

import Image from "next/image";
import Link from "next/link";

export default function VelvetHeader() {
  return (
    <header className="relative z-50 w-full">
      {/* ruban satin rose très léger */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_400px_at_50%_0%,#f6d9d9_0%,#f7e7e7_35%,#fbf5f6_60%,#fff_100%)]"
      />
      {/* fine bordure bas */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-px bg-black/10" />

      <div className="mx-auto max-w-6xl px-4 py-4">
        <Link
          href="/"
          className="group flex items-center gap-3 text-inherit no-underline"
          aria-label="VelvetMind — Accueil"
        >
          {/* Monogramme (fallback si absent) */}
          <div className="relative h-9 w-9 shrink-0 rounded-full ring-1 ring-black/10 bg-white/70 backdrop-blur">
            <Image
              src="/branding/logo.svg"
              alt="Logo VelvetMind"
              fill
              sizes="36px"
              className="object-contain p-1.5 opacity-90 group-hover:opacity-100 transition"
              onError={(e) => {
                // fallback minimal : VM
                (e.currentTarget as any).style.display = "none";
              }}
            />
            <span className="absolute inset-0 grid place-items-center text-[11px] font-semibold text-neutral-700">
              VM
            </span>
          </div>

          {/* Wordmark (fallback si absent) */}
          <div className="relative h-8 md:h-9">
            <Image
              src="/branding/wordmark.svg"
              alt="VelvetMind"
              width={220}
              height={36}
              className="h-full w-auto select-none opacity-95 group-hover:opacity-100 transition"
              onError={(e) => {
                (e.currentTarget as any).style.display = "none";
              }}
            />
            <span className="absolute left-0 top-1/2 -translate-y-1/2 hidden font-[var(--font-playfair,ui-serif)] text-2xl tracking-wide text-neutral-800 md:inline">
              VelvetMind
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
