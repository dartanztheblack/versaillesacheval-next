import Link from "next/link";
import { SITE_NAME } from "@/config";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", display: "flex", flexDirection: "column" }}>
      <nav style={{ borderBottom: "1px solid rgba(44,62,45,0.1)", background: "#FAFAF8" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px 40px" }}>
          <Link href="/" style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "1.1rem", color: "#1A1A1A" }}>
            {SITE_NAME}
          </Link>
        </div>
      </nav>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 32px" }}>
        <p style={{ fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase", color: "#8B7355", marginBottom: "24px" }}>
          Erreur 404
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(3rem, 8vw, 7rem)", color: "#1A1A1A", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "24px" }}>
          Page introuvable
        </h1>
        <p style={{ color: "#6B6B5F", fontSize: "1rem", lineHeight: 1.8, maxWidth: "420px", marginBottom: "48px" }}>
          Cette page n'existe pas ou a été déplacée. Revenez à l'accueil pour explorer nos expériences équestres.
        </p>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/"
            style={{ display: "inline-block", background: "#2C3E2D", color: "#FAFAF8", padding: "18px 48px", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}
          >
            Retour à l'accueil
          </Link>
          <Link
            href="/reservation"
            style={{ display: "inline-block", border: "1px solid rgba(44,62,45,0.3)", color: "#2C3E2D", padding: "18px 48px", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500 }}
          >
            Réserver
          </Link>
        </div>
      </div>
    </div>
  );
}
