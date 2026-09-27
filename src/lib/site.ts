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
  /**
   * Canonical host. The bare infinityspace4u.com now 308-redirects here
   * (verified via Vercel), so there's a single canonical origin for search
   * engines and AI crawlers to consolidate signals on.
   */
  url: "https://www.infinityspace4u.com",

  contact: {
    /** Full international format, no spaces — e.g. 919876543210 */
    whatsappNumber: "919959560047",
    phoneDisplay: "+91 99595 60047",
    phoneHref: "+919959560047",
    email: "hello@brennlo.com",
    /** Second line, from the existing site: M Venkata Reddy. */
    phoneAlt: "+91 99000 05497",
    phoneAltHref: "+919900005497",
    emailAlt: "infinityspace0501@gmail.com",
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
    instagram: "https://www.instagram.com/infinityspace4u/",
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
  /**
   * Shown verbatim on the room card and in the modal. This is the one value
   * on the site that goes stale silently — nothing derives it and nothing
   * checks it, so it needs updating by hand when rooms fill or free up.
   */
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
    availability: "Available now",
    image: "/images/room-single.jpg",
    gallery: ["/images/room-single.jpg", "/images/bathroom.jpg", "/images/dining-hall.jpg"],
  },
  {
    id: "double",
    name: "Double Sharing",
    occupancy: "2 people",
    price: "16,000",
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
    availability: "Available now",
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
      // Worded as shared on purpose. Both are in the living area, not in the
      // rooms, and a list that lets someone assume otherwise buys a
      // complaint on move-in day.
      "Shared lounge with TV",
      "Refrigerator in the shared living area",
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

/* ─────────────────────────── Gallery ───────────────────────────
   Real photographs taken at the property, not stock. The alt text is
   written to be read aloud and to stand on its own in image search, so
   each one names the place and the campus rather than "room 1".

   Lives here rather than in the component because the /gallery page's
   ImageGallery schema is generated from the same list — two copies would
   drift the moment a photo is added.
   ─────────────────────────────────────────────────────────────── */

export const galleryShots = [
  { src: "/images/hero-lounge.jpg", alt: "The lounge at Infinity Space PG, Yeshwanthpur — curved sofa and armchairs on turf flooring under a coffered ceiling" },
  { src: "/images/room-single.jpg", alt: "Single sharing room with bed, study desk and chair at Infinity Space PG, Yeshwanthpur" },
  { src: "/images/room-double.jpg", alt: "Double sharing room with two beds, study table and storage at Infinity Space PG, Yeshwanthpur" },
  { src: "/images/dining-hall.jpg", alt: "Rooftop dining hall at Infinity Space PG near Christ University Yeshwanthpur Campus" },
  { src: "/images/entrance.jpg", alt: "The entrance at Infinity Space PG near Christ University Yeshwanthpur Campus, Bengaluru" },
  { src: "/images/living-room.jpg", alt: "Shared living room with sofa seating at Infinity Space PG, Yeshwanthpur, Bengaluru" },
  { src: "/images/gym.jpg", alt: "Gym at Infinity Space PG — treadmills, cross trainer, bench and weights" },
  { src: "/images/rooftop-view.jpg", alt: "View across Bengaluru from the rooftop at Infinity Space PG, Yeshwanthpur" },
  { src: "/images/bathroom.jpg", alt: "Attached bathroom at Infinity Space PG, Yeshwanthpur, Bengaluru" },
  { src: "/images/hero.jpg", alt: "Common area with snooker table and lounge seating at Infinity Space PG, Yeshwanthpur" },
  { src: "/images/entry-biometric.jpg", alt: "Biometric secure entry at Infinity Space PG, Yeshwanthpur" },
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

   The three longer entries now carry Google's own walking distances rather
   than straight-line ones. They had read "approx. 1.7 km" while the map,
   which anyone can now open from the row itself, drew 2.1–2.6 km. Two
   numbers on the same screen disagreeing is worse than either being
   slightly off.
   ─────────────────────────────────────────────────────────────── */

export const nearby = [
  // Campus first regardless of distance — it's the reason anyone is reading
  // this list. Everything after it runs nearest to furthest.
  //
  // Coordinates drive the "show me the route" map: clicking a row swaps the
  // embed to walking directions from the property to that pin. They are real
  // lookups, not the label re-geocoded at click time, so the map can't land
  // on a different branch of the same chain.
  {
    label: "Christ University — Yeshwanthpur Campus",
    time: "10 min walk · 850 m",
    icon: "GraduationCap",
    lat: 13.0362625,
    lng: 77.5046094,
    /**
     * Every destination routes by an exact place name.
     *
     * Coordinates alone are not enough: Google's directions embed snaps a
     * bare lat/lng to the nearest addressable business, so routing to the
     * metro station's coordinates labelled the destination "ARPITHA N COFFEE
     * SHOP" and drew a 2.1 km route to it. The names below are the ones
     * Google's own listings use, so each resolves to the intended place.
     *
     * The coordinates are kept — they drive the zoom calculation, which needs
     * a real distance rather than a string.
     */
    q: "CHRIST (Deemed to be University) Bangalore Yeshwanthpur Campus, Nalagadderanahalli, Peenya, Bengaluru, Karnataka 560073, India",
    primary: true,
  },
  { label: "Subway", time: "5 min walk · 400 m", icon: "Sandwich", lat: 13.0339734, lng: 77.5029658, q: "Subway HMT Layout, Bengaluru" },
  { label: "Vishal Mega Mart (supermarket)", time: "6 min walk · 450 m", icon: "ShoppingBasket", lat: 13.03352, lng: 77.5039, q: "Vishal Mega Mart, Andrahalli Main Road, Bengaluru" },
  { label: "Life Pharmacy", time: "6 min walk · 500 m", icon: "Pill", lat: 13.033876, lng: 77.5034494, q: "Life care pharma, Nelagadaranahalli, Bengaluru" },
  { label: "Ashwini Hospital", time: "7 min walk · 600 m", icon: "HeartPulse", lat: 13.03134, lng: 77.5056, q: "Ashwini Hospital, Nelagadaranahalli, Bengaluru" },
  { label: "KFC & Box8", time: "8 min walk · 700 m", icon: "Utensils", lat: 13.0340423, lng: 77.5040783, q: "KFC, Andrahalli Main Road, Bengaluru" },
  { label: "IKEA Nagasandra", time: "2.6 km walk", icon: "Store", lat: 13.04928, lng: 77.50035, q: "IKEA Nagasandra, Bengaluru" },
  { label: "Nagasandra Metro (Green Line)", time: "2.1 km walk", icon: "TrainFront", lat: 13.04795, lng: 77.50014, q: "Nagasandra Metro Station, Bengaluru" },
  { label: "Dasarahalli Metro (Green Line)", time: "2.5 km walk", icon: "TrainFront", lat: 13.04326, lng: 77.51255, q: "Dasarahalli Metro Station, Bengaluru" },
] as const;

/* ─────────────────────────── Reviews ───────────────────────────
   Real reviews from current residents, published with their permission
   and supplied by the owner on 2026-09-27. Text is verbatim.

   Only add reviews from people who actually live or lived here. Never the
   owner's or staff's own, and never invented ones: an invented testimonial
   is a consumer-protection problem, not a styling one.

   These are shown on the page only. They are deliberately NOT marked up as
   Review/AggregateRating schema: Google treats reviews a business hosts
   about itself as "self-serving" and won't show stars for them. Marking
   them up anyway goes against its structured-data policy. Stars in search
   come from the Google Business Profile instead.
   ─────────────────────────────────────────────────────────────── */

export const reviews: {
  name: string;
  course: string;
  rating: number;
  text: string;
}[] = [
  {
    name: "Veer Khanna",
    course: "Resident, Infinity Space",
    rating: 5,
    text: "Been staying here, and overall the experience has been pretty good. The location is convenient, rooms are comfortable, and the basic facilities are taken care of.",
  },
  {
    name: "Darsh Shah",
    course: "Resident, Infinity Space",
    rating: 5,
    text: "The food is better than what I expected from a PG. There’s enough variety, and the meals are generally decent. Having food available inside the PG is definitely convenient.",
  },
  {
    name: "Devansh Bhardawaj",
    course: "Resident, Infinity Space",
    rating: 5,
    text: "I’ve had a good experience with the staff so far. They’ve been helpful, especially when I needed help with a room issue.",
  },
];

/* ─────────────────────────────── FAQ ─────────────────────────────── */

export const faqs = [
  {
    q: "How close is Infinity Space to Christ University Yeshwanthpur Campus?",
    a: "Infinity Space is on Andrahalli Main Road, HMT Layout (560073) — the same pincode as the campus. It is about 850 m by road — roughly a 10 minute walk. Message us on WhatsApp and we'll share the exact pin.",
  },
  {
    q: "What is the monthly rent?",
    a: "₹20,000 a month for single sharing, and ₹16,000 per person a month for double sharing. Electricity and meals are included — the rent is the rent.",
  },
  {
    q: "What is included in the rent?",
    a: "The furnished room, electricity, meals, Wi-Fi, housekeeping and laundry. The security deposit is separate, paid once on move-in, and adjusted against your April and May rent.",
  },
  {
    q: "Is food included?",
    a: "Yes, and it is included in the rent — not charged on top. Four meals a day Monday to Friday, cooked on site: breakfast, lunch, evening snacks and dinner. On Saturday we serve breakfast and lunch only — the kitchen is closed in the evening. Sunday is back to full, with chicken and paneer biryani at lunch and chole bhature at night.",
  },
  {
    q: "Is Wi-Fi available?",
    a: "Yes, high-speed Wi-Fi is available across the property. Message us if you need the exact plan and speed before you book.",
  },
  {
    q: "What room types are available?",
    a: "Single sharing and double sharing, and both have rooms available now. Availability moves week to week, so message us to confirm before planning a visit.",
  },
  {
    q: "Is there a security deposit?",
    a: "Yes — two months' rent, paid on move-in: ₹40,000 for single sharing, ₹32,000 for double. It isn't money you lose. It's adjusted against your rent for April and May, so you pay no rent in those two months.",
  },
  {
    q: "What is the minimum stay?",
    a: "12 months, with 2 months' notice before you move out. That lines up with the deposit, which is adjusted against your April and May rent at the end of the term — so a full year is the arrangement the pricing is built around. Leaving before 12 months forfeits the deposit.",
  },
  {
    q: "Are visitors and parents allowed?",
    a: "Guests are allowed, but male visitors only. Parents are welcome to come and see the property before you book — we'd rather you visited than booked from photos.",
  },
  {
    q: "Is housekeeping available?",
    a: "Yes — rooms and common areas are cleaned regularly. Ask us for the current schedule if you'd like specifics.",
  },
  {
    q: "Is there a curfew?",
    a: "Yes — 11 pm. It isn't absolute: later nights are possible with a parent's permission, which is the point of having it. It exists so that someone always knows where you are, not to police your evenings.",
  },
  {
    q: "Is this a gents-only PG?",
    a: "Yes. Infinity Space is a gents PG — we don't currently have accommodation for women. If you're looking for a ladies PG near the campus we'd rather tell you now than after a visit.",
  },
  {
    // Answers "pg for boys near me", "infinity hostel" and "dormitory near
    // me" (Semrush On Page SEO Checker) honestly — including that these are
    // rooms, not dormitory beds, so a dorm search doesn't become a wasted visit.
    q: "Is Infinity Space a boys PG or a hostel?",
    a: "Infinity Space PG is a boys PG — a gents-only paying-guest hostel for male students and working professionals near Christ University Yeshwanthpur Campus. You get a single or double sharing room with meals, Wi-Fi and housekeeping, not a bed in a dormitory.",
  },
  {
    // "veg hostel near me" — confirmed by the owner: vegetarian food at
    // every meal, with a paneer or veg dish alongside chicken on the days
    // chicken is cooked.
    q: "Is the food veg or non-veg?",
    a: "Both. Vegetarian food is served at every meal, so it works as a veg PG too. On the days chicken is cooked, a paneer or vegetable dish is made alongside it — vegetarians never miss a meal.",
  },
  {
    // "rooms for girls near me" / "boys girls pg near me" — answered
    // truthfully, so anyone who lands from those searches finds out at once.
    q: "Do you have rooms for girls, or a boys and girls PG?",
    a: "No. Infinity Space is a boys PG only, for male students and working professionals. If you're looking for rooms for girls or a co-ed PG near Christ University Yeshwanthpur Campus, we're not the right fit — we'd rather say so before you visit.",
  },
  {
    // "dormitory near me" / "dormitory bed".
    q: "Do you have dormitory beds?",
    a: "No dormitories. The most people in a room is two: you choose a single sharing room (₹20,000 a month) or a bed in a double sharing room (₹16,000 per person), both furnished, with meals and Wi-Fi included.",
  },
  {
    q: "How do I book a room?",
    a: "Message us on WhatsApp or fill the enquiry form on this page. We'll confirm availability, share photos and the rate card, and schedule a visit.",
  },
] as const;

/**
 * The subset of `faqs` answered on the homepage itself, with FAQPage schema.
 * The head searches ("pg near christ university", "single sharing pg
 * bangalore") are answered by these four; the rest live on /faq. Picked by
 * question text so an edit to an answer above flows through untouched.
 */
const HOME_FAQ_QUESTIONS = [
  "How close is Infinity Space to Christ University Yeshwanthpur Campus?",
  "What is the monthly rent?",
  "What is included in the rent?",
  "Is there a security deposit?",
  "Is Infinity Space a boys PG or a hostel?",
  "Is the food veg or non-veg?",
];

export function homeFaqs() {
  return HOME_FAQ_QUESTIONS.map((q) => {
    const f = faqs.find((x) => x.q === q);
    if (!f) throw new Error(`homeFaqs: no FAQ with the question "${q}" in site.ts.`);
    return f;
  });
}

/**
 * A 40–60 word answer that stands on its own if quoted — what an AI Overview
 * or a featured snippet lifts. Built from the room data rather than typed out,
 * so a rent change can't leave a stale number in the one sentence most
 * likely to be quoted elsewhere.
 */
export function answerBlock() {
  const [single, double] = rooms;
  return `${site.name} PG is a gents-only boys PG on Andrahalli Main Road, HMT Layout, about 850 m (a 10 minute walk) from Christ University Yeshwanthpur Campus in Bengaluru. Single sharing rooms are ₹${single.price} a month and double sharing ₹${double.price} per person, with four meals a day, electricity, Wi-Fi, housekeeping and laundry included in the rent.`;
}

/* ──────────────────────── Derived helpers ──────────────────────── */

/** Security deposit is two months' rent, so derive it rather than restating. */
export const DEPOSIT_MONTHS = 2;

export function depositFor(room: { price: string }) {
  const n = Number(room.price.replace(/[^\d]/g, ""));
  if (!n) return null;
  return (n * DEPOSIT_MONTHS).toLocaleString("en-IN");
}

/**
 * Keyless walking-directions embed from the property to a nearby place.
 *
 * The embed does not reliably frame the whole route on its own — a 1.7 km
 * walk came out cropped at both ends — so the zoom is derived from the real
 * straight-line distance between the two points. Short walks stay legible;
 * longer ones pull back far enough to show both pins.
 */
export function directionsEmbed(place: { lat: number; lng: number; q?: string }) {
  const dest = place.q ? encodeURIComponent(place.q) : `${place.lat},${place.lng}`;
  const from = { lat: Number(site.address.lat), lng: Number(site.address.lng) };

  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(place.lat - from.lat);
  const dLng = toRad(place.lng - from.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.lat)) * Math.cos(toRad(place.lat)) * Math.sin(dLng / 2) ** 2;
  const metres = 2 * R * Math.asin(Math.sqrt(a));

  // Road routes wander, so allow well over the straight-line distance.
  const zoom = metres < 500 ? 16 : metres < 1000 ? 15 : metres < 2000 ? 14 : 13;

  return `https://maps.google.com/maps?saddr=${site.address.lat},${site.address.lng}&daddr=${dest}&dirflg=w&z=${zoom}&hl=en&output=embed`;
}

export function whatsappHref(message: string = site.contact.whatsappMessage) {
  const num = site.contact.whatsappNumber.replace(/[^\d]/g, "");
  // While the number is still a placeholder, keep the link inert but visible.
  if (!num) return "#enquire";
  // api.whatsapp.com/send, not wa.me: wa.me only redirects here, and
  // Semrush reported every wa.me link as a broken external link (13 of them,
  // one per page) because its crawler doesn't get a 200 back through the
  // redirect. Same destination for people — the app on a phone, WhatsApp
  // Web on a desktop — without the hop.
  return `https://api.whatsapp.com/send?phone=${num}&text=${encodeURIComponent(message)}`;
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

/**
 * The weekly menu as transcribed from the kitchen's own sheet.
 *
 * NOT PUBLISHED ANYWHERE YET, and deliberately so — the menu is still being
 * finalised, and a menu printed as fact is a promise. Kept here so the
 * transcription is not lost and so publishing it later is a render, not a
 * retyping.
 *
 * Saturday snacks and dinner are null: the sheet marks both "Break".
 */
export const weeklyMenu = [
  {
    day: "Monday",
    breakfast: "Aloo paratha",
    lunch: "Aloo jeera with moong dal",
    snack: "Momos with chutney",
    dinner: "Pav bhaji",
  },
  {
    day: "Tuesday",
    breakfast: "Besan chilla with chutney",
    lunch: "Soya chilli with chutney",
    snack: "Chilli potato fingers",
    dinner: "Palak paneer with bhindi masala",
  },
  {
    day: "Wednesday",
    breakfast: "Masala dosa with sambar and chutney",
    lunch: "Urad dal with aloo masala",
    snack: "Fruit salad",
    dinner: "Kadhai chicken and paneer butter masala, with sweets",
  },
  {
    day: "Thursday",
    breakfast: "Veg sandwich",
    lunch: "Veg kofta curry",
    snack: "Samosas",
    dinner: "Fried rice with manchurian",
  },
  {
    day: "Friday",
    breakfast: "White sauce pasta",
    lunch: "Dal makhani with patta gobi",
    snack: "Vada pav",
    dinner: "Chapati with vegetable kurma",
  },
  {
    day: "Saturday",
    breakfast: "Banana with peanut butter bread",
    lunch: "Rajma with chawal and roti",
    snack: null,
    dinner: null,
  },
  {
    day: "Sunday",
    breakfast: "Noodles",
    lunch: "Chicken and paneer biryani with raita",
    snack: "Tea",
    dinner: "Chole bhature with onion salad, and kheer",
  },
] as const;

/** From the kitchen sheet. Unused while the menu is unconfirmed —
 *  the Food section shows the serving windows given by the owner. */
export const mealTimes = {
  breakfast: "7:45 am",
  breakfastSaturday: "7:30 am",
  lunch: "12:00 - 2:00 pm",
  snack: "4:00 - 6:00 pm",
  dinner: "8:00 - 9:30 pm",
};
