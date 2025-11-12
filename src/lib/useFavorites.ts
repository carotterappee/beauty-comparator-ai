"use client";

import { useEffect, useState } from "react";

export type FavoriteItem = {
  id: string;
  name: string;
  brand?: string;
  image?: string;      // URL image
  price?: number;      // en €
  rating?: number;     // 0..5
  tags?: string[];     // ex: ["clean", "peau-sensible"]
};

const KEY = "velvetmind:favorites";

export function useFavorites() {
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [ready, setReady] = useState(false);

  // Charger depuis localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  // Sauvegarder
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const add = (item: FavoriteItem) => {
    setItems((prev) => (prev.some((x) => x.id === item.id) ? prev : [item, ...prev]));
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  const clear = () => setItems([]);

  const exists = (id: string) => items.some((x) => x.id === id);

  return { items, add, remove, clear, exists, ready };
}
