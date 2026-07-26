import type { MetadataRoute } from "next";
import { masterclass } from "@/data/masterclass";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = masterclass.seo.canonicalUrl.replace(/\/$/, "");

  return [
    {
      url: `${base}/consumer-protection-law-masterclass`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
