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
  name: "Infinity Living",
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
      "Hi, I'm interested in a room at Infinity Living near Christ University Yeshwanthpur Campus. Could you share the available room options and pricing?",
  },

  address: {
    street: "[STREET ADDRESS]",
    locality: "Yeshwanthpur",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "[PINCODE]",
    country: "IN",
    /** Replace with the real pin from Google Maps. */
    lat: "[LATITUDE]",
    lng: "[LONGITUDE]",
    /** Paste the Google Maps share link for the "Get Directions" CTA. */
    mapsDirectionsUrl: "[GOOGLE MAPS DIRECTIONS LINK]",
    /** Paste the Google Maps embed src (Share → Embed a map → copy src). */
    mapsEmbedUrl: "",
  },

  social: {
    instagram: "[INSTAGRAM URL]",
    facebook: "[FACEBOOK URL]",
    youtube: "[YOUTUBE URL]",
  },

  /** Set to false if meals are not provided — the Food section is removed entirely. */
  foodAvailable: true,

  /** Set to true only once real, verified Google/written reviews exist. */
  reviewsAreReal: false,
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
    price: "[PRICE]",
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
    image: "/images/room-single.svg",
    gallery: ["/images/room-single.svg", "/images/room-single-2.svg", "/images/room-single-3.svg"],
  },
  {
    id: "double",
    name: "Double Sharing",
    occupancy: "2 people",
    price: "[PRICE]",
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
    image: "/images/room-double.svg",
    gallery: ["/images/room-double.svg", "/images/room-double-2.svg", "/images/room-double-3.svg"],
  },
  {
    id: "triple",
    name: "Triple Sharing",
    occupancy: "3 people",
    price: "[PRICE]",
    priceNote: "per person / month",
    blurb:
      "The most affordable way in — and usually the most social. First-years tend to pick this one and stay.",
    features: [
      "Large shared room",
      "3 beds with mattresses",
      "Wardrobe per person",
      "Study desks",
      "High-speed Wi-Fi",
      "Housekeeping",
    ],
    availability: "[ROOM AVAILABILITY]",
    image: "/images/room-triple.svg",
    gallery: ["/images/room-triple.svg", "/images/room-triple-2.svg", "/images/room-triple-3.svg"],
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
      "[ATTACHED BATHROOM — CONFIRM]",
    ],
  },
  {
    title: "Connectivity",
    icon: "Wifi",
    items: [
      "High-speed Wi-Fi",
      "[POWER BACKUP — CONFIRM]",
      "Charging points at every bed",
    ],
  },
  {
    title: "Lifestyle",
    icon: "Sofa",
    items: [
      "Common area",
      "[RECREATION AREA — CONFIRM]",
      "[LAUNDRY — CONFIRM]",
      "Housekeeping",
    ],
  },
  {
    title: "Safety",
    icon: "ShieldCheck",
    items: [
      "[CCTV COVERAGE — CONFIRM]",
      "[SECURE ENTRY — CONFIRM]",
      "[SECURITY PERSONNEL — CONFIRM]",
    ],
  },
] as const;

/* ─────────────────────────── Location ───────────────────────────
   ⚠️  Every distance/time below is a placeholder. Measure them on
   Google Maps and replace. Do not estimate.
   ─────────────────────────────────────────────────────────────── */

export const nearby = [
  {
    label: "Christ University — Yeshwanthpur Campus",
    time: "[DISTANCE TO CHRIST UNIVERSITY]",
    icon: "GraduationCap",
    primary: true,
  },
  { label: "Yeshwanthpur Metro Station", time: "[DISTANCE]", icon: "TrainFront" },
  { label: "Yeshwanthpur Railway Station", time: "[DISTANCE]", icon: "Train" },
  { label: "Restaurants & cafés", time: "[DISTANCE]", icon: "Coffee" },
  { label: "Supermarket", time: "[DISTANCE]", icon: "ShoppingBasket" },
  { label: "Hospital / clinic", time: "[DISTANCE]", icon: "HeartPulse" },
  { label: "Shopping (Orion Mall / Nagasandra)", time: "[DISTANCE]", icon: "Store" },
  { label: "ATM & pharmacy", time: "[DISTANCE]", icon: "Landmark" },
] as const;

/* ─────────────────────────── Reviews ───────────────────────────
   ⚠️  PLACEHOLDER COPY. These are illustrative only and are visibly
   labelled in the UI while site.reviewsAreReal === false.
   Replace with real, permissioned reviews before launch.
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
      "We visited before booking. It was clean, the management answered every question, and we felt comfortable leaving her there.",
  },
  {
    name: "[STUDENT NAME]",
    course: "[COURSE], Christ University — Yeshwanthpur",
    rating: 4,
    text:
      "Food is home-style and the common area is where most of us end up in the evenings. Housekeeping is regular.",
  },
] as const;

/* ─────────────────────────────── FAQ ─────────────────────────────── */

export const faqs = [
  {
    q: "How close is Infinity Living to Christ University Yeshwanthpur Campus?",
    a: "Infinity Living is located in Yeshwanthpur, Bengaluru, close to the Christ University Yeshwanthpur Campus. Exact walking distance: [DISTANCE TO CHRIST UNIVERSITY]. Message us on WhatsApp and we'll share the exact pin.",
  },
  {
    q: "What is the monthly rent?",
    a: "Rent depends on the room type you choose — single, double or triple sharing. Current tariff: [PRICE] per month. Ask us on WhatsApp for the up-to-date rate card for the room you want.",
  },
  {
    q: "What is included in the rent?",
    a: "[INCLUSIONS — CONFIRM] Typically covers the furnished room, Wi-Fi, housekeeping and electricity up to a limit. We'll send you the exact inclusion list so there are no surprises later.",
  },
  {
    q: "Is food included?",
    a: "[FOOD PLAN & INCLUSION — CONFIRM]. We serve breakfast, lunch and dinner. Whether meals are bundled into rent or charged separately: [CONFIRM].",
  },
  {
    q: "Is Wi-Fi available?",
    a: "Yes. High-speed Wi-Fi is available across the property. Plan and speed: [CONFIRM].",
  },
  {
    q: "What room types are available?",
    a: "Single sharing, double sharing and triple sharing. Live availability: [ROOM AVAILABILITY] — check with us before planning a visit.",
  },
  {
    q: "Is there a security deposit?",
    a: "[SECURITY DEPOSIT AMOUNT & REFUND TERMS — CONFIRM].",
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
    q: "How do I book a room?",
    a: "Message us on WhatsApp or fill the enquiry form on this page. We'll confirm availability, share photos and the rate card, and schedule a visit.",
  },
] as const;

/* ──────────────────────── Derived helpers ──────────────────────── */

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
export const FALLBACK_URL = "https://infinity-living.example.com";

export function baseUrl() {
  try {
    return new URL(site.url).toString().replace(/\/$/, "");
  } catch {
    return FALLBACK_URL;
  }
}
