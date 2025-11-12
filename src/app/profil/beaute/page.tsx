"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

// ... (garde tes types et ton état comme avant)

export default function ProfilePage() {
  const router = useRouter();
  // ... (garde tes useState/useEffect existants)

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      router.replace("/");        // retour à l'accueil
      // Optionnel: forcer un refresh d'état
      // router.refresh();
    } catch (e) {
      console.error("logout error", e);
    }
  };

  // --- dans ton return, tout en haut du bloc .p-8 ---
  // ajoute cette barre d'en-tête "maison"
  // juste après le <div className="... p-8"> qui contient le profil :
  // (si tu n'as pas ce wrapper, mets ce bloc au début du contenu)
  /*
    <div className="flex items-center gap-2 mb-4">
      <Link href="/" aria-label="Accueil"
        className="inline-flex items-center gap-2 text-[#5b3e37] hover:text-[#b57d69]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12l9-9 9 9" />
          <path d="M9 21V9h6v12" />
        </svg>
        Accueil
      </Link>
    </div>
  */

  // Et plus bas, dans tes boutons d'action, assure-toi d'avoir :
  /*
    <button onClick={logout}
      className="ml-auto rounded-full px-4 py-2 bg-white/80 ring-1 ring-[#e8cfc3] hover:bg-white">
      Se déconnecter
    </button>
  */
}
