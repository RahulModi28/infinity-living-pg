import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Infinity Living handles the information you share when you enquire about a room.",
  robots: { index: false, follow: true },
};

export default function Privacy() {
  return (
    <>
      <Navbar />
      <main className="bg-ivory pb-24 pt-36">
        <div className="shell max-w-2xl">
          <h1 className="t-section">Privacy Policy</h1>
          <p className="mt-4 text-[0.8125rem] text-mute">
            [DRAFT — to be reviewed and completed before launch.]
          </p>
          <div className="mt-10 space-y-6 text-[0.9375rem] leading-relaxed text-ink-2">
            <p>
              When you submit the enquiry form or message us on WhatsApp, we collect your name,
              phone number, email address and any details you choose to share about your
              accommodation requirements.
            </p>
            <p>
              We use this only to respond to your enquiry about a room at Infinity Living. We do not
              sell your details to brokers, listing platforms or third parties.
            </p>
            <p>[RETENTION PERIOD — CONFIRM]. [DATA CONTROLLER NAME & ADDRESS — CONFIRM].</p>
            <p>
              To have your details removed, write to{" "}
              <span className="font-medium">[EMAIL ADDRESS]</span>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
