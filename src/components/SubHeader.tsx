"use client";

export default function SubHeader() {
  return (
    <div className="relative z-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Sub-header glass card */}
        <div className="relative mt-3 h-20 md:h-24 rounded-2xl backdrop-blur-md bg-white/30 ring-1 ring-white/40 shadow-[0_10px_30px_rgba(181,125,105,0.08)] overflow-hidden">
          {/* soft glow (replaces the huge ring) */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                            w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full blur-xl
                            bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0)_70%)]" />
          </div>

          {/* content */}
          <div className="flex h-full items-center justify-between gap-4 px-4">
            {/* vertical menu (left) */}
            <nav className="hidden md:flex items-center gap-3 text-[15px] text-rose-900/80">
              <a className="hover:text-rose-900 transition-colors" href="#">Soins</a>
              <span className="opacity-30">·</span>
              <a className="hover:text-rose-900 transition-colors" href="#">Cheveux</a>
              <span className="opacity-30">·</span>
              <a className="hover:text-rose-900 transition-colors" href="#">Maquillage</a>
              <span className="opacity-30">·</span>
              <a className="hover:text-rose-900 transition-colors" href="#">Parfums</a>
              <span className="opacity-30">·</span>
              <a className="hover:text-rose-900 transition-colors" href="#">Accessoires</a>
            </nav>

            {/* search */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement | null)?.value?.trim();
                window.location.href = q ? `/products?q=${encodeURIComponent(q)}` : "/products";
              }}
              className="ml-auto flex items-center gap-2"
            >
              <input
                name="q"
                placeholder="Rechercher un soin, une marque…"
                className="w-64 md:w-80 rounded-full border border-white/50 bg-white/70
                           px-4 py-2 text-rose-900/90 placeholder:text-rose-900/50
                           focus:outline-none focus:ring-2 focus:ring-rose-300/60"
              />
              <button
                type="submit"
                className="rounded-full bg-rose-100/80 px-4 py-2 text-rose-900/90 ring-1 ring-white/40
                           hover:bg-rose-100 transition-colors"
              >
                Rechercher
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
