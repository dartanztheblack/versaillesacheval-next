"use client";

import { useState, useEffect, useCallback } from "react";
import { RevealOnScroll } from "@/components/RevealOnScroll";

interface GallerySectionProps {
  lang?: string;
}

interface Photo {
  src: string;
  alt: string;
  altEn: string;
}

const tabs = [
  { id: "balades", labelFr: "Balades équestres", labelEn: "Equestrian rides" },
  { id: "versailles", labelFr: "Versailles & Jardins", labelEn: "Versailles & Gardens" },
  { id: "survol", labelFr: "Survol aérien", labelEn: "Aerial flight" },
];

const photos: Record<string, Photo[]> = {
  balades: [
    { src: "/balade-canal-chateau.webp", alt: "Deux cavaliers au bord du Grand Canal avec le Château", altEn: "Two riders by the Grand Canal with the Château" },
    { src: "/cavaliers-allees-automne.webp", alt: "Cavaliers dans les allées du parc en automne", altEn: "Riders in the autumn park alleys" },
    { src: "/cavalier-grand-canal.webp", alt: "Cavalier seul au bord du Grand Canal", altEn: "Solo rider by the Grand Canal" },
    { src: "/cavaliers-dos-bois.webp", alt: "Cavaliers de dos dans les bois dorés", altEn: "Riders heading into the golden woodland" },
    { src: "/cavaliers-bois-lumiere.webp", alt: "Deux cavaliers dans les bois lumineux", altEn: "Two riders in the sunlit woods" },
    { src: "/cavaliers-parc-automne.webp", alt: "Cavaliers dans le parc de Versailles", altEn: "Riders in the Versailles park" },
    { src: "/equestre-bw-robe.webp", alt: "Femme en robe noire avec cheval noir", altEn: "Woman in black dress with black horse" },
    { src: "/equestre-bw-herbes.webp", alt: "Femme et cheval dans les herbes sauvages", altEn: "Woman and horse in wild grasses" },
    { src: "/hero-real.jpg", alt: "Cavaliers au bord du Grand Canal de Versailles", altEn: "Riders by the Grand Canal of Versailles" },
  ],
  versailles: [
    { src: "/versailles-sunset.webp", alt: "Château de Versailles au coucher du soleil", altEn: "Palace of Versailles at sunset" },
    { src: "/versailles-aerial-day.jpg", alt: "Vue aérienne du domaine de Versailles", altEn: "Aerial view of the Versailles estate" },
    { src: "/apollon-fountain.jpg", alt: "Fontaine d'Apollon dans les jardins royaux", altEn: "Apollo Fountain in the royal gardens" },
    { src: "/survol-versailles-gardens.jpg", alt: "Vue aérienne des jardins — bassins et allées", altEn: "Aerial view of the gardens — basins and alleys" },
    { src: "/survol-versailles-aerial.webp", alt: "Château de Versailles depuis les airs", altEn: "Versailles Palace from above" },
    { src: "/survol-chateau-panorama.webp", alt: "Panorama du Château depuis l'altitude", altEn: "Panorama of the Château from altitude" },
  ],
  survol: [
    { src: "/avion-cessna.webp", alt: "Cessna 177 sur l'aérodrome", altEn: "Cessna 177 at the airfield" },
    { src: "/survol-vue-cockpit.webp", alt: "Vue depuis le cockpit en vol", altEn: "Cockpit view in flight" },
    { src: "/survol-tableau-bord.webp", alt: "Tableau de bord en vol au-dessus de la région", altEn: "Instrument panel in flight over the region" },
  ],
};

export function GallerySection({ lang = "fr" }: GallerySectionProps) {
  const isEnglish = lang === "en";
  const [activeTab, setActiveTab] = useState("balades");
  const [lightbox, setLightbox] = useState<{ photos: Photo[]; index: number } | null>(null);

  const openLightbox = (tabId: string, index: number) => {
    setLightbox({ photos: photos[tabId], index });
  };

  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() => {
    if (!lightbox) return;
    setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.photos.length) % lightbox.photos.length });
  }, [lightbox]);

  const next = useCallback(() => {
    if (!lightbox) return;
    setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.photos.length });
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, closeLightbox, prev, next]);

  const current = lightbox ? lightbox.photos[lightbox.index] : null;

  return (
    <>
      <section id="galerie" style={{ background: "#1A1A1A", paddingTop: "140px", paddingBottom: "140px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", paddingLeft: "32px", paddingRight: "32px" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <RevealOnScroll>
              <p style={{ color: "rgba(201,185,154,0.8)", letterSpacing: "0.4em", fontSize: "10px", fontWeight: 500, textTransform: "uppercase", marginBottom: "20px" }}>
                {isEnglish ? "Gallery" : "Galerie"}
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={1}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "rgba(255,255,255,0.92)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                {isEnglish ? "The experience in images" : "L'expérience en images"}
              </h2>
            </RevealOnScroll>
          </div>

          {/* Tabs */}
          <RevealOnScroll delay={2}>
            <div style={{ display: "flex", justifyContent: "center", gap: "0", marginBottom: "56px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "14px 28px",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: activeTab === tab.id ? "#C9B99A" : "rgba(255,255,255,0.4)",
                    borderBottom: activeTab === tab.id ? "2px solid #C9B99A" : "2px solid transparent",
                    marginBottom: "-1px",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                >
                  {isEnglish ? tab.labelEn : tab.labelFr}
                </button>
              ))}
            </div>
          </RevealOnScroll>

          {/* Grid */}
          <div style={{
            columns: "3 280px",
            columnGap: "10px",
          }}>
            {photos[activeTab].map((photo, i) => (
              <div
                key={photo.src}
                onClick={() => openLightbox(activeTab, i)}
                style={{
                  breakInside: "avoid",
                  marginBottom: "10px",
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative",
                  display: "block",
                }}
              >
                <img
                  src={photo.src}
                  alt={isEnglish ? photo.altEn : photo.alt}
                  loading="lazy"
                  style={{
                    width: "100%",
                    display: "block",
                    transition: "transform 0.5s ease, filter 0.3s ease",
                    filter: "brightness(0.92)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)";
                    (e.currentTarget as HTMLImageElement).style.filter = "brightness(1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.92)";
                  }}
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightbox && current && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.95)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{ position: "absolute", top: "24px", right: "32px", background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: "28px", cursor: "pointer", lineHeight: 1, zIndex: 10 }}
            aria-label="Fermer"
          >
            ×
          </button>

          {/* Prev */}
          {lightbox.photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{ position: "absolute", left: "24px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", width: "48px", height: "48px", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
              aria-label="Précédent"
            >
              ‹
            </button>
          )}

          {/* Image */}
          <div style={{ maxWidth: "90vw", maxHeight: "88vh", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }} onClick={(e) => e.stopPropagation()}>
            <img
              src={current.src}
              alt={isEnglish ? current.altEn : current.alt}
              style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain", display: "block" }}
            />
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", letterSpacing: "0.1em", textAlign: "center" }}>
              {isEnglish ? current.altEn : current.alt} — {lightbox.index + 1} / {lightbox.photos.length}
            </p>
          </div>

          {/* Next */}
          {lightbox.photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={{ position: "absolute", right: "24px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "white", width: "48px", height: "48px", fontSize: "20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}
              aria-label="Suivant"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
