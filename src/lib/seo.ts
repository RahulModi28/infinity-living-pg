import { site, rooms, faqs, amenityGroups, baseUrl } from "./site";
import type { Audience } from "./audiences";

/**
 * Structured data. Keyword and phrasing choices below are grounded in live
 * Google Autocomplete data for this micro-market (see the keyword CSV):
 * people search "pg near christ university yeshwanthpur", "pg in yeshwanthpur
 * for gents", and landmark terms (metro, Nagasandra) — not
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
      "Gents PG near Christ University Yeshwanthpur Campus, Bengaluru. Furnished single and double sharing rooms with Wi-Fi, meals, gym, housekeeping and biometric entry.",
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
    sameAs: [site.social.instagram],
    priceRange: "₹₹",
    areaServed: [
      { "@type": "Place", name: "Yeshwanthpur, Bengaluru" },
      { "@type": "Place", name: "Nagasandra, Bengaluru" },
      { "@type": "Place", name: "Malleshwaram, Bengaluru" },
    ],
    /**
     * Derived from amenityGroups rather than listed again here. The previous
     * hard-coded list silently fell behind as amenities were confirmed — it
     * was still missing the gym, the rooftop dining hall, the attached
     * bathroom and biometric entry long after those went live on the page.
     * Anything still bracketed is unconfirmed and stays out of the schema.
     */
    amenityFeature: [
      ...amenityGroups.flatMap((g) => g.items.filter((i) => !i.includes("["))),
      ...(site.foodAvailable ? ["Four meals a day, cooked on site"] : []),
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
      // Display string is "20,000"; schema needs a bare number.
      ...(clean(r.price)
        ? { price: r.price.replace(/[^\d.]/g, ""), priceCurrency: "INR" }
        : {}),
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
