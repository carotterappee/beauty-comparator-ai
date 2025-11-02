import type { Metadata } from "next";
import "./globals.css";
import HeroPanel from "@/components/header/HeroPanel";

export const metadata: Metadata = {
  title: "VelvetMind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      {/* donne un fond très léger pour voir la différence avec le dégradé */}
      <body className="bg-[#fdf8f9] text-[#3b2d2b] antialiased">
        <HeroPanel />
        <main>{children}</main>
      </body>
    </html>
  );
}
