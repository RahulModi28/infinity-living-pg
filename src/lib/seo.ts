import { site, rooms, faqs, homeFaqs, amenityGroups, reviews, galleryShots, baseUrl } from "./site";
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

/**
 * The business, the site and the offers as one @graph, emitted on every page
 * from the layout.
 *
 * Semrush's audit flagged this block on every crawled page: it used
 * `nearbyAttraction`, which is not a schema.org property, so the whole
 * LocalBusiness item failed validation. The campus now lives where the
 * vocabulary allows it — in `areaServed` and the description — and two
 * other quiet errors went with it: Offer.itemOffered cannot be an
 * Accommodation (a Place), and Accommodation.occupancy must be a
 * QuantitativeValue, not the string "1 person".
 */
export function localBusinessJsonLd() {
  const base = baseUrl();
  const business = `${base}/#business`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LodgingBusiness",
        "@id": business,
        name: site.name,
        description:
          "Gents PG about 850 m (a 10 minute walk) from Christ University Yeshwanthpur Campus, Bengaluru. Furnished single (₹20,000/month) and double sharing (₹16,000/person/month) rooms with meals, electricity, Wi-Fi, housekeeping, a gym and biometric entry included.",
        url: base,
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
                latitude: Number(site.address.lat),
                longitude: Number(site.address.lng),
              },
              hasMap: `https://www.google.com/maps?q=${site.address.lat},${site.address.lng}`,
            }
          : {}),
        image: [`${base}/images/og.png`, `${base}/images/entrance.jpg`, `${base}/images/room-single.jpg`],
        logo: `${base}/icon.png`,
        sameAs: [site.social.instagram],
        priceRange: "₹16,000–₹20,000 per month",
        currenciesAccepted: "INR",
        ...ratingFields(),
        audience: { "@type": "PeopleAudience", suggestedGender: "male" },
        areaServed: [
          { "@type": "CollegeOrUniversity", name: "Christ University — Yeshwanthpur Campus" },
          { "@type": "Place", name: "Yeshwanthpur, Bengaluru" },
          { "@type": "Place", name: "Nagasandra, Bengaluru" },
          { "@type": "Place", name: "HMT Layout, Bengaluru" },
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
        containsPlace: rooms.map((r) => ({
          "@type": "Accommodation",
          "@id": `${base}/#room-${r.id}`,
          name: `${r.name} room`,
          occupancy: {
            "@type": "QuantitativeValue",
            value: Number(r.occupancy.replace(/[^\d]/g, "")) || 1,
            unitText: "person",
          },
        })),
        makesOffer: rooms.map((r) => ({
          "@type": "Offer",
          name: `${r.name} room — PG near Christ University Yeshwanthpur`,
          availability: "https://schema.org/InStock",
          // Price is intentionally omitted while it is a placeholder: publishing a
          // fabricated price in schema is worse than publishing none.
          // Display string is "20,000"; schema needs a bare number.
          ...(clean(r.price)
            ? {
                price: Number(r.price.replace(/[^\d.]/g, "")),
                priceCurrency: "INR",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price: Number(r.price.replace(/[^\d.]/g, "")),
                  priceCurrency: "INR",
                  unitText: r.priceNote,
                  referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
                },
              }
            : {}),
          itemOffered: {
            "@type": "Service",
            name: `${r.name} PG room`,
            serviceType: "Paying guest accommodation",
            description: r.blurb,
            areaServed: "Yeshwanthpur, Bengaluru",
            provider: { "@id": business },
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: site.name,
        inLanguage: "en-IN",
        publisher: { "@id": business },
      },
    ],
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

/**
 * FAQPage for the homepage's "quick answers" block. Built from the same
 * entries the block renders, so the schema can never claim an answer the
 * page doesn't show.
 *
 * Replaces the homepage BreadcrumbList, whose second item pointed at
 * /#rooms — a fragment of the page itself, which is not a breadcrumb.
 */
export function homeFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs().map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
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
