"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "@/lib/motion";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Pointer-following pull. Used sparingly — primary CTAs only — and never on
 * touch devices, where it can't be felt and only costs a listener.
 */
export default function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className={`inline-block will-change-transform ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
