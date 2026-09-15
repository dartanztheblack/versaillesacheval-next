import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { NarrativeText } from "@/components/sections/NarrativeText";
import { HorsesSection } from "@/components/sections/HorsesSection";
import { HorseCareSection } from "@/components/sections/HorseCareSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CardStack } from "@/components/sections/CardStack";
import { BreathSection } from "@/components/sections/BreathSection";
import { ZigZagGrid } from "@/components/sections/ZigZagGrid";
import { Footer } from "@/components/sections/Footer";
import { SITE_URL, SITE_NAME, SITE_PHONE, SITE_EMAIL } from "@/config";

export const metadata: Metadata = {
  title: "Balade à Cheval Versailles | Expérience Royale dans les Jardins du Château",
  description:
    "Balade à cheval à Versailles dans les jardins royaux — 2h avec guide expert, chevaux dressés, tickets Château inclus. Débutants bienvenus. À partir de 490€/pers. Réservation en ligne.",
  alternates: {
    canonical: SITE_URL,
    languages: { fr: SITE_URL, en: `${SITE_URL}?lang=en`, "x-default": SITE_URL },
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: "Versailles à Cheval – Balades Équestres dans les Jardins du Château",
    description:
      "Balade à cheval à Versailles – Découvrez les jardins du Château de Versailles à cheval avec un guide expert. Tickets d'accès inclus. Expérience unique et mémorable pour débutants comme confirmés.",
    url: SITE_URL,
    image: `${SITE_URL}/hero-real.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Versailles",
      addressRegion: "Île-de-France",
      postalCode: "78000",
      addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 48.8044, longitude: 2.123 },
    priceRange: "€€€",
    isAccessibleForFree: false,
    publicAccess: true,
    touristType: ["Familles", "Couples", "Groupes", "Solo"],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Chevaux pour débutants", value: true },
      { "@type": "LocationFeatureSpecification", name: "Tickets Château inclus", value: true },
      { "@type": "LocationFeatureSpecification", name: "Guide expert", value: true },
      { "@type": "LocationFeatureSpecification", name: "Enfants acceptés dès 8 ans", value: true },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description:
      "Centre équestre proposant des balades à cheval dans les jardins du Château de Versailles. Chevaux Marquise (Selle Français), Versailles (Lusitanien), Diane (Pur-sang) et Apollon (Frison).",
    url: SITE_URL,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Versailles",
      addressRegion: "Île-de-France",
      postalCode: "78000",
      addressCountry: "FR",
    },
    geo: { "@type": "GeoCoordinates", latitude: 48.8044, longitude: 2.123 },
    priceRange: "€€€",
    image: `${SITE_URL}/hero-real.jpg`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "200",
      bestRating: "5",
    },
    sameAs: [
      "https://www.instagram.com/versaillesacheval",
      "https://www.facebook.com/versaillesacheval",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Expériences équestres à Versailles",
      itemListElement: [
        {
          "@type": "Offer",
          name: "L'Expérience Royale Complète — Balade à cheval Versailles",
          description:
            "2h de balade à cheval dans les jardins royaux de Versailles. Tickets d'accès au Château inclus. Guide expert. Chevaux adaptés à tous niveaux.",
          price: "490",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/reservation`,
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Où faire une balade à cheval à Versailles ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Versailles à Cheval propose des balades à cheval dans les jardins du Château de Versailles. Nos promenades équestres de 2 heures traversent le Grand Canal, les bosquets et les allées royales dessinées par Le Nôtre.",
        },
      },
      {
        "@type": "Question",
        name: "Faut-il savoir monter à cheval pour une balade à Versailles ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non, aucune expérience équestre n'est nécessaire. Nos chevaux sont dressés pour accueillir des débutants. Un briefing de sécurité complet et une présentation individuelle avec votre cheval sont effectués avant chaque sortie.",
        },
      },
      {
        "@type": "Question",
        name: "Combien coûte une balade à cheval à Versailles ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'Expérience Royale Complète (2h de balade à cheval + tickets d'accès au Château de Versailles) est proposée à partir de 490€ par personne. Des options sont disponibles : visite guidée privée du Château (120€), déjeuner gastronomique Alain Ducasse (200€), transport depuis votre hôtel parisien (200-300€).",
        },
      },
      {
        "@type": "Question",
        name: "Les enfants peuvent-ils faire une balade à cheval à Versailles ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, à partir de 8 ans. Les enfants montent sur Marquise, notre jument Selle Français la plus douce. Pour les enfants de 5 à 7 ans, des balades en main accompagnées par un palefrenier sont disponibles en option.",
        },
      },
      {
        "@type": "Question",
        name: "Comment réserver une balade à cheval à Versailles ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La réservation se fait directement en ligne sur versaillesacheval.fr/reservation : choisissez votre date, le nombre de participants, vos options, et confirmez par paiement sécurisé Stripe. Confirmation immédiate par email.",
        },
      },
    ],
  },
];

interface PageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const { lang = "fr" } = await searchParams;

  return (
    <main className="bg-[#FAFAF8]">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Hero lang={lang} />
      <NarrativeText lang={lang} />
      <HorsesSection lang={lang} />
      <HorseCareSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <CardStack lang={lang} />
      <BreathSection lang={lang} />
      <ZigZagGrid lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
