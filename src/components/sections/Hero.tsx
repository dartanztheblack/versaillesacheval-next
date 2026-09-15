"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { heroConfig, heroConfigEn } from "@/config";

interface HeroProps {
  lang?: string;
}

export function Hero({ lang = "fr" }: HeroProps) {
  const isEnglish = lang === "en";
  const config = isEnglish ? heroConfigEn : heroConfig;
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [eyebrowRef.current, titleRef.current, subRef.current, ctaRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 120 * i);
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#FAFAF8]">
      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6">
        <span
          className="text-[#1A1A1A] text-lg tracking-wide"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Versailles à Cheval
        </span>
        <div className="flex items-center gap-6 text-sm">
          <Link href={`/blog?lang=${lang}`} className="text-[#6B6B5F] hover:text-[#1A1A1A] transition-colors tracking-wide">
            Journal
          </Link>
          <Link
            href="?lang=fr"
            className={`transition-colors tracking-wide ${!isEnglish ? "text-[#2C3E2D] font-medium" : "text-[#6B6B5F] hover:text-[#1A1A1A]"}`}
          >FR</Link>
          <Link
            href="?lang=en"
            className={`transition-colors tracking-wide ${isEnglish ? "text-[#2C3E2D] font-medium" : "text-[#6B6B5F] hover:text-[#1A1A1A]"}`}
          >EN</Link>
        </div>
      </nav>

      {/* Image plein écran */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={config.backgroundImage}
          alt={config.backgroundAlt}
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
        />
        {/* voile sombre pour lisibilité du texte blanc */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.55) 100%)" }}
        />
      </div>

      {/* Texte centré sur la photo */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <p
          ref={eyebrowRef}
          className="text-white/70 tracking-[0.3em] text-xs font-medium uppercase mb-6"
          style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          {config.subtitle}
        </p>
        <h1
          ref={titleRef}
          className="text-[clamp(3.5rem,10vw,9rem)] text-white leading-[0.9] tracking-[-0.02em] mb-6"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 300,
            opacity: 0,
            transform: "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          {config.title}
        </h1>
        <p
          ref={subRef}
          className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl mb-10"
          style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          {isEnglish
            ? "Two hours through the royal gardens of Versailles. Horses, history, and open sky."
            : "Deux heures dans les jardins royaux de Versailles. Des chevaux, de l'histoire, et le ciel ouvert."}
        </p>
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center gap-4"
          style={{ opacity: 0, transform: "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          <Link
            href={`/reservation?lang=${lang}`}
            className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-[#1A1A1A] px-8 py-3.5 text-sm tracking-[0.12em] uppercase transition-colors duration-200"
          >
            {isEnglish ? "Book the experience" : "Réserver l'expérience"}
          </Link>
          <a
            href="#nos-chevaux"
            className="text-sm text-white/70 hover:text-white transition-colors tracking-wide underline underline-offset-4"
          >
            {isEnglish ? "Meet our horses" : "Rencontrer nos chevaux"}
          </a>
        </div>
      </div>
    </section>
  );
}
