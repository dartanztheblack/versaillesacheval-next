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
    <section id="nos-chevaux" style={{ background: "#F4F2EE", paddingTop: "180px", paddingBottom: "180px", paddingLeft: "24px", paddingRight: "24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Header centré */}
        <div style={{ textAlign: "center", marginBottom: "100px" }}>
          <RevealOnScroll>
            <p style={{ color: "#2C3E2D", letterSpacing: "0.4em", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", marginBottom: "32px" }}>
              {isEnglish ? "Our horses" : "Nos chevaux"}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)", color: "#1A1A1A", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: "32px", maxWidth: "600px", margin: "0 auto 32px" }}>
              {isEnglish
                ? "Four horses. Four characters. One shared love."
                : "Quatre chevaux. Quatre caractères. Un amour commun."}
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={2}>
            <p style={{ color: "#6B6B5F", fontSize: "1.1rem", lineHeight: 2, maxWidth: "48ch", margin: "0 auto" }}>
              {isEnglish
                ? "Each horse is matched to your experience level and group. You will be introduced before departure."
                : "Chaque cheval est associé à votre niveau et à votre groupe. Vous ferez connaissance avant le départ."}
            </p>
          </RevealOnScroll>
        </div>

        {/* Grille 2 colonnes */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "60px 48px" }}>
          {horses.map((horse, i) => (
            <RevealOnScroll key={horse.name} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
              <article style={{ textAlign: "center" }}>
                {/* Photo */}
                <div style={{ aspectRatio: "3/4", overflow: "hidden", marginBottom: "28px", position: "relative", background: horse.fallbackBg }}>
                  <img
                    src={horse.image}
                    alt={`${horse.name} — ${isEnglish ? horse.breedEn : horse.breed}`}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.7s ease" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <span
                    style={{ fontFamily: "var(--font-serif)", fontSize: "5rem", fontWeight: 300, color: horse.name === "Apollon" ? "rgba(250,250,248,0.3)" : "rgba(26,26,26,0.15)", position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                    aria-hidden="true"
                  >
                    {horse.initial}
                  </span>
                </div>
                {/* Infos centrées */}
                <p style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.5rem", color: "#1A1A1A", marginBottom: "8px" }}>
                  {horse.name}
                </p>
                <p style={{ fontSize: "10px", color: "#8B7355", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "16px" }}>
                  {isEnglish ? horse.breedEn : horse.breed} · {isEnglish ? horse.colorEn : horse.color}
                </p>
                <p style={{ fontSize: "0.9rem", color: "#6B6B5F", lineHeight: 1.9, maxWidth: "30ch", margin: "0 auto" }}>
                  {isEnglish ? horse.characterEn : horse.character}
                </p>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
