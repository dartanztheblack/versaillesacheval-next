"use client";

import { RevealOnScroll } from "@/components/RevealOnScroll";

interface ZigZagGridProps {
  lang?: string;
}

const faqFr = [
  {
    q: "Dois-je savoir monter à cheval pour faire une balade à Versailles ?",
    a: "Non. Aucune expérience équestre n'est requise. Nos chevaux sont spécialement entraînés pour accueillir des débutants. Un briefing de sécurité complet et une présentation individuelle avec votre cheval sont effectués avant chaque balade.",
  },
  {
    q: "Combien de temps dure la balade à cheval à Versailles ?",
    a: "L'Expérience Royale dure 2 heures. Ce temps inclut le briefing d'arrivée, la présentation des chevaux, la balade dans les jardins, et le temps de retour aux écuries. Comptez 2h30 au total pour votre journée.",
  },
  {
    q: "Les enfants peuvent-ils participer à la balade ?",
    a: "Oui, à partir de 8 ans. Les enfants montent sur Marquise, notre jument la plus douce. Pour les plus jeunes (5-7 ans), des balades en main accompagnées sont disponibles en option.",
  },
  {
    q: "Que se passe-t-il en cas de mauvais temps ?",
    a: "Nous sortons par tous les temps, sauf vent violent ou orage électrique. En cas d'annulation météo de notre fait, vous avez le choix entre un remboursement complet ou un report sans frais.",
  },
  {
    q: "Les tickets d'accès au Château sont-ils inclus ?",
    a: "Oui. L'Expérience Royale Complète inclut les tickets d'entrée aux jardins et au Château de Versailles. Pas besoin de faire la queue — vos tickets sont prépayés et disponibles à l'accueil.",
  },
  {
    q: "Comment se rendre aux écuries depuis Paris ?",
    a: "Les écuries sont accessibles en RER C (gare Versailles-Rive-Gauche, 40 min depuis Paris). Nous proposons également un service de transport privé depuis votre hôtel parisien.",
  },
];

const faqEn = [
  {
    q: "Do I need horse riding experience for the Versailles ride?",
    a: "No. No equestrian experience is required. Our horses are specially trained to welcome beginners. A full safety briefing and individual introduction with your horse are carried out before every ride.",
  },
  {
    q: "How long does the horse ride in Versailles last?",
    a: "The Royal Experience lasts 2 hours. This includes the arrival briefing, horse introduction, the ride through the gardens, and return to the stables. Allow 2.5 hours total for your day.",
  },
  {
    q: "Can children join the horse ride?",
    a: "Yes, from age 8. Children ride on Marquise, our gentlest mare. For younger children (5-7 years), led walks alongside a handler are available as an option.",
  },
  {
    q: "What happens in bad weather?",
    a: "We ride in all weather except strong winds or electrical storms. If we cancel for weather reasons, you can choose a full refund or a free rescheduling.",
  },
  {
    q: "Are Château tickets included?",
    a: "Yes. The Full Royal Experience includes entry tickets to both the gardens and the Château de Versailles. No queue — your tickets are prepaid and ready at reception.",
  },
  {
    q: "How do I get to the stables from Paris?",
    a: "The stables are accessible by RER C (Versailles-Rive-Gauche station, 40 minutes from Paris). We also offer private transport from your Parisian hotel.",
  },
];

export function ZigZagGrid({ lang = "fr" }: ZigZagGridProps) {
  const isEnglish = lang === "en";
  const faq = isEnglish ? faqEn : faqFr;

  return (
    <section style={{ background: "#F4F2EE", paddingTop: "180px", paddingBottom: "180px" }}>
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
        </div>

        {/* FAQ */}
        <div>
          {faq.map((item, i) => (
            <RevealOnScroll key={i} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
              <details style={{ borderTop: "1px solid rgba(44,62,45,0.12)" }}>
                <summary style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", cursor: "pointer", listStyle: "none", padding: "36px 0", gap: "24px" }}>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.15rem", color: "#1A1A1A", lineHeight: 1.4, flex: 1, textAlign: "left" }}>
                    {item.q}
                  </h3>
                  <span style={{ color: "#2C3E2D", fontSize: "1.25rem", flexShrink: 0, marginTop: "2px" }} aria-hidden="true">+</span>
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
