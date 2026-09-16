import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/site";
import { audiences } from "@/lib/audiences";
import { getPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = baseUrl();
  const now = new Date();
  const posts = getPosts();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: posts[0] ? new Date(posts[0].date) : now, changeFrequency: "weekly", priority: 0.6 },
    // A post's own date, not the build time: lastModified that changes on
    // every deploy teaches crawlers to ignore it.
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
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
