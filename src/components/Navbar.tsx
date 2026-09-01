"use client";

import { useEffect, useRef, useState } from "react";
import { useDialog } from "@/lib/useDialog";
import { Menu, X, MessageCircle, Phone } from "lucide-react";
import Logo from "./Logo";
import Button from "./ui/Button";
import { site, whatsappHref } from "@/lib/site";

const LINKS = [
  { href: "#rooms", label: "Rooms" },
  { href: "#amenities", label: "Amenities" },
  { href: "#location", label: "Location" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useDialog(open, panelRef, () => setOpen(false));

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          solid
            ? "border-b border-ink/10 bg-ivory/82 backdrop-blur-xl shadow-[0_1px_24px_-12px_rgba(18,17,16,0.4)]"
            : "border-b border-transparent bg-transparent",
        ].join(" ")}
      >
        <nav
          aria-label="Primary"
          className={`shell flex items-center justify-between transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            solid ? "h-16" : "h-20 md:h-24"
          }`}
        >
          <a
            href="#top"
            className={`transition-[color,transform,font-size] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              solid ? "text-ink text-[0.95rem]" : "text-white text-[1.05rem]"
            }`}
            aria-label="Infinity Living — home"
          >
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`link-u rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors duration-300 ${
                    solid ? "text-ink-2 hover:text-ink" : "text-white/85 hover:text-white"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Wrapped rather than given `hidden` directly: the Button base
                class already sets inline-flex, and two display utilities on
                one element resolve by stylesheet order, not by intent. */}
            <span className="hidden sm:block">
              <Button
                href="#enquire"
                variant={solid ? "primary" : "light"}
                className="!px-5 !py-2.5 !text-[0.875rem]"
                arrow
              >
                Book a Room
              </Button>
            </span>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className={`grid size-11 place-items-center rounded-full border transition-colors duration-300 lg:hidden ${
                solid
                  ? "border-ink/15 text-ink hover:bg-ink/5"
                  : "border-white/25 text-white hover:bg-white/10"
              }`}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet — full-bleed, staggered, not a dropdown list */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-[60] lg:hidden ${open ? "" : "pointer-events-none"}`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={[
            "grain absolute inset-x-0 top-0 overflow-hidden rounded-b-[2rem] bg-moss-2 px-6 pb-10 pt-6",
            "transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-y-0" : "-translate-y-full",
          ].join(" ")}
        >
          <div className="flex items-center justify-between text-ivory">
            <Logo />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full border border-white/20 hover:bg-white/10"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <ul className="mt-9 space-y-1">
            {LINKS.map((l, i) => (
              <li
                key={l.href}
                style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
                className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-white/10 py-3.5 font-display text-[1.75rem] tracking-[-0.03em] text-ivory"
                >
                  {l.label}
                  <span className="t-label text-white/30">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>

          <div
            style={{ transitionDelay: open ? "480ms" : "0ms" }}
            className={`mt-8 grid gap-3 transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Button href="#enquire" onClick={() => setOpen(false)} className="w-full" arrow>
              Check Availability
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button
                href={whatsappHref()}
                variant="whatsapp"
                className="w-full"
                target="_blank"
                rel="noopener noreferrer"
                data-cta="whatsapp"
              >
                <MessageCircle className="size-[1.05em]" aria-hidden="true" /> WhatsApp
              </Button>
              <Button
                href={`tel:${site.contact.phoneHref}`}
                variant="light"
                className="w-full"
                data-cta="call"
              >
                <Phone className="size-[1.05em]" aria-hidden="true" /> Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
