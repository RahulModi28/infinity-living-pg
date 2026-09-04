import Image from "next/image";
import {
  MapPin,
  Wifi,
  ShieldCheck,
  Sofa,
  UtensilsCrossed,
  Dumbbell,
  Play,
  Check,
} from "lucide-react";
import Button from "./ui/Button";

/*
  The feature bar. "10 min from Christ" leads and is the only item given full
  white and a clay icon — everything after it is deliberately quieter so the
  row reads as one strong claim plus supporting detail, not six equal chips.
*/
const SIGNALS = [
  { icon: MapPin, label: "10 min from Christ", lead: true },
  { icon: Sofa, label: "Fully furnished" },
  { icon: UtensilsCrossed, label: "4 meals daily" },
  { icon: ShieldCheck, label: "24/7 security" },
  { icon: Wifi, label: "High-speed Wi-Fi" },
  { icon: Dumbbell, label: "Gym + Pool" },
];

const TRUST = ["Fully furnished", "4 meals daily", "24/7 security"];

export default function Hero() {
  return (
    <section
      id="top"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-moss-2"
    >
      {/*
        No parallax and no GSAP timeline here any more — the backdrop gets a
        single slow fade-in and then holds still. That drops the hero's client
        JS to zero and keeps the photograph, rather than the motion, as the
        thing you notice.
      */}
      <div className="hero-img-in absolute inset-0 -z-20">
        <Image
          src="/images/hero-lounge.jpg"
          alt="The lounge at Infinity Space PG near Christ University Yeshwanthpur Campus, Bengaluru — a curved sofa and armchairs on turf flooring under a coffered ceiling"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={82}
          /*
            Landscape 4:3 source. On desktop the viewport is wider than the
            photo, so `cover` scales by width and only the vertical anchor
            does anything: 62% keeps the sofa and turf in frame instead of
            filling the crop with the coffered ceiling.

            On phones the viewport is portrait, so the crop flips to
            horizontal and the X anchor takes over. 62% there walks the frame
            right, onto the sofa and windows, rather than slicing the
            armchairs down the middle.
          */
          className="scale-[1.06] object-cover object-[62%_58%] sm:object-[50%_62%]"
        />
      </div>

      {/*
        Overlay, part one: a horizontal wash (`.hero-wash` in globals.css,
        stepped per breakpoint). The copy is left-aligned, so the left edge
        carries the weight and — on wide screens — the right stays close to
        the real photograph: sofa, windows and warm ceiling lighting all still
        legible, which the previous near-uniform veil had flattened.
      */}
      <div aria-hidden="true" className="hero-wash absolute inset-0 -z-10" />
      {/*
        Part two: a short scrim at the foot only. The feature bar runs the full
        width, and its right-hand end sits over bright turf where the wash has
        faded to 0.10 — without this the last two items measure under 3:1. It
        starts at 58% of the height, so it never reaches the headline.
      */}
      <div aria-hidden="true" className="hero-foot absolute inset-0 -z-10" />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div /* Vertical breathing room scales with viewport HEIGHT, not width.
             Width-stepped padding fitted 1440x900 and 1024x768 but pushed
             the feature bar off a 1280x800 laptop; this keeps the whole
             composition inside the fold on short screens and opens up on
             tall ones. The 6.5rem floor is what clears the fixed navbar. */
        className="shell flex w-full flex-1 flex-col justify-center pb-[clamp(3.5rem,8.5vh,8rem)] pt-[clamp(6.5rem,13vh,8rem)]">
        <div className="max-w-[46rem] text-ivory">
          {/*
            The pill stays inside the h1. The headline itself is brand copy
            with none of the search term in it, so this kicker is what keeps
            "PG near Christ University · Yeshwanthpur" in the h1 as real,
            visible text — dropping it would strip the head keyword from the
            page's only h1.
          */}
          <h1 className="font-medium">
            <span
              className="hero-rise inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-2 text-[0.625rem] font-semibold uppercase leading-none tracking-[0.11em] text-white/90 backdrop-blur-md sm:px-4 sm:text-[0.75rem] sm:tracking-[0.2em]"
              style={{ animationDelay: "40ms" }}
            >
              <MapPin className="size-3.5 shrink-0 text-clay" aria-hidden="true" />
              PG near Christ University · Yeshwanthpur
            </span>

            <span
              className="hero-rise mt-6 block font-display sm:mt-7 text-[clamp(3rem,6.2vw,5.125rem)] font-medium leading-[0.97] tracking-[-0.04em]"
              style={{ animationDelay: "110ms" }}
            >
              Live closer.
              <br />
              Live better.
            </span>
          </h1>

          <p
            className="hero-rise mt-6 max-w-[41rem] text-[clamp(1rem,1.5vw,1.3125rem)] leading-[1.55] text-white/90 sm:mt-7"
            style={{ animationDelay: "180ms" }}
          >
            Premium furnished student accommodation just 10 minutes from Christ
            University, with meals, high-speed Wi-Fi, 24/7 security and everything you
            need under one roof.
          </p>

          {/* Price on its own line so it can't get lost mid-sentence. */}
          <p
            className="hero-rise mt-6 flex flex-wrap items-baseline gap-x-2.5 sm:mt-7 text-[0.9375rem] text-white/90"
            style={{ animationDelay: "230ms" }}
          >
            Starting from
            <span className="font-display text-[1.75rem] font-semibold tracking-[-0.03em] text-white sm:text-[2rem]">
              &#8377;16,000
            </span>
            <span>/ month</span>
          </p>

          <div
            /* Stacked full-width on phones — two pills of different widths
               left-aligned read as an accident, and a full-width primary is a
               bigger tap target on the screen size that converts most. */
            className="hero-rise mt-7 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: "280ms" }}
          >
            <Button
              href="#rooms"
              arrow
              className="w-full sm:w-auto !bg-ivory !text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)] hover:!bg-white hover:shadow-[0_16px_38px_-14px_rgba(0,0,0,0.6)]"
            >
              View Rooms &amp; Pricing
            </Button>
            <Button href="#gallery" variant="light" className="w-full sm:w-auto">
              <Play className="size-4 fill-current" aria-hidden="true" /> Take a Virtual
              Tour
            </Button>
          </div>

          <ul
            className="hero-rise mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-white/70 sm:mt-7"
            style={{ animationDelay: "330ms" }}
          >
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-3.5 shrink-0 text-white/50" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Feature bar ─────────────────────────────────────────────────── */}
      <div
        className="hero-rise shell w-full pb-6 sm:pb-9"
        style={{ animationDelay: "380ms" }}
      >
        {/*
          One row at every width. Below `sm` it scrolls horizontally inside its
          own track — the page itself never gains a scrollbar — and the
          trailing mask hints there is more to swipe. From `sm` up all six fit
          and it wraps normally.
        */}
        <ul className="no-bar fade-r flex gap-x-7 overflow-x-auto border-t border-white/15 pt-5 sm:flex-wrap sm:gap-x-8 sm:gap-y-3 sm:overflow-x-visible">
          {SIGNALS.map(({ icon: Icon, label, lead }) => (
            <li
              key={label}
              className={`flex shrink-0 items-center gap-2 text-[0.8125rem] sm:text-sm ${
                lead ? "font-medium text-white" : "text-white/72"
              }`}
            >
              <Icon
                className={`size-4 shrink-0 ${lead ? "text-clay" : "text-white/55"}`}
                aria-hidden="true"
              />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
