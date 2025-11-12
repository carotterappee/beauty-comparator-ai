"use client";
import { useAuth } from "@/lib/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/lib/AuthProvider";

export default function Header() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <header className="relative w-full h-[300px] md:h-[340px] bg-[#f7eaf2] flex flex-col items-center justify-center shadow-[0_8px_24px_rgba(181,125,105,0.08)]">
      {/* Actions top-right */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "40px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* NON CONNECTÉ → 2 boutons */}
        {!user && (
          <>
            <Link
              href="/login"
              style={{
                borderRadius: "999px",
                padding: "6px 14px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#6b4a3f",
                background: "rgba(255,255,255,0.8)",
                border: "1px solid #e7c7b6",
                boxShadow: "0 2px 6px rgba(181,125,105,0.15)",
              }}
            >
              Se connecter
            </Link>
            <Link
              href="/signup"
              style={{
                borderRadius: "999px",
                padding: "6px 14px",
                fontSize: "14px",
                fontWeight: 500,
                color: "#fff",
                background: "#b57d69",
                boxShadow: "0 4px 12px rgba(181,125,105,0.25)",
              }}
            >
              Créer un compte
            </Link>
          </>
        )}

        {/* CONNECTÉ → 1 bouton */}
        {user && (
          <button
            onClick={() => router.push("/profil")}
            style={{
              borderRadius: "999px",
              padding: "6px 14px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#6b4a3f",
              background: "rgba(255,255,255,0.8)",
              border: "1px solid #e7c7b6",
              boxShadow: "0 2px 6px rgba(181,125,105,0.15)",
              cursor: "pointer",
            }}
          >
            Mon profil
          </button>
        )}
      </div>

      {/* Titre central */}
      <h1
        className="text-[44px] md:text-[58px] lg:text-[64px] tracking-[0.14em] text-[#5b3e37] select-none"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        VELVETMIND
      </h1>
    </header>
  );
}
