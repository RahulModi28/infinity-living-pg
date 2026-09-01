import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { site, baseUrl } from "@/lib/site";
import { localBusinessJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import SmoothScroll from "@/components/SmoothScroll";
import Analytics from "@/components/Analytics";
import OverflowGuard from "@/components/OverflowGuard";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["500", "600", "700"],
});

/**
 * Title (58 chars) and description (154 chars) sit inside Google's display
 * limits and lead with the exact phrase people search — verified against live
 * Autocomplete: "pg near christ university yeshwanthpur" is the head term, and
 * "yeshwanthpur" is the spelling Google normalises to (not "yeshwantpur").
 */
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl()),
  title: {
    default: "PG near Christ University Yeshwanthpur Campus | Infinity Space",
    template: "%s | Infinity Space",
  },
  description:
    "Gents PG a 10 minute walk from Christ University Yeshwanthpur Campus, Bengaluru. Single ₹20,000, double ₹15,000 — electricity, four meals and Wi-Fi included.",
  keywords: [
    "pg near christ university yeshwanthpur",
    "pg near christ university yeshwanthpur campus",
    "pg in yeshwanthpur",
    "yeshwanthpur pg for gents price",
    "yeshwanthpur pg room rent",
    "gents pg yeshwanthpur",
    "boys pg near christ university yeshwanthpur campus",
    "pg near yeshwanthpur metro station",
    "student accommodation near christ university bangalore",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: site.name,
    title: "PG near Christ University Yeshwanthpur Campus | Infinity Space",
    description:
      "A gents PG in Yeshwanthpur, Bengaluru — furnished rooms, meals, Wi-Fi, gym and a 10 minute walk to Christ University Yeshwanthpur Campus.",
    images: [{ url: "/images/og.png", width: 1200, height: 630, type: "image/png", alt: "Infinity Space — PG near Christ University Yeshwanthpur Campus" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PG near Christ University Yeshwanthpur Campus | Infinity Space",
    description:
      "Furnished PG in Yeshwanthpur, Bengaluru — rooms, meals, Wi-Fi and 24/7 security, minutes from campus.",
    images: ["/images/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  category: "Student accommodation",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#121110" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <a
          href="#rooms"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory"
        >
          Skip to rooms
        </a>
        <SmoothScroll />
        <Analytics />
        <OverflowGuard />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd()) }}
        />
      </body>
    </html>
  );
}
