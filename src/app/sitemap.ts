import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/site";
import { audiences } from "@/lib/audiences";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = baseUrl();
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...Object.values(audiences).map((a) => ({
      url: `${base}/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // /privacy and /terms are intentionally omitted: both are noindexed and
    // disallowed in robots.ts while their legal text is still draft, and a
    // sitemap should only list pages you want crawled and indexed.
  ];
}
