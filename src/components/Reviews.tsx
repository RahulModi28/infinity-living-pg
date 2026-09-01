import { Star, Quote } from "lucide-react";
import { reviews, site } from "@/lib/site";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";

export default function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 bg-ivory-2 py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHead
          eyebrow="Reviews"
          title="What people say after they move in."
          intro="Short, honest and from the people who actually live here — students and the parents who dropped them off."
        />

        {!site.reviewsAreReal && (
          <Reveal>
            <p className="mt-8 inline-flex items-start gap-2.5 rounded-xl border border-clay/30 bg-clay/[0.07] px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-2">
              <span className="t-label mt-0.5 shrink-0 text-clay">Placeholder</span>
              The reviews below are illustrative development copy. Replace them with real,
              permissioned reviews before launch — and set{" "}
              <code className="rounded bg-ink/8 px-1">reviewsAreReal</code> to true to hide this
              notice.
            </p>
          </Reveal>
        )}

        <Reveal stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <figure
              key={i}
              className="group relative flex h-full flex-col rounded-[1.25rem] border border-ink/10 bg-ivory p-6 transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_18px_40px_-24px_rgba(18,17,16,0.4)]"
            >
              <Quote
                className="size-5 text-clay/35 transition-colors duration-500 group-hover:text-clay/70"
                aria-hidden="true"
              />
              <div
                className="mt-4 flex gap-0.5"
                role="img"
                aria-label={`${r.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`size-3.5 ${
                      s < r.rating ? "fill-clay text-clay" : "text-ink/15"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-2">
                {r.text}
              </blockquote>
              <figcaption className="mt-6 border-t border-ink/10 pt-4">
                <span className="block font-display text-[0.9375rem] font-semibold">{r.name}</span>
                <span className="mt-0.5 block text-[0.8125rem] leading-snug text-mute">
                  {r.course}
                </span>
              </figcaption>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
