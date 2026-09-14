"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, BookOpen } from "lucide-react";
import { heroConfig, heroConfigEn } from "@/config";
import Link from "next/link";

interface HeroProps {
  lang?: string;
}

export function Hero({ lang = "fr" }: HeroProps) {
  const isEnglish = lang === "en";
  const config = isEnglish ? heroConfigEn : heroConfig;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Simple CSS-driven entrance — no heavy GSAP for LCP
    if (titleRef.current) titleRef.current.style.opacity = "1";
    if (subtitleRef.current) subtitleRef.current.style.opacity = "1";
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#1C1C1C]">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={config.backgroundImage}
          alt={config.backgroundAlt}
          className="w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C]/40 via-transparent to-[#1C1C1C]/60" />
      </div>

      {/* Nav */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-4">
        <Link
          href={`/blog?lang=${lang}`}
          className="flex items-center gap-1 px-3 py-1 text-sm text-[#FAF8F4]/80 hover:text-[#FAF8F4] transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          <span className="hidden sm:inline">Blog</span>
        </Link>
        <span className="text-[#FAF8F4]/30">|</span>
        <Link
          href="?lang=fr"
          className={`px-2 py-1 text-sm transition-colors ${!isEnglish ? "text-[#FAF8F4] border-b-2 border-[#8C7B6B]" : "text-[#FAF8F4]/60 hover:text-[#FAF8F4]"}`}
        >
          FR
        </Link>
        <Link
          href="?lang=en"
          className={`px-2 py-1 text-sm transition-colors ${isEnglish ? "text-[#FAF8F4] border-b-2 border-[#8C7B6B]" : "text-[#FAF8F4]/60 hover:text-[#FAF8F4]"}`}
        >
          EN
        </Link>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p
          ref={subtitleRef}
          className="text-[#8C7B6B] tracking-[0.25em] text-xs font-medium uppercase mb-4 transition-opacity duration-700"
          style={{ opacity: 0 }}
        >
          {config.subtitle}
        </p>
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl text-[#FAF8F4] mb-8 leading-none tracking-tight transition-opacity duration-700 delay-150"
          style={{ fontFamily: "var(--font-serif)", opacity: 0 }}
        >
          {config.title}
        </h1>
        <Link
          href={`/reservation?lang=${lang}`}
          className="inline-flex items-center gap-2 bg-[#8C7B6B] hover:bg-[#6B5D4F] text-white px-8 py-3 text-sm tracking-widest uppercase transition-colors duration-200"
        >
          {isEnglish ? "Book now" : "Réserver"}
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#FAF8F4]/60 animate-bounce">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}
