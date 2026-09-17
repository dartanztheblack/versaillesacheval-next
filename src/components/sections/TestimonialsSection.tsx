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
    rating: 5,
    platform: "TripAdvisor",
  },
  {
    text: "Nous avons offert cette balade à nos parents pour leurs 40 ans de mariage. Ils en parlent encore. Le guide était exceptionnel, les chevaux magnifiques.",
    textEn: "We offered this ride to our parents for their 40th wedding anniversary. They still talk about it. The guide was exceptional, the horses magnificent.",
    author: "Thomas & Marie",
    origin: "Lyon",
    date: "Juillet 2025",
    dateEn: "July 2025",
    rating: 5,
    platform: "Google",
  },
  {
    text: "I was terrified of horses before this. Our guide was incredibly patient, introduced us to the horses before we even mounted. By the end I didn't want to leave.",
    textEn: "I was terrified of horses before this. Our guide was incredibly patient, introduced us to the horses before we even mounted. By the end I didn't want to leave.",
    author: "Emma R.",
    origin: "London",
    date: "Août 2025",
    dateEn: "August 2025",
    rating: 5,
    platform: "GetYourGuide",
  },
  {
    text: "Le petit-déjeuner avec Alain Ducasse après la balade, c'était la cerise sur le gâteau. Une matinée parfaite, du lever du soleil sur le canal jusqu'au café.",
    textEn: "Breakfast at Alain Ducasse after the ride was the cherry on top. A perfect morning, from sunrise over the canal to coffee.",
    author: "Isabelle M.",
    origin: "Bordeaux",
    date: "Juin 2025",
    dateEn: "June 2025",
    rating: 5,
    platform: "Viator",
  },
];

export function TestimonialsSection({ lang = "fr" }: TestimonialsSectionProps) {
  const isEnglish = lang === "en";

  return (
    <section className="px-5 sm:px-10 md:px-16 bg-[#F4F2EE]" style={{ paddingTop: "200px", paddingBottom: "200px" }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-28">
          <RevealOnScroll>
            <p className="text-[#2C3E2D] tracking-[0.4em] text-[10px] font-medium uppercase mb-12">
              {isEnglish ? "Those who have lived it" : "Ceux qui l'ont vécu"}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <h2
              className="text-[clamp(2.4rem,4.5vw,4.5rem)] text-[#1A1A1A] leading-[1.1] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
            >
              {isEnglish ? "They came as tourists.\nThey left as something else." : "Ils sont arrivés comme touristes.\nIls sont repartis différemment."}
            </h2>
          </RevealOnScroll>
        </div>

        {/* Stats bar */}
        <RevealOnScroll>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mb-24 py-12 border-t border-b border-[#2C3E2D]/12">
            {[
              { value: "4.9/5", label: isEnglish ? "Average rating" : "Note moyenne" },
              { value: "200+", label: isEnglish ? "Experiences in 2025" : "Expériences en 2025" },
              { value: "97%", label: isEnglish ? "Would recommend" : "Recommanderaient" },
              { value: "#1", label: isEnglish ? "Unique experience Versailles" : "Expérience unique Versailles" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-4xl text-[#1A1A1A] mb-1"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-[#6B6B5F] tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Testimonials — 2 featured quotes */}
        <div className="flex flex-col gap-0">
          {testimonials.slice(0, 2).map((t, i) => (
            <RevealOnScroll key={t.author} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
              <blockquote
                className="border-t border-[#2C3E2D]/15"
                style={{ paddingTop: "56px", paddingBottom: "56px" }}
              >
                {/* Giant quote mark */}
                <span
                  className="block text-[#2C3E2D]/15 mb-6 leading-none select-none"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "6rem", fontWeight: 300, lineHeight: 1 }}
                  aria-hidden="true"
                >"</span>
                <p
                  className="text-[#1A1A1A] mb-10"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.3rem, 2.5vw, 2rem)", fontWeight: 300, lineHeight: 1.55 }}
                >
                  {isEnglish ? t.textEn : t.text}
                </p>
                <footer className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[#1A1A1A] tracking-wide">{t.author}</p>
                    <p className="text-xs text-[#6B6B5F] mt-1">{t.origin} · {isEnglish ? t.dateEn : t.date}</p>
                  </div>
                  <span className="text-[10px] text-[#8B7355] tracking-[0.2em] uppercase">
                    {t.platform}
                  </span>
                </footer>
              </blockquote>
            </RevealOnScroll>
          ))}
          <div className="border-t border-[#2C3E2D]/15" />
        </div>
      </div>
    </section>
  );
}
