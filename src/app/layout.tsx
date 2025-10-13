import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header"; // <-- bien importer l'index du dossier header

export const metadata: Metadata = {
  title: "VelvetMind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      {/* donne un fond très léger pour voir la différence avec le dégradé */}
      <body className="bg-[#fdf8f9] text-[#3b2d2b] antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
