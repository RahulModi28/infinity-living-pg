import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileBar from "@/components/MobileBar";
import Figure from "@/components/ui/Figure";
import { getPost, getPosts, formatDate } from "@/lib/blog";
import { blogPostJsonLd } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

// Every post is known at build time; anything else is a 404, not a render.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  const image = p.cover
    ? { url: p.cover, alt: p.coverAlt }
    : { url: "/images/og.png", width: 1200, height: 630, type: "image/png", alt: p.title };
  return {
    title: p.seoTitle ? { absolute: p.seoTitle } : p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: {
      type: "article",
      locale: "en_IN",
      url: `/blog/${p.slug}`,
      title: p.title,
      description: p.description,
      publishedTime: p.date,
      modifiedTime: p.updated ?? p.date,
      authors: [p.author],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: p.title,
      description: p.description,
      images: [image.url],
    },
  };
}

export default async function PostPage({ params }: Params) {
  const p = getPost((await params).slug);
  if (!p) notFound();

  return (
    <>
      <Navbar solid />
      <main id="main">
        <article className="bg-ivory pb-14 pt-32 sm:pb-24 sm:pt-40">
          <header className="shell max-w-3xl">
            <a
              href="/blog"
              className="link-u inline-flex items-center gap-2 text-[0.875rem] text-mute hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> All posts
            </a>
            <p className="t-label mt-8 text-clay">
              <time dateTime={p.date}>{formatDate(p.date)}</time>
              <span aria-hidden="true"> · </span>
              {p.readingMinutes} min read
            </p>
            <h1 className="mt-4 text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.05]">{p.title}</h1>
            <p className="t-body mt-5 text-mute">{p.description}</p>
            {p.updated && (
              <p className="mt-4 text-[0.8125rem] text-mute">
                Updated <time dateTime={p.updated}>{formatDate(p.updated)}</time>
              </p>
            )}
          </header>

          {p.cover && (
            <div className="shell mt-10 max-w-5xl sm:mt-14">
              <Figure
                src={p.cover}
                alt={p.coverAlt ?? ""}
                className="aspect-[16/9] rounded-[1.5rem]"
                sizes="(max-width: 1024px) 100vw, 64rem"
                priority
              />
            </div>
          )}

          <div className="shell mt-10 max-w-3xl sm:mt-14">
            <div className="prose-post" dangerouslySetInnerHTML={{ __html: p.html }} />
          </div>
        </article>
        <FinalCTA roomsHref="/#rooms" />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileBar />
      {blogPostJsonLd(p).map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
}
