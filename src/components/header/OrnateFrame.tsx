// src/components/header/OrnateFrame.tsx
"use client";

export default function OrnateFrame() {
  return (
    <div
      aria-hidden
      className="
        pointer-events-none absolute inset-0 -z-10
        bg-[url('/velvetmind/fond-en-tete.svg')]
        bg-no-repeat bg-top bg-cover
      "
    />
  );
}
