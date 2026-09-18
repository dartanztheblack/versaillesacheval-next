import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/sections/Footer";
import { SITE_URL, SITE_NAME, SITE_EMAIL, SITE_PHONE } from "@/config";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation",
  description: "Conditions générales d'utilisation et de vente de Versailles à Cheval — réservation, paiement, annulation.",
  alternates: { canonical: `${SITE_URL}/cgu` },
  robots: { index: false, follow: false },
};

export default function CGUPage() {
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
          Conditions Générales d'Utilisation
        </h1>
        <p style={{ color: "#6B6B5F", marginBottom: "64px", fontSize: "14px" }}>Dernière mise à jour : septembre 2026</p>

        {[
          {
            title: "1. Éditeur du site",
            body: `Le site versaillesacheval.fr est édité par Versailles à Cheval.\nContact : ${SITE_EMAIL} — ${SITE_PHONE}`,
          },
          {
            title: "2. Objet",
            body: "Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site versaillesacheval.fr ainsi que la réservation de balades équestres dans les jardins du Château de Versailles.",
          },
          {
            title: "3. Réservation et paiement",
            body: "La réservation est considérée comme ferme et définitive après validation du paiement en ligne via Stripe. Le prix affiché est en euros TTC. Un email de confirmation est envoyé par Stripe à l'adresse fournie lors de la réservation.",
          },
          {
            title: "4. Politique d'annulation",
            body: "• Annulation jusqu'à 48h avant la date : remboursement intégral\n• Annulation entre 48h et 24h avant : remboursement à 50%\n• Annulation moins de 24h avant ou absence : aucun remboursement\n\nPour toute annulation, contactez-nous par email ou WhatsApp en précisant votre numéro de réservation Stripe.",
          },
          {
            title: "5. Conditions de participation",
            body: "La prestation est ouverte à toute personne en bonne santé physique. Les participants doivent :\n• Peser moins de 100 kg (limite liée au bien-être des chevaux)\n• Être âgés d'au moins 8 ans\n• Ne pas être sous l'influence d'alcool ou de substances\n\nNous nous réservons le droit de refuser la participation à toute personne ne respectant pas ces conditions, sans remboursement si le refus est dû à la non-divulgation préalable d'informations essentielles.",
          },
          {
            title: "6. Responsabilité",
            body: "La pratique équestre comporte des risques inhérents. Les participants sont informés de ces risques et y consentent. Un briefing de sécurité est dispensé avant chaque sortie. Versailles à Cheval est couvert par une assurance responsabilité civile professionnelle.",
          },
          {
            title: "7. Modifications",
            body: "Versailles à Cheval se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur le site.",
          },
          {
            title: "8. Propriété intellectuelle",
            body: "L'ensemble des contenus du site (textes, photos, design) sont la propriété exclusive de Versailles à Cheval et sont protégés par le droit d'auteur. Toute reproduction sans autorisation est interdite.",
          },
          {
            title: "9. Droit applicable",
            body: "Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux de Paris sont compétents.",
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
