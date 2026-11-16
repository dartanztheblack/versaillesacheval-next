import { LineIcon, type LineIconName } from "@/components/Ornaments";

interface TrustBarProps {
  lang?: string;
}

const items: { icon: LineIconName; fr: string; en: string }[] = [
  { icon: "clock", fr: "2\u00a0h de balade privée", en: "Private 2-hour ride" },
  { icon: "horseshoe", fr: "Débutants bienvenus", en: "Beginners welcome" },
  { icon: "ticket", fr: "Billets du Château inclus", en: "Palace tickets included" },
  { icon: "calendar", fr: "Annulation gratuite jusqu'à 48\u00a0h avant", en: "Free cancellation up to 48\u00a0h before" },
];

/** Bandeau de réassurance sous l'image d'accueil : l'essentiel de l'offre en un coup d'œil. */
export function TrustBar({ lang = "fr" }: TrustBarProps) {
  const isEnglish = lang === "en";

  return (
    <section aria-label={isEnglish ? "At a glance" : "L'essentiel"} style={{ background: "#F4F2EE", borderBottom: "1px solid rgba(44,62,45,0.1)" }}>
      <ul className="trust-bar" style={{ listStyle: "none", maxWidth: "1100px", margin: "0 auto", padding: "28px 32px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
        {items.map((item, i) => (
          <li key={item.icon} className="trust-item" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", color: "#2C3E2D", animationDelay: `${0.9 + i * 0.12}s` }}>
            <LineIcon name={item.icon} size={26} />
            <span style={{ fontSize: "12px", letterSpacing: "0.06em", color: "#1A1A1A", lineHeight: 1.4 }}>
              {isEnglish ? item.en : item.fr}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
