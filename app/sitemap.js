/**
 * génère le sitemap
 * @todo factoriser la détection de BASE_URL
 * @todo mulitple sitemaps ? (logements)
 */

import { apiListProperties } from "./lib/api-bridge";

let BASE_URL;
if (process.env.ENV === "dev") {
  BASE_URL = "http://localhost:3000";
} else {
  BASE_URL = "https://oc-projet-8-kasa-olive.vercel.app";
}

export default async function sitemap() {

  // les pages /favoris /messagerie et /logout n'ont pas à figurer dans le sitemap
  const sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    // liste des logements
  ];

  // lien vers toutes les propriétés
  const propertyList = await apiListProperties();

  for (const property of propertyList) {
    sitemap.push(
      {
        url: `${BASE_URL}/logement/${property.id}/${property.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.2,
      },
    );
  }

  return sitemap;
}