"use client";

import { useRef, type ElementType } from "react";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { gsap, initGsap, prefersReducedMotion, MOTION } from "@/lib/motion";

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
 * Word-by-word masked reveal without the paid SplitText plugin — words are
 * split in markup so the text stays fully selectable and readable to
 * screen readers (the visible spans are aria-hidden, with an sr-only copy).
 */
export default function SplitText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  trigger = "scroll",
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = el.querySelectorAll<HTMLElement>(".rw > span");
    if (prefersReducedMotion()) {
      gsap.set(spans, { yPercent: 0, opacity: 1 });
      return;
    }
    initGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power4.out",
          stagger: 0.055,
          delay,
          ...(trigger === "scroll"
            ? { scrollTrigger: { trigger: el, start: "top 94%", once: true } }
            : {}),
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay, trigger]);

  return (
    /* The words are real text, split only by wrapper spans and separated by
       real spaces outside the clipped box — so the heading reads once and
       normally to screen readers and crawlers. An aria-hidden copy plus an
       sr-only duplicate would double every heading for search engines. */
    <Tag ref={ref} id={id} className={className}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="rw">
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
