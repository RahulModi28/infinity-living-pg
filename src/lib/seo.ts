import { site, rooms, faqs, amenityGroups, reviews, galleryShots, baseUrl } from "./site";
import type { Audience } from "./audiences";
import type { Post } from "./blog";

/**
 * Structured data. Keyword and phrasing choices below are grounded in live
 * Google Autocomplete data for this micro-market (see the keyword CSV):
 * people search "pg near christ university yeshwanthpur", "pg in yeshwanthpur
 * for gents", and landmark terms (metro, Nagasandra) — not
 * "student accommodation", which barely registers locally.
 */

const clean = (v: string) => (v.startsWith("[") ? undefined : v);

/**
 * Empty while `reviews` is empty (see site.ts — invented testimonials were
 * removed on purpose). The moment real, permissioned reviews are added there,
 * this starts emitting AggregateRating + Review schema with no other change
 * needed — competitors in this micro-market (Stanza Living) already show a
 * review-backed LocalBusiness in search/AI results and this closes that gap
 * without publishing a single number that isn't real.
 */
function ratingFields() {
  if (reviews.length === 0) return {};
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: Number(avg.toFixed(1)),
      reviewCount: reviews.length,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
    })),
  };
}

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
    ...ratingFields(),
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
      ...(site.foodAvailable ? ["Four meals a day cooked on site (Mon–Fri)"] : []),
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

/** Breadcrumb + FAQ schema for the dedicated /faq page. */
export function faqPageJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl() },
        { "@type": "ListItem", position: 2, name: "FAQ", item: `${baseUrl()}/faq` },
      ],
    },
    faqJsonLd(),
  ];
}

/**
 * Breadcrumb + ImageGallery schema for the dedicated /gallery page.
 *
 * Every image carries its own caption rather than a bare URL list: the alt
 * text already names the property and the campus, which is what makes these
 * usable in image search and quotable when an AI answer describes the place.
 */
export function galleryPageJsonLd() {
  const base = baseUrl();
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        { "@type": "ListItem", position: 2, name: "Gallery", item: `${base}/gallery` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "@id": `${base}/gallery#gallery`,
      name: `Photographs of ${site.name}, ${site.address.locality}, ${site.address.city}`,
      description:
        "Real photographs of the rooms, rooftop dining hall, gym and common spaces at Infinity Space, a gents PG near Christ University Yeshwanthpur Campus, Bengaluru.",
      url: `${base}/gallery`,
      about: { "@id": `${base}/#business` },
      image: galleryShots.map((s) => ({
        "@type": "ImageObject",
        contentUrl: `${base}${s.src}`,
        caption: s.alt,
      })),
    },
  ];
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

/** Breadcrumb + Blog schema for the /blog index. */
export function blogIndexJsonLd(posts: Post[]) {
  const base = baseUrl();
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${base}/blog#blog`,
      name: `${site.name} Blog`,
      url: `${base}/blog`,
      publisher: { "@id": `${base}/#business` },
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `${base}/blog/${p.slug}`,
        datePublished: p.date,
      })),
    },
  ];
}

/**
 * Breadcrumb + BlogPosting for a single post. The publisher points at the
 * site-wide business entity by @id, so every post is attributed to the same
 * PG that the rest of the schema describes.
 */
export function blogPostJsonLd(p: Post) {
  const base = baseUrl();
  const url = `${base}/blog/${p.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: base },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
        { "@type": "ListItem", position: 3, name: p.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#post`,
      headline: p.title,
      description: p.description,
      url,
      mainEntityOfPage: url,
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
      image: `${base}${p.cover ?? "/images/og.png"}`,
      author:
        p.author === site.name
          ? { "@id": `${base}/#business` }
          : { "@type": "Person", name: p.author },
      publisher: { "@id": `${base}/#business` },
      isPartOf: { "@id": `${base}/blog#blog` },
    },
  ];
}
