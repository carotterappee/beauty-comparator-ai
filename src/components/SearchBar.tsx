"use client";
import { useState } from "react";

export default function SearchBar({ onChange }: { onChange: (q: string) => void }) {
  const [q, setQ] = useState("");
  return (
    <div className="flex items-center gap-2 rounded-xl border px-3 py-2 bg-white">
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); onChange(e.target.value); }}
        placeholder="Rechercher un produit ou une marque…"
        className="w-full outline-none"
      />
      <kbd className="text-xs text-gray-500">/</kbd>
    </div>
  );
}
