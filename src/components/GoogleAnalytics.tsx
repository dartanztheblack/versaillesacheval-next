"use client";

import { useEffect } from "react";
import { CONSENT_EVENT, CONSENT_KEY } from "@/lib/consent";

const GA_ID = "G-9KKLX053HJ";

declare global {
  interface Window {
    dataLayer?: unknown[];
    __gaLoaded?: boolean;
  }
}

function loadGa() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  // Même amorce que le snippet officiel (gtag pousse l'objet `arguments`)
  const inline = document.createElement("script");
  inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`;
  document.head.appendChild(inline);
}

/** Google Analytics n'est chargé qu'après acceptation dans le bandeau cookies (CNIL). */
export function GoogleAnalytics() {
  useEffect(() => {
    const check = () => {
      try {
        if (localStorage.getItem(CONSENT_KEY) === "accepted") loadGa();
      } catch {
        // stockage indisponible : pas de consentement, pas de GA
      }
    };
    check();
    window.addEventListener(CONSENT_EVENT, check);
    return () => window.removeEventListener(CONSENT_EVENT, check);
  }, []);

  return null;
}
