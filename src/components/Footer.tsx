export default function Footer() {
  return (
    <footer className="w-full bg-[#fdf8f9] border-t border-[#e8cfc3]/60 text-[#5b3e37]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Mention / Copyright */}
        <p className="text-sm text-center md:text-left opacity-80">
          © {new Date().getFullYear()} VelvetMind — Tous droits réservés
        </p>

        {/* Liens secondaires */}
        <div className="flex items-center gap-6 text-sm">
          <a href="/mentions-legales" className="hover:text-[#b57d69] transition">
            Mentions légales
          </a>
          <a href="/contact" className="hover:text-[#b57d69] transition">
            Contact
          </a>
          <a href="/confidentialite" className="hover:text-[#b57d69] transition">
            Confidentialité
          </a>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Instagram" className="hover:text-[#b57d69] transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-[#b57d69] transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="#" aria-label="TikTok" className="hover:text-[#b57d69] transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 3v12a4 4 0 1 1-4-4" />
              <path d="M15 3a4 4 0 0 0 4 4h1v3h-1a7 7 0 0 1-7-7V3h3z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
