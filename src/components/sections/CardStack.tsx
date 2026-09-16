"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { cardStackConfig } from "@/config";

interface CardStackProps {
  lang?: string;
}

export function CardStack({ lang = "fr" }: CardStackProps) {
  const isEnglish = lang === "en";
  const config = cardStackConfig;

  return (
    <section className="py-48 px-6 bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-24">
          <RevealOnScroll>
            <p className="text-[#2C3E2D] tracking-[0.3em] text-xs font-medium uppercase mb-6">
              {isEnglish ? config.sectionSubtitleEn : config.sectionSubtitle}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <h2
              className="text-[clamp(2rem,4.5vw,4rem)] text-[#1A1A1A] leading-[1.05] tracking-[-0.02em] max-w-2xl"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
            >
              {isEnglish ? config.sectionTitleEn : config.sectionTitle}
            </h2>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-0">
          {config.cards.map((card, i) => (
            <RevealOnScroll key={card.id} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
              <article className="group grid grid-cols-1 md:grid-cols-2 border-t border-[#2C3E2D]/12 py-16 gap-14 items-center">
                {/* Image */}
                <div
                  className="overflow-hidden aspect-[16/9]"
                  style={{ order: i % 2 === 0 ? 0 : 1 }}
                >
                  <img
                    src={card.image}
                    alt={isEnglish ? card.titleEn : card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Content */}
                <div className="flex flex-col justify-center" style={{ order: i % 2 === 0 ? 1 : 0 }}>
                  <span className="text-xs text-[#8B7355] tracking-[0.2em] uppercase mb-4">
                    {isEnglish ? "From" : "À partir de"} {card.basePrice}€ / {isEnglish ? "person" : "pers."}
                  </span>
                  <h3
                    className="text-[clamp(1.5rem,3vw,2.5rem)] text-[#1A1A1A] leading-tight mb-4"
                    style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
                  >
                    {isEnglish ? card.titleEn : card.title}
                  </h3>
                  <p className="text-[#6B6B5F] text-sm leading-relaxed mb-8 max-w-sm">
                    {isEnglish ? card.descriptionEn : card.description}
                  </p>
                  <Link
                    href={`/reservation?tour=${card.id}&lang=${lang}`}
                    className="inline-flex items-center gap-3 bg-[#2C3E2D] hover:bg-[#3D5C3E] text-[#FAFAF8] px-7 py-3 text-xs tracking-[0.15em] uppercase transition-colors duration-200 self-start"
                  >
                    {isEnglish ? "Reserve this experience" : "Réserver cette expérience"}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
