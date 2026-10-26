"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";

interface ProgrammeSectionProps {
  lang?: string;
}

interface ProgrammeStep {
  time: string;
  label: string;
  icon: string;
  items: string[];
  included: boolean;
  option?: string;
  images?: { src: string; alt: string }[];
}

const programmeFr: ProgrammeStep[] = [
  {
    time: "Matin",
    label: "Découverte du Château",
    icon: "🏰",
    items: [
      "Arrivée libre en matinée. Présentez vos billets PDF directement à l'entrée.",
      "Visite guidée exclusive de 1h30 — immersion dans l'histoire des grands appartements royaux (sous réserve de disponibilité).",
    ],
    included: true,
  },
  {
    time: "Midi",
    label: "Gastronomie française",
    icon: "🍽",
    items: [
      "Déjeuner dans un cadre idyllique au bord de l'eau.",
      "Formule tout inclus : Entrée · Plat · Dessert · Eau · Café.",
      "Recommandation du chef : Canard à l'orange suivi de profiteroles artisanales.",
    ],
    included: false,
    option: "+75 € / pers.",
  },
  {
    time: "Après-midi",
    label: "Randonnée équestre royale",
    icon: "🐴",
    items: [
      "Balade privée de 2 heures à travers les jardins et les sentiers secrets du domaine.",
      "Attribution d'un cheval selon votre niveau (débutant au confirmé) et votre morphologie.",
      "Temps dédié aux photos en fin de parcours.",
    ],
    included: true,
  },
  {
    time: "Fin de journée",
    label: "Domaine de Trianon & Hameau",
    icon: "🌿",
    items: [
      "Accès au Grand Trianon, Petit Trianon et Hameau de la Reine.",
      "Visite du Théâtre de la Reine et passage par les Écuries Royales.",
    ],
    included: true,
  },
  {
    time: "Option",
    label: "Survol aérien",
    icon: "✈",
    items: [
      "Clôturez votre journée par un survol en Cessna 177 depuis l'aérodrome à proximité.",
      "Selon disponibilités et conditions météorologiques.",
    ],
    included: false,
    option: "Sur demande",
    images: [
      { src: "/avion-cessna.webp", alt: "Cessna 177 sur l'aérodrome" },
      { src: "/survol-versailles-aerial.webp", alt: "Vue aérienne du Château de Versailles" },
      { src: "/survol-vue-cockpit.webp", alt: "Vue depuis le cockpit en vol" },
      { src: "/survol-tableau-bord.webp", alt: "Tableau de bord Cessna en vol" },
      { src: "/survol-domaine.webp", alt: "Survol du domaine de Versailles" },
      { src: "/survol-chateau-panorama.webp", alt: "Panorama du Château depuis les airs" },
    ],
  },
];

const programmeEn: ProgrammeStep[] = [
  {
    time: "Morning",
    label: "Château Discovery",
    icon: "🏰",
    items: [
      "Free arrival in the morning. Present your PDF tickets directly at the entrance.",
      "Exclusive 1.5-hour guided tour — immersive journey through the royal apartments (subject to availability).",
    ],
    included: true,
  },
  {
    time: "Noon",
    label: "French Gastronomy",
    icon: "🍽",
    items: [
      "Lunch in an idyllic waterside setting.",
      "All-inclusive menu: Starter · Main · Dessert · Water · Coffee.",
      "Chef's recommendation: Duck à l'orange followed by artisan profiteroles.",
    ],
    included: false,
    option: "+€75 / person",
  },
  {
    time: "Afternoon",
    label: "Royal Equestrian Ride",
    icon: "🐴",
    items: [
      "Private 2-hour ride through the gardens and secret paths of the estate.",
      "Horse matched to your level (beginner to experienced) and build.",
      "Dedicated photography time at the end of the route.",
    ],
    included: true,
  },
  {
    time: "Late afternoon",
    label: "Trianon Estate & Hamlet",
    icon: "🌿",
    items: [
      "Access to the Grand Trianon, Petit Trianon and the Queen's Hamlet.",
      "Visit to the Queen's Theatre and the Royal Stables.",
    ],
    included: true,
  },
  {
    time: "Option",
    label: "Aerial flight",
    icon: "✈",
    items: [
      "End your day with a Cessna 177 flight over the estate from the nearby airfield.",
      "Subject to availability and weather conditions.",
    ],
    included: false,
    option: "On request",
    images: [
      { src: "/avion-cessna.webp", alt: "Cessna 177 at the airfield" },
      { src: "/survol-versailles-aerial.webp", alt: "Aerial view of the Palace of Versailles" },
      { src: "/survol-vue-cockpit.webp", alt: "Cockpit view in flight" },
      { src: "/survol-tableau-bord.webp", alt: "Cessna instrument panel in flight" },
      { src: "/survol-domaine.webp", alt: "Versailles estate from above" },
      { src: "/survol-chateau-panorama.webp", alt: "Panorama of the Château from the air" },
    ],
  },
];

