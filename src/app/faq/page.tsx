import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBar from "@/components/MobileBar";
import { faqPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "PG FAQ — Rent, Deposit, Food & Rules",
  description:
    "Rent, deposit, food, Wi-Fi, curfew and booking — every question about Infinity Space, the gents PG near Christ University Yeshwanthpur Campus, answered straight.",
  alternates: { canonical: "/faq" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/faq",
    title: "PG FAQ — Rent, Deposit, Food & Rules | Infinity Space",
    description:
      "Rent, deposit, food, Wi-Fi, curfew and booking — every question about Infinity Space, the gents PG near Christ University Yeshwanthpur Campus, answered straight.",
    images: [{ url: "/images/og.png", width: 1200, height: 630, type: "image/png", alt: "Infinity Space FAQ" }],
  },
};

export default function FAQPage() {
  return (
    <>
      {/* solid: this page opens on ivory, with no hero photograph for the
          transparent nav to sit over. */}
      <Navbar solid />
      <main id="main">
        <FAQ />
        <FinalCTA roomsHref="/#rooms" />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBar />
      {faqPageJsonLd().map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
