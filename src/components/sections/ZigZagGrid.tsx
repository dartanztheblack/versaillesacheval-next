"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";
import { SunDivider } from "@/components/Ornaments";
import { faqFr, faqEn } from "@/data/faq";

interface ZigZagGridProps {
  lang?: string;
}

export function ZigZagGrid({ lang = "fr" }: ZigZagGridProps) {
  const isEnglish = lang === "en";
  const faq = isEnglish ? faqEn : faqFr;

  return (
    <section className="section-pad" style={{ background: "#F4F2EE", paddingTop: "180px", paddingBottom: "180px" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto", paddingLeft: "32px", paddingRight: "32px" }}>

        {/* Header centré */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <RevealOnScroll>
            <p style={{ color: "#2C3E2D", letterSpacing: "0.3em", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", marginBottom: "24px" }}>
              {isEnglish ? "Practical information" : "Informations pratiques"}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#1A1A1A", lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              {isEnglish ? "Questions & answers" : "Questions fréquentes"}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={2}>
            <SunDivider style={{ marginTop: "36px" }} />
          </RevealOnScroll>
        </div>

        {/* FAQ */}
        <div>
          {faq.map((item, i) => (
            <RevealOnScroll key={i} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
              <details className="faq-item" style={{ borderTop: "1px solid rgba(44,62,45,0.12)" }}>
                <summary style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", cursor: "pointer", listStyle: "none", padding: "36px 0", gap: "24px" }}>
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "1rem", color: "#1A1A1A", lineHeight: 1.5, flex: 1, textAlign: "left" }}>
                    {item.q}
                  </h3>
                  <span className="faq-plus" style={{ color: "#2C3E2D", fontSize: "1.25rem", flexShrink: 0, marginTop: "2px" }} aria-hidden="true">+</span>
                </summary>
                <p style={{ color: "#6B6B5F", fontSize: "1rem", lineHeight: 1.9, paddingBottom: "36px", paddingRight: "32px" }}>
                  {item.a}
                </p>
              </details>
            </RevealOnScroll>
          ))}
          <div style={{ borderTop: "1px solid rgba(44,62,45,0.12)" }} />
        </div>

      </div>
    </section>
  );
}
