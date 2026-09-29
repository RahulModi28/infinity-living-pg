import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/site";
import SplitText from "./ui/SplitText";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import Magnetic from "./ui/Magnetic";

/**
 * The enquiry form no longer sits here: "Book a Room" opens it as a popup
 * (BookingDialog), from this section and from every other #enquire button.
 * The section keeps id="enquire" so those anchors still land somewhere
 * useful if JavaScript is off.
 *
 * `roomsHref` exists because this section renders on pages that have a rooms
 * section and on /faq, which doesn't — there the button has to leave the page
 * instead of pointing at an anchor that isn't there.
 */
export default function FinalCTA({ roomsHref = "#rooms" }: { roomsHref?: string }) {
  return (
    <section
      id="enquire"
      className="grain relative scroll-mt-20 overflow-hidden bg-moss-2 py-14 text-ivory sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[38rem] rounded-full bg-clay/12 blur-3xl"
      />
      {/* Two columns on large screens: the pitch and actions on the left,
          the four facts as a card on the right — the column the enquiry
          form used to fill before it moved into BookingDialog. */}
      <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
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
              <Button
                href="#enquire"
                data-cta="enquire"
                arrow
                className="!bg-ivory !text-ink hover:!bg-white"
              >
                Book a Room
              </Button>
              <Magnetic>
                <Button
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  data-cta="whatsapp"
                >
                  <MessageCircle className="size-[1.05em]" aria-hidden="true" /> WhatsApp Us
                </Button>
              </Magnetic>
              <Button href={roomsHref} variant="light">
                See room types
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <dl className="grid grid-cols-2 gap-x-5 gap-y-8 rounded-[1.5rem] border border-white/12 bg-white/[0.045] p-6 backdrop-blur-sm sm:p-10">
            <div>
              <dt className="t-label text-white/45">Reply time</dt>
              <dd className="mt-1.5 font-display text-base sm:text-xl">Usually same day</dd>
            </div>
            <div>
              <dt className="t-label text-white/45">Visits</dt>
              <dd className="mt-1.5 font-display text-base sm:text-xl">Walk-ins welcome</dd>
            </div>
            <div>
              <dt className="t-label text-white/45">Booking</dt>
              <dd className="mt-1.5 font-display text-base sm:text-xl">No brokerage</dd>
            </div>
            <div>
              <dt className="t-label text-white/45">Campus</dt>
              <dd className="mt-1.5 font-display text-base sm:text-xl">Yeshwanthpur</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
