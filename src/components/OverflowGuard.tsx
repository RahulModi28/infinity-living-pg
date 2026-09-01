"use client";

import { useEffect } from "react";

/**
 * Development-only horizontal-overflow guard.
 *
 * Stripped from production builds. It exists because this class of bug bit
 * three times in one pass and is close to invisible while developing:
 *
 *   A `min-width`, a `shrink-0`, or a non-shrinking flex item sets a
 *   min-content floor wider than the viewport. Nothing looks clipped —
 *   `overflow-x: clip` on body hides the scrollbar — but Chrome on a real
 *   phone widens the layout viewport to fit, zooming the whole page out and
 *   leaving a dead strip of background down the right of every section.
 *
 * Because the expanded viewport doesn't shrink back, you also can't diagnose
 * it by toggling styles in DevTools — you have to reload. Hence this warning
 * at load, naming the elements that actually set the floor.
 */
export default function OverflowGuard() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    const check = () => {
      const b = document.body;
      const over = b.scrollWidth - b.clientWidth;
      if (over <= 0) return;

      // Bisect: hide each subtree and see which one narrows the page.
      const baseline = b.scrollWidth;
      const culprits: string[] = [];
      const walk = (el: Element, depth: number) => {
        for (const child of Array.from(el.children)) {
          const node = child as HTMLElement;
          const prev = node.style.display;
          node.style.display = "none";
          const narrowed = b.scrollWidth < baseline;
          node.style.display = prev;
          if (narrowed) {
            const id = node.id ? `#${node.id}` : "";
            const cls = typeof node.className === "string" ? `.${node.className.split(" ").slice(0, 2).join(".")}` : "";
            culprits.push(`${node.tagName.toLowerCase()}${id}${cls}`);
            if (depth < 4) walk(node, depth + 1);
          }
        }
      };
      walk(b, 0);

      console.warn(
        `[overflow] Page is ${over}px wider than the viewport (${b.clientWidth}px).\n` +
          `On a real phone Chrome will widen the layout viewport and zoom the page out.\n` +
          `Likely culprits (innermost last):\n  ${culprits.slice(-6).join("\n  ") || "(none isolated)"}\n` +
          `Usual causes: min-width larger than the column, shrink-0 on long text, ` +
          `or a flex item that can't shrink below its content.`
      );
    };

    // After fonts settle, since text width drives most min-content floors.
    const id = window.setTimeout(check, 1200);
    return () => window.clearTimeout(id);
  }, []);

  return null;
}
