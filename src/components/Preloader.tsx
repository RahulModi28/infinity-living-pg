"use client";

import { useRef, useState } from "react";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/motion";

/**
 * First-visit preloader.
 *
 * A preloader is a cost, not a feature: it sits in front of the Largest
 * Contentful Paint, which Google measures. So this one is built to get out of
 * the way rather than to be admired —
 *
 *  - it exits on readiness (fonts + hero image), not on a fixed timer;
 *  - a hard 1.4s cap means a slow image can never hold the page hostage;
 *  - it runs once per session, so internal navigation is never punished;
 *  - prefers-reduced-motion skips it entirely.
 *
 * It is server-rendered so it covers the page from the first frame — a
 * client-only overlay would flash the content it is meant to hide. The
 * once-per-session check runs in an inline script before paint (see
 * layout.tsx), which injects a style rather than touching a React-owned
 * element, so returning visitors never see a frame of it and hydration
 * stays clean.
 */
const CAP_MS = 1400;

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const finish = () => {
      try {
        sessionStorage.setItem("is:preloaded", "1");
      } catch {
        /* private mode — it will simply show again next load */
      }
      document.body.style.overflow = "";
      setDone(true);
    };

    if (prefersReducedMotion()) {
      finish();
      return;
    }

    initGsap();
    document.body.style.overflow = "hidden";

    let exited = false;
    const exit = () => {
      if (exited) return;
      exited = true;
      const tl = gsap.timeline({ onComplete: finish });
      tl.to(el.querySelector("[data-pl='mark']"), {
        opacity: 0,
        scale: 0.94,
        duration: 0.3,
        ease: "power2.in",
      }).to(
        el,
        { yPercent: -100, duration: 0.7, ease: "power4.inOut" },
        "-=0.1"
      );
    };

    // Draw the mark while we wait.
    const stroke = el.querySelector<SVGPathElement>("[data-pl='stroke']");
    if (stroke) {
      const len = stroke.getTotalLength();
      gsap.set(stroke, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(stroke, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" });
    }

    // Ready when the fonts have settled and the hero image has decoded —
    // those are the two things that make the first frame look unfinished.
    const hero = document.querySelector<HTMLImageElement>('[data-h="img"] img');
    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      hero && !hero.complete
        ? new Promise((r) => {
            hero.addEventListener("load", r, { once: true });
            hero.addEventListener("error", r, { once: true });
          })
        : Promise.resolve(),
    ]);

    // Never less than the draw, never more than the cap.
    const floor = new Promise((r) => setTimeout(r, 650));
    const cap = setTimeout(exit, CAP_MS);
    Promise.all([ready, floor]).then(exit);

    return () => clearTimeout(cap);
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="preloader grain fixed inset-0 z-[100] grid place-items-center bg-moss-2"
      aria-hidden="true"
    >
      <div data-pl="mark" className="flex flex-col items-center gap-5">
        <svg viewBox="0 0 40 22" className="h-10 w-auto text-ivory" fill="none">
          <path
            data-pl="stroke"
            d="M11 3.2c4.4 0 6.1 7.6 9.5 7.6S25 3.2 29.4 3.2c4 0 7.1 3.4 7.1 7.6s-3.1 7.6-7.1 7.6c-4.4 0-6.1-7.6-9.5-7.6s-4.5 7.6-8.9 7.6C7 18.4 3.9 15 3.9 10.8S7 3.2 11 3.2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="t-label text-white/40">Infinity Space</span>
      </div>
    </div>
  );
}
