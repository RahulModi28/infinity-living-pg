"use client";

import { useEffect } from "react";

/**
 * Turns the `.edge-fade` hint off once there's nothing left to the right.
 *
 * The fade says "more cards this way". Left on permanently, it also dimmed
 * the LAST card after you had scrolled to it — the Rooms enquiry card and
 * the final Amenities card both looked cut off. This marks each scroller
 * `data-end` when it is at (or doesn't need) its end, and globals.css drops
 * the mask for that state.
 *
 * One listener for every scroller on the page, in the capture phase because
 * scroll events don't bubble — so any .edge-fade row added later is covered.
 */
export default function EdgeFade() {
  useEffect(() => {
    const update = (el: Element) => {
      const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      el.toggleAttribute("data-end", end);
    };
    const all = () => document.querySelectorAll(".edge-fade").forEach(update);

    const onScroll = (e: Event) => {
      const t = e.target;
      if (t instanceof Element && t.classList.contains("edge-fade")) update(t);
    };

    all();
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", all);
    return () => {
      document.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("resize", all);
    };
  }, []);

  return null;
}
