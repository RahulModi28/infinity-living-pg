import { Sunrise, Sun, Moon, SprayCan } from "lucide-react";
import Figure from "./ui/Figure";
import Reveal from "./ui/Reveal";
import SectionHead from "./ui/SectionHead";

const MEALS = [
  { icon: Sunrise, t: "Breakfast", time: "[TIMING]", ex: "[SAMPLE MENU — e.g. idli, poha, upma, eggs, tea/coffee]" },
  { icon: Sun, t: "Lunch", time: "[TIMING]", ex: "[SAMPLE MENU — e.g. rice, roti, sabzi, dal, curd]" },
  { icon: Moon, t: "Dinner", time: "[TIMING]", ex: "[SAMPLE MENU — e.g. roti, curry, rice, sweet on weekends]" },
  { icon: SprayCan, t: "Hygiene", time: "Daily", ex: "[KITCHEN HYGIENE & FSSAI DETAILS — CONFIRM]" },
];

const SHOTS = [
  { src: "/images/food-1.svg", alt: "Breakfast served at Infinity Living PG, Yeshwanthpur" },
  { src: "/images/food-2.svg", alt: "Lunch thali served at Infinity Living PG near Christ University" },
  { src: "/images/food-3.svg", alt: "Dinner spread at Infinity Living student accommodation, Bengaluru" },
  { src: "/images/food-4.svg", alt: "Clean kitchen at Infinity Living PG, Yeshwanthpur" },
  { src: "/images/food-5.svg", alt: "Dining area at Infinity Living PG, Yeshwanthpur, Bengaluru" },
];

export default function Food() {
  return (
    <section className="bg-ivory py-14 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHead
          eyebrow="Food"
          title="Three meals, made in-house."
          intro="Home-style food, on a rotating menu, in a dining area you don't have to leave the building for. Exact menu and timings are being confirmed."
        />
      </div>

      {/* Horizontal food gallery — full-bleed, swipeable */}
      <div className="no-bar edge-fade mt-12 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-2 sm:gap-5 md:px-[max(1.25rem,calc((100vw-84rem)/2+2rem))]">
        {SHOTS.map((s) => (
          <Figure
            key={s.src}
            src={s.src}
            alt={s.alt}
            className="aspect-square w-[68vw] shrink-0 snap-start rounded-[1.25rem] sm:w-[38vw] lg:w-[26rem]"
            sizes="(max-width: 640px) 68vw, 26rem"
            reveal={false}
          />
        ))}
      </div>

      <div className="shell">
        <Reveal stagger className="mt-12 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {MEALS.map(({ icon: Icon, t, time, ex }) => (
            <div key={t} className="border-t border-ink/12 pt-5">
              <span className="flex items-center gap-2.5">
                <Icon className="size-[1.15rem] text-clay" aria-hidden="true" />
                <h3 className="font-display text-lg tracking-[-0.02em]">{t}</h3>
              </span>
              <p className="mt-2 t-label text-mute">{time}</p>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-mute/80">{ex}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
