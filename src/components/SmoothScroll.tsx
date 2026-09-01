"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { initGsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { gsap } from "gsap";

/**
 * Smooth scrolling that stays interruptible: Lenis keeps native wheel/touch
 * semantics (no scroll hijacking) and is skipped entirely under
 * prefers-reduced-motion. ScrollTrigger is driven off the same RAF loop so
 * pinned sections never desync from the scroll position.
 */
export default function SmoothScroll() {
  useEffect(() => {
    initGsap();
    if (prefersReducedMotion()) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch feels better than an emulated one.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // In-page anchors route through Lenis so they ease instead of jumping.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
