"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { gsap, initGsap, prefersReducedMotion, MOTION } from "@/lib/motion";

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
 * timing, distance and easing are identical site-wide.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  stagger = false,
  y = MOTION.rise,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(stagger ? el.children : el, { opacity: 1, y: 0 });
      return;
    }
    initGsap();

    const targets = stagger ? Array.from(el.children) : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.dur.base,
          ease: MOTION.ease,
          delay,
          stagger: stagger ? MOTION.stagger : 0,
          scrollTrigger: { trigger: el, start: MOTION.start, once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay, stagger, y]);

  return (
    <Tag ref={ref} className={className} data-anim="">
      {children}
    </Tag>
  );
}
