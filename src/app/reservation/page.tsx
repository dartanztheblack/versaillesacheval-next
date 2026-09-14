import type { Metadata } from "next";
import { SITE_URL } from "@/config";
import { ReservationClient } from "./ReservationClient";

export const metadata: Metadata = {
  title: "Réservez votre Balade à Cheval à Versailles",
  description:
    "Réservez en ligne votre balade à cheval dans les jardins du Château de Versailles. Choisissez votre date, vos options et payez en toute sécurité.",
  alternates: { canonical: `${SITE_URL}/reservation` },
  robots: { index: true, follow: true },
};

interface PageProps {
  searchParams: Promise<{
    lang?: string;
    tour?: string;
    success?: string;
    canceled?: string;
  }>;
}

export default async function ReservationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return <ReservationClient searchParams={params} />;
}
