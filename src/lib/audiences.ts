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
  /**
   * 40–60 words that answer the page's head query on their own, with no
   * context needed — the paragraph a search snippet or AI answer quotes.
   */
  answer: string;
  /** Distinct H2s carrying the cluster's real search phrases. */
  sections: { h2: string; body: string; points: string[] }[];
  faqs: { q: string; a: string }[];
};

export const audiences: Record<"gents", Audience> = {
  gents: {
    slug: "gents-pg-yeshwanthpur",
    // Led by "pg in yeshwanthpur" (720/mo) and "pg near yeshwanthpur for
    // male" (140/mo), from the Semrush keyword gap against Stanza Living and
    // EaseMyLiving — both sit on page 2+ for these, at KD 9–15. The slug is
    // unchanged so the URL Google already knows keeps its signals.
    title: "PG in Yeshwanthpur for Male Students & Professionals",
    description:
      "PG in Yeshwanthpur for men — a 10 minute walk to Christ University, near Nagasandra Metro. Single ₹20,000, double ₹16,000, meals and Wi-Fi included.",
    h1: "PG in Yeshwanthpur for men, near Christ University",
    eyebrow: "For men students & working professionals",
    intro:
      "Furnished rooms, four meals a day, Wi-Fi that survives submission week, and a location that works whether you're walking to campus or catching the metro to an office.",
    answer:
      "Infinity Space is a PG in Yeshwanthpur for men, in HMT Layout, about 850 m — a 10 minute walk — from Christ University Yeshwanthpur Campus and 2.1 km from Nagasandra Metro. Single sharing is ₹20,000 a month and double sharing ₹16,000 per person, including four meals a day (Mon–Fri), electricity, Wi-Fi and housekeeping.",
    sections: [
      {
        h2: "Boys PG near Christ University Yeshwanthpur Campus",
        body: "Close enough to campus that you can go back between classes instead of killing three hours somewhere. That single fact changes how a semester actually runs.",
        points: [
          "About 850 m by road to Christ University Yeshwanthpur Campus — roughly a 10 minute walk",
          "Study desk and charging points at every bed",
          "Gym, pool table and table tennis on site",
          "Housekeeping and laundry service",
        ],
      },
      {
        h2: "PG near Yeshwanthpur for male professionals",
        body: "Not everyone here is a student. Nagasandra Metro and Dasarahalli on the Green Line put the Tumkur Road industrial belt and the rest of the city within a straightforward commute, which suits working professionals sharing the building.",
        points: [
          "Nagasandra Metro (Green Line) — 2.1 km walk",
          "Dasarahalli Metro (Green Line) — 2.5 km walk",
          "IKEA Nagasandra — 2.6 km walk",
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
          "Both room types have space right now",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the rent for a PG in Yeshwanthpur?",
        a: "₹20,000 a month for single sharing, ₹16,000 per person for double sharing. Electricity and meals are included in that.",
      },
      {
        q: "How much is a single sharing PG room near Christ University?",
        a: "At Infinity Space a single sharing room is ₹20,000 a month, with meals, electricity, Wi-Fi, housekeeping and laundry included. The deposit is two months' rent (₹40,000), adjusted against your April and May rent.",
      },
      {
        q: "Is this PG near Yeshwanthpur for male residents only?",
        a: "Yes. Infinity Space is a gents-only PG for male students and working professionals, and visitors are male only too. We don't have accommodation for women.",
      },
      {
        q: "Is food included in the rent?",
        a: "Yes, and included in the rent rather than charged on top — four meals a day Monday to Friday, cooked on site. Saturday is breakfast and lunch only.",
      },
      {
        q: "Do you take working professionals as well as students?",
        a: "Yes — the location near Nagasandra Metro and the Tumkur Road corridor works for working professionals as well as students. Message us to check current availability.",
      },
      {
        q: "Is there a minimum stay or lock-in?",
        a: "12 months, with a 2-month notice period. The deposit is adjusted against your April and May rent at the end of that term; leaving before 12 months forfeits it. Everything is put in writing before you pay anything.",
      },
    ],
  },
};
