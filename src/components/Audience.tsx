import { Mars, Check, Info } from "lucide-react";
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
 * It also says plainly that the property is gents-only. The "ladies pg
 * yeshwanthpur" cluster is bigger, but chasing it would earn enquiries this
 * property can't serve — better to pre-qualify here than to waste a visit.
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
    <section
      aria-label="Gents PG in Yeshwanthpur"
      className="bg-ivory pb-4 pt-14 sm:pt-24"
    >
      <div className="shell">
        <SectionHead
          eyebrow="Who it's for"
          title="A gents PG, a 10 minute walk from campus."
          intro="Whether you're a first-year moving in from another state or working nearby on Tumkur Road, the room is the same standard."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
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

          <Reveal delay={0.1} className="lg:pt-6">
            {/* Said out loud, not buried. Someone looking for a women's PG
                should find that out here rather than after a visit. */}
            <div className="flex gap-4 rounded-[1.25rem] border border-ink/12 p-6">
              <Info className="mt-0.5 size-5 shrink-0 text-clay" aria-hidden="true" />
              <div>
                <h3 className="font-display text-[1.0625rem] tracking-[-0.015em]">
                  We&apos;re a gents-only PG
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-mute">
                  Infinity Space doesn&apos;t currently have accommodation for women. If
                  you&apos;re looking for a ladies PG near the campus, we&apos;d rather tell you
                  now than after you&apos;ve made the trip.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
