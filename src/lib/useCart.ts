"use client";

import { useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string;          // identifiant produit
  name: string;
  brand?: string;
  image?: string;      // URL
  price: number;       // prix TTC unitaire en €
  qty: number;         // quantité >= 1
  tags?: string[];
};

const KEY = "velvetmind:cart";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // charge localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  // sauvegarde
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const add = (item: Omit<CartItem, "qty"> & { qty?: number }) => {
    setItems(prev => {
      const existing = prev.find(p => p.id === item.id);
      if (existing) {
        return prev.map(p => p.id === item.id ? { ...p, qty: p.qty + (item.qty ?? 1) } : p);
      }
      return [{ ...item, qty: item.qty ?? 1 }, ...prev];
    });
  };

  const setQty = (id: string, qty: number) => {
    setItems(prev =>
      prev
        .map(p => (p.id === id ? { ...p, qty: Math.max(1, Math.min(99, Math.floor(qty))) } : p))
        .filter(p => p.qty > 0)
    );
  };

  const inc = (id: string) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.min(99, p.qty + 1) } : p));
  const dec = (id: string) => setItems(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p));

  const remove = (id: string) => setItems(prev => prev.filter(p => p.id !== id));
  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((n, it) => n + it.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);

  // TVA FR — tu peux changer le taux (ici 20%)
  const VAT_RATE = 0.2;
  const vat = useMemo(() => subtotal * VAT_RATE, [subtotal]);
  const total = useMemo(() => subtotal, [subtotal]); // si prix TTC déjà (le plus courant). Si prix HT, fais subtotal + vat

  return { items, ready, add, setQty, inc, dec, remove, clear, count, subtotal, vat, total, VAT_RATE };
}
