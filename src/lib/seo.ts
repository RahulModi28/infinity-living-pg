import { site, rooms, faqs, baseUrl } from "./site";
import type { Audience } from "./audiences";

/**
 * Structured data. Keyword and phrasing choices below are grounded in live
 * Google Autocomplete data for this micro-market (see the keyword CSV):
 * people search "pg near christ university yeshwanthpur", "pg in yeshwanthpur
 * for ladies/gents", and landmark terms (metro, railway station) — not
 * "student accommodation", which barely registers locally.
 */

const clean = (v: string) => (v.startsWith("[") ? undefined : v);

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "LocalBusiness"],
    "@id": `${baseUrl()}/#business`,
    name: site.name,
    description:
      "PG near Christ University Yeshwanthpur Campus, Bengaluru. Furnished single, double and triple sharing rooms with Wi-Fi, meals, housekeeping and 24/7 security.",
    url: baseUrl(),
    telephone: clean(site.contact.phoneDisplay),
    email: clean(site.contact.email),
    address: {
      "@type": "PostalAddress",
      streetAddress: clean(site.address.street),
      addressLocality: site.address.locality,
      addressRegion: site.address.state,
      postalCode: clean(site.address.postalCode),
      addressCountry: site.address.country,
    },
    ...(clean(site.address.lat) && clean(site.address.lng)
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: site.address.lat,
            longitude: site.address.lng,
          },
        }
      : {}),
    image: `${baseUrl()}/images/og.png`,
    priceRange: "₹₹",
    areaServed: [
      { "@type": "Place", name: "Yeshwanthpur, Bengaluru" },
      { "@type": "Place", name: "Nagasandra, Bengaluru" },
      { "@type": "Place", name: "Malleshwaram, Bengaluru" },
    ],
    amenityFeature: [
      "High-speed Wi-Fi",
      "Meals",
      "Housekeeping",
      "Furnished rooms",
      "24/7 security",
      "Study desk",
    ].map((n) => ({ "@type": "LocationFeatureSpecification", name: n, value: true })),
    nearbyAttraction: {
      "@type": "CollegeOrUniversity",
      name: "Christ University — Yeshwanthpur Campus",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Yeshwanthpur",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    makesOffer: rooms.map((r) => ({
      "@type": "Offer",
      name: `${r.name} room — PG in Yeshwanthpur`,
      // Price is intentionally omitted while it is a placeholder: publishing a
      // fabricated price in schema is worse than publishing none.
      ...(clean(r.price) ? { price: r.price, priceCurrency: "INR" } : {}),
      itemOffered: { "@type": "Accommodation", name: r.name, occupancy: r.occupancy },
    })),
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl() },
      {
        "@type": "ListItem",
        position: 2,
        name: "PG near Christ University Yeshwanthpur Campus",
        item: `${baseUrl()}/#rooms`,
      },
    ],
  };
}

/** Breadcrumb + FAQ schema for a dedicated audience landing page. */
export function audienceJsonLd(a: Audience, base: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        { "@type": "ListItem", position: 2, name: a.title, item: `${base}/${a.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: a.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
}
