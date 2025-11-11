"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo:
        typeof window !== "undefined"
          ? `${window.location.origin}/login`
          : undefined,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSent(true);

    // ✅ Redirection automatique après 1,8 seconde
    setTimeout(() => {
      router.replace("/login");
    }, 1800);
  };

  return (
    <main className="min-h-screen bg-[#fdf8f9] flex items-center justify-center py-12 px-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_28px_rgba(181,125,105,0.15)] ring-1 ring-[#e8cfc3]/60 max-w-md w-full p-8 text-[#5b3e37]">
        {sent ? (
          <div className="text-center">
            <h1
              className="text-2xl font-semibold mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Email envoyé ✨
            </h1>
            <p className="opacity-80">
              Si un compte existe pour <strong>{email}</strong>, tu recevras un
              lien pour réinitialiser ton mot de passe.
            </p>
          </div>
        ) : (
          <>
            <h1
              className="text-3xl font-semibold text-center mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Mot de passe oublié
            </h1>
            <p className="text-center text-sm opacity-80 mb-6">
              Entre ton adresse e-mail pour recevoir un lien de réinitialisation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#5b3e37]/80 mb-1">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none transition"
                  placeholder="nom@exemple.com"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full py-2.5 bg-[#b57d69] text-white font-medium shadow-[0_4px_12px_rgba(181,125,105,0.25)] hover:brightness-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Envoi..." : "Envoyer le lien"}
              </button>
            </form>

            <p className="text-center text-sm mt-6">
              <Link
                href="/login"
                className="text-[#b57d69] hover:underline font-medium"
              >
                Revenir à la connexion
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
