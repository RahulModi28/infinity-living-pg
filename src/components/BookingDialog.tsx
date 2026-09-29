"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X, CalendarCheck } from "lucide-react";
import { useDialog } from "@/lib/useDialog";
import EnquiryForm from "./EnquiryForm";

/**
 * The booking popup. Every "Book a Room" / "Check availability" / "Enquire"
 * button on the site is an anchor to #enquire; this intercepts those clicks
 * at the document and opens the enquiry form in a dialog instead — the same
 * pattern as WhatsAppGate, so any #enquire link added later is covered too.
 *
 * The anchors stay real: with JavaScript off or broken they still scroll to
 * the #enquire section, which keeps WhatsApp and phone contact.
 *
 * A button can carry `data-room="Single Sharing"` to preselect its room.
 */
export default function BookingDialog() {
  // null = closed; otherwise the room to preselect ("" for none).
  const [room, setRoom] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setRoom(null), []);
  useDialog(room !== null, panel, close);

  // Cursor in the first field, not on the close button.
  useEffect(() => {
    if (room === null) return;
    const id = window.setTimeout(() => {
      panel.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
    }, 0);
    return () => window.clearTimeout(id);
  }, [room]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.(
        'a[href="#enquire"], a[href="/#enquire"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      setRoom(a.dataset.room ?? "");
    };
    // Capture phase, so this runs before SmoothScroll's anchor handler,
    // which then sees defaultPrevented and leaves the scroll alone.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  if (room === null) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center">
      <button
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-sm"
      />
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        // Scrolls inside itself: the full form is taller than a short phone.
        className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-[1.75rem] bg-ivory p-6 text-ink outline-none sm:m-6 sm:rounded-[1.75rem] sm:p-8"
        data-lenis-prevent
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full text-mute transition hover:bg-ink/5 hover:text-ink"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <span className="grid size-12 place-items-center rounded-2xl bg-clay/12 text-clay">
          <CalendarCheck className="size-6" aria-hidden="true" />
        </span>
        <h2 id="booking-title" className="mt-4 font-display text-[1.5rem] leading-tight">
          Book a room
        </h2>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-mute">
          Leave your details and we&apos;ll come back with availability, usually the same day.
        </p>

        <div className="mt-6">
          <EnquiryForm bare defaultRoom={room} />
        </div>
      </div>
    </div>
  );
}
