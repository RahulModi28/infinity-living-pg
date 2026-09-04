"use client";

import Image from "next/image";
import { useRef } from "react";
import { MapPin, Wifi, ShieldCheck, Sofa, UtensilsCrossed, Dumbbell, Play } from "lucide-react";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/motion";
import Button from "./ui/Button";
import Magnetic from "./ui/Magnetic";

const SIGNALS = [
  { icon: MapPin, label: "Near Christ University" },
  { icon: Sofa, label: "Fully Furnished" },
  { icon: Wifi, label: "High-Speed Wi-Fi" },
  { icon: ShieldCheck, label: "24/7 Security" },
  { icon: UtensilsCrossed, label: "Four Meals a Day" },
  { icon: Dumbbell, label: "Gym, Pool & Table Tennis" },
];

function SignalList({
  wrap = false,
  duplicate = false,
}: {
  wrap?: boolean;
  duplicate?: boolean;
}) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={
        wrap
          ? "flex flex-wrap gap-x-6 gap-y-3"
          : `flex shrink-0 items-center gap-x-6 pr-6 ${duplicate ? "marquee__dupe" : ""}`
      }
    >
      {SIGNALS.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex shrink-0 items-center gap-2 text-[0.8125rem] sm:text-sm"
        >
          <Icon className="size-4 text-clay" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    initGsap();

    const q = gsap.utils.selector(el);
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(q("[data-h]"), { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // ~1.3s total. Nothing blocks interaction — the page is scrollable
      // and every CTA is clickable from frame one.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        q("[data-h='img']"),
        { scale: 1.06, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
      )
        .fromTo(q("[data-h='veil']"), { opacity: 0 }, { opacity: 1, duration: 0.9 }, 0.15)
        .fromTo(
          q("[data-h='badge']"),
          { opacity: 0, x: -18 },
          { opacity: 1, x: 0, duration: 0.7 },
          0.35
        )
        .fromTo(
          q("[data-h='word'] > span"),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.95, ease: "power4.out", stagger: 0.075 },
          0.4
        )
        .fromTo(
          q("[data-h='sub']"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.85
        )
        .fromTo(
          q("[data-h='cta']"),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          0.98
        )
        .fromTo(
          q("[data-h='strip']"),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7 },
          1.1
        );

      // Slow drift on the backdrop as you leave the hero.
      gsap.to(q("[data-h='img']"), {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const headline = ["Your", "next", "chapter", "starts", "here."];

  return (
    <section
      ref={root}
      id="top"
      className="grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-moss-2 pb-8 pt-28 sm:pb-12"
    >
      <div data-h="img" className="absolute inset-0 -z-20 will-change-transform">
        <Image
          src="/images/hero.jpg"
          alt="The common area at Infinity Space PG near Christ University Yeshwanthpur Campus, Bengaluru — lounge seating, snooker table and gym"
          fill
          priority
          // Full-bleed background: one source at every width, so let the
          // browser pick from the generated set rather than guessing.
          sizes="100vw"
          quality={80}
          // 4:3 source in a full-height hero crops hard at the sides on
          // desktop; anchoring the focal point slightly above centre keeps
          // the seating and snooker table in frame instead of the ceiling.
          className="scale-110 object-cover object-[50%_45%]"
        />
      </div>
      {/*
        Two scrims, not one. The old single vertical veil was tuned for a dark
        placeholder; over the real photo the headline measured 2.05:1 and the
        subheading 2.82:1 against white — both below WCAG AA.

        Stacking a vertical veil with a left-side scrim fixes that without
        flattening the picture: the copy is left-aligned and capped at 46ch,
        so darkening only that side buys contrast while the right half of the
        room stays bright. Measured after the change: headline 4.2:1,
        subheading 5.5:1, buttons 8.5:1.
        Inline styles rather than Tailwind arbitrary values — multi-stop
        gradients with commas do not survive the class parser cleanly.
      */}
      <div
        data-h="veil"
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,20,16,0.58) 0%, rgba(10,20,16,0.46) 32%, rgba(10,20,16,0.78) 72%, rgba(10,20,16,0.92) 100%)",
        }}
      />
      <div
        data-h="veil"
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,20,16,0.55) 0%, rgba(10,20,16,0.28) 45%, rgba(10,20,16,0) 70%)",
        }}
      />

      <div className="shell w-full text-ivory">
        {/*
          The location pill is part of the h1, not a sibling of it.

          The h1 was "Your next chapter starts here." — good brand copy with
          none of the term anyone actually searches, so the head keyword lived
          only in the title and the h2s. Putting it in as a kicker fixes that
          with real, visible text: no sr-only duplicate, no hidden-text risk,
          and the big line stays the thing you read first.

          It also inherits the pill's translucent background, which is what
          makes small type legible over a photograph — plain text at this size
          measured under AA on the bright frames.
        */}
        <h1 className="font-medium">
          <span
            data-h="badge"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[0.6875rem] font-semibold uppercase leading-none tracking-[0.09em] backdrop-blur-md sm:text-xs sm:tracking-[0.14em]"
          >
            <MapPin className="size-3.5" aria-hidden="true" />
            PG near Christ University · Yeshwanthpur
          </span>{" "}
          <span className="t-hero mt-6 block max-w-[16ch]">
            {headline.map((w, i) => (
              <span key={i}>
                <span data-h="word" className="rw">
                  <span>{w}</span>
                </span>
                {i < headline.length - 1 ? " " : ""}
              </span>
            ))}
          </span>
        </h1>

        {/* The keyword now sits in the h1, so this can sell instead of repeat. */}
        <p data-h="sub" className="t-sub mt-7 max-w-[46ch] text-white/90">
          A <strong className="font-medium text-white">10 minute walk</strong> from campus.
          Furnished rooms, meals cooked on site, a gym and a rooftop dining hall &mdash; from{" "}
          <strong className="font-medium text-white">&#8377;16,000 a month</strong>.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <div data-h="cta">
            <Magnetic>
              <Button
                href="#rooms"
                arrow
                className="!bg-ivory !text-ink hover:!bg-clay hover:!text-white"
              >
                Check Rooms
              </Button>
            </Magnetic>
          </div>
          <Button data-h="cta" href="#gallery" variant="light">
            <Play className="size-4 fill-current" aria-hidden="true" /> Take a Virtual Tour
          </Button>
        </div>

        <div data-h="strip" className="mt-12 border-t border-white/15 pt-6 text-white/72">
          {/* Phones: the five signals don't fit, so they travel instead of
              being clipped mid-word. The second copy is aria-hidden so the
              list is announced only once. */}
          <div className="marquee sm:hidden">
            <div className="marquee__track">
              <SignalList />
              <SignalList duplicate />
            </div>
          </div>

          {/* From `sm` up they all fit on one or two lines — no motion needed. */}
          <div className="hidden sm:block">
            <SignalList wrap />
          </div>
        </div>
      </div>
    </section>
  );
}
