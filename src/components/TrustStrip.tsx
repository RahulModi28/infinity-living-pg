import { GraduationCap, BedDouble, Wifi, ShieldCheck, UtensilsCrossed, Dumbbell } from "lucide-react";
import Reveal from "./ui/Reveal";
import { answerBlock } from "@/lib/site";

const ITEMS = [
  { icon: GraduationCap, t: "Walk to campus", s: "Christ University, Yeshwanthpur" },
  { icon: BedDouble, t: "Move-in ready", s: "Bed, wardrobe, desk — done" },
  { icon: Wifi, t: "Wi-Fi that holds", s: "Through submission week" },
  { icon: UtensilsCrossed, t: "Four meals a day, Mon–Fri", s: "Cooked on site, not ordered in" },
  { icon: ShieldCheck, t: "Secured entry", s: "24/7 — details on request" },
  { icon: Dumbbell, t: "Gym, pool & TT", s: "Without leaving the building" },
];

export default function TrustStrip() {
  return (
    <section aria-labelledby="at-a-glance" className="border-b border-ink/8 bg-ivory-2">
      <div className="shell py-10 sm:py-14">
        {/* The whole offer in one self-contained paragraph, first thing under
            the hero. The hero headline is brand copy; this is the sentence a
            search snippet or an AI answer can quote without the rest of the
            page — so it names the place, the distance and the rent outright. */}
        <Reveal>
          <h2 id="at-a-glance" className="t-label text-clay">
            PG near Christ University Yeshwanthpur, at a glance
          </h2>
          <p className="t-body mt-4 max-w-[68ch] text-ink-2">{answerBlock()}</p>
        </Reveal>
        <Reveal stagger className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {ITEMS.map(({ icon: Icon, t, s }) => (
            <div key={t} className="group">
              <Icon
                className="size-6 text-moss transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
              <p className="mt-3 font-display text-[0.9375rem] font-semibold tracking-[-0.01em]">{t}</p>
              <p className="mt-1 text-[0.8125rem] leading-snug text-mute">{s}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
