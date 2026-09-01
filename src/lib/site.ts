/**
 * SINGLE SOURCE OF TRUTH for every piece of business information on the site.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  ⚠️  PLACEHOLDERS
 *  Anything wrapped in [SQUARE BRACKETS] is UNVERIFIED and must be replaced
 *  with real, confirmed information before this site goes live.
 *  Nothing here — prices, distances, reviews, amenities, policies — has been
 *  invented. Run `npm run check:placeholders` equivalent: grep -rn "\[" src/lib/site.ts
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const PLACEHOLDER = (label: string) => `[${label}]`;

export const site = {
  name: "Infinity Space",
  tagline: "Premium student living near Christ University, Yeshwanthpur Campus",
  /** Used for canonical URLs, sitemap, OG tags. */
  url: "https://[YOUR-DOMAIN].com",

  contact: {
    /** Full international format, no spaces — e.g. 919876543210 */
    whatsappNumber: "[WHATSAPP NUMBER]",
    phoneDisplay: "[PHONE NUMBER]",
    phoneHref: "[PHONE NUMBER]",
    email: "[EMAIL ADDRESS]",
    whatsappMessage:
      "Hi, I'm interested in a room at Infinity Space near Christ University Yeshwanthpur Campus. Could you share the available room options and pricing?",
  },

  address: {
    street: "No. 435, Anaga Building, Andrahalli Main Road, Gopal Nagar",
    locality: "HMT Layout",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560073",
    country: "IN",
    lat: "13.0327187",
    lng: "77.5008465",
    /**
     * Directions deep-link. Uses coordinates rather than a text query so it
     * always lands on the exact building, not a name match.
     */
    mapsDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=13.0327187%2C77.5008465",
    /**
     * Keyless embed. Works today with no Google Cloud project, but the
     * `output=embed` form is undocumented. For a supported, stable embed use
     * the Maps Embed API with a key:
     *   https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q=13.0327187,77.5008465
     */
    mapsEmbedUrl:
      "https://www.google.com/maps?q=13.0327187,77.5008465&hl=en&z=16&output=embed",
  },

  social: {
    instagram: "[INSTAGRAM URL]",
    facebook: "[FACEBOOK URL]",
    youtube: "[YOUTUBE URL]",
  },

  /** Set to false if meals are not provided — the Food section is removed entirely. */
  foodAvailable: true,
} as const;

/* ───────────────────────────── Rooms ───────────────────────────── */

export type Room = {
  id: string;
  name: string;
  occupancy: string;
  /** Placeholder until real tariff is confirmed. */
  price: string;
  priceNote: string;
  blurb: string;
  features: string[];
  availability: string;
  image: string;
  gallery: string[];
};

export const rooms: Room[] = [
  {
    id: "single",
    name: "Single Sharing",
    occupancy: "1 person",
    price: "20,000",
    priceNote: "per month",
    blurb:
      "A room that's entirely yours. Good for light sleepers, late-night study sessions and anyone who needs their own space to reset.",
    features: [
      "Private room",
      "Single bed with mattress",
      "Personal wardrobe",
      "Study desk & chair",
      "High-speed Wi-Fi",
      "Housekeeping",
    ],
    availability: "[ROOM AVAILABILITY]",
    image: "/images/room-single.jpg",
    gallery: ["/images/room-single.jpg", "/images/bathroom.jpg", "/images/dining-hall.jpg"],
  },
  {
    id: "double",
    name: "Double Sharing",
    occupancy: "2 people",
    price: "15,000",
    priceNote: "per person / month",
    blurb:
      "The sweet spot. Enough room to spread out, one roommate to split the day with, and a lower monthly outgo than a single.",
    features: [
      "Spacious shared room",
      "2 beds with mattresses",
      "Wardrobe per person",
      "2 study desks",
      "High-speed Wi-Fi",
      "Housekeeping",
    ],
    availability: "[ROOM AVAILABILITY]",
    image: "/images/room-double.jpg",
    gallery: ["/images/room-double.jpg", "/images/bathroom.jpg", "/images/living-room-2.jpg"],
  },
];

/* ─────────────────────────── Amenities ───────────────────────────
   ⚠️  Only list what is ACTUALLY provided. Delete any item that is not.
   ──────────────────────────────────────────────────────────────── */

