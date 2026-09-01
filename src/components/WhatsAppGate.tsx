"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { X, Loader2, MessageCircle } from "lucide-react";
import { useDialog } from "@/lib/useDialog";
import { trackLead } from "./Analytics";
import Button from "./ui/Button";

/**
 * Captures a name and number before handing someone off to WhatsApp.
 *
 * Without this, a WhatsApp tap is an anonymous exit: you only learn who it
 * was if they actually send the message, and plenty open the app and never
 * type. Gating turns every opener into a stored lead.
 *
 * Implemented as a document-level click interceptor rather than by changing
 * ten components, for two reasons: any WhatsApp link added later is covered
 * automatically, and the links stay real `href="https://wa.me/…"` anchors —
 * so with JavaScript disabled or broken they still work, just ungated.
 *
 * The per-link message is preserved: the room modal and the audience pages
 * each prefill their own text, and that is read back off the href.
 */

const REMEMBER_KEY = "is:wa-contact";

type Remembered = { name: string; phone: string };

function readRemembered(): Remembered | null {
  try {
    const raw = localStorage.getItem(REMEMBER_KEY);
    return raw ? (JSON.parse(raw) as Remembered) : null;
  } catch {
    return null;
  }
}

export default function WhatsAppGate() {
  const [href, setHref] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setHref(null);
    setError(null);
    setSending(false);
  }, []);

  useDialog(href !== null, panel, close);

  // useDialog focuses the first focusable, which is the close button. For a
  // two-field form the cursor belongs in the first field.
  useEffect(() => {
    if (href === null) return;
    const id = window.setTimeout(() => {
      panel.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
    }, 0);
    return () => window.clearTimeout(id);
  }, [href]);

  const onDocClick = useCallback((e: MouseEvent) => {
    const a = (e.target as HTMLElement)?.closest?.(
      'a[data-cta="whatsapp"]'
    ) as HTMLAnchorElement | null;
    if (!a) return;
    const target = a.getAttribute("href") || "";
    // Only gate real WhatsApp hand-offs. While the number was a placeholder
    // these pointed at #enquire, and modified clicks should behave normally.
    if (!target.includes("wa.me")) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;

    // Already given their details once — don't ask twice.
    if (readRemembered()) return;

    e.preventDefault();
    setHref(target);
  }, []);

  // Intercept once, at the document — Analytics delegates on [data-cta] the
  // same way. Capture phase so we run before the link navigates.
  useEffect(() => {
    document.addEventListener("click", onDocClick as EventListener);
    return () => document.removeEventListener("click", onDocClick as EventListener);
  }, [onDocClick]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!href) return;
    setError(null);

    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<
      string,
      string
    >;
    const name = (data.name || "").trim();
    const phone = (data.phone || "").replace(/\D/g, "").slice(-10);

    if (!name) return setError("Please tell us your name.");
    if (!/^[6-9]\d{9}$/.test(phone))
      return setError("Please enter a valid 10-digit Indian mobile number.");

    setSending(true);

    // Store the lead, but never let storage stand between someone and the
    // thing they clicked. If it fails we log it and hand off anyway — the
    // conversation itself is worth more than the row in the sheet.
    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, source: "whatsapp" }),
        keepalive: true,
        signal: AbortSignal.timeout(4000),
      });
    } catch {
      /* handed off regardless */
    }

    try {
      localStorage.setItem(REMEMBER_KEY, JSON.stringify({ name, phone }));
    } catch {
      /* private mode — they'll just be asked again */
    }

    trackLead("whatsapp_lead_captured", { source: "gate" });
    window.location.href = href;
  }

  if (href === null) return null;

  const field =
    "w-full rounded-xl border border-ink/15 bg-ivory px-4 py-3.5 text-[0.9375rem] text-ink " +
    "placeholder:text-mute/60 transition-colors duration-300 hover:border-ink/30 " +
    "focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/25";

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
        aria-labelledby="wa-gate-title"
        className="relative w-full max-w-md rounded-t-[1.75rem] bg-ivory p-6 outline-none sm:m-6 sm:rounded-[1.75rem] sm:p-8"
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full text-mute transition hover:bg-ink/5 hover:text-ink"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <span className="grid size-12 place-items-center rounded-2xl bg-[#1f8b4d]/12 text-[#1f8b4d]">
          <MessageCircle className="size-6" aria-hidden="true" />
        </span>
        <h2 id="wa-gate-title" className="mt-4 font-display text-[1.5rem] leading-tight">
          Before we chat
        </h2>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-mute">
          Just your name and number, so we know who we&apos;re talking to and can call you back
          if the chat drops.
        </p>

        <form onSubmit={onSubmit} className="mt-6" noValidate>
          <label className="block">
            <span className="t-label text-mute">Name</span>
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="Your full name"
              className={`${field} mt-2`}
            />
          </label>
          <label className="mt-4 block">
            <span className="t-label text-mute">Phone</span>
            <input
              name="phone"
              required
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              placeholder="10-digit mobile"
              className={`${field} mt-2`}
            />
          </label>

          {error && (
            <p role="alert" className="mt-3 text-[0.875rem] text-clay-2">
              {error}
            </p>
          )}

          <Button type="submit" variant="whatsapp" disabled={sending} className="mt-6 w-full">
            {sending ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Opening WhatsApp…
              </>
            ) : (
              <>
                <MessageCircle className="size-[1.05em]" aria-hidden="true" /> Start chat on
                WhatsApp
              </>
            )}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs leading-relaxed text-mute">
          We&apos;ll only use this to reply about rooms.
        </p>
      </div>
    </div>
  );
}
