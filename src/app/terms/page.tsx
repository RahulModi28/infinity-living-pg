import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Infinity Living website.",
  robots: { index: false, follow: true },
};

export default function Terms() {
  return (
    <>
      <Navbar />
      <main className="bg-ivory pb-24 pt-36">
        <div className="shell max-w-2xl">
          <h1 className="t-section">Terms</h1>
          <p className="mt-4 text-[0.8125rem] text-mute">
            [DRAFT — to be reviewed and completed before launch.]
          </p>
          <div className="mt-10 space-y-6 text-[0.9375rem] leading-relaxed text-ink-2">
            <p>
              Room availability, rent, deposits, notice periods and house rules are confirmed in
              writing at the time of booking. Information shown on this website is indicative and
              does not by itself form a tenancy agreement.
            </p>
            <p>[BOOKING, DEPOSIT AND CANCELLATION TERMS — CONFIRM].</p>
            <p>[HOUSE RULES — CONFIRM].</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
