// ─── Site ────────────────────────────────────────────────────────────────────
export const SITE_URL = "https://www.versaillesacheval.fr";
export const SITE_NAME = "Versailles à Cheval";
export const SITE_PHONE = "+33625757995";
export const SITE_EMAIL = "parisdreamhunt@gmail.com";

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const heroConfig = {
  backgroundImage: "/hero-real.jpg",
  backgroundAlt: "Deux cavaliers dans les allées du parc de Versailles",
  title: "Versailles à Cheval",
  subtitle: "L'EXPÉRIENCE ROYALE UNIQUE",
};

export const heroConfigEn = {
  backgroundImage: "/hero-real.jpg",
  backgroundAlt: "Two riders in the Versailles park alleys",
  title: "Versailles Horse Riding",
  subtitle: "THE UNIQUE ROYAL EXPERIENCE",
};

// ─── Narrative ────────────────────────────────────────────────────────────────
export const narrativeTextConfig = {
  line1: "Une expérience royale inoubliable",
  line2: "Balade à cheval dans les jardins royaux",
  line3: "Vivez une journée d'exception à Versailles. Enfourchez votre monture pour une balade de 2 heures à travers les jardins royaux, le Grand Canal et les bosquets cachés. Tickets d'accès au Château inclus. En option : visite guidée privée du Château et déjeuner gastronomique signé Alain Ducasse.",
};

export const narrativeTextConfigEn = {
  line1: "An unforgettable royal experience",
  line2: "Horseback Ride in the Royal Gardens",
  line3: "Live an exceptional day at Versailles. Mount your noble steed for a 2-hour ride through the Royal Gardens, Grand Canal, and hidden groves. Château access tickets included. Optional: private guided Château tour and gastronomic lunch by Chef Alain Ducasse.",
};

// ─── ZigZag Grid ──────────────────────────────────────────────────────────────
export const zigZagGridConfig = {
  sectionLabel: "VOTRE JOURNÉE ROYALE",
  sectionTitle: "Une expérience complète",
  items: [
    {
      id: "chateau",
      title: "Tickets d'Accès au Château",
      subtitle: "INCLUS DANS LA FORMULE",
      description: "Vos tickets d'accès au Château de Versailles sont inclus dans votre réservation. Profitez librement de la Galerie des Glaces, des Grands Appartements et des jardins. En option, ajoutez une visite guidée privée de 1h30 avec un guide expert pour une immersion totale dans l'histoire de Louis XIV.",
      image: "/grid-gardens.jpg",
      imageAlt: "Jardins du Château de Versailles",
      reverse: false,
    },
    {
      id: "cheval",
      title: "Balade à Cheval dans les Jardins",
      subtitle: "2H • ÉQUIPEMENT FOURNI",
      description: "Les jardins royaux sont immenses et incroyablement beaux. Vous monterez à cheval et, accompagné d'un guide expérimenté, explorerez les bosquets cachés, les fontaines spectaculaires et les vastes paysages entourant le Grand Canal. C'est le meilleur moyen d'apprécier l'échelle et la tranquillité de ce domaine historique.",
      image: "/grid-real-1.jpg",
      imageAlt: "Cavaliers dans les allées bordées de haies du château",
      reverse: true,
    },
    {
      id: "service",
      title: "Service Conciergerie Dédié",
      subtitle: "SUR MESURE",
      description: "Profitez d'un service personnalisé tout au long de votre expérience. De la réservation à la fin de votre journée, notre équipe s'occupe de chaque détail pour vous offrir une expérience sans stress et mémorable.",
      image: "/grid-real-2.jpg",
      imageAlt: "Deux cavaliers dans la verdure du parc",
      reverse: false,
    },
  ],
};

export const zigZagGridConfigEn = {
  sectionLabel: "YOUR ROYAL DAY",
  sectionTitle: "A complete experience",
  items: [
    {
      id: "chateau",
      title: "Château Access Tickets",
      subtitle: "INCLUDED IN THE PACKAGE",
      description: "Your Château de Versailles access tickets are included in your booking. Enjoy the Hall of Mirrors, Grand Apartments, and gardens at your leisure. Optionally add a 1.5-hour private guided tour with an expert guide for total immersion in Louis XIV's history.",
      image: "/grid-gardens.jpg",
      imageAlt: "Gardens of Versailles Palace",
      reverse: false,
    },
    {
      id: "cheval",
      title: "Horseback Ride in the Gardens",
      subtitle: "2H • EQUIPMENT PROVIDED",
      description: "The Royal Gardens are immense and incredibly beautiful. You will mount a noble steed and, accompanied by an experienced guide, explore the hidden groves, spectacular fountains, and vast landscapes surrounding the Grand Canal.",
      image: "/grid-real-1.jpg",
      imageAlt: "Riders in the château hedge-lined alleys",
      reverse: true,
    },
    {
      id: "service",
      title: "Dedicated Concierge Service",
      subtitle: "TAILOR-MADE",
      description: "Enjoy personalized service throughout your experience. From booking to the end of your day, our team takes care of every detail to offer you a stress-free and memorable experience.",
      image: "/grid-real-2.jpg",
      imageAlt: "Two riders in the park greenery",
      reverse: false,
    },
  ],
};

