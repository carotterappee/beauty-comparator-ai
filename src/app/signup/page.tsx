"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation"; // +++ AJOUT

export default function SignupPage() {
  const router = useRouter(); // +++ AJOUT
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { name: form.name },
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/login`
            : undefined,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSubmitted(true);

    // +++ AJOUT : redirection automatique vers /login après 1,5 s
    setTimeout(() => {
      router.replace("/login");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#fdf8f9] flex items-center justify-center py-12 px-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_28px_rgba(181,125,105,0.15)] ring-1 ring-[#e8cfc3]/60 max-w-md w-full p-8">
        {submitted ? (
          <div className="text-center text-[#5b3e37]">
            <h2 className="text-2xl font-semibold mb-2">Bienvenue ! 💫</h2>
            <p className="opacity-80">
              Un email de confirmation t’a été envoyé. Redirection vers la
              connexion…
            </p>
          </div>
        ) : (
          <>
            <h1
              className="text-3xl font-semibold text-center text-[#5b3e37] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Créer un compte
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#5b3e37]/80 mb-1">
                  Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5b3e37]/80 mb-1">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#5b3e37]/80 mb-1">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none transition"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full py-2.5 bg-[#b57d69] text-white font-medium shadow-[0_4px_12px_rgba(181,125,105,0.25)] hover:brightness-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Création..." : "Créer mon compte"}
              </button>
            </form>

            <p className="text-center text-sm text-[#5b3e37]/70 mt-6">
              Déjà inscrite ?{" "}
              <a
                href="/login"
                className="text-[#b57d69] hover:underline font-medium"
              >
                Se connecter
              </a>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
