import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = baseUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /privacy and /terms were blocked while they were draft text; they
        // are complete now, and a readable privacy policy is a trust signal
        // (and an AdSense requirement), so only the API stays out.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
