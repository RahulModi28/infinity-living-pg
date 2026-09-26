import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBar from "@/components/MobileBar";
import { galleryPageJsonLd } from "@/lib/seo";
import { rooms, depositFor } from "@/lib/site";

/**
 * What the photographs show, in words. The page was flagged as thin (185
 * words) — a grid of images says a lot to a visitor and almost nothing to a
 * crawler or an AI answer. Every sentence here is a fact already published
 * elsewhere on the site, grouped by the part of the building each photo is of.
 */
const [single, double] = rooms;
const TOUR = [
  {
    h2: "The rooms: single and double sharing",
    body: [
      `Two room types, both furnished before you arrive. A single sharing room is ₹${single.price} a month and gives you the room to yourself — bed and mattress, personal wardrobe, study desk and chair. A double sharing room is ₹${double.price} per person a month, with two beds, a wardrobe and a study desk each.`,
      "Rooms have an attached bathroom, charging points at every bed and high-speed Wi-Fi. Housekeeping and laundry are part of the rent.",
    ],
  },
  {
    h2: "Food and the rooftop dining hall",
    body: [
      "Meals are cooked on site and served in the rooftop dining hall: four a day Monday to Friday — breakfast, lunch, evening snacks and dinner — and breakfast and lunch on Saturday. Food is included in the rent, not charged on top.",
    ],
  },
  {
    h2: "Gym, lounge and common areas",
    body: [
      "The gym has treadmills, a cross trainer, a bench and weights. The common areas have a snooker and pool table, table tennis, a lounge with a TV and a refrigerator in the shared living area.",
    ],
  },
  {
    h2: "Entry, safety and the location",
    body: [
      "Entry is biometric, the building has CCTV, and security staff are on site. It sits on Andrahalli Main Road in HMT Layout, about 850 m — a 10 minute walk — from Christ University Yeshwanthpur Campus.",
      `Photographs only go so far. Parents are welcome to visit before you book, and the deposit (₹${depositFor(single)} for single, ₹${depositFor(double)} for double) is paid on move-in.`,
    ],
  },
];

export const metadata: Metadata = {
  title: "Photos — Rooms, Dining Hall & Gym",
  description:
    "Real photographs of Infinity Space, the gents PG near Christ University Yeshwanthpur Campus — single and double rooms, rooftop dining hall, gym, lounge and bathrooms.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/gallery",
    title: "Photos — Rooms, Dining Hall & Gym | Infinity Space",
    description:
      "Real photographs of Infinity Space, the gents PG near Christ University Yeshwanthpur Campus — rooms, rooftop dining hall, gym, lounge and bathrooms.",
    images: [{ url: "/images/og.png", width: 1200, height: 630, type: "image/png", alt: "Infinity Space gallery" }],
  },
};

export default function GalleryPage() {
  return (
    <>
      {/* solid: this page opens on ivory, with no hero photograph for the
          transparent nav to sit over. */}
      <Navbar solid />
      <main id="main">
        <Gallery />
        <section aria-labelledby="gallery-tour" className="border-t border-ink/8 bg-ivory-2 py-14 sm:py-24">
          <div className="shell">
            <div className="max-w-3xl">
              <h2 id="gallery-tour" className="t-section">
                A walk through Infinity Space
              </h2>
              <p className="t-body mt-5 text-mute">
                Infinity Space is a gents PG near Christ University Yeshwanthpur Campus, Bengaluru. Here is
                what the photographs above show, room by room.
              </p>
              {TOUR.map((t) => (
                <div key={t.h2} className="mt-12">
                  <h3 className="font-display text-[1.375rem] leading-snug tracking-[-0.02em]">{t.h2}</h3>
                  {t.body.map((para) => (
                    <p key={para.slice(0, 32)} className="t-body mt-4 text-mute">
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
        <FinalCTA roomsHref="/#rooms" />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBar />
      {galleryPageJsonLd().map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
