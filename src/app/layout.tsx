import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        {children}
        <Footer />  {/* ← ajout ici */}
      </body>
    </html>
  );
}
