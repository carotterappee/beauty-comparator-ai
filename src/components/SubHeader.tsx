"use client";
import { Search } from "lucide-react"; // icône de loupe

export default function SubHeader() {
  return (
    <div className="relative z-20">
      <div className="mx-auto max-w-4xl px-6 py-8">
        {/* carte translucide */}
        <div className="relative h-24 rounded-2xl backdrop-blur-lg bg-white/40 shadow-[0_8px_30px_rgba(181,125,105,0.08)] border border-white/50 overflow-hidden">
          
          {/* halo nacré */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-2xl bg-[radial-gradient(circle_at_center,rgba(255,235,245,0.8)_0%,rgba(255,255,255,0)_70%)]" />
          </div>

          {/* barre de recherche centrale */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement | null)?.value?.trim();
              window.location.href = q ? `/products?q=${encodeURIComponent(q)}` : "/products";
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-md flex items-center justify-center bg-gradient-to-r from-[#fef6f8] to-[#fbeaf1] border border-[#e8cdd5] rounded-full shadow-[inset_0_1px_4px_rgba(255,255,255,0.6),0_0_6px_rgba(234,180,190,0.4)]"
          >
            <Search className="ml-4 text-[#b57d69] opacity-80 w-5 h-5" />
            <input
              name="q"
              placeholder="Rechercher un soin, une marque, un parfum..."
              className="flex-1 bg-transparent px-3 py-2 text-[#7a5550] placeholder:text-[#b57d69]/70 focus:outline-none"
            />
            <button
              type="submit"
              className="mr-3 bg-gradient-to-r from-[#f9e3e8] to-[#f6d4db] text-[#704c46] px-4 py-1.5 rounded-full text-sm font-medium shadow-[0_1px_3px_rgba(181,125,105,0.25)] hover:from-[#f8dde3] hover:to-[#f4ccd3] transition-all"
            >
              Rechercher
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
