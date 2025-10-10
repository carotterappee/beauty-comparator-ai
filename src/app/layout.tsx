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
    url: "https://beauty-comparator-ai.vercel.app",
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

// 🎀 En-tête VelvetMind
import Header from "@/components/Header"; // ← renomme ton ancien VelvetHeader en Header

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} ${marcellus.variable}`}>
      <body className="bg-[#fdf8f9] text-[#3b2d2b] antialiased font-sans bg-silk">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
