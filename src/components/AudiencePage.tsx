import { Check, MessageCircle, ArrowLeft } from "lucide-react";
import type { Audience } from "@/lib/audiences";
import { whatsappHref, site } from "@/lib/site";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import MobileBar from "./MobileBar";
import Rooms from "./Rooms";
import BookingSteps from "./BookingSteps";
import FinalCTA from "./FinalCTA";
import Figure from "./ui/Figure";
import Reveal from "./ui/Reveal";
import SplitText from "./ui/SplitText";
import Button from "./ui/Button";

export default function AudiencePage({ a }: { a: Audience }) {
  return (
    <>
      <Navbar />
      <main>
        <section className="grain relative isolate overflow-hidden bg-moss-2 pb-14 pt-32 text-ivory sm:pb-20 sm:pt-40">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 -top-32 size-[34rem] rounded-full bg-clay/12 blur-3xl"
          />
          <div className="shell relative">
            <a
              href="/"
              className="link-u inline-flex items-center gap-2 text-[0.875rem] text-white/60 hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> Infinity Space
            </a>
            <p className="t-label mt-6 text-clay">{a.eyebrow}</p>
            <SplitText
              as="h1"
              text={a.h1}
              trigger="load"
              className="t-section mt-4 block max-w-[18ch]"
            />
            <Reveal delay={0.15}>
              <p className="t-body mt-6 max-w-[52ch] text-white/72">{a.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href={whatsappHref(
                    `Hi, I'm interested in the ${a.h1.split(",")[0].toLowerCase()} at Infinity Space. Could you share availability and pricing?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  data-cta="whatsapp"
                >
                  <MessageCircle className="size-[1.05em]" aria-hidden="true" /> WhatsApp Us
                </Button>
                <Button href="#rooms" variant="light">
                  See rooms &amp; rent
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {a.sections.map((s, i) => (
          <section
            key={s.h2}
            className={`py-14 sm:py-24 ${i % 2 ? "border-y border-ink/8 bg-ivory-2" : "bg-ivory"}`}
          >
            <div
              className={`shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16 ${
                i % 2 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <SplitText as="h2" text={s.h2} className="t-section block max-w-[16ch]" />
                <Reveal delay={0.1}>
                  <p className="t-body mt-5 max-w-[50ch] text-mute">{s.body}</p>
                </Reveal>
                <Reveal stagger className="mt-8 space-y-3">
                  {s.points.map((p) => {
                    const unconfirmed = p.includes("[");
                    return (
                      <div
                        key={p}
                        className={`flex items-start gap-3 text-[0.9375rem] leading-snug ${
                          unconfirmed ? "text-mute/70" : "text-ink-2"
                        }`}
                      >
                        <Check
                          className={`mt-[0.25em] size-4 shrink-0 ${
                            unconfirmed ? "text-mute/40" : "text-moss"
                          }`}
                          aria-hidden="true"
                        />
                        {p}
                      </div>
                    );
                  })}
                </Reveal>
              </div>
              <Figure
                src={["/images/room-double.jpg", "/images/entrance.jpg", "/images/living-room.jpg"][i % 3]}
                alt={`${s.h2} — Infinity Space, Yeshwanthpur, Bengaluru`}
                className="aspect-[4/3] rounded-[1.5rem] lg:aspect-[4/5]"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </section>
        ))}

        <Rooms />

        <section className="border-y border-ink/8 bg-ivory-2 py-14 sm:py-24">
          <div className="shell max-w-3xl">
            <SplitText as="h2" text="Questions we get asked" className="t-section block" />
            <dl className="mt-10 divide-y divide-ink/12 border-y border-ink/12">
              {a.faqs.map((f) => (
                <Reveal key={f.q}>
                  <div className="py-6">
                    <dt className="font-display text-[1.0625rem] leading-snug tracking-[-0.015em] sm:text-[1.1875rem]">
                      {f.q}
                    </dt>
                    <dd className="mt-2.5 max-w-[62ch] text-[0.9375rem] leading-relaxed text-mute">
                      {f.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
            <Reveal>
              <p className="mt-8 text-[0.8125rem] leading-relaxed text-mute">
                More questions answered on the{" "}
                <a href="/#faq" className="link-u font-medium text-ink">
                  main FAQ
                </a>
                , including deposits, notice period and what the rent covers.
              </p>
            </Reveal>
          </div>
        </section>

        <BookingSteps />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBar />
      <span className="sr-only">
        {site.name}, {site.address.locality}, {site.address.city}
      </span>
    </>
  );
}
