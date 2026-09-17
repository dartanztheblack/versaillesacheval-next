"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";

interface NarrativeTextProps {
  lang?: string;
}

export function NarrativeText({ lang = "fr" }: NarrativeTextProps) {
  const isEnglish = lang === "en";

  return (
    <section style={{ background: "#FAFAF8", paddingTop: "180px", paddingBottom: "180px" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center", paddingLeft: "32px", paddingRight: "32px" }}>
        <RevealOnScroll>
          <p style={{ color: "#2C3E2D", letterSpacing: "0.4em", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", marginBottom: "48px" }}>
            {isEnglish ? "Since 2018 · Versailles" : "Depuis 2018 · Versailles"}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={1}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(2.4rem, 5vw, 5rem)", color: "#1A1A1A", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "56px" }}>
            {isEnglish
              ? "The gardens of Versailles, seen from the back of a horse"
              : "Les jardins de Versailles, vus depuis le dos d'un cheval"}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={2}>
          <p style={{ color: "#6B6B5F", fontSize: "1.15rem", lineHeight: 2.1, maxWidth: "54ch", margin: "0 auto" }}>
            {isEnglish
              ? "There is no better vantage point to understand Versailles than from horseback. The scale of Le Nôtre's allées, the silence between the fountains, the smell of old oak and cut grass — things a tour bus will never give you."
              : "Il n'existe pas de meilleur point de vue pour comprendre Versailles que depuis le dos d'un cheval. L'échelle des allées de Le Nôtre, le silence entre les fontaines, l'odeur du vieux chêne et de l'herbe fraîche — des sensations qu'aucun bus touristique ne peut vous offrir."}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
