import { GraduationCap, BedDouble, Wifi, ShieldCheck, UtensilsCrossed, Sparkles } from "lucide-react";
import Reveal from "./ui/Reveal";

const ITEMS = [
  { icon: GraduationCap, t: "Walk to campus", s: "Christ University, Yeshwanthpur" },
  { icon: BedDouble, t: "Move-in ready", s: "Bed, wardrobe, desk — done" },
  { icon: Wifi, t: "Wi-Fi that holds", s: "Through submission week" },
  { icon: UtensilsCrossed, t: "Four meals a day", s: "Cooked on site, not ordered in" },
  { icon: ShieldCheck, t: "Secured entry", s: "24/7 — details on request" },
  { icon: Sparkles, t: "Housekeeping", s: "Rooms & common areas" },
];

export default function TrustStrip() {
  return (
    <section aria-label="At a glance" className="border-b border-ink/8 bg-ivory-2">
      <div className="shell py-10 sm:py-14">
        <Reveal stagger className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
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
