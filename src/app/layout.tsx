import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// 🧠 Bloc SEO + OpenGraph + Twitter
export const metadata = {
  title: "Beauty Comparator AI - Comparateur de produits beauté",
  description:
    "Avis, comparatifs, tendances TikTok/YouTube et recommandations personnalisées.",
  themeColor: "#ec4899",
  openGraph: {
    title: "Beauty Comparator AI",
    description:
      "Avis, comparatifs, tendances TikTok/YouTube et recommandations personnalisées.",
    url: "https://<ton-domaine-vercel>", // à remplacer par ton vrai domaine
    siteName: "Beauty Comparator AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beauty Comparator AI",
    description:
      "Avis, comparatifs, tendances TikTok/YouTube et recommandations personnalisées.",
  },
};

export const viewport = {
  title: "Beauty Comparator AI",
  description: "Comparateur intelligent de produits beauté (peau, cheveux).",
  themeColor: "#ec4899",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-pink-600">
              Beauty Comparator AI
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="hover:underline">Accueil</Link>
              <Link href="/products" className="hover:underline">Produits</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
