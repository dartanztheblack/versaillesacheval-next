"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";

interface BreathSectionProps {
  lang?: string;
}

export function BreathSection({ lang = "fr" }: BreathSectionProps) {
  const isEnglish = lang === "en";

  return (
    <section className="relative py-40 px-6 overflow-hidden">
      {/* Background image with white fade */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img
          src="/versailles-canal.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).parentElement!.style.background = "#2C3E2D";
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(250,250,248,0.85) 0%, rgba(250,250,248,0.45) 50%, rgba(250,250,248,0.85) 100%)" }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <RevealOnScroll>
          <p className="text-[#2C3E2D] tracking-[0.3em] text-xs font-medium uppercase mb-8">
            {isEnglish ? "The experience" : "L'expérience"}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={1}>
          <h2
            className="text-[clamp(2.5rem,6vw,5.5rem)] text-[#1A1A1A] leading-[0.95] tracking-[-0.03em] mb-10"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
          >
            {isEnglish
              ? "Two hours you will keep for a lifetime."
              : "Deux heures que vous garderez toute une vie."}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={2}>
          <Link
            href={`/reservation?lang=${lang}`}
            className="inline-flex items-center gap-3 bg-[#2C3E2D] hover:bg-[#3D5C3E] text-[#FAFAF8] px-10 py-4 text-sm tracking-[0.15em] uppercase transition-colors duration-200"
          >
            {isEnglish ? "Book the experience" : "Réserver l'expérience"}
            <span aria-hidden="true">→</span>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
