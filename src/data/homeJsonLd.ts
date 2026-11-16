import { SITE_URL, SITE_NAME, SITE_PHONE, SITE_EMAIL, cardStackConfig } from "@/config";
import { faqFr, faqEn } from "@/data/faq";
import { allGalleryPhotos } from "@/data/gallery";

const galleryImageUrls = allGalleryPhotos.map((photo) => `${SITE_URL}${photo.src}`);
const basePrice = cardStackConfig.cards[0].basePrice;

/** Données structurées de la page d'accueil, en français ou en anglais. */
export function buildHomeJsonLd(lang: "fr" | "en") {
  const isEnglish = lang === "en";
  const pageUrl = isEnglish ? `${SITE_URL}/en` : SITE_URL;
  const faq = isEnglish ? faqEn : faqFr;

  return [
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
    image: galleryImageUrls,
    logo: `${SITE_URL}/apple-icon.png`,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Versailles" },
      { "@type": "City", name: "Paris" },
      { "@type": "AdministrativeArea", name: "Île-de-France" },
    ],
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
          price: String(basePrice),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/reservation`,
        },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ["fr", "en"],
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: isEnglish
      ? "Private horseback ride in the park of the Palace of Versailles"
      : "Balade à cheval privée dans le parc du Château de Versailles",
    description: isEnglish
      ? "Private 2-hour horseback ride in the park of the Palace of Versailles with a dedicated guide. Palace access tickets included. Beginners welcome."
      : "Balade à cheval privée de 2 heures dans le parc du Château de Versailles avec un guide dédié. Billets d'accès au Château inclus. Débutants bienvenus.",
    image: galleryImageUrls.slice(0, 6),
    brand: { "@type": "Brand", name: SITE_NAME },
    offers: {
      "@type": "Offer",
      price: String(basePrice),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/reservation${isEnglish ? "?lang=en" : ""}`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: isEnglish ? "Horseback riding in Versailles — photos" : "Balade à cheval à Versailles — photos",
    url: pageUrl,
    image: allGalleryPhotos.map((photo) => ({
      "@type": "ImageObject",
      contentUrl: `${SITE_URL}${photo.src}`,
      name: isEnglish ? photo.altEn : photo.alt,
      caption: isEnglish ? photo.altEn : photo.alt,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  },
  ];
}