export function ProgrammeSection({ lang = "fr" }: ProgrammeSectionProps) {
  const isEnglish = lang === "en";
  const programme = isEnglish ? programmeEn : programmeFr;

  return (
    <section id="programme" style={{ background: "#F4F2EE", paddingTop: "180px", paddingBottom: "180px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", paddingLeft: "32px", paddingRight: "32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "100px" }}>
          <RevealOnScroll>
            <p style={{ color: "#2C3E2D", letterSpacing: "0.4em", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", marginBottom: "28px" }}>
              {isEnglish ? "Your day" : "Votre journée"}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)", color: "#1A1A1A", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "28px" }}>
              {isEnglish ? "Programme of your day" : "Programme de votre journée"}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={2}>
            <p style={{ color: "#6B6B5F", fontSize: "1rem", lineHeight: 1.9, maxWidth: "50ch", margin: "0 auto" }}>
              {isEnglish
                ? "A day built around a single ambition: experiencing Versailles as it was meant to be experienced."
                : "Une journée construite autour d'une seule ambition : vivre Versailles comme il mérite de l'être."}
            </p>
          </RevealOnScroll>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Ligne verticale */}
          <div style={{ position: "absolute", left: "80px", top: "20px", bottom: "20px", width: "1px", background: "rgba(44,62,45,0.15)" }} aria-hidden="true" />

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {programme.map((step, i) => (
              <RevealOnScroll key={i} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
                <div style={{ display: "flex", gap: "48px", paddingBottom: i < programme.length - 1 ? "72px" : "0" }}>
                  {/* Colonne gauche : horaire + point */}
                  <div style={{ width: "80px", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", paddingTop: "4px", position: "relative" }}>
                    <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B7355", fontWeight: 500, textAlign: "right", lineHeight: 1.4 }}>
                      {step.time}
                    </span>
                    {/* Point sur la ligne */}
                    <div style={{
                      width: "10px", height: "10px", borderRadius: "50%",
                      background: step.included ? "#2C3E2D" : "#C9B99A",
                      border: "2px solid #F4F2EE",
                      position: "absolute", right: "-5px", top: "2px",
                      boxShadow: "0 0 0 1px rgba(44,62,45,0.2)"
                    }} aria-hidden="true" />
                  </div>

                  {/* Contenu */}
                  <div style={{ flex: 1, paddingTop: "0" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
                      <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.4rem", color: "#1A1A1A", lineHeight: 1.2 }}>
                        {step.label}
                      </h3>
                      {step.included ? (
                        <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#2C3E2D", fontWeight: 600, background: "rgba(44,62,45,0.08)", padding: "3px 10px" }}>
                          {isEnglish ? "Included" : "Inclus"}
                        </span>
                      ) : (
                        <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B7355", fontWeight: 500, background: "rgba(139,115,85,0.1)", padding: "3px 10px" }}>
                          {step.option}
                        </span>
                      )}
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                      {step.items.map((item, j) => (
                        <li key={j} style={{ display: "flex", gap: "12px", color: "#6B6B5F", fontSize: "0.95rem", lineHeight: 1.8 }}>
                          <span style={{ color: "#C9B99A", marginTop: "2px", flexShrink: 0 }} aria-hidden="true">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    {step.images && (
                      <div style={{ marginTop: "28px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                        {step.images.map((img, j) => (
                          <div key={j} style={{ aspectRatio: "4/3", overflow: "hidden", background: "#E8E4DC" }}>
                            <img
                              src={img.src}
                              alt={img.alt}
                              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)"; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
