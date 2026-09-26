import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Shared shell for /privacy and /terms: one h1, the date the text last
 * changed, then numbered h2 sections. The width sits on an inner div because
 * .shell carries its own max-width, which beats a max-w utility on the same
 * element.
 */
export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  /** YYYY-MM-DD — bump it whenever the text changes. */
  updated: string;
  intro: ReactNode;
  sections: { h2: string; body: ReactNode }[];
}) {
  const date = new Date(`${updated}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return (
    <>
      <Navbar solid />
      <main id="main" className="bg-ivory pb-24 pt-36">
        <div className="shell">
          <div className="max-w-2xl">
            <h1 className="t-section">{title}</h1>
            <p className="mt-4 text-[0.8125rem] text-mute">
              Last updated <time dateTime={updated}>{date}</time>
            </p>
            <div className="mt-10 space-y-5 text-[0.9375rem] leading-relaxed text-ink-2">{intro}</div>
            {sections.map((s, i) => (
              <section key={s.h2} className="mt-12">
                <h2 className="font-display text-[1.25rem] leading-snug tracking-[-0.02em] text-ink">
                  {i + 1}. {s.h2}
                </h2>
                <div className="legal-body mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-ink-2">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
