import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { NarrativeText } from "@/components/sections/NarrativeText";
import { CardStack } from "@/components/sections/CardStack";
import { BreathSection } from "@/components/sections/BreathSection";
import { ZigZagGrid } from "@/components/sections/ZigZagGrid";
import { Footer } from "@/components/sections/Footer";
import { SITE_URL, SITE_NAME, SITE_PHONE, SITE_EMAIL } from "@/config";

export const metadata: Metadata = {
  title: "Balade à Cheval Versailles | Expérience Royale dans les Jardins du Château",
  description:
    "Balade à cheval à Versailles – 2h dans les jardins royaux avec guide expert. Tickets d'accès au Château inclus. À partir de 490€/pers. Réservation en ligne.",
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
      "Balade à cheval à Versailles – Découvrez les jardins du Château de Versailles à cheval avec un guide expert. Tickets d'accès inclus. Expérience unique et mémorable.",
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
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    description: "Centre équestre proposant des balades à cheval dans les jardins du Château de Versailles",
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
          name: "L'Expérience Royale Complète",
          description: "2h de balade à cheval dans les jardins royaux. Tickets d'accès au Château inclus.",
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
          text: "Versailles à Cheval propose des balades à cheval dans les jardins du Château de Versailles. Nos promenades de 2 heures traversent le Grand Canal, les bosquets et les allées royales.",
        },
      },
      {
        "@type": "Question",
        name: "Combien coûte une balade à cheval à Versailles ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "L'Expérience Royale Complète (2h de balade à cheval + tickets d'accès au Château) est proposée à partir de 490€ par personne. Des options sont disponibles : visite guidée privée du Château (120€), déjeuner gastronomique Alain Ducasse (200€), transport depuis votre hôtel (200-300€).",
        },
      },
      {
        "@type": "Question",
        name: "Faut-il savoir monter à cheval ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Non, aucune expérience n'est nécessaire. Nos chevaux sont dressés pour accueillir des débutants. Un briefing de sécurité complet est dispensé avant chaque balade.",
        },
      },
      {
        "@type": "Question",
        name: "Comment réserver une balade à cheval à Versailles ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La réservation se fait directement en ligne sur versaillesacheval.fr/reservation : choisissez votre date, le nombre de participants, vos options, et confirmez par paiement sécurisé.",
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
    <main className="bg-[#F3F0EB]">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Hero lang={lang} />
      <NarrativeText lang={lang} />
      <CardStack lang={lang} />
      <BreathSection lang={lang} />
      <ZigZagGrid lang={lang} />
      <Footer lang={lang} />
    </main>
  );
}
