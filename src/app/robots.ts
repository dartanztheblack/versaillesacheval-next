import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Les variantes à paramètres sont des doublons ; la version anglaise indexable est /en
        disallow: ["/admin", "/login", "/api/", "/*?success=", "/*?canceled="],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
