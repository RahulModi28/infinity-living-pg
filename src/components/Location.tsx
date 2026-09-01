"use client";

import { useState } from "react";
import {
  GraduationCap, TrainFront, ShoppingBasket, HeartPulse, Store,
  Pill, Sandwich, Utensils, Navigation, CornerUpLeft, type LucideIcon,
} from "lucide-react";
import { nearby, site, directionsEmbed } from "@/lib/site";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

const ICONS: Record<string, LucideIcon> = {
  GraduationCap, TrainFront, ShoppingBasket, HeartPulse, Store, Pill, Sandwich, Utensils,
};

export default function Location() {
  // Which nearby pin the map is currently routing to, if any.
  const [routeTo, setRouteTo] = useState<(typeof nearby)[number] | null>(null);
  const directions = site.address.mapsDirectionsUrl;
  const hasDirections = !directions.startsWith("[");

  return (
    <section id="location" className="scroll-mt-20 bg-ivory py-14 sm:py-24 lg:py-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Map */}
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-moss-2 lg:aspect-[5/6]">
              {site.address.mapsEmbedUrl ? (
                <iframe
                  key={routeTo ? routeTo.label : "property"}
                  src={
                    routeTo
                      ? directionsEmbed(routeTo)
                      : site.address.mapsEmbedUrl
                  }
                  title={
                    routeTo
                      ? `Walking route from Infinity Space to ${routeTo.label}`
                      : "Map showing Infinity Space PG near Christ University Yeshwanthpur Campus, Bengaluru"
                  }
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center bg-moss-2 p-8 text-center">
                  <p className="max-w-sm text-[0.8125rem] leading-relaxed text-white/70">
                    Add a Google Maps embed URL to{" "}
                    <code className="rounded bg-white/15 px-1 [overflow-wrap:anywhere]">
                      site.address.mapsEmbedUrl
                    </code>{" "}
                    to show the interactive map here.
                  </p>
                </div>
              )}

              {/* Top-right: Google's embed puts its own origin/destination card
                  top-left and its controls bottom-right, so this is the one
                  corner that stays clear. */}
              {routeTo && (
                <button
                  type="button"
                  onClick={() => setRouteTo(null)}
                  className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-ivory/95 px-4 py-2.5 text-[0.8125rem] font-medium text-ink shadow-[0_6px_20px_-8px_rgba(18,17,16,0.5)] backdrop-blur-sm transition hover:bg-ivory"
                >
                  <CornerUpLeft className="size-4" aria-hidden="true" />
                  Back to the property
                </button>
              )}
            </div>
          </Reveal>

          <div>
            <SectionHead
              eyebrow="Location"
              title="Everything you need, close by."
              intro="The single biggest reason students pick this address: the walk to campus is short enough that an 8:30 class stops being a problem."
            />

            <p className="mt-8 text-[0.8125rem] text-mute">
              Tap any of these to see the walking route from the front door.
            </p>

            <Reveal stagger className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
              {nearby.map((n) => {
                const Icon = ICONS[n.icon] ?? Store;
                const primary = "primary" in n && n.primary;
                const active = routeTo?.label === n.label;
                return (
                  <button
                    key={n.label}
                    type="button"
                    onClick={() => setRouteTo(active ? null : n)}
                    aria-pressed={active}
                    className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-4 text-left transition-colors duration-300 -mx-3 ${
                      active
                        ? "bg-moss/[0.10]"
                        : primary
                          ? "bg-clay/[0.05] hover:bg-clay/[0.09]"
                          : "hover:bg-ink/[0.04]"
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
                    <span className="shrink-0 text-right font-display text-[0.8125rem] text-mute">
                      {active ? "Showing route" : n.time}
                    </span>
                  </button>
                );
              })}
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 text-[0.8125rem] leading-relaxed text-mute">
                Distances are measured by road from the property, not estimated. The short walks
                assume 5 km/h; the longer three are Google&apos;s own walking routes — the same
                ones the map draws when you tap a row.
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
