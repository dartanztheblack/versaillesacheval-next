import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { SITE_URL, SITE_NAME, SITE_EMAIL, SITE_PHONE } from "@/config";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de Versailles à Cheval — comment nous collectons, utilisons et protégeons vos données personnelles.",
  alternates: { canonical: `${SITE_URL}/confidentialite` },
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8" }}>
      <nav style={{ borderBottom: "1px solid rgba(44,62,45,0.1)", background: "#FAFAF8" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 40px" }}>
          <Link href="/" style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "1.1rem", color: "#1A1A1A" }}>
            {SITE_NAME}
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "80px 40px 120px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#1A1A1A", marginBottom: "16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Politique de confidentialité
        </h1>
        <p style={{ color: "#6B6B5F", marginBottom: "64px", fontSize: "14px" }}>Dernière mise à jour : septembre 2026</p>

        {[
          {
            title: "1. Responsable du traitement",
            body: `Versailles à Cheval est responsable du traitement de vos données personnelles dans le cadre de la réservation et de la prestation de balades à cheval à Versailles.\n\nContact : ${SITE_EMAIL} — ${SITE_PHONE}`,
          },
          {
            title: "2. Données collectées",
            body: "Nous collectons uniquement les données nécessaires à la réalisation de votre réservation : prénom, numéro de téléphone (WhatsApp), adresse email (optionnelle), date choisie, nombre de participants, et informations liées au paiement (traitées exclusivement par Stripe, nous n'y avons pas accès direct).\n\nNous collectons également des données de navigation anonymisées via Vercel Analytics pour améliorer l'expérience du site.",
          },
          {
            title: "3. Finalités du traitement",
            body: "Vos données sont utilisées pour :\n• Traiter votre réservation et vous envoyer une confirmation de paiement\n• Vous contacter via WhatsApp pour coordonner votre expérience\n• Envoyer le reçu de paiement (via Stripe)\n• Améliorer nos services (analytics anonymes)",
          },
          {
            title: "4. Base légale",
            body: "Le traitement est fondé sur l'exécution du contrat de prestation de service (réservation) et, pour les analytics, sur notre intérêt légitime à améliorer le site.",
          },
          {
            title: "5. Durée de conservation",
            body: "Vos données de réservation sont conservées pendant 3 ans à des fins comptables et légales, conformément à la réglementation française.",
          },
          {
            title: "6. Partage des données",
            body: "Nous ne vendons jamais vos données. Elles peuvent être partagées avec :\n• Stripe (paiement sécurisé) — politique disponible sur stripe.com/privacy\n• Vercel (hébergement et analytics anonymes) — politique disponible sur vercel.com/legal/privacy-policy",
          },
          {
            title: "7. Vos droits (RGPD)",
            body: `Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :\n• Droit d'accès à vos données\n• Droit de rectification\n• Droit à l'effacement (« droit à l'oubli »)\n• Droit à la limitation du traitement\n• Droit à la portabilité\n\nPour exercer ces droits : ${SITE_EMAIL}`,
          },
          {
            title: "8. Cookies",
            body: "Ce site utilise uniquement des cookies strictement nécessaires au fonctionnement technique (session, sécurité). Aucun cookie publicitaire ou de suivi tiers n'est utilisé. Les analytics Vercel sont anonymisés et sans cookie de suivi.",
          },
          {
            title: "9. Sécurité",
            body: "Le site est hébergé sur Vercel avec HTTPS forcé. Les paiements sont traités exclusivement par Stripe (certifié PCI DSS). Nous ne stockons jamais de données de carte bancaire.",
          },
          {
            title: "10. Contact et réclamation",
            body: `Pour toute question relative à vos données : ${SITE_EMAIL}\n\nVous pouvez également introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : cnil.fr`,
          },
        ].map(({ title, body }) => (
          <section key={title} style={{ marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.4rem", color: "#1A1A1A", marginBottom: "16px" }}>
              {title}
            </h2>
            <div style={{ fontSize: "15px", color: "#4A4A42", lineHeight: 1.9 }}>
              {body.split("\n").map((line, i) => (
                <p key={i} style={{ marginBottom: "8px" }}>{line}</p>
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer lang="fr" />
    </div>
  );
}
