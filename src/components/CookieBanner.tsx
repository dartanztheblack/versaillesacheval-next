"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie_consent");
      if (!consent) setVisible(true);
    } catch {
      // private browsing — don't show
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem("cookie_consent", "accepted"); } catch {}
    setVisible(false);
  };

  const decline = () => {
    try { localStorage.setItem("cookie_consent", "declined"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement aux cookies"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "min(92vw, 680px)",
        background: "#1A1A1A",
        color: "#FAFAF8",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        flexWrap: "wrap",
        zIndex: 10000,
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      }}
    >
      <p style={{ flex: 1, fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.8)", minWidth: "200px" }}>
        Ce site utilise des analytics anonymisés (Vercel) pour améliorer votre expérience. Aucun cookie publicitaire.{" "}
        <Link href="/confidentialite" style={{ color: "#8B7355", textDecoration: "underline" }}>
          En savoir plus
        </Link>
      </p>
      <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{ padding: "10px 20px", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.6)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
        >
          Refuser
        </button>
        <button
          onClick={accept}
          style={{ padding: "10px 24px", background: "#2C3E2D", border: "none", color: "#FAFAF8", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontWeight: 500 }}
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
