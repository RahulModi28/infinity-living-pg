import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = baseUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /privacy and /terms are still draft text (bracketed placeholders) —
        // kept out of every crawler, not just noindexed for Google, so no AI
        // answer engine ingests or cites unfinished legal copy either.
        disallow: ["/api/", "/privacy", "/terms"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
