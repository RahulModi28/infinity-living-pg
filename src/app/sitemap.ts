import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/site";
import { audiences } from "@/lib/audiences";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = baseUrl();
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...Object.values(audiences).map((a) => ({
      url: `${base}/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
