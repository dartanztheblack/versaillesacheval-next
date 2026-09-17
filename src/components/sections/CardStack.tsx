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
    <section style={{ background: "#FAFAF8", paddingTop: "180px", paddingBottom: "180px", paddingLeft: "24px", paddingRight: "24px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* Header centré */}
        <div style={{ textAlign: "center", marginBottom: "100px" }}>
          <RevealOnScroll>
            <p style={{ color: "#2C3E2D", letterSpacing: "0.4em", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", marginBottom: "32px" }}>
              {isEnglish ? config.sectionSubtitleEn : config.sectionSubtitle}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)", color: "#1A1A1A", lineHeight: 1.1, letterSpacing: "-0.03em", maxWidth: "580px", margin: "0 auto" }}>
              {isEnglish ? config.sectionTitleEn : config.sectionTitle}
            </h2>
          </RevealOnScroll>
        </div>

        {/* Cards */}
        {config.cards.map((card, i) => (
          <RevealOnScroll key={card.id} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
            <article style={{ borderTop: "1px solid rgba(44,62,45,0.12)", paddingTop: "72px", paddingBottom: "72px", textAlign: "center" }}>
              {/* Image */}
              <div style={{ overflow: "hidden", aspectRatio: "16/9", marginBottom: "48px" }}>
                <img
                  src={card.image}
                  alt={isEnglish ? card.titleEn : card.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {/* Contenu centré */}
              <span style={{ fontSize: "11px", color: "#8B7355", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                {isEnglish ? "From" : "À partir de"} {card.basePrice}€ / {isEnglish ? "person" : "pers."}
              </span>
              <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", color: "#1A1A1A", lineHeight: 1.15, marginTop: "16px", marginBottom: "20px" }}>
                {isEnglish ? card.titleEn : card.title}
              </h3>
              <p style={{ color: "#6B6B5F", fontSize: "1rem", lineHeight: 1.9, maxWidth: "50ch", margin: "0 auto 36px" }}>
                {isEnglish ? card.descriptionEn : card.description}
              </p>
              <Link
                href={`/reservation?tour=${card.id}&lang=${lang}`}
                style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "#2C3E2D", color: "#FAFAF8", padding: "14px 32px", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}
              >
                {isEnglish ? "Reserve this experience" : "Réserver cette expérience"}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          </RevealOnScroll>
        ))}
        <div style={{ borderTop: "1px solid rgba(44,62,45,0.12)" }} />

      </div>
    </section>
  );
}
