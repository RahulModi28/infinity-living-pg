"use client";

import { useRef, type RefObject } from "react";
import { useIsoLayoutEffect } from "./useIsoLayoutEffect";
import { prefersReducedMotion } from "./motion";

/**
 * Scroll-reveal without a ScrollTrigger per element.
 *
 * Reveal, SplitText and Figure used to create one or two GSAP ScrollTriggers
 * each — about 90 on the homepage. Every trigger measures layout when it is
 * created, all inside the hydration commit, which made one ~1.2 s long task
 * and pushed Total Blocking Time to 600 ms+ (Semrush/Lighthouse "Poor").
 *
 * Now: one shared IntersectionObserver (no layout reads on our side), and the
 * motion itself is CSS transitions keyed off two attributes — see the
 * "Scroll reveals" block in globals.css:
 *
 *   data-pending  the "from" state, set before paint so nothing flashes
 *   data-play     transitions on while the element animates in, then removed
 *                 so the element's own hover transitions are untouched
 *
 * Content is fully visible in the server HTML and without JavaScript; only a
 * hydrated page ever sets data-pending.
 */

let io: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, Set<() => void>>();

function observer() {
  if (io) return io;
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        // Also fire for anything already scrolled past (a reload halfway
        // down the page), which would otherwise stay hidden above the fold.
        if (!e.isIntersecting && e.boundingClientRect.bottom > 0) continue;
        io!.unobserve(e.target);
        const set = callbacks.get(e.target);
        callbacks.delete(e.target);
        set?.forEach((cb) => cb());
      }
    },
    // Same point the ScrollTriggers used: "top 94%".
    { rootMargin: "0px 0px -6% 0px" }
  );
  return io;
}

/** Longest reveal (delay + duration + stagger) with headroom. */
const PLAY_MS = 3200;

export function useReveal<T extends HTMLElement>(opts: { immediate?: boolean } = {}): RefObject<T | null> {
  const ref = useRef<T>(null);
  const { immediate = false } = opts;

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;

    el.setAttribute("data-pending", "");
    let timer = 0;
    let raf = 0;
    const play = () => {
      el.removeAttribute("data-pending");
      el.setAttribute("data-play", "");
      timer = window.setTimeout(() => el.removeAttribute("data-play"), PLAY_MS);
    };

    let stop: () => void;
    if (immediate) {
      // Two frames: the "from" state has to be styled once before the
      // change, or there is nothing to transition from.
      raf = requestAnimationFrame(() => (raf = requestAnimationFrame(play)));
      stop = () => cancelAnimationFrame(raf);
    } else {
      // Cards in a horizontal swipe carousel (the snap-x rows in Rooms,
      // Amenities and Food) sit off-screen to the right and would never
      // intersect until swiped. Watch the carousel instead, so they reveal
      // together as it scrolls into view, as they did with ScrollTrigger.
      const target = el.parentElement?.closest(".snap-x") ?? el;
      let set = callbacks.get(target);
      if (!set) {
        set = new Set();
        callbacks.set(target, set);
        observer().observe(target);
      }
      set.add(play);
      stop = () => {
        const s = callbacks.get(target);
        s?.delete(play);
        if (s && s.size === 0) {
          callbacks.delete(target);
          io?.unobserve(target);
        }
      };
    }

    return () => {
      stop();
      window.clearTimeout(timer);
      el.removeAttribute("data-pending");
      el.removeAttribute("data-play");
    };
  }, [immediate]);

  return ref;
}
