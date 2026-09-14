"use client";

import Link from "next/link";
import { breathSectionConfig, breathSectionConfigEn } from "@/config";

interface BreathSectionProps {
  lang?: string;
}

export function BreathSection({ lang = "fr" }: BreathSectionProps) {
  const isEnglish = lang === "en";
  const config = isEnglish ? breathSectionConfigEn : breathSectionConfig;

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={config.backgroundImage}
          alt={config.backgroundAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1C1C1C]/50" />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <p className="text-[#8C7B6B] tracking-[0.25em] text-xs uppercase mb-4">{config.subtitle}</p>
        <h2
          className="text-6xl md:text-8xl text-[#FAF8F4] mb-6 leading-none"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {config.title}
        </h2>
        <p className="text-[#FAF8F4]/70 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          {config.description}
        </p>
        <Link
          href={`/reservation?lang=${lang}`}
          className="inline-flex items-center gap-2 bg-[#8C7B6B] hover:bg-[#6B5D4F] text-white px-8 py-3 text-sm tracking-widest uppercase transition-colors duration-200"
        >
          {isEnglish ? "Book now" : "Réserver"}
        </Link>
      </div>
    </section>
  );
}
