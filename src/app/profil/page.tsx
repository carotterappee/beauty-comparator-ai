"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Profile = {
  name: string;
  age: number | "";
  country: string;
  language: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [p, setP] = useState<Profile>({ name: "", age: "", country: "FR", language: "fr" });

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace("/login");
        return;
      }
      setEmail(user.email || "");

      // fetch profile
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) setErr(error.message);
      if (data) {
        setP({
          name: (data as any).name ?? "",
          age: (data as any).age ?? "",
          country: (data as any).country ?? "FR",
          language: (data as any).language ?? "fr",
        });
      }
      setLoading(false);
    })();
  }, [router]);

  const saveProfile = async () => {
    setSaving(true); setErr(null); setMsg(null);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const payload = {
      id: user.id,
      name: p.name || null,
      age: p.age === "" ? null : Number(p.age),
      country: p.country || null,
      language: p.language || null,
      updated_at: new Date().toISOString(),
    };

    // upsert
    const { error } = await supabase.from("profiles").upsert(payload);
    setSaving(false);
    if (error) { setErr(error.message); return; }
    setMsg("Profil enregistré ✅");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const sendPasswordReset = async () => {
    setMsg(null); setErr(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== "undefined" ? `${window.location.origin}/login` : undefined,
    });
    if (error) setErr(error.message);
    else setMsg("Email de réinitialisation envoyé ✉️");
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
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_28px_rgba(181,125,105,0.15)] ring-1 ring-[#e8cfc3]/60 max-w-xl w-full p-8 text-[#5b3e37]">
        <h1 className="text-3xl font-semibold mb-6 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          Mon profil
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm mb-1 opacity-80">Email (lecture seule)</label>
            <input value={email} disabled className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/60" />
          </div>
          <div>
            <label className="block text-sm mb-1 opacity-80">Nom</label>
            <input
              value={p.name}
              onChange={(e) => setP({ ...p, name: e.target.value })}
              className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 opacity-80">Âge</label>
            <input
              type="number" min={0} max={120}
              value={p.age}
              onChange={(e) => setP({ ...p, age: e.target.value === "" ? "" : Number(e.target.value) })}
              className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm mb-1 opacity-80">Pays</label>
            <select
              value={p.country}
              onChange={(e) => setP({ ...p, country: e.target.value })}
              className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
            >
              <option value="FR">France</option>
              <option value="BE">Belgique</option>
              <option value="CH">Suisse</option>
              <option value="CA">Canada</option>
              <option value="MA">Maroc</option>
              <option value="TN">Tunisie</option>
              <option value="DZ">Algérie</option>
              <option value="other">Autre…</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1 opacity-80">Langue du site</label>
            <select
              value={p.language}
              onChange={(e) => setP({ ...p, language: e.target.value })}
              className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        {err && <p className="text-sm text-red-600 mb-3">{err}</p>}
        {msg && <p className="text-sm text-green-700 mb-3">{msg}</p>}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={saveProfile}
            disabled={saving}
            className="rounded-full px-4 py-2 bg-[#b57d69] text-white font-medium shadow-[0_4px_12px_rgba(181,125,105,0.25)] hover:brightness-105 disabled:opacity-60"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
          <button
            onClick={sendPasswordReset}
            className="rounded-full px-4 py-2 bg-white/80 ring-1 ring-[#e8cfc3] hover:bg-white"
          >
            Changer le mot de passe
          </button>
          <button
            onClick={() => router.push("/profil/beaute")}
            className="rounded-full px-4 py-2 bg-white/80 ring-1 ring-[#e8cfc3] hover:bg-white"
          >
            Ouvrir mon profil beauté
          </button>
          <button
            onClick={logout}
            className="ml-auto rounded-full px-4 py-2 bg-white/80 ring-1 ring-[#e8cfc3] hover:bg-white"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </main>
  );
}
