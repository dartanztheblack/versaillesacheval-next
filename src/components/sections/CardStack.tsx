"use client";

import Link from "next/link";
import { cardStackConfig } from "@/config";

interface CardStackProps {
  lang?: string;
}

export function CardStack({ lang = "fr" }: CardStackProps) {
  const isEnglish = lang === "en";
  const config = cardStackConfig;

  return (
    <section className="py-24 px-6 bg-[#1C1C1C]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#8C7B6B] tracking-[0.2em] text-xs uppercase mb-4">
            {isEnglish ? config.sectionSubtitleEn : config.sectionSubtitle}
          </p>
          <h2
            className="text-4xl md:text-6xl text-[#FAF8F4] leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {isEnglish ? config.sectionTitleEn : config.sectionTitle}
          </h2>
        </div>

        <div className="relative flex justify-center">
          {config.cards.map((card) => (
            <div
              key={card.id}
              className="relative w-full max-w-lg bg-[#1C1C1C] border border-[#8C7B6B]/20 overflow-hidden"
              style={{ transform: `rotate(${card.rotation}deg)` }}
            >
              <img
                src={card.image}
                alt={isEnglish ? card.titleEn : card.title}
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-8">
                <h3
                  className="text-2xl text-[#FAF8F4] mb-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {isEnglish ? card.titleEn : card.title}
                </h3>
                <p className="text-[#8C7B6B] text-sm leading-relaxed mb-6">
                  {isEnglish ? card.descriptionEn : card.description}
                </p>
                <Link
                  href={`/reservation?tour=${card.id}&lang=${lang}`}
                  className="inline-flex items-center gap-2 border border-[#8C7B6B] text-[#8C7B6B] hover:bg-[#8C7B6B] hover:text-white px-6 py-2 text-sm tracking-widest uppercase transition-colors duration-200"
                >
                  {isEnglish ? "Book" : "Réserver"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
