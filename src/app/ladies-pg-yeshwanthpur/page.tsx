import type { Metadata } from "next";
import { audiences } from "@/lib/audiences";
import { baseUrl } from "@/lib/site";
import { audienceJsonLd } from "@/lib/seo";
import AudiencePage from "@/components/AudiencePage";

const a = audiences.ladies;

export const metadata: Metadata = {
  // Absolute so the brand suffix doesn't push the title past ~60 chars.
  title: { absolute: a.title },
  description: a.description,
  alternates: { canonical: `/${a.slug}` },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `/${a.slug}`,
    title: a.title,
    description: a.description,
    images: [{ url: "/images/og.png", width: 1200, height: 630, type: "image/png", alt: a.title }],
  },
};

export default function Page() {
  return (
    <>
      <AudiencePage a={a} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(audienceJsonLd(a, baseUrl())) }}
      />
    </>
  );
}
