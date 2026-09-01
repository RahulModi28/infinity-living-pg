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
  const wa = whatsappHref(`Hi, I just enquired on the website. My name is ${lead.name}.`);
  const img = (f: string) => `${site.url}/images/${f}`;

  // Tables and inline styles throughout — email clients support neither
  // flexbox nor grid, and most strip <style> blocks. Every image carries alt
  // text and every fact is repeated as text, because a large share of clients
  // block images until the reader asks for them.
  const priceCard = (name: string, price: string, note: string) => `
    <td width="50%" style="padding:0 6px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f4ef;border:1px solid #e4dccf;border-radius:14px;">
        <tr><td style="padding:18px 16px;text-align:center;">
          <div style="color:#6f6a63;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">${name}</div>
          <div style="color:#121110;font-size:26px;font-weight:700;margin:8px 0 2px;letter-spacing:-0.5px;">&#8377;${price}</div>
          <div style="color:#6f6a63;font-size:12px;">${note}</div>
        </td></tr>
      </table>
    </td>`;

  const thumb = (file: string, alt: string) => `
    <td width="33.33%" style="padding:0 4px;">
      <img src="${img(file)}" alt="${alt}" width="168" style="width:100%;max-width:168px;height:auto;display:block;border-radius:10px;border:0;" />
    </td>`;

  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:#efeae1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Rent, deposit, what's included and how far it is &mdash; all of it, before you ask.</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#efeae1;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;">

        <tr><td style="padding:0;">
          <img src="${img("hero.jpg")}" width="600" alt="The common area at Infinity Space &mdash; snooker table and lounge seating" style="width:100%;height:auto;display:block;border:0;" />
        </td></tr>

        <tr><td style="padding:30px 30px 0;">
          <div style="color:#c8622f;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Infinity Space &middot; Yeshwanthpur</div>
          <h1 style="margin:12px 0 0;color:#121110;font-size:30px;line-height:1.15;font-weight:700;letter-spacing:-0.8px;">
            Ten minutes' walk<br>from your first class.
          </h1>
          <p style="margin:16px 0 0;color:#2a2724;font-size:16px;line-height:1.6;">
            Hi ${esc(lead.name.split(" ")[0])} &mdash; thanks for getting in touch. Rather than ask you to
            call for details, here is all of it, so you can compare us properly against wherever
            else you're looking.
          </p>
        </td></tr>

        <tr><td style="padding:26px 24px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            ${priceCard("Single sharing", single?.price ?? "", "per month")}
            ${priceCard("Double sharing", double?.price ?? "", "per person / month")}
          </tr></table>
          <p style="margin:14px 6px 0;color:#6f6a63;font-size:13px;line-height:1.6;text-align:center;">
            Electricity, four meals a day, Wi&#8209;Fi, housekeeping and laundry are all in the rent
            &mdash; not billed on top.
          </p>
        </td></tr>

        <tr><td style="padding:24px 30px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1f3d33;border-radius:14px;">
            <tr><td style="padding:20px 22px;">
              <div style="color:#ffffff;font-size:15px;font-weight:700;margin-bottom:6px;">The deposit isn't money you lose</div>
              <div style="color:rgba(247,244,239,0.78);font-size:14px;line-height:1.6;">
                Two months' rent, adjusted against your April and May rent &mdash; so it comes back
                as two rent&#8209;free months at the end of the year.
              </div>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:28px 30px 0;">
          <div style="color:#121110;font-size:17px;font-weight:700;margin-bottom:14px;">What's in the building</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            ${thumb("gym.jpg", "The gym at Infinity Space")}
            ${thumb("room-double.jpg", "A double sharing room")}
            ${thumb("dining-hall.jpg", "The rooftop dining hall")}
          </tr></table>
          <p style="margin:12px 4px 0;color:#6f6a63;font-size:13px;line-height:1.6;">
            Gym, pool table and table tennis. A rooftop dining hall. Biometric entry, CCTV and
            security staff on site.
          </p>
        </td></tr>

        <tr><td style="padding:28px 30px 0;">
          <div style="color:#121110;font-size:17px;font-weight:700;">Come and see it before you decide</div>
          <p style="margin:8px 0 20px;color:#2a2724;font-size:15px;line-height:1.65;">
            No booking, no deposit, no brokerage &mdash; just come and look at the actual room and
            meet the people who run it. Parents are welcome, and we'd rather you visited than took
            our word for any of this.
          </p>
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center">
            <table role="presentation" cellpadding="0" cellspacing="0"><tr>
              <td style="background:#1f8b4d;border-radius:999px;">
                <a href="${wa}" style="display:inline-block;padding:15px 34px;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;">Message us on WhatsApp</a>
              </td>
            </tr></table>
          </td></tr></table>
          <p style="margin:14px 0 0;color:#6f6a63;font-size:14px;line-height:1.6;text-align:center;">
            or call <a href="tel:${site.contact.phoneHref}" style="color:#121110;text-decoration:none;font-weight:600;">${site.contact.phoneDisplay}</a>
          </p>
        </td></tr>

        <tr><td style="padding:28px 30px 30px;">
          <div style="border-top:1px solid #e4dccf;padding-top:18px;color:#6f6a63;font-size:12px;line-height:1.7;">
            <strong style="color:#121110;">Infinity Space</strong> &mdash; gents PG, Yeshwanthpur<br>
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
