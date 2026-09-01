"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Register plugins exactly once, client-side only. */
export function initGsap() {
  if (registered || typeof window === "undefined") return { gsap, ScrollTrigger };
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  registered = true;
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** One shared vocabulary so every section moves the same way. */
export const MOTION = {
  dur: { fast: 0.4, base: 0.75, slow: 1.1 },
  ease: "power3.out",
  easeInOut: "power2.inOut",
  stagger: 0.07,
  /** Distance elements travel on reveal — small, so it never feels floaty. */
  rise: 28,
} as const;

export { gsap, ScrollTrigger };
