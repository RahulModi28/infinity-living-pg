"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, MessageCircle } from "lucide-react";
import { whatsappHref } from "@/lib/site";

/**
 * Sticky bottom bar — mobile only. Two thumb-sized targets, always one tap
 * from the two actions that actually convert. Hides while a dialog is open
 * (body scroll lock) so it never floats over a modal.
 */
export default function MobileBar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-ivory/92 backdrop-blur-xl sm:hidden",
        "pb-[env(safe-area-inset-bottom)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        shown ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
    >
      <div className="grid grid-cols-2 gap-2.5 px-4 py-3">
        <a
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center gap-2 rounded-full border border-[#1f8b4d]/30 bg-[#1f8b4d]/10 text-[0.9375rem] font-medium text-[#166b3a] active:scale-[0.98]"
        >
          <MessageCircle className="size-[1.1em]" aria-hidden="true" />
          WhatsApp
        </a>
        <a
          href="#enquire"
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-ink text-[0.9375rem] font-medium text-ivory active:scale-[0.98]"
        >
          <CalendarCheck className="size-[1.1em]" aria-hidden="true" />
          Check Availability
        </a>
      </div>
    </div>
  );
}
