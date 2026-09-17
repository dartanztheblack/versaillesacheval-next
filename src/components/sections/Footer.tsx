import Link from "next/link";
import { SITE_PHONE, SITE_EMAIL } from "@/config";

interface FooterProps {
  lang?: string;
}

export function Footer({ lang = "fr" }: FooterProps) {
  const isEnglish = lang === "en";

  return (
    <footer style={{ background: "#1A1A1A", color: "#FAFAF8" }}>

      {/* Bande supérieure — CTA */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "center", padding: "72px 32px" }}>
        <p style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "rgba(255,255,255,0.9)", marginBottom: "32px", lineHeight: 1.2 }}>
          {isEnglish ? "Ready to experience Versailles?" : "Prêt à vivre Versailles autrement ?"}
        </p>
        <Link
          href={`/reservation?lang=${lang}`}
          style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#FAFAF8", color: "#1A1A1A", padding: "16px 40px", fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600 }}
        >
          {isEnglish ? "Book the experience" : "Réserver l'expérience"}
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Corps du footer — 3 colonnes */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "72px 32px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "48px", marginBottom: "64px" }}>

          {/* Marque */}
          <div>
            <p style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "1.35rem", color: "rgba(255,255,255,0.9)", marginBottom: "16px" }}>
              Versailles à Cheval
            </p>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", lineHeight: 1.8, maxWidth: "28ch" }}>
              {isEnglish
                ? "Equestrian experiences in the royal gardens of Versailles since 2018."
                : "Expériences équestres dans les jardins royaux du Château de Versailles depuis 2018."}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "24px" }}>
              Navigation
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { href: `#nos-chevaux`, label: isEnglish ? "Our horses" : "Nos chevaux" },
                { href: `/reservation?lang=${lang}`, label: isEnglish ? "Book an experience" : "Réserver une expérience" },
                { href: `/blog?lang=${lang}`, label: isEnglish ? "Journal" : "Journal" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", letterSpacing: "0.05em", transition: "color 0.2s" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "24px" }}>
              Contact
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
              <li>
                <a href={`tel:${SITE_PHONE}`} style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", letterSpacing: "0.05em" }}>
                  {SITE_PHONE}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE_EMAIL}`} style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
                  {SITE_EMAIL}
                </a>
              </li>
              <li style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
                Versailles, Île-de-France
              </li>
            </ul>
          </div>
        </div>

        {/* Barre de bas */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: "28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", letterSpacing: "0.05em" }}>
            © {new Date().getFullYear()} Versailles à Cheval — {isEnglish ? "All rights reserved." : "Tous droits réservés."}
          </p>
          <Link
            href={`/?lang=${lang === "fr" ? "en" : "fr"}`}
            style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            {isEnglish ? "Version française" : "English version"}
          </Link>
        </div>
      </div>

    </footer>
  );
}
