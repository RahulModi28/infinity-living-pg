import { NextResponse } from "next/server";

/**
 * Enquiry endpoint.
 *
 * Leads are forwarded to ENQUIRY_WEBHOOK_URL — a Google Apps Script web app
 * bound to a spreadsheet (see README for the script and setup). A sheet was
 * chosen over a database deliberately: these get read on a phone, sorted and
 * counted, and a database would need an admin panel built purely to read it.
 *
 * `source` decides which tab the row lands in: form enquiries go to
 * "Enquiries" with a room type and move-in date, WhatsApp gate captures go to
 * "WhatsApp Contacts" with just a name and number. Same endpoint, same
 * webhook — the script does the routing.
 *
 * The variable is server-side only — no NEXT_PUBLIC prefix — so the URL is
 * never exposed to the browser.
 *
 * Email is deliberately not sent from here. The Apps Script already has the
 * lead and can mail from the owner's own Google account, so doing it there
 * needs no mail provider, no API key and no per-send cost — and it keeps
 * sending alive even if this route is never called. See apps-script/Code.gs.
 */

type Lead = {
  name: string;
  phone: string;
  email: string;
  roomType: string;
  moveIn: string;
  message: string;
  at: string;
  /** Which route produced it, and which tab it is filed under. */
  source: "form" | "whatsapp";
};

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").replace(/\D/g, "").slice(-10);

  if (!name || !/^[6-9]\d{9}$/.test(phone)) {
    return NextResponse.json(
      { ok: false, error: "Name and a valid phone are required" },
      { status: 422 }
    );
  }

  const lead: Lead = {
    name,
    phone,
    email: String(body.email ?? "").trim(),
    roomType: String(body.roomType ?? "").trim(),
    moveIn: String(body.moveIn ?? "").trim(),
    message: String(body.message ?? "").trim(),
    at: new Date().toISOString(),
    source: body.source === "whatsapp" ? "whatsapp" : "form",
  };

  const endpoint = process.env.ENQUIRY_WEBHOOK_URL;

  // Nowhere to store it. In development that's expected; in production it
  // means the lead is lost, so fail rather than show a success animation to
  // someone who thinks they've enquired — the form then points them at
  // WhatsApp, which is the channel that actually works.
  if (!endpoint) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[enquiry] no ENQUIRY_WEBHOOK_URL set, logging instead:", lead);
      return NextResponse.json({ ok: true });
    }
    console.error("[enquiry] ENQUIRY_WEBHOOK_URL is not set — lead not stored:", lead);
    return NextResponse.json({ ok: false, error: "Storage not configured" }, { status: 503 });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      // Apps Script can be slow to wake; still well inside the function limit.
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (err) {
    // Log the whole lead so it is recoverable from the platform logs even
    // when the sheet is unreachable.
    console.error("[enquiry] failed to store lead:", err, lead);
    return NextResponse.json({ ok: false, error: "Could not store enquiry" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
