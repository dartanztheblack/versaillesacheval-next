import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { NarrativeText } from "@/components/sections/NarrativeText";
import { ProgrammeSection } from "@/components/sections/ProgrammeSection";
import { HorseCareSection } from "@/components/sections/HorseCareSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CardStack } from "@/components/sections/CardStack";
import { BreathSection } from "@/components/sections/BreathSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ZigZagGrid } from "@/components/sections/ZigZagGrid";
import { Footer } from "@/components/sections/Footer";
import { permanentRedirect } from "next/navigation";
import { SITE_URL } from "@/config";
import { buildHomeJsonLd } from "@/data/homeJsonLd";
import { TrustBar } from "@/components/sections/TrustBar";
import { StickyBookBar } from "@/components/StickyBookBar";

export const metadata: Metadata = {
  title: { absolute: "Balade à cheval privée dans le parc du Château de Versailles | Versailles à Cheval" },
  description:
    "Balade à cheval à Versailles dans les jardins royaux — 2h avec guide expert, chevaux dressés, tickets Château inclus. Débutants bienvenus. À partir de 550€/pers. Réservation en ligne.",
  alternates: {
    canonical: SITE_URL,
    languages: { fr: SITE_URL, en: `${SITE_URL}/en`, "x-default": SITE_URL },
  },
};

interface PageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const { lang: langParam } = await searchParams;
  // L'ancienne URL ?lang=en redirige vers la vraie page anglaise, indexable
  if (langParam === "en") permanentRedirect("/en");
  const lang = "fr";
  const jsonLd = buildHomeJsonLd(lang);

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
      <TrustBar lang={lang} />
      <NarrativeText lang={lang} />
      <ProgrammeSection lang={lang} />
      <HorseCareSection lang={lang} />
      <TestimonialsSection lang={lang} />
      <CardStack lang={lang} />
      <BreathSection lang={lang} />
      <GallerySection lang={lang} />
      <ZigZagGrid lang={lang} />
      <Footer lang={lang} />
      <StickyBookBar lang={lang} />
    </main>
  );
}
