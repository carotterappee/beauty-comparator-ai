"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

/* ===========================
   Données (listes étendues)
=========================== */
const COUNTRIES = ["France", "Belgique", "Suisse", "Canada", "Autre"];
const LANGS = ["Français", "English", "Español", "Deutsch", "Italiano"];
const SKIN_TYPES = ["Sèche", "Normale", "Mixte", "Grasse", "Sensible"];

const SKIN_CONCERNS = [
  "Acné inflammatoire","Acné comédonienne (points noirs)","Points blancs (milia)",
  "Pores dilatés","Excès de sébum","Peau déshydratée","Peau sèche qui pèle",
  "Rougeurs diffuses","Couperose / petits vaisseaux","Rosacée",
  "Taches pigmentaires (UV)","Mélasma","Marques post-acné",
  "Teint terne","Texture irrégulière","Rides / ridules","Perte de fermeté / élasticité",
  "Irritation / brûlure","Eczéma / dermatite atopique","Dermatite péribuccale",
  "Dermite séborrhéique (zones grasses)","Sensibilité / réactivité élevée",
];

const FACIAL_CONCERNS = [
  "Cernes bleutés","Cernes pigmentaires","Poches",
  "Lèvres sèches / gercées","Contour des yeux sensible",
  "Relâchement bas du visage","Double menton",
  "Taches autour de la bouche","Irritations ailes du nez","Grains de milium",
];

const HAIR_TYPES = ["Raide","Ondulé","Bouclé","Crépu"];
const HAIR_TEXTURE = ["Fin","Moyen","Épais"];

const SCALP_ISSUES = [
  "Pellicules sèches","Pellicules grasses","Démangeaisons","Irritations / brûlures",
  "Dermite séborrhéique","Cuir chevelu sensible","Excès de sébum",
  "Regraissage rapide","Chute diffuse","Post-partum","Saisonnière","Stress",
  "Plaques / croûtes","Psoriasis du cuir chevelu",
];

const ALLERGENS = [
  // actifs
  "Niacinamide","Rétinol","Rétinal","Acide salicylique (BHA)",
  "Acide glycolique (AHA)","Acide lactique (AHA)","Acide mandélique (AHA)",
  "Vitamine C (acide L-ascorbique)","SAP (Sodium Ascorbyl Phosphate)",
  "MAP (Magnesium Ascorbyl Phosphate)","AA2G",
  // filtres solaires
  "Oxybenzone","Octocrylene","Avobenzone","Homosalate","Octisalate","Octinoxate",
  "Tinosorb S (Bemotrizinol)","Tinosorb M (Bisoctrizole)",
  // conservateurs
  "Phenoxyethanol","Parabens","MI (Methylisothiazolinone)","MCI (Methylchloroisothiazolinone)",
  // tensioactifs/solvants
  "Sodium Lauryl Sulfate (SLS)","Sodium Laureth Sulfate (SLES)","Alcohol Denat.",
  // parfums/HE (allergènes UE)
  "Limonene","Linalool","Citral","Cinnamal","Coumarin","Eugenol","Geraniol","Citronellol","Farnesol",
  "Parfum / Fragrance","Huiles essentielles",
  // autres
  "Propolis / Miel","Lanoline","Cocamidopropyl Betaine",
];

/* ===========================
   Types
=========================== */
type Profile = {
  name: string;
  age: number | null;
  country: string;
  lang: string;
};

type Beauty = {
  skin_type: string;
  skin_concerns: string[];
  facial_concerns: string[];   // NEW
  allergies: string[];         // CHANGED: array (tags + autocomplétion)
  hair_type: string;
  hair_texture: string;
  scalp_issues: string[];
  colored: boolean;
  color_type: string;
  color_frequency: string;
  color_since: string | null;  // yyyy-mm-dd
  straightened: boolean;
  straightening_method: string;
  straightening_since: string | null;
  notes: string;
};

