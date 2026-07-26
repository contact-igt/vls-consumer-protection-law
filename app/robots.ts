import type { MetadataRoute } from "next";
import { masterclass } from "@/data/masterclass";

export default function robots(): MetadataRoute.Robots {
  const base = masterclass.seo.canonicalUrl.replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
