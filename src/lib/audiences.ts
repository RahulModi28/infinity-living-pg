/**
 * Dedicated landing pages for the two strongest keyword clusters found in the
 * live Autocomplete research. One homepage cannot rank for both "ladies pg
 * yeshwanthpur" and "yeshwanthpur pg for gents" — they are distinct searches
 * with distinct intent, and no competitor currently gives either a real page.
 *
 * Copy is deliberately different per audience: near-duplicate pages get
 * filtered as thin content and would be worse than not having them.
 */

export type Audience = {
  slug: string;
  /** ≤60 chars — set as an absolute title, no brand suffix appended. */
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  /** Distinct H2s carrying the cluster's real search phrases. */
  sections: { h2: string; body: string; points: string[] }[];
  faqs: { q: string; a: string }[];
};

export const audiences: Record<"ladies" | "gents", Audience> = {
  ladies: {
    slug: "ladies-pg-yeshwanthpur",
    title: "Ladies PG in Yeshwanthpur near Christ University",
    description:
      "Ladies PG in Yeshwanthpur, Bengaluru — walking distance from Christ University Yeshwanthpur Campus. Furnished single, double & triple rooms with meals, Wi-Fi, CCTV and secure entry.",
    h1: "Ladies PG in Yeshwanthpur, near Christ University",
    eyebrow: "For women students & working professionals",
    intro:
      "A PG your parents can visit before they say yes. Furnished rooms, home-style meals and a short walk to the Yeshwanthpur campus — with the security arrangements written down rather than implied.",
    sections: [
      {
        h2: "Girls PG near Christ University Yeshwanthpur Campus",
        body: "The walk to campus is the whole point. No autos to negotiate at 8am, no depending on someone for a lift after an evening class, and no hour of your day lost to Bengaluru traffic in each direction.",
        points: [
          "Short walk to Christ University Yeshwanthpur Campus — [DISTANCE TO CHRIST UNIVERSITY]",
          "Close to Yeshwanthpur Metro for the rest of the city — [DISTANCE]",
          "[SEPARATE FLOOR / BLOCK ARRANGEMENT — CONFIRM]",
          "Housekeeping in rooms and common areas",
        ],
      },
      {
        h2: "Safety, stated plainly",
        body: "Every PG website says \"safe\". Here is what that actually means at this address — and where we are still confirming details rather than guessing at them.",
        points: [
          "[ENTRY & ACCESS CONTROL — CONFIRM]",
          "[CCTV COVERAGE & AREAS — CONFIRM]",
          "[SECURITY PERSONNEL & TIMINGS — CONFIRM]",
          "[VISITOR POLICY — CONFIRM]",
          "On-site management with a name and number your parents can call",
        ],
      },
      {
        h2: "Single room PG in Yeshwanthpur for ladies",
        body: "Single, double and triple sharing are all available. Single sharing suits light sleepers and anyone who studies late; triple is the most affordable and usually the most social.",
        points: [
          "Single sharing — private room, bed, wardrobe, study desk",
          "Double sharing — one roommate, lower monthly rent",
          "Triple sharing — the most affordable option",
          "Current availability: [ROOM AVAILABILITY]",
        ],
      },
    ],
    faqs: [
      {
        q: "Is this a ladies-only PG?",
        a: "[CONFIRM — ladies-only property, or separate floor/block within a co-ed building.] We'll tell you exactly how it's arranged before you visit.",
      },
      {
        q: "What are the entry timings for the ladies PG?",
        a: "[CURFEW / ENTRY TIMING POLICY — CONFIRM]. We'd rather give you the real policy up front than have it become a problem in month two.",
      },
      {
        q: "Can my parents visit and see the room first?",
        a: "Yes, and we'd prefer it. Come see the actual room, meet the staff and ask whatever you want to ask. Nothing is payable to look.",
      },
      {
        q: "What is the rent for a ladies PG in Yeshwanthpur?",
        a: "Rent depends on the room type — single, double or triple sharing. Current tariff: [PRICE] per month. Message us for the up-to-date rate card and what it includes.",
      },
    ],
  },

  gents: {
    slug: "gents-pg-yeshwanthpur",
    title: "Gents PG in Yeshwanthpur near Christ University",
    description:
      "Gents PG in Yeshwanthpur, Bengaluru — near Christ University Yeshwanthpur Campus and Yeshwanthpur Metro. Furnished single, double & triple sharing rooms with meals, Wi-Fi and 24/7 security.",
    h1: "Gents PG in Yeshwanthpur, near Christ University",
    eyebrow: "For men students & working professionals",
    intro:
      "Furnished rooms, three meals, Wi-Fi that survives submission week, and a location that works whether you're walking to campus or catching the metro to an office.",
    sections: [
      {
        h2: "Boys PG near Christ University Yeshwanthpur Campus",
        body: "Close enough to campus that you can go back between classes instead of killing three hours somewhere. That single fact changes how a semester actually runs.",
        points: [
          "Short walk to Christ University Yeshwanthpur Campus — [DISTANCE TO CHRIST UNIVERSITY]",
          "[SEPARATE FLOOR / BLOCK ARRANGEMENT — CONFIRM]",
          "Study desk and charging points at every bed",
          "Housekeeping in rooms and common areas",
        ],
      },
      {
        h2: "Mens PG near Yeshwanthpur Metro Station",
        body: "Not everyone here is a student. The metro and railway station put most of Bengaluru's office belt within a straightforward commute, which suits working professionals sharing the building.",
        points: [
          "Yeshwanthpur Metro Station — [DISTANCE]",
          "Yeshwanthpur Railway Station — [DISTANCE]",
          "TCS Yeshwanthpur and the surrounding offices — [DISTANCE]",
          "Restaurants, supermarket and pharmacy nearby — [DISTANCE]",
        ],
      },
      {
        h2: "Single, double and triple sharing rooms",
        body: "Pick the room that matches how you actually live, not the one that photographs best. All three come furnished and cleaned.",
        points: [
          "Single sharing — your own room and your own schedule",
          "Double sharing — the balance most people settle on",
          "Triple sharing — lowest monthly rent",
          "Current availability: [ROOM AVAILABILITY]",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the rent for a gents PG in Yeshwanthpur?",
        a: "Rent depends on the room type — single, double or triple sharing. Current tariff: [PRICE] per month. Ask us on WhatsApp for the current rate card.",
      },
      {
        q: "Is food included for the gents PG?",
        a: "[FOOD PLAN & INCLUSION — CONFIRM]. Breakfast, lunch and dinner are served on site; whether meals are bundled into rent or charged separately is [CONFIRM].",
      },
      {
        q: "Do you take working professionals as well as students?",
        a: "[CONFIRM — student-only, or students and working professionals.] The location suits both, given the metro and railway station are close by.",
      },
      {
        q: "Is there a minimum stay or lock-in?",
        a: "[MINIMUM STAY / LOCK-IN PERIOD — CONFIRM]. We put the notice period in writing before you pay anything.",
      },
    ],
  },
};
