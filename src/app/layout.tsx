import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";
import { SITE_URL, SITE_NAME } from "@/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Balade à Cheval Versailles | Expérience Royale dans les Jardins",
    template: "%s | Versailles à Cheval",
  },
  description:
    "Balade à cheval à Versailles – Découvrez les jardins du Château à cheval avec un guide expert. Tickets d'accès inclus. Réservation en ligne, départ toute l'année.",
  keywords: [
    "balade à cheval versailles",
    "promenade cheval château versailles",
    "équitation versailles",
    "balade équestre paris",
    "activité insolite versailles",
    "expérience royale versailles",
    "cheval jardins versailles",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: `${SITE_URL}/hero-real.jpg`, width: 1200, height: 630, alt: "Balade à cheval à Versailles" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/hero-real.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
    languages: { fr: SITE_URL, en: `${SITE_URL}?lang=en` },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

const GA_ID = "G-9KKLX053HJ";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`,
          }}
        />
      </head>
      <body>
        {children}
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