/* ===========================
   Autocomplete + Tags (Allergies)
=========================== */
function AutocompleteTags({
  value, onChange, suggestions, placeholder = "Tape et sélectionne…",
}: {
  value: string[];
  onChange: (next: string[]) => void;
  suggestions: string[];
  placeholder?: string;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return suggestions.slice(0, 8);
    return suggestions.filter(v => v.toLowerCase().includes(s)).slice(0, 8);
  }, [q, suggestions]);

  const add = (item: string) => {
    const next = value.includes(item) ? value : [item, ...value];
    onChange(next);
    setQ("");
    setOpen(false);
  };

  const remove = (item: string) => onChange(value.filter(v => v !== item));

  return (
    <div className="relative">
      {value.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-2">
          {value.map(t => (
            <span key={t} className="inline-flex items-center gap-2 text-sm px-2 py-1 rounded-full ring-1 ring-[#e8cfc3] bg-white/70">
              {t}
              <button onClick={() => remove(t)} aria-label="Retirer">×</button>
            </span>
          ))}
        </div>
      )}

      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none focus:ring-2 focus:ring-[#b57d69]"
      />

      {open && list.length > 0 && (
        <div
          onMouseDown={(e) => e.preventDefault()} // évite le blur
          className="absolute z-10 mt-1 w-full max-h-56 overflow-auto rounded-xl bg-white shadow-[0_12px_24px_rgba(0,0,0,0.08)] ring-1 ring-[#e8cfc3]"
        >
          {list.map(s => (
            <button key={s} onClick={() => add(s)} className="w-full text-left px-3 py-2 hover:bg-[#fff6f4]">
              {s}
            </button>
          ))}
          {q && !suggestions.some(v => v.toLowerCase() === q.trim().toLowerCase()) && (
            <button onClick={() => add(q.trim())} className="w-full text-left px-3 py-2 text-[#b57d69] border-t border-[#f1ddcf]">
              Ajouter “{q.trim()}”
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ===========================
   Page
=========================== */
export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [uid,   setUid]   = useState<string | null>(null);

  const [tab, setTab] = useState<"compte" | "beaute">("compte");

  const [p, setP] = useState<Profile>({
    name: "", age: null, country: "France", lang: "Français",
  });

  const [b, setB] = useState<Beauty>({
    skin_type: "", skin_concerns: [], facial_concerns: [], allergies: [],
    hair_type: "", hair_texture: "", scalp_issues: [],
    colored: false, color_type: "", color_frequency: "", color_since: null,
    straightened: false, straightening_method: "", straightening_since: null,
    notes: "",
  });

  // chargement initial
  useEffect(() => {
    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      const user = sess.session?.user;
      if (!user) { router.replace("/compte"); return; }
      setUserEmail(user.email ?? null);
      setUid(user.id);

      // profile
      const { data: prof } = await supabase
        .from("profiles")
        .select("name, age, country, lang")
        .eq("id", user.id)
        .maybeSingle();

      if (prof) {
        setP({
          name: prof.name ?? "", age: prof.age ?? null,
          country: prof.country ?? "France", lang: prof.lang ?? "Français",
        });
      }

      // beauty
      const { data: bp } = await supabase
        .from("beauty_profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (bp) {
        setB({
          skin_type: bp.skin_type ?? "",
          skin_concerns: bp.skin_concerns ?? [],
          facial_concerns: bp.facial_concerns ?? [], // si colonne absente, restera []
          allergies: bp.allergies ?? [],
          hair_type: bp.hair_type ?? "",
          hair_texture: bp.hair_texture ?? "",
          scalp_issues: bp.scalp_issues ?? [],
          colored: bp.colored ?? false,
          color_type: bp.color_type ?? "",
          color_frequency: bp.color_frequency ?? "",
          color_since: bp.color_since ?? null,
          straightened: bp.straightened ?? false,
          straightening_method: bp.straightening_method ?? "",
          straightening_since: bp.straightening_since ?? null,
          notes: bp.notes ?? "",
        });
      }

      setLoading(false);
    };
    init();
  }, [router]);

  const saveCompte = async () => {
    if (!uid) return;
    await supabase.from("profiles").upsert({
      id: uid, name: p.name || null, age: p.age ?? null,
      country: p.country || null, lang: p.lang || null,
      updated_at: new Date().toISOString(),
    });
  };

  const saveBeaute = async () => {
    if (!uid) return;
    await supabase.from("beauty_profiles").upsert({
      user_id: uid, ...b, updated_at: new Date().toISOString(),
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  const Title = ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-semibold text-center mb-6 text-[#5b3e37]"
        style={{ fontFamily: "'Playfair Display', serif" }}>
      {children}
    </h1>
  );

  const Field = ({ label, children }:{label:string;children:React.ReactNode}) => (
    <label className="block">
      <span className="block text-sm mb-1 opacity-80">{label}</span>
      {children}
    </label>
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fdf8f9] flex items-center justify-center">
        <div className="text-[#5b3e37]">Chargement…</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdf8f9]">
      <div className="mx-auto max-w-5xl px-4 py-10">

        {/* barre */}
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 text-[#5b3e37] hover:text-[#b57d69]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12L12 3l9 9" /><path d="M9 21V9h6v12" />
            </svg>
            Accueil
          </Link>
          <button onClick={logout} className="rounded-full px-4 py-2 bg-white/80 ring-1 ring-[#e8cfc3] hover:bg-white">
            Se déconnecter
          </button>
        </div>

        {/* carte */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl ring-1 ring-[#e8cfc3]/60 shadow-[0_8px_28px_rgba(181,125,105,0.12)] p-6 md:p-8">
          <Title>Mon profil</Title>

          {/* onglets */}
          <div className="mx-auto mb-6 flex w-full max-w-md items-center justify-center gap-2">
            <button onClick={() => setTab("compte")}
              className={`px-4 py-2 rounded-full ring-1 ring-[#e8cfc3] ${tab==="compte"?"bg-white":"bg-white/70"}`}>
              Compte
            </button>
            <button onClick={() => setTab("beaute")}
              className={`px-4 py-2 rounded-full ring-1 ring-[#e8cfc3] ${tab==="beaute"?"bg-white":"bg-white/70"}`}>
              Beauté
            </button>
          </div>

          {tab === "compte" ? (
            <form onSubmit={async (e)=>{e.preventDefault();await saveCompte();}}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Email (lecture seule)">
                <input value={userEmail ?? ""} readOnly
                  className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-[#faf6f6] text-[#5b3e37] outline-none"/>
              </Field>

              <Field label="Nom">
                <input value={p.name} onChange={e=>setP({...p,name:e.target.value})}
                  className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none focus:ring-2 focus:ring-[#b57d69]"/>
              </Field>

              <Field label="Âge">
                <input type="number" min={0} max={120} value={p.age ?? ""}
                  onChange={e=>setP({...p,age:e.target.value?Number(e.target.value):null})}
                  className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none focus:ring-2 focus:ring-[#b57d69]"/>
              </Field>

              <Field label="Pays">
                <select value={p.country} onChange={e=>setP({...p,country:e.target.value})}
                  className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none">
                  {COUNTRIES.map(c=><option key={c}>{c}</option>)}
                </select>
              </Field>

              <Field label="Langue du site">
                <select value={p.lang} onChange={e=>setP({...p,lang:e.target.value})}
                  className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none">
                  {LANGS.map(l=><option key={l}>{l}</option>)}
                </select>
              </Field>

              <div className="md:col-span-2 flex justify-end">
                <button type="submit"
                  className="rounded-full px-5 py-2.5 bg-[#b57d69] text-white font-medium shadow-[0_4px_12px_rgba(181,125,105,0.25)] hover:brightness-105">
                  Enregistrer
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={async (e)=>{e.preventDefault();await saveBeaute();}}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* PEAU */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-2 text-[#5b3e37]">Peau</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Type de peau">
                    <select value={b.skin_type} onChange={e=>setB({...b,skin_type:e.target.value})}
                      className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none">
                      <option value="">Sélectionner…</option>
                      {SKIN_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>

                  <Field label="Préoccupations (multi)">
                    <div className="flex flex-col gap-2 max-h-36 overflow-auto pr-1">
                      {SKIN_CONCERNS.map(c=>{
                        const checked=b.skin_concerns.includes(c);
                        return (
                          <label key={c} className="inline-flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e)=>{
                                const next=new Set(b.skin_concerns);
                                e.target.checked?next.add(c):next.delete(c);
                                setB({...b,skin_concerns:Array.from(next)});
                              }}
                            />
                            {c}
                          </label>
                        );
                      })}
                    </div>
                  </Field>

                  <Field label="Allergies / intolérances (auto-complétion + tags)">
                    <AutocompleteTags
                      value={b.allergies}
                      onChange={(next)=>setB({...b,allergies:next})}
                      suggestions={ALLERGENS}
                      placeholder="ex: NIA → Niacinamide, Linalool, Parfum…"
                    />
                  </Field>
                </div>
              </div>

              {/* VISAGE */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-2 text-[#5b3e37]">Visage (zones / symptômes)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label="Sélection (multi)">
                    <div className="flex flex-col gap-2 max-h-36 overflow-auto pr-1">
                      {FACIAL_CONCERNS.map(c=>{
                        const checked=b.facial_concerns.includes(c);
                        return (
                          <label key={c} className="inline-flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e)=>{
                                const next=new Set(b.facial_concerns);
                                e.target.checked?next.add(c):next.delete(c);
                                setB({...b,facial_concerns:Array.from(next)});
                              }}
                            />
                            {c}
                          </label>
                        );
                      })}
                    </div>
                  </Field>
                </div>
              </div>

              {/* CHEVEUX + CUIR CHEVELU */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-2 text-[#5b3e37]">Cheveux & Cuir chevelu</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Field label="Type de cheveux">
                    <select value={b.hair_type} onChange={e=>setB({...b,hair_type:e.target.value})}
                      className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none">
                      <option value="">Sélectionner…</option>
                      {HAIR_TYPES.map(t=><option key={t}>{t}</option>)}
                    </select>
                  </Field>

                  <Field label="Épaisseur / texture">
                    <select value={b.hair_texture} onChange={e=>setB({...b,hair_texture:e.target.value})}
                      className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none">
                      <option value="">Sélectionner…</option>
                      {HAIR_TEXTURE.map(t=><option key={t}>{t}</option>)}
                    </select>
                  </Field>

                  <Field label="Cuir chevelu (multi)">
                    <div className="flex flex-col gap-2 max-h-36 overflow-auto pr-1">
                      {SCALP_ISSUES.map(s=>{
                        const checked=b.scalp_issues.includes(s);
                        return (
                          <label key={s} className="inline-flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e)=>{
                                const next=new Set(b.scalp_issues);
                                e.target.checked?next.add(s):next.delete(s);
                                setB({...b,scalp_issues:Array.from(next)});
                              }}
                            />
                            {s}
                          </label>
                        );
                      })}
                    </div>
                  </Field>
                </div>

                {/* Coloration */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <Field label="Colorés ?">
                    <select value={b.colored?"oui":"non"} onChange={e=>setB({...b, colored:e.target.value==="oui"})}
                      className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none">
                      <option value="non">Non</option><option value="oui">Oui</option>
                    </select>
                  </Field>
                  <Field label="Type (si oui)">
                    <input value={b.color_type} onChange={e=>setB({...b,color_type:e.target.value})}
                      placeholder="balayage, ton sur ton, décoloration…"
                      className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none"/>
                  </Field>
                  <Field label="Fréquence">
                    <input value={b.color_frequency} onChange={e=>setB({...b,color_frequency:e.target.value})}
                      placeholder="toutes les 6–8 semaines…"
                      className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none"/>
                  </Field>
                  <Field label="Depuis quand">
                    <input type="date" value={b.color_since ?? ""} onChange={e=>setB({...b,color_since:e.target.value||null})}
                      className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none"/>
                  </Field>
                </div>

                {/* Lissage */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <Field label="Lissés / défrisés ?">
                    <select value={b.straightened?"oui":"non"} onChange={e=>setB({...b,straightened:e.target.value==="oui"})}
                      className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none">
                      <option value="non">Non</option><option value="oui">Oui</option>
                    </select>
                  </Field>
                  <Field label="Méthode">
                    <input value={b.straightening_method} onChange={e=>setB({...b,straightening_method:e.target.value})}
                      placeholder="kératine, japonais, défrisant…"
                      className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none"/>
                  </Field>
                  <Field label="Depuis quand">
                    <input type="date" value={b.straightening_since ?? ""} onChange={e=>setB({...b,straightening_since:e.target.value||null})}
                      className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none"/>
                  </Field>
                </div>
              </div>

              {/* NOTES */}
              <div className="md:col-span-2">
                <Field label="Notes personnelles / sensibilités supplémentaires">
                  <textarea rows={4} value={b.notes}
                    onChange={e=>setB({...b,notes:e.target.value})}
                    className="w-full rounded-lg border border-[#e8cfc3]/60 px-4 py-2 bg-white/70 outline-none"/>
                </Field>
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button type="submit"
                  className="rounded-full px-5 py-2.5 bg-[#b57d69] text-white font-medium shadow-[0_4px_12px_rgba(181,125,105,0.25)] hover:brightness-105">
                  Enregistrer
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
