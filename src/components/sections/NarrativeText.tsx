"use client";

import { narrativeTextConfig, narrativeTextConfigEn } from "@/config";

interface NarrativeTextProps {
  lang?: string;
}

export function NarrativeText({ lang = "fr" }: NarrativeTextProps) {
  const isEnglish = lang === "en";
  const config = isEnglish ? narrativeTextConfigEn : narrativeTextConfig;

  return (
    <section className="py-24 px-6 bg-[#F3F0EB]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[#8C7B6B] tracking-[0.2em] text-xs uppercase mb-6">{config.line1}</p>
        <h2
          className="text-4xl md:text-6xl text-[#1C1C1C] mb-8 leading-tight"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {config.line2}
        </h2>
        <p className="text-[#8C7B6B] text-lg leading-relaxed max-w-2xl mx-auto">{config.line3}</p>
      </div>
    </section>
  );
}
