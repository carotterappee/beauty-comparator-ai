"use client";
import { useEffect, useState } from "react";

/** Petit overlay : deux battants blancs qui s'écartent puis disparaissent */
export default function DoorIntro() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true), 300);     // on ouvre
    const t2 = setTimeout(() => setHidden(true), 1600);  // on retire l’overlay
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
      <div className="relative h-full w-full overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className={`flex-1 bg-white transition-transform duration-700 ${open ? "-translate-x-full" : "translate-x-0"}`} />
          <div className={`flex-1 bg-white transition-transform duration-700 ${open ? "translate-x-full" : "translate-x-0"}`} />
        </div>
        {/* un peu de lumière derrière */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-200/60 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
