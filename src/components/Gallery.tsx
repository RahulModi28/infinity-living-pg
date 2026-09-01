"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { X, ArrowLeft, ArrowRight, Expand } from "lucide-react";
import SectionHead from "./ui/SectionHead";
import Figure from "./ui/Figure";

const SHOTS = [
  { src: "/images/gal-1.svg", alt: "Furnished room at Infinity Living PG near Christ University Yeshwanthpur Campus", span: "row-span-2" },
  { src: "/images/gal-2.svg", alt: "Common area at Infinity Living PG, Yeshwanthpur, Bengaluru", span: "" },
  { src: "/images/gal-3.svg", alt: "Study space at Infinity Living student accommodation, Yeshwanthpur", span: "" },
  { src: "/images/gal-4.svg", alt: "Exterior of Infinity Living PG in Yeshwanthpur, Bengaluru", span: "row-span-2" },
  { src: "/images/gal-5.svg", alt: "Dining area at Infinity Living PG near Christ University", span: "" },
  { src: "/images/gal-6.svg", alt: "Bathroom at Infinity Living PG, Yeshwanthpur", span: "row-span-2" },
  { src: "/images/gal-7.svg", alt: "Corridor at Infinity Living PG, Yeshwanthpur, Bengaluru", span: "" },
  { src: "/images/gal-8.svg", alt: "Neighbourhood around Infinity Living, Yeshwanthpur, near Christ University", span: "" },
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((v) => (v === null ? v : (v + d + SHOTS.length) % SHOTS.length)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  return (
    <section id="gallery" className="scroll-mt-20 bg-ivory py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHead
          eyebrow="Gallery"
          title="Look around before you visit."
          intro="Real photographs of the rooms, common spaces and the street outside — replacing the placeholders below before launch."
        />

        <div className="mt-14 columns-2 gap-4 sm:gap-5 lg:columns-4">
          {SHOTS.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setOpen(i)}
              className="group relative mb-4 block w-full cursor-zoom-in overflow-hidden rounded-[1.25rem] sm:mb-5"
              aria-label={`Open image: ${s.alt}`}
            >
              <Figure
                src={s.src}
                alt={s.alt}
                fill={false}
                width={1000}
                height={1200}
                className="w-full rounded-[1.25rem]"
                imgClassName="h-auto w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw"
              />
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-500 group-hover:bg-ink/25 group-hover:opacity-100">
                <span className="grid size-11 place-items-center rounded-full bg-white/20 text-white backdrop-blur-md">
                  <Expand className="size-5" aria-hidden="true" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/94 p-4 sm:p-10"
        >
          <button
            onClick={close}
            aria-label="Close image viewer"
            className="absolute right-4 top-4 z-10 grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/25 sm:right-6 sm:top-6"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          <button
            onClick={() => step(-1)}
            aria-label="Previous image"
            className="absolute left-3 z-10 grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/25 sm:left-6"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => step(1)}
            aria-label="Next image"
            className="absolute right-3 z-10 grid size-12 place-items-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/25 sm:right-6"
          >
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>

          <figure className="relative flex max-h-full max-w-5xl flex-col items-center">
            <div className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl">
              <Image
                key={SHOTS[open].src}
                src={SHOTS[open].src}
                alt={SHOTS[open].alt}
                fill
                sizes="(max-width: 1024px) 92vw, 64rem"
                className="animate-[fadeIn_.4s_ease] object-cover"
              />
            </div>
            <figcaption className="mt-4 max-w-2xl text-center text-[0.8125rem] text-white/65">
              {SHOTS[open].alt} · {open + 1} / {SHOTS.length}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
