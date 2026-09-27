"use client";

import { useEffect } from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/motion";

/**
 * Smooth scrolling that stays interruptible: Lenis keeps native wheel/touch
 * semantics (no scroll hijacking) and is skipped entirely under
 * prefers-reduced-motion. ScrollTrigger is driven off the same RAF loop so
 * pinned sections never desync from the scroll position.
 *
 * Both libraries are imported on demand, after hydration, so neither sits in
 * the first-load bundle ahead of Largest Contentful Paint.
 */
export default function SmoothScroll() {
  useEffect(() => {
    let dead = false;
    let cleanup: (() => void) | undefined;

    Promise.all([loadGsap(), import("lenis")]).then(
      ([{ gsap, ScrollTrigger }, { default: Lenis }]) => {
        if (dead) return;
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
        // `/#rooms` is included because the nav and footer render site-wide and
        // have to work as real navigation from /faq and the other sub-pages — on
        // the homepage itself it is still the same document, so it eases here and
        // only falls through to a page load when we are somewhere else.
        const onClick = (e: MouseEvent) => {
          const a = (e.target as HTMLElement)?.closest?.(
            'a[href^="#"], a[href^="/#"]'
          ) as HTMLAnchorElement | null;
          if (!a) return;
          const href = a.getAttribute("href");
          if (!href || href === "#") return;
          if (href.startsWith("/#") && window.location.pathname !== "/") return;
          const el = document.querySelector(href.startsWith("/#") ? href.slice(1) : href);
          if (!el) return;
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -72 });
        };
        document.addEventListener("click", onClick);

        cleanup = () => {
          document.removeEventListener("click", onClick);
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      }
    );

    return () => {
      dead = true;
      cleanup?.();
    };
  }, []);

  return null;
}
