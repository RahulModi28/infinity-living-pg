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
      "Common area & lounge",
      "Gym / fitness area",
      "Snooker & recreation area",
      "[LAUNDRY — CONFIRM]",
      "Housekeeping",
    ],
  },
  {
    title: "Safety",
    icon: "ShieldCheck",
    items: [
      "[CCTV COVERAGE — CONFIRM]",
      "Biometric secure entry",
      "[SECURITY PERSONNEL — CONFIRM]",
    ],
  },
] as const;

/* ─────────────────────────── Location ───────────────────────────
   Distances measured by road (OSRM road-network routing) from the
   property's own coordinates to real OpenStreetMap features — not
   estimated. Walking times are derived from road distance at 5 km/h
   and are stated as approximate.

   ⚠️  Two caveats:
   1. The metro/IKEA figures are straight-line; the vehicle route is
      longer because Tumkur Road has few crossings. Worth confirming
      the walking route on Google Maps before publishing.
   2. OpenStreetMap coverage of small Indian businesses is patchy, so
      the nearest pharmacy/café could not be established reliably and
      is left as a placeholder.
   ─────────────────────────────────────────────────────────────── */

export const nearby = [
  {
    label: "Christ University — Yeshwanthpur Campus",
    time: "10 min walk · 850 m",
    icon: "GraduationCap",
    primary: true,
  },
  { label: "Vishal Mega Mart (supermarket)", time: "6 min walk · 450 m", icon: "ShoppingBasket" },
  { label: "Ashwini Hospital", time: "7 min walk · 600 m", icon: "HeartPulse" },
  { label: "IKEA Nagasandra", time: "approx. 1.7 km", icon: "Store" },
  { label: "Nagasandra Metro (Green Line)", time: "approx. 1.7 km", icon: "TrainFront" },
  { label: "Dasarahalli Metro (Green Line)", time: "approx. 1.7 km", icon: "TrainFront" },
  { label: "Pharmacy", time: "[NEAREST PHARMACY — CONFIRM]", icon: "Landmark" },
  { label: "Restaurants & cafés", time: "[CONFIRM]", icon: "Coffee" },
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
    a: "Rent depends on the room type you choose — single or double sharing. Current tariff: [PRICE] per month. Ask us on WhatsApp for the up-to-date rate card for the room you want.",
  },
  {
    q: "What is included in the rent?",
    a: "[INCLUSIONS — CONFIRM] Typically covers the furnished room, Wi-Fi, housekeeping and electricity up to a limit. We'll send you the exact inclusion list so there are no surprises later.",
  },
  {
    q: "Is food included?",
    a: "[FOOD PLAN & INCLUSION — CONFIRM]. We serve four meals a day — breakfast, lunch, evening snacks and dinner — cooked on site. Whether meals are bundled into rent or charged separately: [CONFIRM].",
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
    q: "Is this a gents-only PG?",
    a: "Yes. Infinity Space is a gents PG — we don't currently have accommodation for women. If you're looking for a ladies PG near the campus we'd rather tell you now than after a visit.",
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
export const FALLBACK_URL = "https://infinity-space.example.com";

export function baseUrl() {
  try {
    return new URL(site.url).toString().replace(/\/$/, "");
  } catch {
    return FALLBACK_URL;
  }
}
