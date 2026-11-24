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
import { SITE_URL } from "@/config";
import { buildHomeJsonLd } from "@/data/homeJsonLd";
import { TrustBar } from "@/components/sections/TrustBar";
import { StickyBookBar } from "@/components/StickyBookBar";

const EN_URL = `${SITE_URL}/en`;
const title = "Private Horseback Riding in the Park of the Palace of Versailles | Versailles à Cheval";
const description =
  "Private 2-hour horseback ride in the park of the Palace of Versailles with an expert guide. Palace tickets included, beginners welcome. From €550 per person. Book online.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: EN_URL,
    languages: { fr: SITE_URL, en: EN_URL, "x-default": SITE_URL },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: EN_URL,
    title,
    description,
    images: [{ url: `${SITE_URL}/hero-real.jpg`, width: 1200, height: 630, alt: "Horseback riding in Versailles" }],
  },
};

const jsonLdEn = buildHomeJsonLd("en");

export default function HomePageEn() {
  const lang = "en";

  return (
    <main lang="en" className="bg-[#FAFAF8]">
      {jsonLdEn.map((schema, i) => (
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
