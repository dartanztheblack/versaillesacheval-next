"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";

interface NarrativeTextProps {
  lang?: string;
}

export function NarrativeText({ lang = "fr" }: NarrativeTextProps) {
  const isEnglish = lang === "en";

  return (
    <section className="py-48 px-6 bg-[#FAFAF8]">
      <div className="max-w-2xl mx-auto text-center">
        <RevealOnScroll>
          <p className="text-[#2C3E2D] tracking-[0.35em] text-xs font-medium uppercase mb-10">
            {isEnglish ? "Since 2018 · Versailles" : "Depuis 2018 · Versailles"}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={1}>
          <h2
            className="text-[clamp(2.2rem,5vw,4.8rem)] text-[#1A1A1A] leading-[1.08] tracking-[-0.025em] mb-12"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
          >
            {isEnglish
              ? "The gardens of Versailles, seen from the back of a horse"
              : "Les jardins de Versailles, vus depuis le dos d'un cheval"}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={2}>
          <p className="text-[#6B6B5F] text-xl leading-[1.85]">
            {isEnglish
              ? "There is no better vantage point to understand Versailles than from horseback. The scale of Le Nôtre's allées, the silence between the fountains, the smell of old oak and cut grass — things a tour bus will never give you."
              : "Il n'existe pas de meilleur point de vue pour comprendre Versailles que depuis le dos d'un cheval. L'échelle des allées de Le Nôtre, le silence entre les fontaines, l'odeur du vieux chêne et de l'herbe fraîche — des sensations qu'aucun bus touristique ne peut vous offrir."}
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
