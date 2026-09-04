/**
 * Infinity Space — lead intake.
 *
 * Deployed as a Web App and called by /api/enquiry on the site. It does three
 * things, in this order and for this reason:
 *
 *   1. writes the row      — the lead must survive even if everything else fails
 *   2. emails the enquirer — the reply that wins the comparison
 *   3. emails the owner    — a sheet stores, but it tells nobody
 *
 * Steps 2 and 3 are wrapped so a mail failure can never lose step 1. If the
 * daily send quota is exhausted the row is still written and the response is
 * still ok; the site would otherwise show the enquirer an error for something
 * that actually worked.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * CONFIG BELOW IS A COPY of src/lib/site.ts. Apps Script cannot import from
 * the repo, so these two have to be kept in step by hand. If you change rent,
 * the phone number or the address on the site, change it here too.
 * ─────────────────────────────────────────────────────────────────────────
 */
const CFG = {
  url: 'https://www.infinityspace4u.com',
  instagram: 'https://www.instagram.com/infinityspace4u/',
  phoneDisplay: '+91 99595 60047',
  phoneHref: '+919959560047',
  whatsappNumber: '919959560047',

  // Where the "new lead" alert goes. Change to whichever inbox is actually watched.
  notify: 'contact@infinityspace4u.com',

  // Shown as the sender name. The address itself is the Google account that
  // owns this script and cannot be set here — see README.
  fromName: 'Infinity Space',

  street: 'No. 435, Anaga Building, Andrahalli Main Road, Gopal Nagar',
  locality: 'HMT Layout',
  city: 'Bengaluru',
  postalCode: '560073',

  priceSingle: '20,000',
  priceDouble: '16,000',

  cloudinary: 'https://res.cloudinary.com/ny4waxgb/image/upload',
};

/* ──────────────────────────────── entry ──────────────────────────────── */

function doPost(e) {
  var d;
  try {
    d = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: 'bad payload' });
  }

  var isWhatsApp = d.source === 'whatsapp';
  var name = isWhatsApp ? 'WhatsApp Contacts' : 'Enquiries';

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name) || ss.insertSheet(name);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(isWhatsApp
      ? ['Timestamp', 'Name', 'Phone']
      : ['Timestamp', 'Name', 'Phone', 'Email', 'Room type', 'Move-in', 'Message']);
    sheet.setFrozenRows(1);
  }

  // The apostrophe forces Sheets to treat the number as text — without it
  // a 10-digit mobile becomes scientific notation or loses a leading digit.
  sheet.appendRow(isWhatsApp
    ? [new Date(d.at), d.name, "'" + d.phone]
    : [new Date(d.at), d.name, "'" + d.phone, d.email, d.roomType, d.moveIn, d.message]);

  // Never let mail failure fail the request — the row is already safe.
  try {
    notify(d);
  } catch (err) {
    console.error('mail failed for ' + d.name + ': ' + err);
  }

  return json({ ok: true });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function notify(d) {
  // One send costs one unit of a 100/day consumer quota (1500 on Workspace).
  // Two sends per lead, so stop short rather than half-send.
  if (MailApp.getRemainingDailyQuota() < 2) {
    console.error('mail quota exhausted — no email sent for ' + d.name);
    return;
  }

  MailApp.sendEmail({
    to: CFG.notify,
    subject: (d.source === 'whatsapp' ? 'WhatsApp' : 'Enquiry') + ': ' + d.name + ' · ' + d.phone,
    htmlBody: ownerNotifyHtml(d),
    name: CFG.fromName,
    replyTo: d.email || undefined,
  });

  // The gate only captures a name and number, and the form's email field is
  // optional — so the auto-reply only goes out when there is somewhere to
  // send it.
  if (d.email) {
    MailApp.sendEmail({
      to: d.email,
      subject: "10 minutes from campus. Here's everything.",
      htmlBody: leadReplyHtml(d),
      name: CFG.fromName,
    });
  }
}

/* ─────────────────────────────── helpers ─────────────────────────────── */

