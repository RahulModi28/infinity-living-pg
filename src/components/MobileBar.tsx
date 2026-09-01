"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { site, whatsappHref } from "@/lib/site";

/**
 * Sticky bottom bar — mobile only. Three thumb-sized targets covering the
 * three ways people actually make contact in this market: a phone call
 * (which parents overwhelmingly prefer), WhatsApp, and the enquiry form.
 *
 * Dialogs render above it (z-70/z-80 vs z-40), so it never covers a modal.
 */
export default function MobileBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const icon =
    "flex size-12 shrink-0 items-center justify-center rounded-full border transition-transform active:scale-[0.96]";

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-ivory/92 backdrop-blur-xl sm:hidden",
        "pb-[env(safe-area-inset-bottom)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        shown ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
    >
      <div className="flex items-center gap-2.5 px-4 py-3">
        <a
          href={`tel:${site.contact.phoneHref}`}
          aria-label={`Call ${site.contact.phoneDisplay}`}
          data-cta="call"
          className={`${icon} border-ink/20 text-ink hover:bg-ink/5`}
        >
          <Phone className="size-[1.15rem]" aria-hidden="true" />
        </a>
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          data-cta="whatsapp"
          className={`${icon} border-[#1f8b4d]/30 bg-[#1f8b4d]/10 text-[#166b3a]`}
        >
          <MessageCircle className="size-[1.15rem]" aria-hidden="true" />
        </a>
        <a
          href="#enquire"
          data-cta="enquire"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink text-[0.9375rem] font-medium text-ivory transition-transform active:scale-[0.98]"
        >
          <CalendarCheck className="size-[1.1em]" aria-hidden="true" />
          Check Availability
        </a>
      </div>
    </div>
  );
}
