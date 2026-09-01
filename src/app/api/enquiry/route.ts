import { NextResponse } from "next/server";

/**
 * Enquiry endpoint.
 *
 * ⚠️  This currently only validates and logs. Before launch, wire it to
 * wherever leads should actually land — e.g. a Google Sheet, a CRM, an email
 * via Resend, or a WhatsApp Business API notification to the manager.
 * Every enquiry is a paid-for lead; losing one is losing a booking.
 */
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
    return NextResponse.json({ ok: false, error: "Name and a valid phone are required" }, { status: 422 });
  }

  // TODO: replace with a real destination (CRM / sheet / email / WhatsApp API).
  console.info("[enquiry]", {
    name,
    phone,
    email: body.email,
    roomType: body.roomType,
    moveIn: body.moveIn,
    message: body.message,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
