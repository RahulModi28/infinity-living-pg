import { MessageCircle, Building2, FileCheck, KeyRound } from "lucide-react";
import { whatsappHref } from "@/lib/site";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

/**
 * Nobody enquires when they can't picture what happens next. Four steps,
 * stated plainly, so the first message feels low-commitment rather than
 * like the start of a sales process.
 */
const STEPS = [
  {
    icon: MessageCircle,
    n: "01",
    t: "Message us",
    d: "WhatsApp or the form. Tell us your room type and rough move-in date — that's all we need to check availability.",
  },
  {
    icon: Building2,
    n: "02",
    t: "Visit the place",
    d: "Come see the actual room, meet the staff, ask the awkward questions. Parents are welcome, and we'd rather you came than booked from photos.",
  },
  {
    icon: FileCheck,
    n: "03",
    t: "Confirm in writing",
    d: "Rent, deposit, notice period and what's included — all in writing before any money changes hands.",
  },
  {
    icon: KeyRound,
    n: "04",
    t: "Move in",
    d: "The room is cleaned and ready. Bring a suitcase; the bed, wardrobe and desk are already there.",
  },
];

export default function BookingSteps() {
  return (
    <section
      aria-label="How booking works"
      className="border-y border-ink/8 bg-ivory-2 py-14 sm:py-24 lg:py-32"
    >
      <div className="shell">
        <SectionHead
          eyebrow="How it works"
          title="Four steps. No brokerage."
          intro="You're not committing to anything by asking. Here's exactly what happens after you message us."
        />

        <ol className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, n, t, d }) => (
            <Reveal key={n} as="li" className="relative">
              <span className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-moss/10 text-moss">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-display text-[0.8125rem] font-semibold tracking-[0.1em] text-clay">
                  {n}
                </span>
              </span>
              <h3 className="mt-4 font-display text-xl tracking-[-0.02em]">{t}</h3>
              <p className="mt-2 max-w-[38ch] text-[0.9375rem] leading-relaxed text-mute">{d}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Button
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              data-cta="whatsapp"
            >
              <MessageCircle className="size-[1.05em]" aria-hidden="true" /> Start on WhatsApp
            </Button>
            <Button href="#enquire" variant="ghost" arrow>
              Or fill the form
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
