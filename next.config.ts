import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 390, 480, 768, 1024, 1280, 1440, 1920],
    // Required from Next 16 on: any `quality` passed to <Image> must be
    // declared here. 82 is the hero; 80 is what the rest of the page uses.
    qualities: [80, 82],
  },
  // The GEO technical audit flagged these as missing on every response.
  // No Content-Security-Policy here on purpose: AdSense, GA4 and the Meta
  // pixel each load from a wide, changing set of subdomains, and a wrong CSP
  // silently breaks ad revenue rather than erroring loudly — narrower to add
  // once those three scripts' exact origins are enumerated and tested.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