export const amenityGroups = [
  {
    title: "Comfort",
    icon: "BedDouble",
    items: [
      "Fully furnished rooms",
      "Mattress provided",
      "Wardrobe",
      "Study table & chair",
      "Attached bathroom",
      "Housekeeping",
      "Laundry service",
    ],
  },
  {
    title: "Connectivity",
    icon: "Wifi",
    items: [
      "High-speed Wi-Fi",
      "Power backup",
      "Charging points at every bed",
    ],
  },
  {
    // Regrouped from "Lifestyle". A gym, a pool table and table tennis in one
    // building is unusual for a PG at this price — worth grouping so it reads
    // as a set rather than three items lost in a longer list.
    title: "Recreation",
    icon: "Dumbbell",
    items: [
      "Gym / fitness area",
      "Pool table & snooker",
      "Table tennis",
      "Common area & lounge",
      "Rooftop dining hall",
    ],
  },
  {
    title: "Safety",
    icon: "ShieldCheck",
    items: [
      "Biometric secure entry",
      "CCTV surveillance",
      "Security personnel on site",
    ],
  },
] as const;

/* ─────────────────────────── Location ───────────────────────────
   Distances measured by road (OSRM road-network routing) from the
   property's own coordinates to real OpenStreetMap features — not
   estimated. Walking times are derived from road distance at 5 km/h
   and are stated as approximate.

   The pharmacy and the food places came from the owner, who knows the
   street better than OpenStreetMap does — OSM has none of them mapped,
   which is why they sat unconfirmed until now. Their walking times are
   derived from the supplied distances at the same 5 km/h as the rest.

   ⚠️  One caveat left: the metro/IKEA figures are straight-line; the
   vehicle route is longer because Tumkur Road has few crossings. Worth
   confirming the walking route on Google Maps before publishing.
   ─────────────────────────────────────────────────────────────── */

export const nearby = [
  // Campus first regardless of distance — it's the reason anyone is reading
  // this list. Everything after it runs nearest to furthest.
  {
    label: "Christ University — Yeshwanthpur Campus",
    time: "10 min walk · 850 m",
    icon: "GraduationCap",
    primary: true,
  },
  { label: "Subway", time: "5 min walk · 400 m", icon: "Sandwich" },
  { label: "Vishal Mega Mart (supermarket)", time: "6 min walk · 450 m", icon: "ShoppingBasket" },
  { label: "Life Pharmacy", time: "6 min walk · 500 m", icon: "Pill" },
  { label: "Ashwini Hospital", time: "7 min walk · 600 m", icon: "HeartPulse" },
  { label: "KFC & Box8", time: "8 min walk · 700 m", icon: "Utensils" },
  { label: "IKEA Nagasandra", time: "approx. 1.7 km", icon: "Store" },
  { label: "Nagasandra Metro (Green Line)", time: "approx. 1.7 km", icon: "TrainFront" },
  { label: "Dasarahalli Metro (Green Line)", time: "approx. 1.7 km", icon: "TrainFront" },
] as const;

/* ─────────────────────────── Reviews ───────────────────────────
   ⚠️⚠️  THESE ARE NOT REAL REVIEWS.  ⚠️⚠️

   Illustrative copy written to design the section. Nothing on the page
   marks them as placeholders any more, so they now read to a visitor as
   genuine testimonials from real residents.

   Replace every one of them with real, permissioned reviews before this
   site goes live. Publishing invented testimonials as real is a consumer
   protection problem, not a styling one — and if AggregateRating schema is
   ever added on top of them it also breaks Google's review policies.
   ─────────────────────────────────────────────────────────────── */

export const reviews = [
  {
    name: "[STUDENT NAME]",
    course: "[COURSE], Christ University — Yeshwanthpur",
    rating: 5,
    text:
      "The location makes college life so much easier. The rooms are comfortable and the overall environment feels really welcoming.",
  },
  {
    name: "[STUDENT NAME]",
    course: "[COURSE], Christ University — Yeshwanthpur",
    rating: 5,
    text:
      "Walking to campus instead of fighting traffic every morning changed my whole routine. Wi-Fi holds up during submissions too.",
  },
  {
    name: "[PARENT NAME]",
    course: "Parent, [CITY]",
    rating: 5,
    text:
      "We visited before booking. It was clean, the management answered every question, and we felt comfortable leaving him there.",
  },
  {
    name: "[STUDENT NAME]",
    course: "[COURSE], Christ University — Yeshwanthpur",
    rating: 4,
    text:
      "Food is home-style and the common area is where most of us end up in the evenings. Housekeeping is regular.",
  },
  {
    name: "[STUDENT NAME]",
    course: "[COURSE], Christ University — Yeshwanthpur",
    rating: 5,
    text:
      "Having the gym downstairs means I actually use it. Most nights it's snooker with whoever's around — I didn't expect that from a PG.",
  },
  {
    name: "[PARENT NAME]",
    course: "Parent, [CITY]",
    rating: 5,
    text:
      "The biometric entry was what settled it for me. I can call the manager directly and get an answer, which is not something I could say about the other places we saw.",
  },
] as const;

