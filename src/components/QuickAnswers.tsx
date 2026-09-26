import { homeFaqs } from "@/lib/site";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";

/**
 * The questions people actually search before they enquire, answered on the
 * homepage in plain text rather than behind an accordion — open text is what
 * crawlers and AI answers read. Mirrors homeFaqJsonLd(), which is built from
 * the same list, and links on to /faq for everything else.
 */
export default function QuickAnswers() {
  return (
    <section id="quick-answers" className="scroll-mt-20 border-y border-ink/8 bg-ivory-2 py-14 sm:py-24">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHead
          eyebrow="Quick answers"
          title="Rent, deposit and distance, answered."
          intro="What most people ask about a PG near Christ University Yeshwanthpur Campus before they message us."
        />
        <div>
          <dl className="divide-y divide-ink/12 border-y border-ink/12">
            {homeFaqs().map((f) => (
              <Reveal key={f.q}>
                <div className="py-6">
                  <dt className="font-display text-[1.0625rem] leading-snug tracking-[-0.015em] sm:text-[1.1875rem]">
                    {f.q}
                  </dt>
                  <dd className="mt-2.5 max-w-[62ch] text-[0.9375rem] leading-relaxed text-mute">{f.a}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
          <Reveal>
            <p className="mt-8 text-[0.8125rem] leading-relaxed text-mute">
              Food, Wi-Fi, curfew, visitors and booking are on the{" "}
              <a href="/faq" className="link-u font-medium text-ink">
                full FAQ
              </a>
              . Walking through the choice step by step?{" "}
              <a href="/blog/pg-near-christ-university-yeshwanthpur-checklist" className="link-u font-medium text-ink">
                What to check before you pay for a PG
              </a>
              , or{" "}
              <a href="/blog/single-sharing-pg-near-christ-university" className="link-u font-medium text-ink">
                single vs double sharing, compared
              </a>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
