"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";

interface HorseCareSectionProps {
  lang?: string;
}

const principles = [
  {
    number: "01",
    title: "Liberté au quotidien",
    titleEn: "Freedom every day",
    text: "Nos chevaux ne travaillent pas plus de 4h par jour. Le reste du temps, ils sont en pré, en liberté, dans le Domaine de Versailles. L'équilibre entre travail et repos est notre priorité absolue.",
    textEn: "Our horses work no more than 4 hours a day. The rest of the time, they roam freely in the meadows of the Versailles estate. Balance between work and rest is our absolute priority.",
  },
  {
    number: "02",
    title: "Alimentation naturelle",
    titleEn: "Natural feeding",
    text: "Foin local, avoine, carottes fraîches. Aucun additif chimique. Chaque cheval a un suivi nutritionnel personnalisé par notre vétérinaire partenaire.",
    textEn: "Local hay, oats, fresh carrots. No chemical additives. Each horse has personalised nutritional monitoring by our partner veterinarian.",
  },
  {
    number: "03",
    title: "Soins et pansage",
    titleEn: "Grooming and care",
    text: "Un pansage complet avant et après chaque sortie. Maréchal-ferrant toutes les 6 semaines. Nos palefreniers connaissent chaque cheval par son nom — et chaque cheval les connaît.",
    textEn: "Full grooming before and after every ride. Farrier every 6 weeks. Our grooms know each horse by name — and each horse knows them.",
  },
  {
    number: "04",
    title: "Zéro stress, zéro contrainte",
    titleEn: "Zero stress, zero force",
    text: "Nous n'utilisons jamais d'éperons ni de martingales de contrainte. Notre méthode s'appuie sur la confiance et la communication. Un cheval serein transmet sa sérénité à son cavalier.",
    textEn: "We never use spurs or restrictive martingales. Our method relies on trust and communication. A calm horse passes its calm to its rider.",
  },
];

export function HorseCareSection({ lang = "fr" }: HorseCareSectionProps) {
  const isEnglish = lang === "en";

  return (
    <section className="px-5 sm:px-10 md:px-16 bg-[#FAFAF8]" style={{ paddingTop: "200px", paddingBottom: "200px" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: text block */}
          <div className="lg:sticky lg:top-24">
            <RevealOnScroll>
              <p className="text-[#2C3E2D] tracking-[0.3em] text-xs font-medium uppercase mb-6">
                {isEnglish ? "Our philosophy" : "Notre philosophie"}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={1}>
              <h2
                className="text-[clamp(2rem,4vw,3.5rem)] text-[#1A1A1A] leading-[1.1] tracking-[-0.02em] mb-8"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
              >
                {isEnglish
                  ? "We believe in horses that are happy before they are useful."
                  : "Nous croyons en des chevaux heureux avant d'être utiles."}
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={2}>
              <p className="text-[#6B6B5F] text-base leading-relaxed mb-8">
                {isEnglish
                  ? "A horse under stress transmits fear. A horse cared for with respect transmits grace. This is why every detail of our horses' daily lives matters — for them, and for the quality of your experience."
                  : "Un cheval sous pression transmet la peur. Un cheval soigné avec respect transmet de la grâce. C'est pourquoi chaque détail du quotidien de nos chevaux compte — pour eux, et pour la qualité de votre expérience."}
              </p>
            </RevealOnScroll>

            {/* Image with fade to white */}
            <RevealOnScroll delay={3}>
              <div className="relative overflow-hidden" style={{ height: "320px" }}>
                <img
                  src="/breath-canal.jpg"
                  alt={isEnglish ? "Horses grazing in the Versailles estate" : "Chevaux au pré dans le Domaine de Versailles"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.parentElement!.style.background = "#E8DDD0";
                    el.style.display = "none";
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 60%, #FAFAF8 100%)" }}
                />
              </div>
            </RevealOnScroll>
          </div>

          {/* Right: principles */}
          <div className="space-y-16">
            {principles.map((p, i) => (
              <RevealOnScroll key={p.number} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
                <div className="border-t border-[#2C3E2D]/12 pt-10">
                  <span className="text-xs text-[#8B7355] tracking-[0.2em] font-medium">{p.number}</span>
                  <h3
                    className="text-2xl text-[#1A1A1A] mt-3 mb-5"
                    style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
                  >
                    {isEnglish ? p.titleEn : p.title}
                  </h3>
                  <p className="text-[#6B6B5F] text-base leading-[1.85]">
                    {isEnglish ? p.textEn : p.text}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
