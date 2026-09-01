import { Venus, Mars, Check } from "lucide-react";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

/**
 * Search data shows that in this micro-market people search by "ladies PG" /
 * "gents PG" far more than by "student accommodation" — and none of the
 * ranking competitors give either audience a proper section. This is that
 * section, and it doubles as the on-page home for those keywords.
 */
const GROUPS = [
  {
    icon: Venus,
    h: "Ladies PG in Yeshwanthpur",
    sub: "For women students & working professionals",
    points: [
      "Separate floor / block — [CONFIRM ARRANGEMENT]",
      "Secured entry with [ACCESS CONTROL — CONFIRM]",
      "CCTV in common areas — [CONFIRM COVERAGE]",
      "Walk to Christ University Yeshwanthpur Campus",
    ],
  },
  {
    icon: Mars,
    h: "Gents PG in Yeshwanthpur",
    sub: "For men students & working professionals",
    points: [
      "Separate floor / block — [CONFIRM ARRANGEMENT]",
      "Single, double and triple sharing rooms",
      "Study desks and reliable Wi-Fi in every room",
      "Close to Yeshwanthpur Metro and the railway station",
    ],
  },
];

export default function Audience() {
  return (
    <section aria-label="Ladies PG and gents PG in Yeshwanthpur" className="bg-ivory pb-4 pt-20 sm:pt-28">
      <div className="shell">
        <SectionHead
          eyebrow="Who it's for"
          title="A ladies PG and a gents PG, near Christ University."
          intro="Whether you're a first-year moving in from another state or working nearby, the room is the same standard — the arrangement is what changes."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-7">
          {GROUPS.map(({ icon: Icon, h, sub, points }) => (
            <Reveal key={h}>
              <div className="group h-full rounded-[1.5rem] border border-ink/12 bg-ivory-2 p-7 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_20px_46px_-30px_rgba(18,17,16,0.5)] sm:p-9">
                <span className="grid size-12 place-items-center rounded-2xl bg-moss/10 text-moss transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-[1.5rem] leading-tight tracking-[-0.025em] sm:text-[1.75rem]">
                  {h}
                </h3>
                <p className="mt-2 text-[0.9375rem] text-mute">{sub}</p>
                <ul className="mt-6 space-y-2.5">
                  {points.map((p) => {
                    const unconfirmed = p.includes("[");
                    return (
                      <li
                        key={p}
                        className={`flex items-start gap-2.5 text-[0.9375rem] leading-snug ${
                          unconfirmed ? "text-mute/65" : "text-ink-2"
                        }`}
                      >
                        <Check
                          className={`mt-[0.25em] size-4 shrink-0 ${
                            unconfirmed ? "text-mute/40" : "text-moss"
                          }`}
                          aria-hidden="true"
                        />
                        {p}
                      </li>
                    );
                  })}
                </ul>
                <Button href="#enquire" variant="ghost" className="mt-7 !px-5 !py-3 !text-[0.875rem]" arrow>
                  Check availability
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
