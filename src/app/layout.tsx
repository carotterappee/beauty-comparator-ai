import type { Metadata } from "next";
import Header from "@/components/Header";   // ✅ import DEFAULT
import "./globals.css";

export const metadata: Metadata = {
  title: "VelvetMind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-[#fdf8f9] text-[#3b2d2b] antialiased">
        <Header /> {/* ✅ maintenant défini */}
        <main>{children}</main>
      </body>
    </html>
  );
}
