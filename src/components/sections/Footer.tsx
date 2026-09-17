import Link from "next/link";
import { SITE_PHONE, SITE_EMAIL } from "@/config";

interface FooterProps {
  lang?: string;
}

export function Footer({ lang = "fr" }: FooterProps) {
  const isEnglish = lang === "en";

  return (
    <footer className="bg-[#1A1A1A] text-[#FAFAF8]" style={{ paddingTop: "100px", paddingBottom: "60px" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">

        {/* Brand — centré en haut */}
        <div className="text-center mb-20 pb-16 border-b border-white/10">
          <p
            className="text-3xl text-[#FAFAF8] mb-5"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
          >
            Versailles à Cheval
          </p>
          <p className="text-[#6B6B5F] text-sm leading-relaxed max-w-sm mx-auto">
            {isEnglish
              ? "Equestrian experiences in the gardens of the Palace of Versailles since 2018."
              : "Expériences équestres dans les jardins du Château de Versailles depuis 2018."}
          </p>
        </div>

        {/* Deux colonnes : Navigation + Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-20">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#4A4A40] mb-8">Navigation</p>
            <ul className="space-y-5">
              {[
                { href: `#nos-chevaux`, label: isEnglish ? "Our horses" : "Nos chevaux" },
                { href: `/reservation?lang=${lang}`, label: isEnglish ? "Book an experience" : "Réserver une expérience" },
                { href: `/blog?lang=${lang}`, label: isEnglish ? "Journal" : "Journal" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#9B9B8F] hover:text-[#FAFAF8] transition-colors text-sm tracking-wide">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#4A4A40] mb-8">Contact</p>
            <ul className="space-y-5 text-sm">
              <li>
                <a href={`tel:${SITE_PHONE}`} className="text-[#9B9B8F] hover:text-[#FAFAF8] transition-colors tracking-wide">
                  {SITE_PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_EMAIL}`} className="text-[#9B9B8F] hover:text-[#FAFAF8] transition-colors">
                  {SITE_EMAIL}
                </a>
              </li>
              <li className="text-[#4A4A40]">Versailles, Île-de-France</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#3A3A35] tracking-wide">
            © {new Date().getFullYear()} Versailles à Cheval — {isEnglish ? "All rights reserved." : "Tous droits réservés."}
          </p>
          <Link href={`/?lang=${lang === "fr" ? "en" : "fr"}`} className="text-[11px] text-[#3A3A35] hover:text-[#FAFAF8] transition-colors tracking-wide">
            {isEnglish ? "Version française" : "English version"}
          </Link>
        </div>

      </div>
    </footer>
  );
}
