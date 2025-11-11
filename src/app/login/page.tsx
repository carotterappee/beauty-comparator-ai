"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // + redirection

export default function LoginPage() {
  const router = useRouter(); // hook router
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu pourras brancher ton auth (Supabase/Firebase/NextAuth, etc.)
    setSubmitted(true);

    // Redirection auto vers l'accueil après 1,2 s
    setTimeout(() => {
      router.replace("/");
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#fdf8f9] flex items-center justify-center py-12 px-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_28px_rgba(181,125,105,0.15)] ring-1 ring-[#e8cfc3]/60 max-w-md w-full p-8">
        {submitted ? (
          <div className="text-center text-[#5b3e37]">
            <h2 className="text-2xl font-semibold mb-2">Bienvenue ✨</h2>
            <p className="opacity-80">Connexion réussie.</p>
          </div>
        ) : (
          <>
            <h1
              className="text-3xl font-semibold text-center text-[#5b3e37] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Se connecter
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-[#5b3e37]/80">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={form.remember}
                    onChange={handleChange}
                    className="rounded border-[#e8cfc3] text-[#b57d69] focus:ring-[#b57d69]"
                  />
                  Se souvenir de moi
                </label>

                <Link
                  href="/mot-de-passe-oublie"
                  className="text-[#b57d69] hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full rounded-full py-2.5 bg-[#b57d69] text-white font-medium shadow-[0_4px_12px_rgba(181,125,105,0.25)] hover:brightness-105 transition"
              >
                Se connecter
              </button>
            </form>

            <p className="text-center text-sm text-[#5b3e37]/70 mt-6">
              Pas encore de compte ?{" "}
              <Link href="/signup" className="text-[#b57d69] hover:underline font-medium">
                Créer un compte
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
