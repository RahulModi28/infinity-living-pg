import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Rooms from "@/components/Rooms";
import WhyUs from "@/components/WhyUs";
import LifeAt from "@/components/LifeAt";
import Amenities from "@/components/Amenities";
import SignatureReveal from "@/components/SignatureReveal";
import Audience from "@/components/Audience";
import BookingSteps from "@/components/BookingSteps";
import Location from "@/components/Location";
import ParentTrust from "@/components/ParentTrust";
import Food from "@/components/Food";
import Reviews from "@/components/Reviews";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBar from "@/components/MobileBar";
import { site } from "@/lib/site";
import QuickAnswers from "@/components/QuickAnswers";
import { homeFaqJsonLd } from "@/lib/seo";

/*
  Every keyword from Semrush's On Page SEO Checker (29 Sep 2026) that it
  flagged as missing from the homepage title, kept verbatim at the owner's
  request, with the head term first. Phrases for things the PG does not offer
  (girls' rooms, co-ed, dormitory beds) sit in a "Not …" clause so the title
  stays true. Google displays roughly the first 60 characters.
*/
export const metadata: Metadata = {
  title: {
    absolute:
      "PG near Christ University Yeshwanthpur | Infinity PG near me, Infinity Space Bengaluru, Infinity Spaces, Infinite Spaces, Space Infinity, Infinity Hostel | PG for Boys near me, Veg Hostel near me, Student Space, Hostel Speciality | Not Rooms for Girls near me, Boys Girls PG near me, Dormitory near me, Dormitory Room near me or near me Dormitory Bed | vs Singapore PG Nagasandra, Infinityverse Space",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        {/* DISCOVER → LAND: location + value inside the first viewport */}
        <Hero />
        {/* TRUST: quick benefits before any scroll investment */}
        <TrustStrip />
        {/* CONSIDER: rooms and price come early — it's the #1 question */}
        <Rooms />
        <WhyUs />
        <LifeAt />
        <Amenities />
        {/* The signature scroll moment, placed after the facts, not before */}
        <SignatureReveal />
        <Audience />
        <Location />
        <ParentTrust />
        {site.foodAvailable && <Food />}
        <Reviews />
        <QuickAnswers />
        {/* Removes the "what happens if I message them?" hesitation right
            before the final ask */}
        <BookingSteps />
        {/* ACTION */}
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd()) }}
      />
    </>
  );
}
