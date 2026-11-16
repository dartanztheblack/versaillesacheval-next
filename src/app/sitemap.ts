import type { MetadataRoute } from "next";
import { blogPostsData } from "@/data/blogPosts";
import { SITE_URL } from "@/config";
import { allGalleryPhotos } from "@/data/gallery";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const homeImages = allGalleryPhotos.map((photo) => `${SITE_URL}${photo.src}`);
  const homeLanguages = { fr: SITE_URL, en: `${SITE_URL}/en` };

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0, alternates: { languages: homeLanguages }, images: homeImages },
    { url: `${SITE_URL}/en`, lastModified: now, changeFrequency: "weekly", priority: 0.9, alternates: { languages: homeLanguages }, images: homeImages },
    { url: `${SITE_URL}/reservation`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE_URL}/cgu`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPostsData
    .filter((p) => p.published)
    .map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.createdAt).toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}`],
    }));

  return [...staticRoutes, ...blogRoutes];
}
