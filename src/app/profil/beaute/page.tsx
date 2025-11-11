"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Beauty = {
  allergies: string;            // champ texte -> séparé par des virgules
  ingredients_avoid: string;
  skin_concerns: string;
  hair_concerns: string;
  medical_conditions: string;
  notes: string;
};

function splitCSV(s: string) {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

export default function BeautyProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [b, setB] = useState<Beauty>({
    allergies: "",
    ingredients_avoid: "",
    skin_concerns: "",
    hair_concerns: "",
    medical_conditions: "",
    notes: "",
  });

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login"); return; }

      const { data, error } = await supabase
        .from("beauty_profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) setErr(error.message);
      if (data) {
        setB({
          allergies: (data as any).allergies?.join(", ") ?? "",
          ingredients_avoid: (data as any).ingredients_avoid?.join(", ") ?? "",
          skin_concerns: (data as any).skin_concerns?.join(", ") ?? "",
          hair_concerns: (data as any).hair_concerns?.join(", ") ?? "",
          medical_conditions: (data as any).medical_conditions?.join(", ") ?? "",
          notes: (data as any).notes ?? "",
        });
      }
      setLoading(false);
    })();
  }, [router]);

  const save = async () => {
    setSaving(true); setErr(null); setMsg(null);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const payload = {
      id: user.id,
      allergies: splitCSV(b.allergies),
      ingredients_avoid: splitCSV(b.ingredients_avoid),
      skin_concerns: splitCSV(b.skin_concerns),
      hair_concerns: splitCSV(b.hair_concerns),
      medical_conditions: splitCSV(b.medical_conditions),
      notes: b.notes || null,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("beauty_profiles").upsert(payload);
    setSaving(false);
    if (error) { setErr(error.message); return; }
    setMsg("Profil beauté enregistré ✅");
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
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-[0_8px_28px_rgba(181,125,105,0.15)] ring-1 ring-[#e8cfc3]/60 max-w-3xl w-full p-8 text-[#5b3e37]">
        <h1 className="text-3xl font-semibold mb-2 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
          Mon profil beauté
        </h1>
        <p className="text-center opacity-80 mb-6 text-sm">
          Ajoute des éléments séparés par des virgules (ex. <em>parfum, alcool dénaturé</em>).
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm mb-1 opacity-80">Allergies (produits/ingrédients)</label>
            <input
              value={b.allergies}
              onChange={(e) => setB({ ...b, allergies: e.target.value })}
              placeholder="ex. parfum, nickel, linalool"
              className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 opacity-80">Ingrédients à éviter</label>
            <input
              value={b.ingredients_avoid}
              onChange={(e) => setB({ ...b, ingredients_avoid: e.target.value })}
              placeholder="ex. SLS, alcool dénaturé, silicones lourds"
              className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 opacity-80">Préoccupations peau</label>
            <input
              value={b.skin_concerns}
              onChange={(e) => setB({ ...b, skin_concerns: e.target.value })}
              placeholder="ex. acné, taches, rougeurs, déshydratation"
              className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 opacity-80">Préoccupations cheveux</label>
            <input
              value={b.hair_concerns}
              onChange={(e) => setB({ ...b, hair_concerns: e.target.value })}
              placeholder="ex. pellicules, cuir chevelu sensible, casse"
              className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1 opacity-80">Conditions médicales pertinentes</label>
            <input
              value={b.medical_conditions}
              onChange={(e) => setB({ ...b, medical_conditions: e.target.value })}
              placeholder="ex. dermatite, rosacée, psoriasis"
              className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1 opacity-80">Notes (optionnel)</label>
            <textarea
              value={b.notes}
              onChange={(e) => setB({ ...b, notes: e.target.value })}
              rows={4}
              placeholder="Autres infos utiles pour adapter les recommandations."
              className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 focus:ring-2 focus:ring-[#b57d69] outline-none"
            />
          </div>
        </div>

        {err && <p className="text-sm text-red-600 mt-4">{err}</p>}
        {msg && <p className="text-sm text-green-700 mt-4">{msg}</p>}

        <div className="mt-6 flex gap-3">
          <button
            onClick={save}
            disabled={saving}
            className="rounded-full px-4 py-2 bg-[#b57d69] text-white font-medium shadow-[0_4px_12px_rgba(181,125,105,0.25)] hover:brightness-105 disabled:opacity-60"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
          <button
            onClick={() => router.push("/profil")}
            className="rounded-full px-4 py-2 bg-white/80 ring-1 ring-[#e8cfc3] hover:bg-white"
          >
            Retour au profil
          </button>
        </div>
      </div>
    </main>
  );
}
