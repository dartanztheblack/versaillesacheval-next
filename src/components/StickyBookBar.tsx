"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cardStackConfig } from "@/config";

/** Sur mobile : barre de réservation qui reste en bas d'écran une fois l'image d'accueil passée. */
export function StickyBookBar({ lang = "fr" }: { lang?: string }) {
  const isEnglish = lang === "en";
  const [shown, setShown] = useState(false);
  const price = cardStackConfig.cards[0].basePrice;

  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 500;
      setShown(window.scrollY > window.innerHeight * 0.800 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-book${shown ? " is-shown" : ""}`} aria-hidden={!shown}>
      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", lineHeight: 1.3 }}>
        {isEnglish ? "From" : "À partir de"}
        <strong style={{ display: "block", fontFamily: "var(--font-serif)", fontWeight: 400, fontSize: "1.25rem", color: "#fff" }}>
          {price}€ <span style={{ fontSize: "12px", fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.75)" }}>/ {isEnglish ? "person" : "pers."}</span>
        </strong>
      </p>
      <Link
        href={`/reservation?lang=${lang}`}
        tabIndex={shown ? 0 : -1}
        style={{ background: "#FAFAF8", color: "#1A1A1A", padding: "13px 22px", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, whiteSpace: "nowrap" }}
      >
        {isEnglish ? "Book" : "Réserver"} →
      </Link>
    </div>
  );
}
