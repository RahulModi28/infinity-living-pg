"use client";

import Image from "next/image";
import { useRef } from "react";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { gsap, initGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";

/**
 * SIGNATURE INTERACTION
 * ─────────────────────
 * A pinned, scrub-driven sequence: a small centred room image expands to
 * full-bleed while the section's ground shifts from near-black to ivory and
 * four words settle around it. It then hands off cleanly to the next section.
 *
 * Performance notes:
 *  - Only transform / opacity / background-color are animated.
 *  - The whole thing is one ScrollTrigger with `scrub`, so it costs nothing
 *    when off-screen and stays locked to the scroll position.
 *  - Under prefers-reduced-motion the section renders as a static composed
 *    layout with no pin and no scrub — same content, no movement.
 */
export default function SignatureReveal() {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    initGsap();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean };

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: "top top",
              // Shorter travel on mobile so it never feels like a hostage scroll.
              end: isDesktop ? "+=220%" : "+=140%",
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
            },
          });

          tl.fromTo(
            "[data-sig='frame']",
            { scale: isDesktop ? 0.26 : 0.42, borderRadius: "2rem" },
            { scale: 1, borderRadius: "0rem", ease: "power1.inOut", duration: 1 },
            0
          )
            .fromTo(
              "[data-sig='img']",
              { scale: 1.35 },
              { scale: 1, ease: "power1.inOut", duration: 1 },
              0
            )
            .fromTo(
              "[data-sig='stage']",
              { backgroundColor: "#0e1d18" },
              { backgroundColor: "#f7f4ef", ease: "none", duration: 1 },
              0
            )
            // Words drift in around the growing frame, then fade as it fills.
            .fromTo(
              "[data-sig='w']",
              { opacity: 0, y: 26 },
              { opacity: 1, y: 0, stagger: 0.12, duration: 0.35, ease: "power2.out" },
              0.08
            )
            .to("[data-sig='w']", { opacity: 0, duration: 0.2, ease: "none" }, 0.62)
            .fromTo(
              "[data-sig='caption']",
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
              0.72
            );

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        }
      );

      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, []);

  const words = ["Designed", "for", "student", "life."];

  return (
    <div ref={root} className="relative">
      <section
        data-sig="stage"
        aria-label="A closer look at the rooms"
        className="relative flex h-[100svh] items-center justify-center overflow-hidden bg-[#0e1d18]"
      >
        {/* Words orbiting the frame */}
        <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
          <span
            data-sig="w"
            className="absolute left-[8%] top-[24%] font-display text-[clamp(1.5rem,3.4vw,3rem)] tracking-[-0.03em] text-ivory"
          >
            {words[0]}
          </span>
          <span
            data-sig="w"
            className="absolute right-[10%] top-[32%] font-display text-[clamp(1.5rem,3.4vw,3rem)] tracking-[-0.03em] text-ivory/70"
          >
            {words[1]}
          </span>
          <span
            data-sig="w"
            className="absolute bottom-[30%] left-[13%] font-display text-[clamp(1.5rem,3.4vw,3rem)] tracking-[-0.03em] text-clay"
          >
            {words[2]}
          </span>
          <span
            data-sig="w"
            className="absolute bottom-[22%] right-[8%] font-display text-[clamp(1.5rem,3.4vw,3rem)] tracking-[-0.03em] text-ivory"
          >
            {words[3]}
          </span>
        </div>

        {/* Mobile: stacked headline instead of scattered words */}
        <p
          data-sig="w"
          className="pointer-events-none absolute left-6 top-[18%] z-20 max-w-[9ch] font-display text-[2rem] leading-[1.05] tracking-[-0.03em] text-ivory md:hidden"
        >
          Designed for <span className="text-clay">student life.</span>
        </p>

        <div
          data-sig="frame"
          className="relative z-10 h-full w-full origin-center overflow-hidden will-change-transform"
        >
          <Image
            data-sig="img"
            src="/images/signature.svg"
            alt="A furnished room at Infinity Living PG near Christ University Yeshwanthpur Campus"
            fill
            sizes="100vw"
            className="scale-[1.35] object-cover will-change-transform"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(10,20,16,0.7)_100%)]"
          />
          <p
            data-sig="caption"
            className="absolute inset-x-0 bottom-10 mx-auto max-w-3xl px-6 text-center font-display text-[clamp(1.25rem,2.6vw,2.25rem)] leading-tight tracking-[-0.03em] text-ivory opacity-0"
          >
            Rooms you&apos;ll actually want to come back to.
          </p>
        </div>
      </section>
    </div>
  );
}
