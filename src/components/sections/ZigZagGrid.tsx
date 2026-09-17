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
    a: "Les écuries sont accessibles en RER C (gare Versailles-Rive-Gauche, 40 min depuis Paris). Nous proposons également un service de transport privé depuis votre hôtel parisien (supplément de 200€ pour 1-3 personnes, 300€ pour 4+).",
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
    a: "The stables are accessible by RER C (Versailles-Rive-Gauche station, 40 minutes from Paris). We also offer private transport from your Parisian hotel (supplement of €200 for 1-3 people, €300 for 4+).",
  },
];

export function ZigZagGrid({ lang = "fr" }: ZigZagGridProps) {
  const isEnglish = lang === "en";
  const faq = isEnglish ? faqEn : faqFr;

  return (
    <section className="px-8 bg-[#F4F2EE]" style={{ paddingTop: "200px", paddingBottom: "200px" }}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-24 text-center">
          <RevealOnScroll>
            <p className="text-[#2C3E2D] tracking-[0.3em] text-xs font-medium uppercase mb-6">
              {isEnglish ? "Practical information" : "Informations pratiques"}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={1}>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] text-[#1A1A1A] leading-[1.05] tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
            >
              {isEnglish ? "Questions & answers" : "Questions fréquentes"}
            </h2>
          </RevealOnScroll>
        </div>

        <div className="space-y-0">
          {faq.map((item, i) => (
            <RevealOnScroll key={i} delay={(i % 3) as 0 | 1 | 2 | 3 | 4}>
              <details className="group border-t border-[#2C3E2D]/12 py-8">
                <summary className="flex items-start justify-between cursor-pointer list-none gap-6">
                  <h3
                    className="text-base md:text-lg text-[#1A1A1A] leading-snug flex-1"
                    style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
                  >
                    {item.q}
                  </h3>
                  <span
                    className="text-[#2C3E2D] text-xl mt-0.5 flex-shrink-0 transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-5 text-[#6B6B5F] text-base leading-[1.85] pr-8">
                  {item.a}
                </p>
              </details>
            </RevealOnScroll>
          ))}
          <div className="border-t border-[#2C3E2D]/12" />
        </div>
      </div>
    </section>
  );
}
