"use client";

import Image from "next/image";
import { useRef } from "react";
import { MapPin, Wifi, ShieldCheck, Sofa, UtensilsCrossed, Play } from "lucide-react";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/motion";
import Button from "./ui/Button";
import Magnetic from "./ui/Magnetic";

const SIGNALS = [
  { icon: MapPin, label: "Near Christ University" },
  { icon: Sofa, label: "Fully Furnished" },
  { icon: Wifi, label: "High-Speed Wi-Fi" },
  { icon: ShieldCheck, label: "24/7 Security" },
  { icon: UtensilsCrossed, label: "Meals Available" },
];

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
          src="/images/hero.svg"
          alt="Infinity Living PG near Christ University Yeshwanthpur Campus, Bengaluru — building exterior and common area"
          fill
          priority
          sizes="100vw"
          className="scale-110 object-cover"
        />
      </div>
      <div
        data-h="veil"
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,20,16,0.62)_0%,rgba(10,20,16,0.28)_38%,rgba(10,20,16,0.86)_100%)]"
      />

      <div className="shell w-full text-ivory">
        <p
          data-h="badge"
          className="t-label inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md"
        >
          <MapPin className="size-3.5" aria-hidden="true" />
          PG near Christ University · Yeshwanthpur, Bengaluru
        </p>

        <h1 className="t-hero mt-6 max-w-[16ch] font-medium">
          {headline.map((w, i) => (
            <span key={i}>
              <span data-h="word" className="rw">
                <span>{w}</span>
              </span>
              {i < headline.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <p data-h="sub" className="t-sub mt-7 max-w-[46ch] text-white/78">
          Premium student living near{" "}
          <strong className="font-medium text-white">
            Christ University, Yeshwanthpur Campus
          </strong>
          . Furnished rooms, real Wi-Fi, meals and a short walk to class.
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

        <ul
          data-h="strip"
          className="no-bar mt-12 flex gap-x-6 gap-y-3 overflow-x-auto border-t border-white/15 pt-6 text-white/72 sm:flex-wrap sm:overflow-visible"
        >
          {SIGNALS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex shrink-0 items-center gap-2 text-[0.8125rem] sm:text-sm">
              <Icon className="size-4 text-clay" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
