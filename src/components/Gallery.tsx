"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useDialog } from "@/lib/useDialog";
import { X, ArrowLeft, ArrowRight, Expand } from "lucide-react";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import Figure from "./ui/Figure";
import { galleryShots as SHOTS } from "@/lib/site";

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((v) => (v === null ? v : (v + d + SHOTS.length) % SHOTS.length)),
    []
  );

  useDialog(open !== null, boxRef, close, (e) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });

  // pt-32 clears the fixed navbar: this is the first section on its own page
  // now, not something you scroll down into.
  return (
    <section id="gallery" className="scroll-mt-20 bg-ivory pb-14 pt-32 sm:pb-24 sm:pt-40 lg:pb-32">
      <div className="shell">
        <SectionHead
          as="h1"
          eyebrow="Gallery"
          title="Look around before you visit."
          intro="Real photographs of the rooms, rooftop dining hall, gym and common spaces at Infinity Space, the gents PG near Christ University Yeshwanthpur Campus — taken at the property, not stock."
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

        {/* Photographs are where people decide to enquire, so the page can't
            end without a way on — and the rest of the site needs a crawlable
            link back out of it. */}
        <Reveal>
          <p className="mt-10 text-[0.8125rem] leading-relaxed text-mute">
            Photographs only go so far —{" "}
            <a href="/#enquire" className="link-u font-medium text-ink">
              book a visit
            </a>{" "}
            and see the actual room. Or check{" "}
            <a href="/#rooms" className="link-u font-medium text-ink">
              room types and rent
            </a>{" "}
            and the{" "}
            <a href="/faq" className="link-u font-medium text-ink">
              questions everyone asks
            </a>
            .
          </p>
        </Reveal>
      </div>

      {/* Lightbox */}
      {open !== null && (
        <div
          ref={boxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          tabIndex={-1}
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
