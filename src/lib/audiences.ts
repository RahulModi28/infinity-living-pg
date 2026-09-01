/**
 * A dedicated landing page for the strongest keyword cluster the live
 * Autocomplete research turned up that this property can actually serve:
 * "yeshwanthpur pg for gents" and its variants. No competitor currently
 * gives that audience a real page.
 *
 * There is deliberately no ladies page. The demand is there — "ladies pg
 * yeshwanthpur" is a heavier cluster than the gents one — but the property
 * is gents-only, so ranking for it would earn enquiries that waste
 * everyone's time and produce nothing but bounces.
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

export const audiences: Record<"gents", Audience> = {
  gents: {
    slug: "gents-pg-yeshwanthpur",
    title: "Gents PG in Yeshwanthpur near Christ University",
    description:
      "Gents PG near Christ University Yeshwanthpur Campus, Bengaluru — a 10 minute walk from campus, close to Nagasandra Metro. Furnished single, double & triple sharing rooms with meals, Wi-Fi and 24/7 security.",
    h1: "Gents PG in Yeshwanthpur, near Christ University",
    eyebrow: "For men students & working professionals",
    intro:
      "Furnished rooms, three meals, Wi-Fi that survives submission week, and a location that works whether you're walking to campus or catching the metro to an office.",
    sections: [
      {
        h2: "Boys PG near Christ University Yeshwanthpur Campus",
        body: "Close enough to campus that you can go back between classes instead of killing three hours somewhere. That single fact changes how a semester actually runs.",
        points: [
          "About 850 m by road to Christ University Yeshwanthpur Campus — roughly a 10 minute walk",
          "[SEPARATE FLOOR / BLOCK ARRANGEMENT — CONFIRM]",
          "Study desk and charging points at every bed",
          "Housekeeping in rooms and common areas",
        ],
      },
      {
        h2: "Mens PG near Nagasandra Metro",
        body: "Not everyone here is a student. Nagasandra and Dasarahalli on the Green Line put the Tumkur Road industrial belt and the rest of the city within a straightforward commute, which suits working professionals sharing the building.",
        points: [
          "Nagasandra Metro (Green Line) — approx. 1.7 km",
          "Dasarahalli Metro (Green Line) — approx. 1.7 km",
          "IKEA Nagasandra — approx. 1.7 km",
          "Vishal Mega Mart supermarket — 450 m, about a 6 minute walk",
          "Subway, KFC and Box8 all within a 10 minute walk",
        ],
      },
      {
        h2: "Single and double sharing rooms",
        body: "Pick the room that matches how you actually live, not the one that photographs best. Both come furnished and cleaned.",
        points: [
          "Single sharing — your own room and your own schedule",
          "Double sharing — two beds, a study table each, lower monthly rent",
          "Current availability: [ROOM AVAILABILITY]",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the rent for a gents PG in Yeshwanthpur?",
        a: "Rent depends on the room type — single or double sharing. Current tariff: [PRICE] per month. Ask us on WhatsApp for the current rate card.",
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
