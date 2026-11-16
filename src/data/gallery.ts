// Photos de la galerie : utilisées par la page, le sitemap d'images et les données structurées
export interface Photo {
  src: string;
  alt: string;
  altEn: string;
}

export const galleryTabs = [
  { id: "balades", labelFr: "Balades équestres", labelEn: "Equestrian rides" },
  { id: "versailles", labelFr: "Versailles & Jardins", labelEn: "Versailles & Gardens" },
  { id: "survol", labelFr: "Survol aérien", labelEn: "Aerial flight" },
];

export const galleryPhotos: Record<string, Photo[]> = {
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

export const allGalleryPhotos: Photo[] = Object.values(galleryPhotos).flat();
