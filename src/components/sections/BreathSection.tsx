"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/RevealOnScroll";

interface BreathSectionProps {
  lang?: string;
}

export function BreathSection({ lang = "fr" }: BreathSectionProps) {
  const isEnglish = lang === "en";

  return (
    <section style={{ position: "relative", overflow: "hidden", paddingTop: "200px", paddingBottom: "200px" }}>
      {/* Background with Ken Burns slow zoom */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }} aria-hidden="true">
        <img
          src="/breath-real.jpg"
          alt=""
          style={{
            width: "110%",
            height: "110%",
            objectFit: "cover",
            objectPosition: "center",
            marginLeft: "-5%",
            marginTop: "-5%",
            animation: "kenBurns 18s ease-in-out infinite alternate",
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).parentElement!.style.background = "#2C3E2D";
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(250,250,248,0.82) 0%, rgba(250,250,248,0.38) 50%, rgba(250,250,248,0.82) 100%)" }} />
      </div>

      {/* Contenu centré */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "680px", margin: "0 auto", textAlign: "center", paddingLeft: "32px", paddingRight: "32px" }}>
        <RevealOnScroll>
          <p style={{ color: "#2C3E2D", letterSpacing: "0.3em", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", marginBottom: "32px" }}>
            {isEnglish ? "The experience" : "L'expérience"}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={1}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(2.5rem, 6vw, 5.5rem)", color: "#1A1A1A", lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: "52px" }}>
            {isEnglish
              ? "Two hours you will keep for a lifetime."
              : "Deux heures que vous garderez toute une vie."}
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={2}>
          <Link
            href={`/reservation?lang=${lang}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              background: "#2C3E2D",
              color: "#FAFAF8",
              padding: "18px 48px",
              fontSize: "12px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
              transition: "background 0.3s, transform 0.3s",
              animation: "floatPulse 3s ease-in-out infinite",
            }}
          >
            {isEnglish ? "Book the experience" : "Réserver l'expérience"}
            <span aria-hidden="true" style={{ fontSize: "1rem" }}>→</span>
          </Link>
        </RevealOnScroll>
      </div>

      <style>{`
        @keyframes kenBurns {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.08) translate(-2%, -1%); }
        }
        @keyframes floatPulse {
          0%, 100% { box-shadow: 0 4px 24px rgba(44,62,45,0.25); transform: translateY(0); }
          50% { box-shadow: 0 8px 40px rgba(44,62,45,0.38); transform: translateY(-4px); }
        }
      `}</style>
    </section>
  );
}
