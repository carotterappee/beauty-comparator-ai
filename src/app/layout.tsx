import Link from "next/link";
import "./globals.css";
import { Inter, Playfair_Display, Marcellus } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});
const marcellus = Marcellus({
  subsets: ["latin"],
  variable: "--font-marcellus",
  weight: "400",
});

// 🧠 Bloc SEO + OpenGraph + Twitter
export const metadata = {
  title: "VELVETMIND — Beauty meets intelligence",
  description:
    "Comparateur intelligent de produits beauté : skincare, haircare, body care & makeup.",
  themeColor: "#ec4899",
  openGraph: {
    title: "VELVETMIND",
    description:
      "Comparateur intelligent de produits beauté : skincare, haircare, body care & makeup.",
    url: "https://beauty-comparator-ai.vercel.app", // ← remplace si tu as un domaine custom
    siteName: "VELVETMIND",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VELVETMIND — Beauty meets intelligence",
    description:
      "Comparateur intelligent de produits beauté : skincare, haircare, body care & makeup.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ec4899",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${playfair.variable} ${marcellus.variable}`}>
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
          <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
            <Link
  href="/"
  className="text-pink-600"
  style={{ fontFamily: "var(--font-playfair)", fontWeight: 700, letterSpacing: ".5px" }}
>
  VELVETMIND
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
