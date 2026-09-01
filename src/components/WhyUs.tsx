"use client";

import { useRef } from "react";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/motion";
import SectionHead from "./ui/SectionHead";

const BENEFITS = [
  { n: "01", t: "Campus Convenience", d: "Live close to Christ University Yeshwanthpur, not across the city from it." },
  { n: "02", t: "Move-In Ready", d: "Bed, mattress, wardrobe, study desk. Arrive with a suitcase, not a truck." },
  { n: "03", t: "Stay Connected", d: "High-speed Wi-Fi that survives submission week and video calls home." },
  { n: "04", t: "Feel at Home", d: "Clean rooms, common spaces worth sitting in, regular housekeeping." },
  { n: "05", t: "Peace of Mind", d: "Secured entry and professional management your parents can call." },
  { n: "06", t: "Simple Living", d: "Meals, laundry, Wi-Fi, cleaning — one address, one monthly bill." },
];

export default function WhyUs() {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    initGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-b]"),
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-ivory py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHead
          eyebrow="Why students choose us"
          title="Everything you need. Nothing you don't."
          intro="No inflated promises. Just the things that actually make a college year easier."
        />

        <div ref={root} className="mt-14 grid gap-x-10 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div
              key={b.n}
              data-b=""
              className="group relative border-t border-ink/12 py-7 transition-colors duration-500 hover:border-ink/35"
            >
              <span
                aria-hidden="true"
                className="absolute -top-px left-0 h-px w-0 bg-clay transition-[width] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
              />
              <p className="font-display text-[0.8125rem] font-semibold tracking-[0.1em] text-clay">
                {b.n}
              </p>
              <h3 className="mt-3 font-display text-xl tracking-[-0.02em] sm:text-[1.375rem]">
                {b.t}
              </h3>
              <p className="mt-2.5 max-w-[36ch] text-[0.9375rem] leading-relaxed text-mute">
                {b.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
