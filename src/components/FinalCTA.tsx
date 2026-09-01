import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/site";
import SplitText from "./ui/SplitText";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import Magnetic from "./ui/Magnetic";
import EnquiryForm from "./EnquiryForm";

export default function FinalCTA() {
  return (
    <section
      id="enquire"
      className="grain relative scroll-mt-20 overflow-hidden bg-moss-2 py-20 text-ivory sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[38rem] rounded-full bg-clay/12 blur-3xl"
      />
      <div className="shell relative grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
        <div className="lg:pt-4">
          <Reveal>
            <p className="t-label flex items-center gap-3 text-clay">
              <span className="inline-block h-px w-8 bg-current opacity-50" aria-hidden="true" />
              Book a room
            </p>
          </Reveal>
          <SplitText as="h2" text="Ready to find your room?" className="t-section mt-5 block max-w-[14ch]" />
          <Reveal delay={0.1}>
            <p className="t-body mt-6 max-w-[44ch] text-white/72">
              Rooms near Christ University fill quickly, especially around the start of a semester.
              Check availability and find a space that fits you.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetic>
                <Button
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                >
                  <MessageCircle className="size-[1.05em]" aria-hidden="true" /> WhatsApp Us
                </Button>
              </Magnetic>
              <Button href="#rooms" variant="light">
                See room types
              </Button>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-2 gap-y-6 border-t border-white/12 pt-8">
              <div>
                <dt className="t-label text-white/45">Reply time</dt>
                <dd className="mt-1.5 font-display text-lg">Usually same day</dd>
              </div>
              <div>
                <dt className="t-label text-white/45">Visits</dt>
                <dd className="mt-1.5 font-display text-lg">Walk-ins welcome</dd>
              </div>
              <div>
                <dt className="t-label text-white/45">Booking</dt>
                <dd className="mt-1.5 font-display text-lg">No brokerage</dd>
              </div>
              <div>
                <dt className="t-label text-white/45">Campus</dt>
                <dd className="mt-1.5 font-display text-lg">Yeshwanthpur</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="text-ink">
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
