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
      }, 150 * i);
    });
  }, []);

  return (
    <section style={{ position: "relative", width: "100%", minHeight: "100vh", overflow: "hidden", background: "#1A1A1A" }}>

      {/* Navbar */}
      <nav style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 30, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 40px" }}>
        <span style={{ fontFamily: "var(--font-serif)", color: "rgba(255,255,255,0.95)", fontSize: "1.15rem", letterSpacing: "0.04em", fontWeight: 300 }}>
          Versailles à Cheval
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link href={`/blog?lang=${lang}`} style={{ color: "rgba(255,255,255,0.65)", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", transition: "color 0.2s" }}>
            Journal
          </Link>
          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="?lang=fr" style={{ color: !isEnglish ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)", fontSize: "11px", letterSpacing: "0.15em", fontWeight: !isEnglish ? 500 : 400 }}>FR</Link>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px" }}>|</span>
            <Link href="?lang=en" style={{ color: isEnglish ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.45)", fontSize: "11px", letterSpacing: "0.15em", fontWeight: isEnglish ? 500 : 400 }}>EN</Link>
          </div>
          <Link
            href={`/reservation?lang=${lang}`}
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.9)", padding: "10px 20px", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", backdropFilter: "blur(8px)", transition: "background 0.2s" }}
          >
            {isEnglish ? "Book" : "Réserver"}
          </Link>
        </div>
      </nav>

      {/* Image plein écran */}
      <div style={{ position: "absolute", inset: 0 }} aria-hidden="true">
        <img
          src={config.backgroundImage}
          alt={config.backgroundAlt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          fetchPriority="high"
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.65) 100%)" }} />
      </div>

      {/* Contenu centré */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "120px 32px 80px", textAlign: "center" }}>
        <p
          ref={eyebrowRef}
          style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.35em", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", marginBottom: "24px", opacity: 0, transform: "translateY(16px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          {config.subtitle}
        </p>
        <h1
          ref={titleRef}
          style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(3.5rem, 10vw, 9rem)", color: "white", lineHeight: 0.92, letterSpacing: "-0.02em", marginBottom: "28px", opacity: 0, transform: "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
        >
          {config.title}
        </h1>
        <p
          ref={subRef}
          style={{ color: "rgba(255,255,255,0.72)", fontSize: "1.1rem", lineHeight: 1.7, maxWidth: "500px", marginBottom: "48px", opacity: 0, transform: "translateY(16px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          {isEnglish
            ? "Two hours through the royal gardens of Versailles. Horses, history, and open sky."
            : "Deux heures dans les jardins royaux de Versailles. Des chevaux, de l'histoire, et le ciel ouvert."}
        </p>
        <div
          ref={ctaRef}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", opacity: 0, transform: "translateY(12px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          <Link
            href={`/reservation?lang=${lang}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "white", color: "#1A1A1A", padding: "16px 40px", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}
          >
            {isEnglish ? "Book the experience" : "Réserver l'expérience"}
            <span aria-hidden="true">→</span>
          </Link>
          <a
            href="#nos-chevaux"
            style={{ color: "rgba(255,255,255,0.55)", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "4px", transition: "color 0.2s" }}
          >
            {isEnglish ? "Meet our horses ↓" : "Rencontrer nos chevaux ↓"}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.4))", animation: "fadeInDown 2s ease infinite" }} />
      </div>
    </section>
  );
}
