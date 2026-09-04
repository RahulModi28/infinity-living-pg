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
};

export default nextConfig;
