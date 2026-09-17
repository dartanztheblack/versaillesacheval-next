"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";

interface TestimonialsSectionProps {
  lang?: string;
}

const testimonials = [
  {
    text: "Une expérience hors du temps. Traverser les allées de Versailles au pas, avec pour seul bruit le claquement des sabots — je n'oublierai jamais ça.",
    textEn: "A timeless experience. Walking through Versailles' allées at a gentle pace, with only the sound of hooves — I'll never forget it.",
    author: "Sophie L.",
    origin: "Paris",
    date: "Septembre 2025",
    dateEn: "September 2025",
    platform: "TripAdvisor",
  },
  {
    text: "Nous avons offert cette balade à nos parents pour leurs 40 ans de mariage. Ils en parlent encore. Le guide était exceptionnel, les chevaux magnifiques.",
    textEn: "We offered this ride to our parents for their 40th wedding anniversary. They still talk about it. The guide was exceptional, the horses magnificent.",
    author: "Thomas & Marie",
    origin: "Lyon",
    date: "Juillet 2025",
    dateEn: "July 2025",
    platform: "Google",
  },
];

export function TestimonialsSection({ lang = "fr" }: TestimonialsSectionProps) {
  const isEnglish = lang === "en";

  return (
    <section style={{ background: "#F4F2EE", paddingTop: "180px", paddingBottom: "180px", paddingLeft: "24px", paddingRight: "24px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>

        {/* Header */}
        <RevealOnScroll>
          <p style={{ color: "#2C3E2D", letterSpacing: "0.4em", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", marginBottom: "32px" }}>
            {isEnglish ? "Those who have lived it" : "Ceux qui l'ont vécu"}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={1}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)", color: "#1A1A1A", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "80px" }}>
            {isEnglish ? "They came as tourists.\nThey left as something else." : "Ils sont arrivés comme touristes.\nIls sont repartis différemment."}
          </h2>
        </RevealOnScroll>

        {/* Stats */}
        <RevealOnScroll>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "48px", marginBottom: "80px", paddingTop: "48px", paddingBottom: "48px", borderTop: "1px solid rgba(44,62,45,0.12)", borderBottom: "1px solid rgba(44,62,45,0.12)" }}>
            {[
              { value: "4.9/5", label: isEnglish ? "Average rating" : "Note moyenne" },
              { value: "200+", label: isEnglish ? "Experiences in 2025" : "Expériences en 2025" },
              { value: "97%", label: isEnglish ? "Would recommend" : "Recommanderaient" },
              { value: "#1", label: isEnglish ? "Unique experience" : "Expérience unique" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "2.5rem", color: "#1A1A1A", marginBottom: "6px" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "11px", color: "#6B6B5F", letterSpacing: "0.1em" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Témoignages */}
        {testimonials.map((t, i) => (
          <RevealOnScroll key={t.author} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
            <blockquote style={{ borderTop: "1px solid rgba(44,62,45,0.12)", paddingTop: "64px", paddingBottom: "64px", textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-serif)", fontSize: "5rem", fontWeight: 300, color: "rgba(44,62,45,0.12)", display: "block", lineHeight: 1, marginBottom: "24px" }} aria-hidden="true">"</span>
              <p style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(1.3rem, 2.5vw, 2rem)", color: "#1A1A1A", lineHeight: 1.6, marginBottom: "40px", maxWidth: "56ch", margin: "0 auto 40px" }}>
                {isEnglish ? t.textEn : t.text}
              </p>
              <p style={{ fontSize: "13px", fontWeight: 500, color: "#1A1A1A", letterSpacing: "0.05em" }}>{t.author}</p>
              <p style={{ fontSize: "11px", color: "#6B6B5F", marginTop: "6px" }}>{t.origin} · {isEnglish ? t.dateEn : t.date} · <span style={{ color: "#8B7355", letterSpacing: "0.1em" }}>{t.platform}</span></p>
            </blockquote>
          </RevealOnScroll>
        ))}
        <div style={{ borderTop: "1px solid rgba(44,62,45,0.12)" }} />

      </div>
    </section>
  );
}