function esc(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function first(name) {
  return esc(String(name || '').split(' ')[0]);
}

/**
 * Images come from Cloudinary, not the site's own /images, so the email does
 * not depend on a deploy being live, and so every file arrives resized and
 * re-encoded for the width it is actually displayed at. Email clients ignore
 * srcset, so each is requested above its CSS width and no larger (c_limit
 * never upscales). f_auto negotiates WebP where the client supports it.
 */
function img(f, w) {
  return CFG.cloudinary + '/f_auto,q_auto,w_' + w + ',c_limit/infinity-space/email/'
    + f.replace(/\.\w+$/, '');
}

function whatsappHref(msg) {
  return 'https://wa.me/' + CFG.whatsappNumber + '?text=' + encodeURIComponent(msg);
}

/* ─────────────────────────── to the enquirer ─────────────────────────── */

function leadReplyHtml(lead) {
  var wa = whatsappHref('Hi, I just enquired on the website. My name is ' + lead.name + '.');
  var F = "'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

  /** Outlook ignores border-radius and padding on links, so the button is
   *  drawn as VML there and as a styled span everywhere else. */
  function button(href, label, bg, w) {
    return `
    <table class="button_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
      <tr><td align="center" style="padding:6px 10px;">
        <a href="${href}" target="_blank" style="color:#ffffff;text-decoration:none;"><!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:48px;width:${w}px;v-text-anchor:middle;" arcsize="50%" fillcolor="${bg}">
<v:stroke dashstyle="Solid" weight="0px" color="${bg}"/><w:anchorlock/><v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:sans-serif;font-size:16px"><![endif]--><span style="background-color:${bg};border-radius:999px;color:#ffffff;display:inline-block;font-family:${F};font-size:16px;font-weight:700;text-align:center;width:auto;word-break:keep-all;"><span style="display:block;padding:15px 32px;line-height:120%;">${label}</span></span><!--[if mso]></center></v:textbox></v:roundrect><![endif]--></a>
      </td></tr>
    </table>`;
  }

  function spacer(h) {
    return `<div class="spacer_block" style="height:${h}px;line-height:${h}px;font-size:1px;">&#8202;</div>`;
  }

  /** One 600px band. Everything is a row so Outlook keeps the rhythm. */
  function row(inner, bg) {
    bg = bg || '#ffffff';
    return `
    <table class="row" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
      <tr><td>
        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:${bg};color:#121110;width:600px;margin:0 auto;" width="600">
          <tbody>${inner}</tbody>
        </table>
      </td></tr>
    </table>`;
  }

  function priceCol(name, price, note) {
    return `
    <td class="column" width="50%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;vertical-align:top;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tr><td style="padding:0 6px;">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f7f4ef;border:1px solid #e4dccf;border-radius:14px;">
            <tr><td align="center" style="padding:20px 14px;">
              <div style="color:#6f6a63;font-family:${F};font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">${name}</div>
              <div style="color:#121110;font-family:${F};font-size:28px;font-weight:700;letter-spacing:-0.6px;padding:8px 0 3px;">&#8377;${price}</div>
              <div style="color:#6f6a63;font-family:${F};font-size:12px;">${note}</div>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td>`;
  }

  function thumb(file, alt, label) {
    return `
    <td width="33.33%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;vertical-align:top;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tr><td style="padding:0 4px;">
          <img src="${img(file, 352)}" alt="${alt}" width="176" style="display:block;width:100%;max-width:176px;height:auto;border:0;border-radius:10px;" />
          <div style="color:#6f6a63;font-family:${F};font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;padding:8px 0 0;text-align:center;">${label}</div>
        </td></tr>
      </table>
    </td>`;
  }

  return `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<title>Infinity Space</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="light">
<!--[if mso]><xml><w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word"><w:DontUseAdvancedTypographyReadingMail/></w:WordDocument>
<o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Inter:400,600,700" rel="stylesheet" type="text/css"><!--<![endif]-->
<style>
* { box-sizing: border-box; }
body { margin:0; padding:0; }
a[x-apple-data-detectors] { color:inherit !important; text-decoration:inherit !important; }
#MessageViewBody a { color:inherit; text-decoration:none; }
p { line-height:inherit; }
.image_block img+div { display:none; }
@media (max-width:620px) {
  .row-content { width:100% !important; }
  .stack .column { width:100%; display:block; }
  .mobile_hide { display:none !important; max-height:0; overflow:hidden; }
  .m-pad { padding-left:20px !important; padding-right:20px !important; }
  .m-h1 { font-size:30px !important; }
}
</style>
</head>
<body style="margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none;background-color:#efeae1;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Rent, deposit, what's included and how far it is &mdash; all of it, before you ask.</div>

<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#efeae1;">
<tbody><tr><td>

${row(`<tr><td class="column" width="100%" style="vertical-align:top;">${spacer(24)}</td></tr>`, '#efeae1')}

${row(`<tr><td class="column" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;vertical-align:top;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
    <tr><td align="center" style="padding:28px 20px 24px;">
      <a href="${CFG.url}" target="_blank" style="text-decoration:none;">
        <img src="${img('logo-email.png', 300)}" width="150" alt="Infinity Space" style="display:block;width:150px;max-width:150px;height:auto;border:0;margin:0 auto;" />
      </a>
    </td></tr>
    <tr><td style="padding:0;">
      <img src="${img('hero.jpg', 900)}" width="600" alt="The common area at Infinity Space &mdash; snooker table and lounge seating" style="display:block;width:100%;height:auto;border:0;" />
    </td></tr>
    <tr><td class="m-pad" style="padding:32px 36px 0;">
      <div style="color:#c8622f;font-family:${F};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">Gents PG &middot; Yeshwanthpur, Bengaluru</div>
      <div class="m-h1" style="color:#121110;font-family:${F};font-size:36px;font-weight:700;line-height:1.12;letter-spacing:-1px;padding:14px 0 0;">Ten minutes' walk<br>from your first class.</div>
      <div style="color:#2a2724;font-family:${F};font-size:16px;line-height:1.6;padding:16px 0 0;">
        Hi ${first(lead.name)} &mdash; thanks for getting in touch. Rather than ask you to call for
        details, here is all of it, so you can compare us properly against wherever else you're looking.
      </div>
    </td></tr>
  </table>
</td></tr>`)}

${row(`<tr><td class="column" width="100%" style="vertical-align:top;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
    <tr><td class="m-pad" style="padding:26px 30px 0;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tr>${priceCol('Single sharing', CFG.priceSingle, 'per month')}${priceCol('Double sharing', CFG.priceDouble, 'per person / month')}</tr>
      </table>
      <div style="color:#6f6a63;font-family:${F};font-size:13px;line-height:1.6;padding:14px 6px 0;text-align:center;">
        Electricity, meals, Wi&#8209;Fi, housekeeping and laundry are all in the rent &mdash; not billed on top.
      </div>
    </td></tr>
  </table>
</td></tr>`)}

${row(`<tr><td class="column" width="100%" style="vertical-align:top;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
    <tr><td class="m-pad" style="padding:24px 36px 0;">
      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#1f3d33;border-radius:14px;">
        <tr><td style="padding:22px 24px;">
          <div style="color:#ffffff;font-family:${F};font-size:16px;font-weight:700;">The deposit isn't money you lose</div>
          <div style="color:#cfd9d4;font-family:${F};font-size:14px;line-height:1.6;padding:7px 0 0;">
            Two months' rent, adjusted against your April and May rent &mdash; so it comes back as
            two rent&#8209;free months at the end of the year.
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</td></tr>`)}

${row(`<tr><td class="column" width="100%" style="vertical-align:top;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
    <tr><td class="m-pad" style="padding:30px 32px 0;">
      <div style="color:#121110;font-family:${F};font-size:18px;font-weight:700;padding:0 4px 14px;">What's in the building</div>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
        <tr>${thumb('gym.jpg', 'The gym at Infinity Space', 'Gym')}${thumb('room-double.jpg', 'A double sharing room', 'Rooms')}${thumb('dining-hall.jpg', 'The rooftop dining hall', 'Rooftop')}</tr>
      </table>
      <div style="color:#6f6a63;font-family:${F};font-size:13px;line-height:1.6;padding:14px 4px 0;">
        Pool table and table tennis too. Biometric entry, CCTV and security staff on site.
      </div>
    </td></tr>
  </table>
</td></tr>`)}

${row(`<tr><td class="column" width="100%" style="vertical-align:top;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
    <tr><td class="m-pad" style="padding:32px 36px 0;">
      <div style="color:#121110;font-family:${F};font-size:18px;font-weight:700;">Come and see it before you decide</div>
      <div style="color:#2a2724;font-family:${F};font-size:15px;line-height:1.65;padding:8px 0 4px;">
        No booking, no deposit, no brokerage &mdash; just come and look at the actual room and meet
        the people who run it. Parents are welcome, and we'd rather you visited than took our word
        for any of this.
      </div>
    </td></tr></table>
  ${button(wa, 'Message us on WhatsApp', '#1f8b4d', 250)}
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
    <tr><td align="center" style="padding:4px 20px 0;">
      <div style="color:#6f6a63;font-family:${F};font-size:14px;">or call <a href="tel:${CFG.phoneHref}" style="color:#121110;text-decoration:none;font-weight:700;">${CFG.phoneDisplay}</a></div>
    </td></tr>
  </table>
  ${spacer(28)}
</td></tr>`)}

${row(`<tr><td class="column" width="100%" style="vertical-align:top;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;">
    <tr><td class="m-pad" align="center" style="padding:24px 36px 30px;">
      <div style="color:#121110;font-family:${F};font-size:15px;font-weight:700;">Infinity Space</div>
      <div style="color:#6f6a63;font-family:${F};font-size:12px;line-height:1.7;padding:6px 0 0;">
        Gents PG &middot; ${CFG.street}<br>${CFG.locality}, ${CFG.city} ${CFG.postalCode}<br>
        <a href="${CFG.url}" style="color:#c8622f;text-decoration:none;">${CFG.url.replace('https://', '')}</a>
        &nbsp;&middot;&nbsp;
        <a href="${CFG.instagram}" style="color:#c8622f;text-decoration:none;">Instagram</a>
      </div>
    </td></tr>
  </table>
</td></tr>`, '#f7f4ef')}

${row(`<tr><td class="column" width="100%" style="vertical-align:top;">${spacer(24)}</td></tr>`, '#efeae1')}

</td></tr></tbody></table>
</body></html>`;
}

/* ───────────────────────────── to the owner ───────────────────────────── */

function ownerNotifyHtml(lead) {
  function line(l, v) {
    return v
      ? `<tr><td style="padding:6px 14px 6px 0;color:#6f6a63;font-size:14px;">${l}</td><td style="padding:6px 0;color:#121110;font-size:14px;font-weight:600;">${esc(v)}</td></tr>`
      : '';
  }
  return `<!doctype html><html><body style="margin:0;background:#f7f4ef;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;padding:24px;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:520px;background:#fff;border:1px solid #e4dccf;border-radius:14px;padding:22px;">
    <tr><td>
      <div style="color:#c8622f;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">
        ${lead.source === 'whatsapp' ? 'WhatsApp contact' : 'Website enquiry'}
      </div>
      <div style="color:#121110;font-size:20px;font-weight:700;margin:8px 0 16px;">${esc(lead.name)}</div>
      <table role="presentation" cellpadding="0" cellspacing="0">
        ${line('Phone', lead.phone)}
        ${line('Email', lead.email)}
        ${line('Room', lead.roomType)}
        ${line('Move-in', lead.moveIn)}
        ${line('Message', lead.message)}
      </table>
      <div style="margin-top:18px;">
        <a href="https://wa.me/91${lead.phone}" style="display:inline-block;background:#1f8b4d;color:#fff;border-radius:999px;padding:11px 20px;font-size:14px;font-weight:600;text-decoration:none;">WhatsApp ${first(lead.name)}</a>
        <a href="tel:+91${lead.phone}" style="display:inline-block;margin-left:8px;color:#121110;border:1px solid #d8d0c4;border-radius:999px;padding:11px 20px;font-size:14px;font-weight:600;text-decoration:none;">Call</a>
      </div>
    </td></tr>
  </table>
</body></html>`;
}

/* ──────────────────────────────── testing ─────────────────────────────── */

/**
 * Run this once from the editor before deploying. It triggers the Gmail
 * authorisation prompt (which a web app request cannot do on its own — an
 * unauthorised script fails silently at the first sendEmail) and puts both
 * emails in your inbox so you can check them on a real phone.
 *
 * Change the address to your own first.
 */
function sendTestEmails() {
  var lead = {
    name: 'Arjun Mehta',
    phone: '9876543210',
    email: Session.getActiveUser().getEmail(),
    roomType: 'Single Sharing',
    moveIn: 'June 2026',
    message: 'Is the single room still free?',
    at: new Date().toISOString(),
    source: 'form',
  };
  notify(lead);
  console.log('sent to ' + lead.email + ' and ' + CFG.notify
    + ' — quota left: ' + MailApp.getRemainingDailyQuota());
}
