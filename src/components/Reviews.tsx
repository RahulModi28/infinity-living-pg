import { Star, Quote } from "lucide-react";
import { reviews, site } from "@/lib/site";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";

function Card({ r }: { r: (typeof reviews)[number] }) {
  return (
    <figure className="group flex h-full w-[80vw] flex-col rounded-[1.25rem] border border-ink/10 bg-ivory p-6 transition-[border-color,box-shadow] duration-500 hover:border-ink/20 hover:shadow-[0_18px_40px_-24px_rgba(18,17,16,0.4)] sm:w-[23rem]">
      <Quote
        className="size-5 text-clay/35 transition-colors duration-500 group-hover:text-clay/70"
        aria-hidden="true"
      />
      <div className="mt-4 flex gap-0.5" role="img" aria-label={`${r.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, s) => (
          <Star
            key={s}
            className={`size-3.5 ${s < r.rating ? "fill-clay text-clay" : "text-ink/15"}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
        {r.text}
      </blockquote>
      <figcaption className="mt-6 border-t border-ink/10 pt-4">
        <span className="block font-display text-[0.9375rem] font-semibold">{r.name}</span>
        <span className="mt-0.5 block text-[0.8125rem] leading-snug text-mute">{r.course}</span>
      </figcaption>
    </figure>
  );
}

function Row({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={`flex shrink-0 items-stretch gap-5 pr-5 ${duplicate ? "marquee__dupe" : ""}`}
    >
      {reviews.map((r, i) => (
        <li key={i} className="flex">
          <Card r={r} />
        </li>
      ))}
    </ul>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-ivory-2 py-14 sm:py-24 lg:py-32">
      <div className="shell">
        <SectionHead
          eyebrow="Reviews"
          title="What people say after they move in."
          intro="Short, honest and from the people who actually live here — students and the parents who dropped them off."
        />

        {!site.reviewsAreReal && (
          <Reveal>
            <p className="mt-8 rounded-xl border border-clay/30 bg-clay/[0.07] px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-2 [overflow-wrap:anywhere]">
              <span className="t-label mr-2 text-clay">Placeholder</span>
              The reviews below are illustrative development copy. Replace them with real,
              permissioned reviews before launch — and set{" "}
              <code className="rounded bg-ink/8 px-1">reviewsAreReal</code> to true to hide this
              notice.
            </p>
          </Reveal>
        )}
      </div>

      {/*
        Full-bleed marquee rather than a grid. Six stacked cards ran to roughly
        2,000px of phone scroll; one travelling row is a fraction of that and
        reads as a continuous stream of voices rather than a wall to get past.
        Slow — 72s a lap — because unlike the hero chips these have to be read.
        Pauses on hover and focus, and stops entirely under reduced motion.
      */}
      <Reveal>
        <div className="marquee mt-10" style={{ "--marquee-duration": "72s" } as React.CSSProperties}>
          <div className="marquee__track">
            <Row />
            <Row duplicate />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
