// src/components/CategoryCard.tsx
"use client";

import Link from "next/link";

type Props = {
  title: string;
  href: string;
  subtitle?: string;
  image?: string;
};

export default function CategoryCard({ title, href, subtitle, image }: Props) {
  return (
    <Link
      href={href}
      className="
        group block overflow-hidden
        rounded-[28px]
        bg-[radial-gradient(120%_100%_at_10%_0%,#f6e4dc_0%,#efd4c3_40%,#f8e8e1_100%)]
        ring-1 ring-[#e8cfc3]/70
        shadow-[0_12px_40px_rgba(181,125,105,0.15)]
        hover:shadow-[0_16px_45px_rgba(181,125,105,0.18)]
        transition-all duration-300 ease-out
        backdrop-blur-sm
      "
    >
      {/* Image d’arrière-plan si fournie */}
      {image ? (
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-[28px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdf8f9e8] via-[#fdf8f950] to-transparent" />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gradient-to-br from-pink-100 to-[#f8e8e1]" />
      )}

      {/* Bloc texte */}
      <div className="p-6 md:p-8 text-center">
        <h3
          className="
            text-[#5c3f36]
            text-xl md:text-2xl font-semibold tracking-wide
            transition-colors duration-200
            group-hover:text-[#b57d69]
          "
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h3>

        {subtitle && (
          <p
            className="mt-2 text-sm text-[#8b6c60]/90"
            style={{ fontFamily: "Marcellus, serif" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}
