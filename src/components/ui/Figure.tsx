"use client";

import Image from "next/image";
import { useRef } from "react";
import { useIsoLayoutEffect } from "@/lib/useIsoLayoutEffect";
import { gsap, initGsap, prefersReducedMotion } from "@/lib/motion";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  /** Clip-path wipe + slow scale on enter. */
  reveal?: boolean;
  /** Gentle vertical drift tied to scroll. Keep subtle. */
  parallax?: number;
  fill?: boolean;
  width?: number;
  height?: number;
};

/**
 * Every image on the site goes through here so reveals, parallax and
 * lazy-loading behave identically and stay GPU-friendly (transform + clip-path
 * only — never top/left/width).
 */
export default function Figure({
  src,
  alt,
  className = "",
  imgClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  reveal = true,
  parallax = 0,
  fill = true,
  width,
  height,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const img = el.querySelector("img");
    if (prefersReducedMotion()) return;
    initGsap();

    const ctx = gsap.context(() => {
      if (reveal) {
        gsap.fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.15,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          }
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.12 },
            {
              scale: 1,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 94%", once: true },
            }
          );
        }
      }
      if (parallax && img) {
        gsap.fromTo(
          img,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }
    }, el);
    return () => ctx.revert();
  }, [reveal, parallax]);

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        {...(fill ? { fill: true } : { width: width ?? 1200, height: height ?? 900 })}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={`object-cover will-change-transform ${parallax ? "scale-[1.18]" : ""} ${imgClassName}`}
      />
    </div>
  );
}
