// src/components/CategoryCard.tsx
import Link from "next/link";
// Si tu préfères <Image/>, décommente les 2 lignes suivantes et vois la note plus bas
// import Image from "next/image";
// import type { StaticImageData } from "next/image";

type Props = {
  title: string;
  href: string;
  subtitle?: string;
  image?: string; // ✅ on ajoute le prop image
};

export default function CategoryCard({ title, href, subtitle, image }: Props) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border bg-white/70 shadow-sm backdrop-blur transition hover:shadow-md"
    >
      {/* vignette */}
      {image ? (
        // variante simple avec <img> pour éviter toute config Next/Image
        <div className="aspect-[16/9] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gradient-to-br from-pink-100 to-purple-100" />
      )}

      {/* texte */}
      <div className="p-5">
        <h3 className="font-semibold tracking-wide">{title}</h3>
        {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
        <div className="mt-3 text-pink-600">Découvrir →</div>
      </div>
    </Link>
  );
}
