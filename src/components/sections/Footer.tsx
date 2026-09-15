import Link from "next/link";
import { SITE_PHONE, SITE_EMAIL } from "@/config";

interface FooterProps {
  lang?: string;
}

export function Footer({ lang = "fr" }: FooterProps) {
  const isEnglish = lang === "en";

  return (
    <footer className="bg-[#1A1A1A] text-[#FAFAF8] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <p
              className="text-2xl text-[#FAFAF8] mb-4"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
            >
              Versailles à Cheval
            </p>
            <p className="text-[#6B6B5F] text-sm leading-relaxed max-w-xs">
              {isEnglish
                ? "Equestrian experiences in the gardens of the Palace of Versailles since 2018."
                : "Expériences équestres dans les jardins du Château de Versailles depuis 2018."}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#6B6B5F] mb-6">
              {isEnglish ? "Navigation" : "Navigation"}
            </p>
            <ul className="space-y-3 text-sm">
              {[
                { href: `#nos-chevaux`, label: isEnglish ? "Our horses" : "Nos chevaux" },
                { href: `/reservation?lang=${lang}`, label: isEnglish ? "Book" : "Réserver" },
                { href: `/blog?lang=${lang}`, label: "Blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#9B9B8F] hover:text-[#FAFAF8] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#6B6B5F] mb-6">Contact</p>
            <ul className="space-y-3 text-sm text-[#9B9B8F]">
              <li>
                <a href={`tel:${SITE_PHONE}`} className="hover:text-[#FAFAF8] transition-colors">
                  {SITE_PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_EMAIL}`} className="hover:text-[#FAFAF8] transition-colors">
                  {SITE_EMAIL}
                </a>
              </li>
              <li className="text-[#6B6B5F]">
                {isEnglish ? "Versailles, Île-de-France" : "Versailles, Île-de-France"}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-[#4A4A40]">
            © {new Date().getFullYear()} Versailles à Cheval.{" "}
            {isEnglish ? "All rights reserved." : "Tous droits réservés."}
          </p>
          <div className="flex gap-6 text-xs text-[#4A4A40]">
            <Link href={`/?lang=${lang === "fr" ? "en" : "fr"}`} className="hover:text-[#FAFAF8] transition-colors">
              {isEnglish ? "Version française" : "English version"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
