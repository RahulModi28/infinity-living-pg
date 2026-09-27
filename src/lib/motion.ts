"use client";

import { useEffect, type DependencyList } from "react";

/*
  GSAP and ScrollTrigger are loaded on demand, never imported statically.
  Imported at module scope they sat in the first-load bundle of every page and
  cost ~850 ms of main-thread time on Lighthouse's throttled mobile run —
  time charged straight to Largest Contentful Paint, for animations that are
  all below the fold or on hover. Now the chunk is fetched after hydration.
*/

type Gsap = typeof import("gsap").gsap;
type ScrollTriggerT = typeof import("gsap/ScrollTrigger").ScrollTrigger;
export type Motion = { gsap: Gsap; ScrollTrigger: ScrollTriggerT };

let loading: Promise<Motion> | null = null;

/** Load GSAP + ScrollTrigger once and register the plugin. Client-side only. */
export function loadGsap(): Promise<Motion> {
  loading ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.defaults({ ease: "power3.out", duration: 0.9 });
      return { gsap, ScrollTrigger };
    }
  );
  return loading;
}

/**
 * An effect that runs once GSAP has loaded. `setup` may return a cleanup;
 * if the component unmounts before the chunk arrives, setup never runs.
 */
export function useGsap(setup: (m: Motion) => void | (() => void), deps: DependencyList) {
  useEffect(() => {
    let dead = false;
    let cleanup: void | (() => void);
    loadGsap().then((m) => {
      if (!dead) cleanup = setup(m);
    });
    return () => {
      dead = true;
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
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
  /**
   * Where a reveal begins, relative to the viewport. Deliberately close to
   * the fold: tall mobile sections were scrolling into view completely blank
   * because the trigger sat too far up the screen.
   */
  start: "top 94%",
  /** For grouped/staggered blocks, which need a little more runway. */
  startGroup: "top 90%",
} as const;
