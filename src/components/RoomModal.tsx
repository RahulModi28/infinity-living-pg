"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDialog } from "@/lib/useDialog";
import { X, Check, ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import type { Room } from "@/lib/site";
import { whatsappHref } from "@/lib/site";
import Button from "./ui/Button";

export default function RoomModal({
  room,
  onClose,
}: {
  room: Room | null;
  onClose: () => void;
}) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setI(0), [room]);

  useDialog(!!room, ref, onClose, (e) => {
    if (!room) return;
    if (e.key === "ArrowRight") setI((v) => (v + 1) % room.gallery.length);
    if (e.key === "ArrowLeft") setI((v) => (v - 1 + room.gallery.length) % room.gallery.length);
  });

  if (!room) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <button
        aria-label="Close room details"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-sm"
      />
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="room-modal-title"
        className="relative flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[1.75rem] bg-ivory outline-none sm:m-6 sm:rounded-[1.75rem]"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full bg-ink/55 text-white backdrop-blur-md transition hover:bg-ink"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <div className="grid overflow-y-auto md:grid-cols-[1.15fr_1fr]">
          {/* Gallery */}
          <div className="relative aspect-[4/3] bg-moss-2 md:aspect-auto md:min-h-[32rem]">
            {room.gallery.map((src, idx) => (
              <Image
                key={src}
                src={src}
                alt={`${room.name} room at Infinity Space — view ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className={`object-cover transition-opacity duration-500 ${
                  idx === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
              <div className="flex gap-1.5" role="tablist" aria-label="Room photos">
                {room.gallery.map((_, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-selected={idx === i}
                    aria-label={`Photo ${idx + 1}`}
                    onClick={() => setI(idx)}
                    className={`h-1 rounded-full transition-all duration-400 ${
                      idx === i ? "w-8 bg-white" : "w-4 bg-white/45 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  aria-label="Previous photo"
                  onClick={() => setI((v) => (v - 1 + room.gallery.length) % room.gallery.length)}
                  className="grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30"
                >
                  <ArrowLeft className="size-4" aria-hidden="true" />
                </button>
                <button
                  aria-label="Next photo"
                  onClick={() => setI((v) => (v + 1) % room.gallery.length)}
                  className="grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/30"
                >
                  <ArrowRight className="size-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className="flex flex-col p-6 sm:p-9">
            <p className="t-label text-clay">{room.occupancy}</p>
            <h3 id="room-modal-title" className="mt-3 font-display text-[2rem] leading-none">
              {room.name}
            </h3>
            <p className="t-body mt-4 text-mute">{room.blurb}</p>

            <ul className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {room.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[0.9375rem]">
                  <Check className="mt-[0.2em] size-4 shrink-0 text-moss" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>

            <dl className="mt-7 grid grid-cols-2 gap-4 rounded-2xl border border-ink/10 bg-ivory-2 p-5">
              <div>
                <dt className="t-label text-mute">Rent</dt>
                <dd className="mt-1.5 font-display text-xl">
                  ₹{room.price}
                  <span className="ml-1 text-[0.8125rem] font-normal text-mute">
                    {room.priceNote}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="t-label text-mute">Availability</dt>
                <dd className="mt-1.5 font-display text-xl">{room.availability}</dd>
              </div>
            </dl>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button href="#enquire" onClick={onClose} arrow className="w-full">
                Enquire
              </Button>
              <Button
                href={whatsappHref(
                  `Hi, I'm interested in the ${room.name} room at Infinity Space near Christ University Yeshwanthpur Campus. Is it available, and what is the rent?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                className="w-full"
              >
                <MessageCircle className="size-[1.05em]" aria-hidden="true" /> WhatsApp
              </Button>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-mute">
              Rent includes electricity and meals. Availability moves week to week —
              message us to confirm before planning a visit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
