"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Users } from "lucide-react";
import { rooms, type Room } from "@/lib/site";
import SectionHead from "./ui/SectionHead";
import Reveal from "./ui/Reveal";
import RoomModal from "./RoomModal";

function RoomCard({ room, onOpen }: { room: Room; onOpen: () => void }) {
  return (
    <article className="group snap-start">
      <button
        onClick={onOpen}
        className="block w-full cursor-pointer text-left"
        aria-label={`View details for ${room.name}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-moss-2 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5">
          <Image
            src={room.image}
            alt={`${room.name} room — ${room.occupancy} — at Infinity Living PG, Yeshwanthpur`}
            fill
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 31vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(10,20,16,0.82)_100%)] transition-opacity duration-500 group-hover:opacity-90"
          />

          <span className="t-label absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-white backdrop-blur-md">
            <Users className="size-3" aria-hidden="true" />
            {room.occupancy}
          </span>

          <span className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/12 text-white backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-clay">
            <ArrowUpRight
              className="size-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>

          <div className="absolute inset-x-5 bottom-5 text-ivory">
            <h3 className="font-display text-2xl leading-none">{room.name}</h3>
            <p className="mt-2 flex items-baseline gap-1.5">
              <span className="font-display text-lg">₹{room.price}</span>
              <span className="text-[0.8125rem] text-white/65">{room.priceNote}</span>
            </p>

            {/* Secondary detail — revealed on hover / always shown on touch */}
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] max-lg:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <p className="pt-3 text-[0.875rem] leading-relaxed text-white/72">
                  {room.features.slice(0, 4).join(" · ")}
                </p>
                <p className="pt-2 text-[0.8125rem] text-white/55">
                  Availability: {room.availability}
                </p>
              </div>
            </div>
          </div>
        </div>
        <span className="link-u mt-4 inline-block text-[0.9375rem] font-medium">View Room</span>
      </button>
    </article>
  );
}

export default function Rooms() {
  const [active, setActive] = useState<Room | null>(null);

  return (
    <section id="rooms" className="scroll-mt-20 bg-ivory py-20 sm:py-28 lg:py-32">
      <div className="shell">
        <SectionHead
          eyebrow="Rooms"
          title="Find your perfect space."
          intro="Single, double or triple sharing — every room comes furnished, cleaned and connected. Pick the one that matches how you actually live."
        />

        {/* Swipeable on mobile, grid from tablet up. */}
        <div className="no-bar edge-fade -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:[mask-image:none] lg:grid-cols-3 lg:gap-7">
          {rooms.map((r) => (
            <div key={r.id} className="w-[80vw] shrink-0 sm:w-auto">
              <Reveal>
                <RoomCard room={r} onOpen={() => setActive(r)} />
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-[0.8125rem] text-mute">
            Prices and availability are placeholders pending confirmation — ask us for the current
            rate card.
          </p>
        </Reveal>
      </div>

      <RoomModal room={active} onClose={() => setActive(null)} />
    </section>
  );
}
