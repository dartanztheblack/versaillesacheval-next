"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";

interface HorsesSectionProps {
  lang?: string;
}

const horses = [
  {
    name: "Marquise",
    breed: "Selle Français",
    breedEn: "French Saddle Horse",
    color: "Baie",
    colorEn: "Bay",
    character: "Douce, attentive, idéale pour les débutants et les enfants.",
    characterEn: "Gentle, attentive — perfect for beginners and children.",
    image: "/card-real-1.jpg",
    fallbackBg: "#E8DDD0",
    initial: "M",
  },
  {
    name: "Versailles",
    breed: "Lusitanien",
    breedEn: "Lusitano",
    color: "Gris pommelé",
    colorEn: "Dapple grey",
    character: "Noble, calme sous la selle. Une présence royale pour les cavaliers confirmés.",
    characterEn: "Noble and calm under the saddle. A royal presence for experienced riders.",
    image: "/grid-real-1.jpg",
    fallbackBg: "#D8D4CE",
    initial: "V",
  },
  {
    name: "Diane",
    breed: "Pur-sang anglais",
    breedEn: "Thoroughbred",
    color: "Alezan",
    colorEn: "Chestnut",
    character: "Vive et expressive. Pour ceux qui veulent sentir l'énergie du cheval.",
    characterEn: "Spirited and expressive — for those who want to feel the horse's energy.",
    image: "/grid-real-2.jpg",
    fallbackBg: "#D4B896",
    initial: "D",
  },
  {
    name: "Apollon",
    breed: "Frison",
    breedEn: "Friesian",
    color: "Noir",
    colorEn: "Black",
    character: "Majestueux, profondément calme. Préféré des couples et des groupes.",
    characterEn: "Majestic, deeply calm. Favoured by couples and groups.",
    image: "/grid-stable.jpg",
    fallbackBg: "#2E2E2E",
    initial: "A",
  },
];

export function HorsesSection({ lang = "fr" }: HorsesSectionProps) {
  const isEnglish = lang === "en";

  return (
    <section id="nos-chevaux" className="py-32 px-6 bg-[#F4F2EE]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <RevealOnScroll>
            <p className="text-[#2C3E2D] tracking-[0.3em] text-xs font-medium uppercase mb-6">
              {isEnglish ? "Our horses" : "Nos chevaux"}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <h2
              className="text-[clamp(2rem,4.5vw,4rem)] text-[#1A1A1A] leading-[1.05] tracking-[-0.02em] mb-6"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
            >
              {isEnglish
                ? "Four horses. Four characters. One shared love."
                : "Quatre chevaux. Quatre caractères. Un amour commun."}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={2}>
            <p className="text-[#6B6B5F] text-base leading-relaxed">
              {isEnglish
                ? "Each horse is matched to your experience level and group. You will be introduced before departure."
                : "Chaque cheval est associé à votre niveau et à votre groupe. Vous ferez connaissance avant le départ."}
            </p>
          </RevealOnScroll>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {horses.map((horse, i) => (
            <RevealOnScroll key={horse.name} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
              <article className="group">
                {/* Photo or elegant placeholder */}
                <div className="aspect-[3/4] overflow-hidden mb-5 relative">
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: horse.fallbackBg }}
                  >
                    <img
                      src={horse.image}
                      alt={`${horse.name} — ${isEnglish ? horse.breedEn : horse.breed}, ${isEnglish ? horse.colorEn : horse.color}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    {/* Fallback monogram */}
                    <span
                      className="text-6xl select-none"
                      style={{
                        fontFamily: "var(--font-serif)",
                        color: horse.name === "Apollon" ? "rgba(250,250,248,0.35)" : "rgba(26,26,26,0.2)",
                        fontWeight: 300,
                      }}
                      aria-hidden="true"
                    >
                      {horse.initial}
                    </span>
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
                {/* Info */}
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3
                      className="text-xl text-[#1A1A1A]"
                      style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
                    >
                      {horse.name}
                    </h3>
                    <span className="text-xs text-[#8B7355] tracking-wide">
                      {isEnglish ? horse.colorEn : horse.color}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6B5F] uppercase tracking-[0.15em] mb-3">
                    {isEnglish ? horse.breedEn : horse.breed}
                  </p>
                  <p className="text-sm text-[#6B6B5F] leading-relaxed">
                    {isEnglish ? horse.characterEn : horse.character}
                  </p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
