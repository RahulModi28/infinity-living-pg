"use client";

import Image from "next/image";
import { useGsap, prefersReducedMotion } from "@/lib/motion";
import { useReveal } from "@/lib/reveal";

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
  // The clip-path wipe and image settle are CSS ("Scroll reveals" in
  // globals.css), started by the shared observer — no ScrollTrigger per
  // image. GSAP is only used for parallax, which genuinely tracks scroll.
  const wrap = useReveal<HTMLDivElement>();

  useGsap(({ gsap }) => {
    const el = wrap.current;
    const img = el?.querySelector("img");
    if (!parallax || !el || !img || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img,
        { yPercent: -parallax },
        {
          yPercent: parallax,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [parallax]);

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className}`} {...(reveal ? { "data-wipe": "" } : {})}>
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
