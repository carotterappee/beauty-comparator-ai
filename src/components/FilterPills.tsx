"use client";

const OPTIONS = [
  { key: "peau:mixte", label: "Peau mixte" },
  { key: "cheveux:bouclés", label: "Cheveux bouclés" },
  { key: "besoin:hydratation", label: "Hydratation" },
  { key: "besoin:éclat", label: "Éclat" },
];

export default function FilterPills({
  active, toggle
}: { active: string[]; toggle: (k: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {OPTIONS.map(o => {
        const on = active.includes(o.key);
        return (
          <button
            key={o.key}
            onClick={() => toggle(o.key)}
            className={`rounded-full px-3 py-1 text-sm border ${on ? "bg-pink-600 text-white border-pink-600" : "bg-white"}`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
