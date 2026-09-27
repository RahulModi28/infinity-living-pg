"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "@/lib/reveal";
import { MOTION } from "@/lib/motion";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Stagger direct children instead of moving the wrapper as one block. */
  stagger?: boolean;
  y?: number;
};

/**
 * The single scroll-reveal primitive. Every section uses this so the
 * timing, distance and easing are identical site-wide. The motion lives in
 * globals.css ("Scroll reveals"); see lib/reveal.ts for why it isn't GSAP.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  stagger = false,
  y = MOTION.rise,
}: Props) {
  const ref = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={className}
      data-anim={stagger ? "stagger" : ""}
      style={{ "--d": `${delay}s`, "--rise": `${y}px` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
