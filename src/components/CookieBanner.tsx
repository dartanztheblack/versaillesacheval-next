"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CONSENT_EVENT, CONSENT_KEY } from "@/lib/consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [isEnglish, setIsEnglish] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) setVisible(true);
      setIsEnglish(
        window.location.pathname.startsWith("/en") ||
          new URLSearchParams(window.location.search).get("lang") === "en"
      );
    } catch {
      // private browsing — don't show
    }
  }, []);

  const accept = () => {
    try { localStorage.setItem(CONSENT_KEY, "accepted"); } catch {}
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setVisible(false);
  };

  const decline = () => {
    try { localStorage.setItem(CONSENT_KEY, "declined"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      className="cookie-banner"
      aria-label={isEnglish ? "Cookie consent" : "Consentement aux cookies"}
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
        {isEnglish
          ? "We use audience measurement (Vercel, Google Analytics) to improve the site. No advertising cookies."
          : "Ce site utilise des outils de mesure d'audience (Vercel, Google Analytics) pour s'améliorer. Aucun cookie publicitaire."}{" "}
        <Link href="/confidentialite" style={{ color: "#8B7355", textDecoration: "underline" }}>
          {isEnglish ? "Learn more" : "En savoir plus"}
        </Link>
      </p>
      <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{ padding: "10px 20px", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "rgba(255,255,255,0.6)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
        >
          {isEnglish ? "Decline" : "Refuser"}
        </button>
        <button
          onClick={accept}
          style={{ padding: "10px 24px", background: "#2C3E2D", border: "none", color: "#FAFAF8", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontWeight: 500 }}
        >
          {isEnglish ? "Accept" : "Accepter"}
        </button>
      </div>
    </div>
  );
}
