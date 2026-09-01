import { site, rooms, depositFor, whatsappHref } from "./site";

/**
 * Transactional email on lead arrival.
 *
 * Two messages, different jobs:
 *
 *  - to the enquirer: the reply that wins the comparison. Every competitor
 *    answers "call us for details", because holding the numbers back buys a
 *    phone call. This gives everything away instead — rent, deposit,
 *    inclusions, distance — which reads as confidence and removes the reason
 *    to keep shopping, since a straight answer is mostly what they are
 *    shopping for.
 *
 *  - to the owner: short and actionable, because a sheet stores but tells
 *    nobody, and a lead that waits two days has already booked elsewhere.
 *
 * Inert until RESEND_API_KEY is set — nothing is sent and nothing throws.
 */

const KEY = process.env.RESEND_API_KEY;
const FROM = process.env.LEAD_FROM ?? "Infinity Space <onboarding@resend.dev>";
const NOTIFY = process.env.LEAD_NOTIFY_TO ?? site.contact.email;

export type Lead = {
  name: string;
  phone: string;
  email: string;
  roomType: string;
  moveIn: string;
  message: string;
  at: string;
  source: "form" | "whatsapp";
};

async function send(to: string, subject: string, html: string, replyTo?: string) {
  if (!KEY) return { skipped: true as const };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to, subject, html, reply_to: replyTo }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`resend ${res.status}: ${await res.text()}`);
  return { skipped: false as const };
}

const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ─────────────────────────── to the enquirer ─────────────────────────── */

export function leadReplyHtml(lead: Lead) {
  const single = rooms.find((r) => r.id === "single");
  const double = rooms.find((r) => r.id === "double");
  const wa = whatsappHref(
    `Hi, I just enquired on the website. My name is ${lead.name}.`
  );

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e4dccf;color:#6f6a63;font-size:14px;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e4dccf;color:#121110;font-size:14px;font-weight:600;text-align:right;">${value}</td>
    </tr>`;

  return `<!doctype html><html><body style="margin:0;background:#f7f4ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ef;padding:28px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e4dccf;">

        <tr><td style="background:#1f3d33;padding:26px 28px;">
          <div style="color:#f7f4ef;font-size:19px;font-weight:700;letter-spacing:-0.2px;">Infinity Space</div>
          <div style="color:rgba(247,244,239,0.68);font-size:13px;margin-top:5px;">Gents PG · 10 minutes' walk from Christ University, Yeshwanthpur</div>
        </td></tr>

        <tr><td style="padding:28px;">
          <p style="margin:0 0 16px;color:#121110;font-size:16px;line-height:1.55;">Hi ${esc(lead.name.split(" ")[0])},</p>

          <p style="margin:0 0 20px;color:#2a2724;font-size:15px;line-height:1.65;">
            Thanks for getting in touch. Rather than ask you to call for details, here is
            everything — so you can compare us properly against wherever else you're looking.
          </p>

          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
            ${row("Single sharing", `₹${single?.price} / month`)}
            ${row("Double sharing", `₹${double?.price} per person`)}
            ${row("Included in rent", "Electricity, 4 meals a day, Wi-Fi, housekeeping, laundry")}
            ${row("Security deposit", `2 months — adjusted against your April &amp; May rent`)}
            ${row("Walk to campus", "850 m, about 10 minutes")}
            ${row("Also on site", "Gym, pool table, table tennis, rooftop dining hall")}
          </table>

          <p style="margin:0 0 22px;color:#2a2724;font-size:15px;line-height:1.65;">
            The deposit isn't money you lose — it comes back as two rent-free months at the end
            of the year. And electricity and food are in the rent, not billed on top, which is
            usually where the surprises come from elsewhere.
          </p>

          <p style="margin:0 0 8px;color:#121110;font-size:15px;line-height:1.65;font-weight:600;">
            Come and see it before you decide.
          </p>
          <p style="margin:0 0 22px;color:#2a2724;font-size:15px;line-height:1.65;">
            No booking, no deposit, no brokerage — just come and look at the actual room and
            meet the people who run it. Parents are welcome, and we'd rather you visited than
            took our word for any of the above.
          </p>

          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 22px;">
            <tr><td style="background:#1f8b4d;border-radius:999px;">
              <a href="${wa}" style="display:inline-block;padding:14px 26px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">Message us on WhatsApp</a>
            </td></tr>
          </table>

          <p style="margin:0;color:#6f6a63;font-size:14px;line-height:1.6;">
            Or call ${site.contact.phoneDisplay} — we usually reply the same day.
          </p>
        </td></tr>

        <tr><td style="background:#f7f4ef;padding:18px 28px;border-top:1px solid #e4dccf;">
          <div style="color:#6f6a63;font-size:12px;line-height:1.6;">
            ${site.address.street}, ${site.address.locality}, ${site.address.city} ${site.address.postalCode}<br>
            <a href="${site.url}" style="color:#c8622f;text-decoration:none;">${site.url.replace("https://", "")}</a>
          </div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

/* ───────────────────────────── to the owner ───────────────────────────── */

export function ownerNotifyHtml(lead: Lead) {
  const line = (l: string, v: string) =>
    v ? `<tr><td style="padding:6px 14px 6px 0;color:#6f6a63;font-size:14px;">${l}</td><td style="padding:6px 0;color:#121110;font-size:14px;font-weight:600;">${esc(v)}</td></tr>` : "";
  return `<!doctype html><html><body style="margin:0;background:#f7f4ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;padding:24px;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border:1px solid #e4dccf;border-radius:14px;padding:22px;">
    <tr><td>
      <div style="color:#c8622f;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">
        ${lead.source === "whatsapp" ? "WhatsApp contact" : "Website enquiry"}
      </div>
      <div style="color:#121110;font-size:20px;font-weight:700;margin:8px 0 16px;">${esc(lead.name)}</div>
      <table role="presentation" cellpadding="0" cellspacing="0">
        ${line("Phone", lead.phone)}
        ${line("Email", lead.email)}
        ${line("Room", lead.roomType)}
        ${line("Move-in", lead.moveIn)}
        ${line("Message", lead.message)}
      </table>
      <div style="margin-top:18px;">
        <a href="https://wa.me/91${lead.phone}" style="display:inline-block;background:#1f8b4d;color:#fff;border-radius:999px;padding:11px 20px;font-size:14px;font-weight:600;text-decoration:none;">WhatsApp ${esc(lead.name.split(" ")[0])}</a>
        <a href="tel:+91${lead.phone}" style="display:inline-block;margin-left:8px;color:#121110;border:1px solid #d8d0c4;border-radius:999px;padding:11px 20px;font-size:14px;font-weight:600;text-decoration:none;">Call</a>
      </div>
    </td></tr>
  </table>
</body></html>`;
}

/* ───────────────────────────────── send ───────────────────────────────── */

export async function notifyOnLead(lead: Lead) {
  const jobs: Promise<unknown>[] = [
    send(
      NOTIFY,
      `${lead.source === "whatsapp" ? "WhatsApp" : "Enquiry"}: ${lead.name} · ${lead.phone}`,
      ownerNotifyHtml(lead),
      lead.email || undefined
    ),
  ];

  // The gate only captures a name and number, and the form's email field is
  // optional — so the auto-reply only goes out when there is somewhere to
  // send it.
  if (lead.email) {
    jobs.push(
      send(
        lead.email,
        "10 minutes from campus. Here's everything.",
        leadReplyHtml(lead)
      )
    );
  }

  await Promise.allSettled(jobs);
}
