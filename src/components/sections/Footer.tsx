import Link from "next/link";
import { footerConfig } from "@/config";

interface FooterProps {
  lang?: string;
}

export function Footer({ lang = "fr" }: FooterProps) {
  const isEnglish = lang === "en";
  const c = footerConfig;

  return (
    <footer className="bg-[#1C1C1C] text-[#FAF8F4] py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3
              className="text-3xl text-[#FAF8F4] mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {c.logoText}
            </h3>
            <p className="text-[#8C7B6B] text-sm leading-relaxed mb-6">
              {isEnglish ? c.descriptionEn : c.description}
            </p>
            <Link
              href={`/reservation?lang=${lang}`}
              className="inline-flex items-center border border-[#8C7B6B] text-[#8C7B6B] hover:bg-[#8C7B6B] hover:text-white px-6 py-2 text-sm tracking-widest uppercase transition-colors duration-200"
            >
              {isEnglish ? c.ctaTextEn : c.ctaText}
            </Link>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#8C7B6B] mb-4">Contact</h4>
            <ul className="space-y-2">
              {c.contact.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[#FAF8F4]/70 hover:text-[#FAF8F4] text-sm transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              {c.address.map((line, i) => (
                <p key={i} className="text-[#FAF8F4]/50 text-sm">{line}</p>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#8C7B6B] mb-4">
              {isEnglish ? "Follow us" : "Suivez-nous"}
            </h4>
            <ul className="space-y-2 mb-6">
              {c.socials.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FAF8F4]/70 hover:text-[#FAF8F4] text-sm capitalize transition-colors"
                  >
                    {s.platform}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {c.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#FAF8F4]/40 hover:text-[#FAF8F4] text-xs transition-colors">
                    {isEnglish ? link.labelEn : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#FAF8F4]/10 pt-8 text-center">
          <p className="text-[#FAF8F4]/30 text-xs">{c.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
