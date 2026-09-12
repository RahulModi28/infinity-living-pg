import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Gallery from "@/components/Gallery";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBar from "@/components/MobileBar";
import { galleryPageJsonLd } from "@/lib/seo";

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
