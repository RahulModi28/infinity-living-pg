"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs, whatsappHref } from "@/lib/site";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-ivory pb-14 pt-32 sm:pb-24 sm:pt-40 lg:pb-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          {/* This is the page's only h1 and it used to name nothing — the
              whole reason the page ranks is PG questions. The campus stays in
              the intro rather than the headline: spelled out in full it ran to
              five lines of display type, which this layout doesn't carry. */}
          <SectionHead
            as="h1"
            eyebrow="FAQ"
            title="The questions everyone asks about our PG."
            intro="Straight answers about Infinity Space, the gents PG near Christ University Yeshwanthpur Campus — including the ones other places leave vague. If something isn't here, ask us and you'll get the real answer the same day."
          />
          <Reveal delay={0.1}>
            <Button
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              className="mt-8"
              arrow
            >
              Ask us anything
            </Button>
          </Reveal>
        </div>

        <div>
          <Reveal stagger className="divide-y divide-ink/12 border-t border-ink/12">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                {/* h2, not h3: the section head above is the page h1, and
                    h1 → h3 skips a level for screen readers and for the
                    heading outline AI crawlers parse. */}
                <h2>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-display text-[1.0625rem] leading-snug tracking-[-0.015em] transition-colors duration-300 group-hover:text-clay sm:text-[1.1875rem]">
                      {f.q}
                    </span>
                    <span
                      className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-ink/15 transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? "rotate-45 border-clay bg-clay text-white" : "group-hover:border-ink/40"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h2>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`grid transition-[grid-template-rows] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p
                      className={`max-w-[62ch] pb-6 pr-10 text-[0.9375rem] leading-relaxed transition-opacity duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      } text-mute`}
                    >
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          </Reveal>

          {/* The only way off this page was WhatsApp. Search traffic lands
              here directly, so it needs somewhere to go next — and the gents
              page already links in, which left the link one-directional. */}
          <Reveal>
            <p className="mt-8 text-[0.8125rem] leading-relaxed text-mute">
              Still deciding? See{" "}
              <a href="/#rooms" className="link-u font-medium text-ink">
                room types and rent
              </a>
              , or the detail on a{" "}
              <a href="/gents-pg-yeshwanthpur" className="link-u font-medium text-ink">
                gents PG in Yeshwanthpur
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
