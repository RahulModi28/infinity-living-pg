"use client";

import Image from "next/image";
import {
  GraduationCap, TrainFront, Train, Coffee, ShoppingBasket, HeartPulse,
  Store, Landmark, Navigation, type LucideIcon,
} from "lucide-react";
import { nearby, site } from "@/lib/site";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

const ICONS: Record<string, LucideIcon> = {
  GraduationCap, TrainFront, Train, Coffee, ShoppingBasket, HeartPulse, Store, Landmark,
};

export default function Location() {
  const directions = site.address.mapsDirectionsUrl;
  const hasDirections = !directions.startsWith("[");

  return (
    <section id="location" className="scroll-mt-20 bg-ivory py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Map */}
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-moss-2 lg:aspect-[5/6]">
              {site.address.mapsEmbedUrl ? (
                <iframe
                  src={site.address.mapsEmbedUrl}
                  title="Map showing Infinity Living PG near Christ University Yeshwanthpur Campus, Bengaluru"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0"
                />
              ) : (
                <>
                  <Image
                    src="/images/map.svg"
                    alt="Map placeholder — Infinity Living, Yeshwanthpur, Bengaluru"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-black/45 p-4 text-[0.8125rem] leading-relaxed text-white/85 backdrop-blur-md">
                    Add the Google Maps embed URL to{" "}
                    <code className="rounded bg-white/15 px-1">site.address.mapsEmbedUrl</code> to
                    show the live interactive map here.
                  </div>
                </>
              )}
            </div>
          </Reveal>

          <div>
            <SectionHead
              eyebrow="Location"
              title="Everything you need, close by."
              intro="The single biggest reason students pick this address: the walk to campus is short enough that an 8:30 class stops being a problem."
            />

            <Reveal stagger className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
              {nearby.map((n) => {
                const Icon = ICONS[n.icon] ?? Landmark;
                const primary = "primary" in n && n.primary;
                return (
                  <div
                    key={n.label}
                    className={`flex items-center justify-between gap-4 py-4 ${
                      primary ? "bg-clay/[0.05] -mx-3 px-3 rounded-lg" : ""
                    }`}
                  >
                    <span className="flex items-center gap-3.5">
                      <Icon
                        className={`size-[1.15rem] shrink-0 ${primary ? "text-clay" : "text-moss"}`}
                        aria-hidden="true"
                      />
                      <span
                        className={`text-[0.9375rem] leading-snug ${
                          primary ? "font-medium text-ink" : "text-ink-2"
                        }`}
                      >
                        {n.label}
                      </span>
                    </span>
                    <span className="shrink-0 font-display text-[0.8125rem] text-mute">
                      {n.time}
                    </span>
                  </div>
                );
              })}
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[0.8125rem] leading-relaxed text-mute">
                Distances and travel times above are placeholders. They will be measured on Google
                Maps and published only once verified — we won&apos;t estimate them.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  href={hasDirections ? directions : "#enquire"}
                  {...(hasDirections
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  arrow
                >
                  <Navigation className="size-[1.05em]" aria-hidden="true" /> Get Directions
                </Button>
                <Button href="#enquire" variant="ghost">
                  Schedule a Visit
                </Button>
              </div>

              <address className="mt-6 not-italic text-[0.9375rem] leading-relaxed text-mute">
                {site.address.street}, {site.address.locality}, {site.address.city},{" "}
                {site.address.state} {site.address.postalCode}
              </address>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
