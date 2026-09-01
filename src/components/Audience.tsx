import { Mars, Check } from "lucide-react";
import { audiences } from "@/lib/audiences";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

/**
 * Search data shows this micro-market searches by "gents PG" far more than by
 * "student accommodation", and no ranking competitor gives that audience a
 * real section. This is that section, and it doubles as the on-page home for
 * those keywords.
 *
 * The property is gents-only. That is carried by this card's heading and
 * subheading, by the FAQ, and by the meta description — so it is stated
 * without a separate callout competing with the card for attention.
 */
const POINTS = [
  "About 850 m by road to Christ University Yeshwanthpur Campus — roughly a 10 minute walk",
  "Single and double sharing rooms, both furnished with bed, wardrobe and study desk",
  "Gym, pool table and table tennis in the building",
  "Attached bathroom, rooftop dining hall and a shared living room",
  "Biometric entry at the main door",
  "Nagasandra Metro on the Green Line for the rest of the city",
];

export default function Audience() {
  return (
    <section aria-label="Gents PG in Yeshwanthpur" className="bg-ivory pb-4 pt-14 sm:pt-24">
      {/* Heading beside the card rather than above it. With the second column
          gone there was nothing to balance a full-width heading against, and
          a lone card in a 84rem shell reads as a layout that lost something. */}
      <div className="shell grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <div>
          <SectionHead
            eyebrow="Who it's for"
            title="A gents PG, a 10 minute walk from campus."
            intro="Whether you're a first-year moving in from another state or working nearby on Tumkur Road, the room is the same standard."
          />
        </div>

        <Reveal>
          <div className="rounded-[1.5rem] border border-ink/12 bg-ivory-2 p-7 sm:p-9">
            <span className="grid size-12 place-items-center rounded-2xl bg-moss/10 text-moss">
              <Mars className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-[1.5rem] leading-tight tracking-[-0.025em] sm:text-[1.75rem]">
              Gents PG in Yeshwanthpur
            </h3>
            <p className="mt-2 text-[0.9375rem] text-mute">
              For men — students and working professionals
            </p>
            <ul className="mt-6 space-y-2.5">
              {POINTS.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-ink-2"
                >
                  <Check className="mt-[0.25em] size-4 shrink-0 text-moss" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <Button
              href={`/${audiences.gents.slug}`}
              variant="ghost"
              className="mt-7 !px-5 !py-3 !text-[0.875rem]"
              arrow
            >
              See gents PG details
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
