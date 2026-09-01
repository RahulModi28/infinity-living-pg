"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2, MessageCircle } from "lucide-react";
import { rooms, whatsappHref } from "@/lib/site";
import Button from "./ui/Button";

type State = "idle" | "sending" | "done";

const field =
  "w-full rounded-xl border border-ink/15 bg-ivory px-4 py-3.5 text-[0.9375rem] text-ink " +
  "placeholder:text-mute/60 transition-colors duration-300 hover:border-ink/30 " +
  "focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/25";

export default function EnquiryForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;

    if (!/^[6-9]\d{9}$/.test(data.phone.replace(/\D/g, "").slice(-10))) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setState("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("done");
    } catch {
      setState("idle");
      setError("Something went wrong. Please WhatsApp us instead — it's faster anyway.");
    }
  }

  if (state === "done") {
    return (
      <div
        role="status"
        className="flex min-h-[26rem] flex-col items-center justify-center rounded-[1.5rem] border border-ink/12 bg-ivory p-10 text-center"
      >
        <span className="relative grid size-16 place-items-center rounded-full bg-moss text-ivory">
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-moss/25 [animation-iteration-count:2]"
          />
          <Check className="size-8 animate-[fadeIn_.5s_.15s_both_ease]" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl">We&apos;ve got it.</h3>
        <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-mute">
          We&apos;ll come back with availability, the current rate card and photos. If you want it
          faster, message us on WhatsApp.
        </p>
        <Button
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          variant="whatsapp"
          className="mt-7"
        >
          <MessageCircle className="size-[1.05em]" aria-hidden="true" /> Continue on WhatsApp
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[1.5rem] border border-ink/12 bg-ivory p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="t-label text-mute">Name</span>
          <input name="name" required autoComplete="name" placeholder="Your full name" className={`${field} mt-2`} />
        </label>

        <label className="block">
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

        <label className="block">
          <span className="t-label text-mute">Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={`${field} mt-2`}
          />
        </label>

        <label className="block">
          <span className="t-label text-mute">Room type</span>
          <select name="roomType" defaultValue="" className={`${field} mt-2`} required>
            <option value="" disabled>
              Choose one
            </option>
            {rooms.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>

        <label className="block">
          <span className="t-label text-mute">Move-in date</span>
          <input name="moveIn" type="date" className={`${field} mt-2`} />
        </label>

        <label className="block sm:col-span-2">
          <span className="t-label text-mute">Message (optional)</span>
          <textarea
            name="message"
            rows={3}
            placeholder="Anything you'd like to know?"
            className={`${field} mt-2 resize-none`}
          />
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-[0.875rem] text-clay-2">
          {error}
        </p>
      )}

      <Button type="submit" disabled={state === "sending"} className="mt-6 w-full" arrow={state !== "sending"}>
        {state === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Checking…
          </>
        ) : (
          "Check Availability"
        )}
      </Button>

      <p className="mt-4 text-center text-xs leading-relaxed text-mute">
        We&apos;ll only use your number to reply about rooms. No spam, no selling it on.
      </p>
    </form>
  );
}
