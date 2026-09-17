"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";

interface HorseCareSectionProps {
  lang?: string;
}

const principles = [
  {
    number: "01",
    title: "Liberté au quotidien",
    titleEn: "Freedom every day",
    text: "Nos chevaux ne travaillent pas plus de 4h par jour. Le reste du temps, ils sont en pré, en liberté, dans le Domaine de Versailles.",
    textEn: "Our horses work no more than 4 hours a day. The rest of the time, they roam freely in the meadows of the Versailles estate.",
  },
  {
    number: "02",
    title: "Alimentation naturelle",
    titleEn: "Natural feeding",
    text: "Foin local, avoine, carottes fraîches. Aucun additif chimique. Chaque cheval a un suivi nutritionnel personnalisé.",
    textEn: "Local hay, oats, fresh carrots. No chemical additives. Each horse has personalised nutritional monitoring.",
  },
  {
    number: "03",
    title: "Soins et pansage",
    titleEn: "Grooming and care",
    text: "Un pansage complet avant et après chaque sortie. Maréchal-ferrant toutes les 6 semaines.",
    textEn: "Full grooming before and after every ride. Farrier every 6 weeks.",
  },
  {
    number: "04",
    title: "Zéro stress, zéro contrainte",
    titleEn: "Zero stress, zero force",
    text: "Nous n'utilisons jamais d'éperons ni de martingales de contrainte. Notre méthode s'appuie sur la confiance.",
    textEn: "We never use spurs or restrictive martingales. Our method relies on trust and communication.",
  },
];

export function HorseCareSection({ lang = "fr" }: HorseCareSectionProps) {
  const isEnglish = lang === "en";

  return (
    <section style={{ background: "#FAFAF8", paddingTop: "180px", paddingBottom: "180px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", textAlign: "center", paddingLeft: "32px", paddingRight: "32px" }}>

        {/* Header */}
        <RevealOnScroll>
          <p style={{ color: "#2C3E2D", letterSpacing: "0.3em", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", marginBottom: "32px" }}>
            {isEnglish ? "Our philosophy" : "Notre philosophie"}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={1}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3.8rem)", color: "#1A1A1A", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "28px", maxWidth: "640px", margin: "0 auto 28px" }}>
            {isEnglish
              ? "We believe in horses that are happy before they are useful."
              : "Nous croyons en des chevaux heureux avant d'être utiles."}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={2}>
          <p style={{ color: "#6B6B5F", fontSize: "1.1rem", lineHeight: 2, maxWidth: "52ch", margin: "0 auto 80px" }}>
            {isEnglish
              ? "A horse under stress transmits fear. A horse cared for with respect transmits grace."
              : "Un cheval sous pression transmet la peur. Un cheval soigné avec respect transmet de la grâce."}
          </p>
        </RevealOnScroll>

        {/* Image */}
        <RevealOnScroll delay={3}>
          <div style={{ position: "relative", overflow: "hidden", height: "400px", marginBottom: "100px" }}>
            <img
              src="/breath-canal.jpg"
              alt={isEnglish ? "Horses grazing in the Versailles estate" : "Chevaux au pré dans le Domaine de Versailles"}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                const el = e.target as HTMLImageElement;
                el.parentElement!.style.background = "#E8DDD0";
                el.style.display = "none";
              }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, #FAFAF8 100%)" }} />
          </div>
        </RevealOnScroll>

        {/* Principes — centrés, séparateurs */}
        <div>
          {principles.map((p, i) => (
            <RevealOnScroll key={p.number} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
              <div style={{ borderTop: "1px solid rgba(44,62,45,0.12)", paddingTop: "56px", paddingBottom: "56px", textAlign: "center" }}>
                <span style={{ fontSize: "10px", color: "#8B7355", letterSpacing: "0.2em", fontWeight: 500 }}>{p.number}</span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.75rem", color: "#1A1A1A", marginTop: "16px", marginBottom: "20px" }}>
                  {isEnglish ? p.titleEn : p.title}
                </h3>
                <p style={{ color: "#6B6B5F", fontSize: "1rem", lineHeight: 1.9, maxWidth: "48ch", margin: "0 auto" }}>
                  {isEnglish ? p.textEn : p.text}
                </p>
              </div>
            </RevealOnScroll>
          ))}
          <div style={{ borderTop: "1px solid rgba(44,62,45,0.12)" }} />
        </div>

      </div>
    </section>
  );
}
