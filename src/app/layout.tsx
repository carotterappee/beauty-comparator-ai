import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Beauty Comparator AI",
  description: "Comparateur intelligent de produits beauté",
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
