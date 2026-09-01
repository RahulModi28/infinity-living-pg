"use client";

import { useEffect, useState } from "react";
import { site, whatsappHref } from "@/lib/site";

/**
 * Floating WhatsApp entry point — the highest-intent channel in this market.
 * Appears after the hero so it never competes with the hero CTAs, sits above
 * the mobile sticky bar, and pulses occasionally rather than constantly.
 */
export default function WhatsAppButton() {
  const [shown, setShown] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!shown) return;
    const id = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1800);
    }, 14000);
    return () => clearInterval(id);
  }, [shown]);

  const disabled = site.contact.whatsappNumber.startsWith("[");

  return (
    <a
      href={whatsappHref()}
      target={disabled ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-cta="whatsapp"
      title={disabled ? "Add a WhatsApp number in src/lib/site.ts" : "Chat with us on WhatsApp"}
      className={[
        "group fixed right-4 z-40 flex max-sm:hidden items-center gap-0 overflow-hidden rounded-full bg-[#1f8b4d] text-white",
        "shadow-[0_12px_30px_-10px_rgba(31,139,77,0.75)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "bottom-6 right-6",
        "hover:gap-2 hover:bg-[#1a7742] hover:pr-5",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      ].join(" ")}
    >
      <span className="relative grid size-14 shrink-0 place-items-center">
        {pulse && (
          <span
            aria-hidden="true"
            className="absolute inset-1 animate-ping rounded-full bg-white/35 [animation-duration:1.6s]"
          />
        )}
        {/* WhatsApp glyph */}
        <svg viewBox="0 0 24 24" className="relative size-7 fill-current" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37s-1.04 1.01-1.04 2.47 1.06 2.86 1.21 3.06c.15.2 2.09 3.2 5.07 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z" />
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.69 8.22-8.23 8.22Z" />
        </svg>
      </span>
      <span className="max-w-0 whitespace-nowrap text-[0.9375rem] font-medium opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[9rem] group-hover:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
