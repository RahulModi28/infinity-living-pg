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
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBar from "@/components/MobileBar";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
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
        <Gallery />
        {/* Removes the "what happens if I message them?" hesitation right
            before the final ask */}
        <BookingSteps />
        <FAQ />
        {/* ACTION */}
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBar />
    </>
  );
}
