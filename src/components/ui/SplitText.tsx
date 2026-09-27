"use client";

import type { CSSProperties, ElementType } from "react";
import { useReveal } from "@/lib/reveal";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** "load" fires immediately; "scroll" waits for the section to enter view. */
  trigger?: "load" | "scroll";
  id?: string;
};

/**
 * Word-by-word masked reveal. Each word rises out of its own clipped box,
 * staggered by index — driven by CSS ("Scroll reveals" in globals.css)
 * rather than a GSAP timeline, so a heading costs no main-thread time.
 */
export default function SplitText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  trigger = "scroll",
  id,
}: Props) {
  const ref = useReveal<HTMLElement>({ immediate: trigger === "load" });
  const words = text.split(" ");

  return (
    /* The words are real text, split only by wrapper spans and separated by
       real spaces outside the clipped box — so the heading reads once and
       normally to screen readers and crawlers. An aria-hidden copy plus an
       sr-only duplicate would double every heading for search engines. */
    <Tag
      ref={ref}
      id={id}
      className={className}
      data-split=""
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span className="rw">
            <span style={{ "--i": i } as CSSProperties}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