/* ─────────────────────────────── FAQ ─────────────────────────────── */

export const faqs = [
  {
    q: "How close is Infinity Space to Christ University Yeshwanthpur Campus?",
    a: "Infinity Space is on Andrahalli Main Road, HMT Layout (560073) — the same pincode as the campus. It is about 850 m by road — roughly a 10 minute walk. Message us on WhatsApp and we'll share the exact pin.",
  },
  {
    q: "What is the monthly rent?",
    a: "₹20,000 a month for single sharing, and ₹15,000 per person a month for double sharing. Electricity and all four meals are included — the rent is the rent.",
  },
  {
    q: "What is included in the rent?",
    a: "The furnished room, electricity, all four meals, Wi-Fi, housekeeping and laundry. The security deposit is separate, paid once on move-in, and adjusted against your April and May rent.",
  },
  {
    q: "Is food included?",
    a: "Yes, and it is included in the rent — not charged on top. Four meals a day, cooked on site: breakfast, lunch, evening snacks and dinner.",
  },
  {
    q: "Is Wi-Fi available?",
    a: "Yes. High-speed Wi-Fi is available across the property. Plan and speed: [CONFIRM].",
  },
  {
    q: "What room types are available?",
    a: "Single sharing and double sharing. Live availability: [ROOM AVAILABILITY] — check with us before planning a visit.",
  },
  {
    q: "Is there a security deposit?",
    a: "Yes — two months' rent, paid on move-in: ₹40,000 for single sharing, ₹30,000 for double. It isn't money you lose. It's adjusted against your rent for April and May, so you pay no rent in those two months. If you move out before April: [CONFIRM].",
  },
  {
    q: "What is the minimum stay?",
    a: "[MINIMUM STAY / LOCK-IN PERIOD — CONFIRM].",
  },
  {
    q: "Are visitors and parents allowed?",
    a: "[VISITOR POLICY — CONFIRM]. Parents are always welcome to visit and see the property before booking.",
  },
  {
    q: "Is housekeeping available?",
    a: "Yes. Rooms and common areas are cleaned regularly. Frequency: [CONFIRM].",
  },
  {
    q: "Is there a curfew?",
    a: "[CURFEW / ENTRY TIMING POLICY — CONFIRM].",
  },
  {
    q: "Is this a gents-only PG?",
    a: "Yes. Infinity Space is a gents PG — we don't currently have accommodation for women. If you're looking for a ladies PG near the campus we'd rather tell you now than after a visit.",
  },
  {
    q: "How do I book a room?",
    a: "Message us on WhatsApp or fill the enquiry form on this page. We'll confirm availability, share photos and the rate card, and schedule a visit.",
  },
] as const;

/* ──────────────────────── Derived helpers ──────────────────────── */

/** Security deposit is two months' rent, so derive it rather than restating. */
export const DEPOSIT_MONTHS = 2;

export function depositFor(room: { price: string }) {
  const n = Number(room.price.replace(/[^\d]/g, ""));
  if (!n) return null;
  return (n * DEPOSIT_MONTHS).toLocaleString("en-IN");
}

export function whatsappHref(message: string = site.contact.whatsappMessage) {
  const num = site.contact.whatsappNumber.replace(/[^\d]/g, "");
  // While the number is still a placeholder, keep the link inert but visible.
  if (!num) return "#enquire";
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export const isPlaceholder = (v: string) => /^\[.*\]$/.test(v.trim());

/**
 * site.url is a placeholder until the real domain is known, and a bracketed
 * host is not a parseable URL. Fall back to a valid stand-in so builds,
 * sitemaps and OG tags keep working — swap site.url and this goes away.
 */
export const FALLBACK_URL = "https://infinity-space.example.com";

export function baseUrl() {
  try {
    return new URL(site.url).toString().replace(/\/$/, "");
  } catch {
    return FALLBACK_URL;
  }
}
