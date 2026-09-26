import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBar from "@/components/MobileBar";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import Figure from "@/components/ui/Figure";
import { getPosts, formatDate, type Post } from "@/lib/blog";
import { answerBlock } from "@/lib/site";
import { blogIndexJsonLd } from "@/lib/seo";

const description =
  "Guides and updates from Infinity Space, the gents PG near Christ University Yeshwanthpur Campus — renting a PG, the neighbourhood, and life near campus.";

export const metadata: Metadata = {
  title: "Blog — Student Living near Christ University",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/blog",
    title: "Blog — Student Living near Christ University | Infinity Space",
    description,
    images: [{ url: "/images/og.png", width: 1200, height: 630, type: "image/png", alt: "Infinity Space blog" }],
  },
};

function Meta({ p }: { p: Post }) {
  return (
    <p className="t-label text-mute">
      <time dateTime={p.date}>{formatDate(p.date)}</time>
      <span aria-hidden="true"> · </span>
      {p.readingMinutes} min read
    </p>
  );
}

export default function BlogPage() {
  const posts = getPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      {/* solid: this page opens on ivory, with no hero photograph for the
          transparent nav to sit over. */}
      <Navbar solid />
      <main id="main">
        <section className="bg-ivory pb-14 pt-32 sm:pb-24 sm:pt-40 lg:pb-32">
          <div className="shell">
            <SectionHead
              as="h1"
              eyebrow="Blog"
              title="Notes on living near campus."
              intro="Guides for students and parents looking at PGs near Christ University Yeshwanthpur Campus, and updates from Infinity Space."
            />

            {posts.length === 0 && (
              <p className="t-body mt-14 border-t border-ink/12 pt-8 text-mute">
                The first posts are on their way. Until then, the{" "}
                <a href="/faq" className="link-u font-medium text-ink">
                  FAQ
                </a>{" "}
                answers most questions.
              </p>
            )}

            {/* The newest post gets the width; the rest sit in a grid under it. */}
            {lead && (
              <Reveal>
                <article className="group relative mt-14 grid gap-6 border-t border-ink/12 pt-10 sm:mt-20 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14">
                  {lead.cover && (
                    <Figure
                      src={lead.cover}
                      alt={lead.coverAlt ?? ""}
                      className="aspect-[16/10] rounded-[1.5rem]"
                      imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority
                    />
                  )}
                  <div>
                    <Meta p={lead} />
                    <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.03em]">
                      {/* The link covers the whole card via ::after, so the
                          card is one tab stop with the title as its name. */}
                      <a
                        href={`/blog/${lead.slug}`}
                        className="transition-colors duration-300 after:absolute after:inset-0 group-hover:text-clay"
                      >
                        {lead.title}
                      </a>
                    </h2>
                    <p className="t-body mt-4 max-w-[52ch] text-mute">{lead.description}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-ink" aria-hidden="true">
                      Read the post
                      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </article>
              </Reveal>
            )}

            {rest.length > 0 && (
              <Reveal stagger className="mt-16 grid gap-x-8 gap-y-14 border-t border-ink/12 pt-12 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <article key={p.slug} className="group relative">
                    {p.cover && (
                      <Figure
                        src={p.cover}
                        alt={p.coverAlt ?? ""}
                        className="mb-5 aspect-[16/10] rounded-[1.25rem]"
                        imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    <Meta p={p} />
                    <h2 className="mt-3 font-display text-[1.25rem] leading-snug tracking-[-0.02em]">
                      <a
                        href={`/blog/${p.slug}`}
                        className="transition-colors duration-300 after:absolute after:inset-0 group-hover:text-clay"
                      >
                        {p.title}
                      </a>
                    </h2>
                    <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-mute">{p.description}</p>
                  </article>
                ))}
              </Reveal>
            )}
            {/* The index was flagged as thin: a list of titles is not a page.
                This says what the blog is for and hands readers on to the
                pages that answer the questions the posts start. */}
            <div className="mt-20 grid gap-12 border-t border-ink/12 pt-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="font-display text-[1.5rem] leading-snug tracking-[-0.02em]">What this blog covers</h2>
                <p className="t-body mt-4 text-mute">
                  Practical guides for students, parents and working professionals choosing a PG in north-west
                  Bengaluru — around Christ University Yeshwanthpur Campus, HMT Layout, Nagasandra and the Tumkur
                  Road corridor. Each post answers one question properly: what a PG's rent should cover, how to
                  compare single and double sharing, what to ask about deposits and lock-ins, and how far
                  &ldquo;near campus&rdquo; or &ldquo;near the metro&rdquo; really is on foot.
                </p>
                <p className="t-body mt-4 text-mute">
                  Where a post mentions Infinity Space, it says so plainly — including where another option
                  may suit you better.
                </p>
              </div>
              <div>
                <h2 className="font-display text-[1.5rem] leading-snug tracking-[-0.02em]">About Infinity Space</h2>
                <p className="t-body mt-4 text-mute">{answerBlock()}</p>
                <ul className="mt-6 space-y-2.5 text-[0.9375rem]">
                  <li>
                    <a href="/gents-pg-yeshwanthpur" className="link-u font-medium text-ink">
                      Gents PG in Yeshwanthpur near Christ University
                    </a>
                  </li>
                  <li>
                    <a href="/#rooms" className="link-u font-medium text-ink">
                      Room types and rent
                    </a>
                  </li>
                  <li>
                    <a href="/faq" className="link-u font-medium text-ink">
                      FAQ — deposit, food, curfew and booking
                    </a>
                  </li>
                  <li>
                    <a href="/gallery" className="link-u font-medium text-ink">
                      Photographs of the rooms and common areas
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <FinalCTA roomsHref="/#rooms" />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBar />
      {blogIndexJsonLd(posts).map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