// ─── Breath Section ────────────────────────────────────────────────────────────
export const breathSectionConfig = {
  backgroundImage: "/breath-real.jpg",
  backgroundAlt: "Cavalier au bord du Grand Canal de Versailles",
  title: "Versailles",
  subtitle: "COMME VOUS NE L'AVEZ JAMAIS VU",
  description: "La magie opère lorsque vous enfourchez votre cheval pour explorer les jardins royaux. Tickets d'accès au Château inclus. Pour une journée complète, optez pour la visite guidée privée du Château et le déjeuner gastronomique Alain Ducasse.",
};

export const breathSectionConfigEn = {
  backgroundImage: "/breath-real.jpg",
  backgroundAlt: "Rider by the Grand Canal of Versailles",
  title: "Versailles",
  subtitle: "LIKE YOU'VE NEVER SEEN IT",
  description: "The magic happens as you mount your horse to explore the Royal Gardens. Château access tickets included. For a full day, add the private guided Château tour and the Alain Ducasse gastronomic lunch.",
};

// ─── Card Stack ───────────────────────────────────────────────────────────────
export const cardStackConfig = {
  sectionTitle: "Notre Formule",
  sectionTitleEn: "Our Package",
  sectionSubtitle: "L'EXPÉRIENCE COMPLÈTE",
  sectionSubtitleEn: "THE COMPLETE EXPERIENCE",
  cards: [
    {
      id: 1,
      image: "/card-real-1.jpg",
      title: "L'Expérience Royale Complète",
      titleEn: "The Complete Royal Experience",
      description: "2h de balade à cheval dans les jardins royaux. Tickets d'accès au Château inclus. À partir de 490€ par personne.",
      descriptionEn: "2-hour horseback ride in the Royal Gardens. Château access tickets included. From €490 per person.",
      rotation: -2,
      basePrice: 490,
    },
  ],
};

// ─── Add-ons ──────────────────────────────────────────────────────────────────
export interface AddOnOption {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
}

export const addOnOptions: AddOnOption[] = [
  {
    id: "chateau_visit",
    name: "Visite guidée du Château",
    nameEn: "Guided Château Tour",
    description: "1h30 de visite privée du Château avec un guide expert.",
    descriptionEn: "1.5-hour private Château visit with an expert guide.",
    price: 120,
  },
  {
    id: "lunch_ducasse",
    name: "Déjeuner gastronomique · Chef Alain Ducasse",
    nameEn: "Gastronomic Lunch · Chef Alain Ducasse",
    description: "Un déjeuner exclusif signé par le Chef étoilé Alain Ducasse. Entrée, plat, dessert et boisson.",
    descriptionEn: "An exclusive lunch by starred Chef Alain Ducasse. Starter, main course, dessert and drink.",
    price: 200,
  },
  {
    id: "lunch_bistro",
    name: "Déjeuner Bistro · Restaurant officiel du Château",
    nameEn: "Bistro Lunch · Official Château Restaurant",
    description: "Déjeuner dans l'un des restaurants officiels du Château. Entrée, plat, dessert et boisson.",
    descriptionEn: "Lunch at one of the official restaurants of the Palace. Starter, main course, dessert and drink.",
    price: 100,
  },
  {
    id: "transport",
    name: "Transport depuis votre hôtel",
    nameEn: "Transport from your hotel",
    description: "Transport privé de luxe depuis et vers votre hébergement à Paris.",
    descriptionEn: "Private luxury transportation to and from your Paris accommodation.",
    price: 200,
  },
];

// ─── Footer ───────────────────────────────────────────────────────────────────
export const footerConfig = {
  heading: "Prêt à vivre l'expérience royale ?",
  headingEn: "Ready to live the royal experience?",
  description: "Réservez votre journée d'exception dès maintenant. Balade à cheval dans les jardins royaux de Versailles.",
  descriptionEn: "Book your exceptional day now. Horseback ride in the Royal Gardens of Versailles.",
  ctaText: "Réserver mon expérience",
  ctaTextEn: "Book my experience",
  contact: [
    { type: "phone" as const, label: "+33 6 25 75 79 95", href: "tel:+33625757995" },
    { type: "email" as const, label: "parisdreamhunt@gmail.com", href: "mailto:parisdreamhunt@gmail.com" },
  ],
  address: ["Château de Versailles", "Place d'Armes", "78000 Versailles", "France"],
  socials: [
    { platform: "instagram", href: "https://instagram.com/versaillesacheval" },
    { platform: "facebook", href: "https://facebook.com/versaillesacheval" },
  ],
  logoText: "Versailles à Cheval",
  copyright: "© 2026 Versailles à Cheval. Tous droits réservés.",
  links: [
    { label: "Mentions légales", labelEn: "Legal Notice", href: "#" },
    { label: "CGV", labelEn: "Terms & Conditions", href: "#" },
  ],
};

// ─── Stripe add-on pricing (server-side source of truth) ─────────────────────
export const ADDON_PRICES: Record<string, (count: number) => number> = {
  transport: (count) => (count <= 3 ? 200 : 300),
  chateau_visit: (count) => (count <= 1 ? 120 : 240),
  lunch_ducasse: (count) => 200 * count,
  lunch_bistro: (count) => 100 * count,
};
