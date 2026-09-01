"use client";

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Shared dialog behaviour: lock the page, move focus in, trap Tab inside,
 * close on Escape, and hand focus back to whatever opened it.
 *
 * Every overlay on the site uses this so a keyboard or screen-reader user
 * can't tab out into the page hidden behind the scrim.
 */
export function useDialog(
  open: boolean,
  ref: RefObject<HTMLElement | null>,
  onClose: () => void,
  extraKeys?: (e: KeyboardEvent) => void
) {
  // Kept in a ref so the handler always sees fresh state (gallery length,
  // current index) without re-running the effect and stealing focus back.
  const extra = useRef(extraKeys);
  extra.current = extraKeys;

  useEffect(() => {
    if (!open) return;

    const restoreTo = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const node = ref.current;
    const first = node?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? node)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && node) {
        const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => el.offsetParent !== null || el === document.activeElement
        );
        if (!items.length) return;
        const firstEl = items[0];
        const lastEl = items[items.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
        return;
      }
      extra.current?.(e);
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      restoreTo?.focus?.();
    };
  }, [open, ref, onClose]);
}
