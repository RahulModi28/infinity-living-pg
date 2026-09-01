"use client";

import { useRef } from "react";
import {
  BedDouble, Wifi, Sofa, ShieldCheck, Check, type LucideIcon,
} from "lucide-react";
import { amenityGroups } from "@/lib/site";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/motion";
import SectionHead from "./ui/SectionHead";

const ICONS: Record<string, LucideIcon> = { BedDouble, Wifi, Sofa, ShieldCheck };

export default function Amenities() {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    initGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      });
      tl.fromTo(
        el.querySelectorAll("[data-card]"),
        { opacity: 0, y: 34 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.09, ease: "power3.out" }
      ).fromTo(
        el.querySelectorAll("[data-ico]"),
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.09, ease: "back.out(2)" },
        0.15
      ).fromTo(
        el.querySelectorAll("[data-item]"),
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.025, ease: "power2.out" },
        0.3
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="amenities"
      className="grain relative scroll-mt-20 overflow-hidden bg-moss py-20 text-ivory sm:py-28 lg:py-32"
    >
      <div className="shell">
        <div className="text-ivory [&_.t-section]:text-ivory">
          <SectionHead
            eyebrow="Amenities"
            tone="light"
            title="What's actually included."
            intro="Only what we provide — nothing padded out to look impressive. Anything still being confirmed is marked as such."
          />
        </div>

        <div
          ref={root}
          className="no-bar edge-fade -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:[mask-image:none] lg:grid-cols-4"
        >
          {amenityGroups.map((g) => {
            const Icon = ICONS[g.icon] ?? Sofa;
            return (
              <div
                key={g.title}
                data-card=""
                className="group w-[74vw] shrink-0 snap-start rounded-[1.5rem] border border-white/12 bg-white/[0.045] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-white/28 hover:bg-white/[0.08] md:w-auto"
              >
                <span
                  data-ico=""
                  className="grid size-12 place-items-center rounded-2xl bg-clay/15 text-clay transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1"
                >
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl text-ivory">{g.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((it) => {
                    const unconfirmed = it.includes("[");
                    return (
                      <li
                        key={it}
                        data-item=""
                        className={`flex items-start gap-2.5 text-[0.9375rem] leading-snug ${
                          unconfirmed ? "text-white/40" : "text-white/78"
                        }`}
                      >
                        <Check
                          className={`mt-[0.25em] size-3.5 shrink-0 ${
                            unconfirmed ? "text-white/25" : "text-clay"
                          }`}
                          aria-hidden="true"
                        />
                        {it}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
