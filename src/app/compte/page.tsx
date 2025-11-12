"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type Mode = "login" | "signup" | "sent";

export default function ComptePage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  // Si déjà connecté : on va directement sur /profil
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      if (session?.user) {
        router.replace("/profil");
      } else {
        setLoading(false);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) router.replace("/profil");
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setWorking(true); setErr(null); setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setWorking(false);
    if (error) {
      if (/Invalid login credentials/i.test(error.message)) {
        setErr("Identifiants incorrects.");
        setMsg("Pas de compte ? Créez-le en un clic ci-dessous.");
      } else if (/Email not confirmed/i.test(error.message)) {
        setErr("E-mail non confirmé. Vérifiez votre boîte mail.");
      } else {
        setErr(error.message);
      }
      return;
    }
    router.replace("/profil");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setWorking(true); setErr(null); setMsg(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/login` : undefined,
      },
    });
    setWorking(false);
    if (error) { setErr(error.message); return; }
    setMode("sent");
    setMsg("Un e-mail de confirmation vous a été envoyé. Cliquez sur le lien puis connectez-vous.");
    setTimeout(() => router.replace("/login"), 1800);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fdf8f9] flex items-center justify-center">
        <div className="text-[#5b3e37]">Chargement…</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdf8f9] flex items-center justify-center py-12 px-6">
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_28px_rgba(181,125,105,0.15)] ring-1 ring-[#e8cfc3]/60 max-w-md w-full p-8 text-[#5b3e37]">
        <h1 className="text-3xl font-semibold text-center mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
          Mon compte
        </h1>

        {mode === "sent" ? (
          <p className="text-center opacity-80">{msg}</p>
        ) : (
          <>
            {/* Formulaires sans doublons de boutons en haut */}
            {mode === "login" && (
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm mb-1 opacity-80">Adresse e-mail</label>
                  <input
                    type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}
                    className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 opacity-80">Mot de passe</label>
                  <input
                    type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}
                    className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
                  />
                </div>

                {err && <p className="text-sm text-red-600 -mt-2">{err}</p>}
                {msg && <p className="text-sm text-[#6b4a3f] -mt-2">{msg}</p>}

                <button
                  type="submit"
                  disabled={working}
                  className="w-full rounded-full py-2.5 bg-[#b57d69] text-white font-medium shadow-[0_4px_12px_rgba(181,125,105,0.25)] hover:brightness-105 transition disabled:opacity-60"
                >
                  {working ? "Connexion…" : "Se connecter"}
                </button>

                <p className="text-center text-sm mt-4">
                  <Link href="/mot-de-passe-oublie" className="text-[#b57d69] hover:underline">Mot de passe oublié ?</Link>
                </p>

                <p className="text-center text-sm opacity-80 mt-2">
                  Pas de compte ?{" "}
                  <button type="button" onClick={()=>setMode("signup")} className="text-[#b57d69] underline">
                    Créer un compte
                  </button>
                </p>
              </form>
            )}

            {mode === "signup" && (
              <form onSubmit={handleSignup} className="space-y-5">
                <div>
                  <label className="block text-sm mb-1 opacity-80">Nom (optionnel)</label>
                  <input
                    value={name} onChange={(e)=>setName(e.target.value)}
                    className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 opacity-80">Adresse e-mail</label>
                  <input
                    type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}
                    className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 opacity-80">Mot de passe</label>
                  <input
                    type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}
                    className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
                  />
                </div>

                {err && <p className="text-sm text-red-600 -mt-2">{err}</p>}
                {msg && <p className="text-sm text-[#6b4a3f] -mt-2">{msg}</p>}

                <button
                  type="submit"
                  disabled={working}
                  className="w-full rounded-full py-2.5 bg-[#b57d69] text-white font-medium shadow-[0_4px_12px_rgba(181,125,105,0.25)] hover:brightness-105 transition disabled:opacity-60"
                >
                  {working ? "Création…" : "Créer mon compte"}
                </button>

                <p className="text-center text-sm opacity-80 mt-2">
                  Déjà inscrit ?{" "}
                  <button type="button" onClick={()=>setMode("login")} className="text-[#b57d69] underline">
                    Se connecter
                  </button>
                </p>
              </form>
            )}
          </>
        )}
      </div>
    </main>
  );
}
