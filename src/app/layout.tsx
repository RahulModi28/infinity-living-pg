import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site, baseUrl } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/seo";
import SmoothScroll from "@/components/SmoothScroll";
import Analytics from "@/components/Analytics";
import OverflowGuard from "@/components/OverflowGuard";
import EdgeFade from "@/components/EdgeFade";
import WhatsAppGate from "@/components/WhatsAppGate";
import BookingDialog from "@/components/BookingDialog";

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
 * Title (58 chars) and description (157 chars) sit inside Google's display
 * limits and lead with the exact phrase people search — verified against live
 * Autocomplete: "pg near christ university yeshwanthpur" is the head term, and
 * "yeshwanthpur" is the spelling Google normalises to (not "yeshwantpur").
 *
 * "Infinity Space PG" and "boys PG" come from Semrush's On Page SEO Checker:
 * people search the brand as "infinity pg" / "infinity space pg", and "pg for
 * boys near me" is how students phrase it — neither appeared on the page.
 */
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl()),
  title: {
    default: "PG near Christ University Yeshwanthpur | Infinity Space PG",
    template: "%s | Infinity Space",
  },
  description:
    "Infinity Space is a boys PG a 10 minute walk from Christ University Yeshwanthpur Campus, Bengaluru. Single ₹20,000, double ₹16,000, meals and Wi-Fi included.",
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
    title: "PG near Christ University Yeshwanthpur | Infinity Space PG",
    description:
      "A gents PG in Yeshwanthpur, Bengaluru — furnished rooms, meals, Wi-Fi, gym and a 10 minute walk to Christ University Yeshwanthpur Campus.",
    images: [{ url: "/images/og.png", width: 1200, height: 630, type: "image/png", alt: "Infinity Space — PG near Christ University Yeshwanthpur Campus" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PG near Christ University Yeshwanthpur | Infinity Space PG",
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
  other: { "google-adsense-account": "ca-pub-1363796922613344" },
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
        {/* lazyOnload, not beforeInteractive: loaded before the page was
            interactive, AdSense's script was part of the main-thread work
            Semrush/Lighthouse counted as Total Blocking Time. Auto ads still
            run once it loads after everything else. Site ownership is proven
            by the google-adsense-account meta tag (see metadata.other) and
            public/ads.txt, neither of which needs the script in <head>. */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1363796922613344"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        {/* #main, not #rooms: every page renders this, and only the homepage
            has a rooms section — everywhere else the skip link went nowhere. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-ivory"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Analytics />
        <OverflowGuard />
        <EdgeFade />
        <WhatsAppGate />
        <BookingDialog />
        {children}
        {/* Only the business entity is site-wide — it is the same entity on
            every page, keyed by @id. The breadcrumb is not: /faq, /gallery and
            the audience page each publish their own, and emitting the
            homepage's here too put two contradictory BreadcrumbLists on those
            pages. It now lives on the homepage. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      </body>
    </html>
  );
}
