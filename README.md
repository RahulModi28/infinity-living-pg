# Infinity Space

Marketing site for **Infinity Space** — a PG / student accommodation in
Yeshwanthpur, Bengaluru, near Christ University Yeshwanthpur Campus.

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP +
ScrollTrigger · Lenis · Lucide.

```bash
npm install
npm run dev     # http://localhost:3210
npm run build
```

> Stop the dev server before running `npm run build` — both write to `.next`.

---

## ⚠️ Before this goes live

**No business information has been invented.** Everything unverified is a
`[BRACKETED PLACEHOLDER]`. Find them all with:

```bash
grep -rn "\[[A-Z]" src/lib/site.ts src/app
```

Almost all of them live in one file: **`src/lib/site.ts`**. Fill that in and
most of the site is done.

| Must replace | Where |
|---|---|
| WhatsApp number, phone, email | `site.contact` |
| Street address, pincode, lat/lng | `site.address` |
| Google Maps **embed** URL + **directions** URL | `site.address.mapsEmbedUrl` / `mapsDirectionsUrl` |
| Rent per room type + live availability | `rooms[]` |
| Distances / travel times | `nearby[]` — **measure on Google Maps, do not estimate** |
| Amenities | `amenityGroups` — **delete anything not actually provided** |
| Reviews | `reviews[]`, then set `site.reviewsAreReal = true` to hide the placeholder banner |
| FAQ answers (rent, deposit, curfew, visitors, minimum stay) | `faqs[]` |
| Social links | `site.social` |
| Domain | `site.url` (drives canonical, sitemap, OG tags, schema) |
| Photography | `public/images/*.svg` → replace with real `.webp`/`.jpg`, update `src` paths |
| Privacy / Terms copy | `src/app/privacy`, `src/app/terms` |
| Audience page copy + FAQs | `src/lib/audiences.ts` |

**`site.foodAvailable = false`** removes the entire food section if meals
aren't provided.

**Conversion tracking is off until you set env vars.** Copy `.env.example`
to `.env.local` and fill in `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_META_PIXEL_ID`.
Nothing loads while they're unset, so no consent banner is needed yet. Every
contact route is tagged `data-cta="call|whatsapp|enquire"` and tracked
automatically — see `src/components/Analytics.tsx`.

### Storing form enquiries

Submissions POST to `/api/enquiry`, which forwards them to
`ENQUIRY_WEBHOOK_URL` — a Google Apps Script web app bound to a spreadsheet.
A sheet rather than a database on purpose: these get read on a phone, sorted
and counted, and a database would need an admin panel built purely to read it.

**Setup, about ten minutes:**

1. Create a Google Sheet. First row headers:
   `Timestamp | Name | Phone | Email | Room type | Move-in | Message`
2. **Extensions → Apps Script**, replace the contents with:

   ```js
   function doPost(e) {
     const d = JSON.parse(e.postData.contents);
     SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().appendRow([
       new Date(d.at), d.name, "'" + d.phone, d.email,
       d.roomType, d.moveIn, d.message,
     ]);
     return ContentService
       .createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

   The apostrophe before `d.phone` keeps Sheets from mangling the number into
   scientific notation or stripping a leading digit.

3. **Deploy → New deployment → Web app.** Execute as *Me*, access
   *Anyone*. Copy the `/exec` URL.
4. Set it as `ENQUIRY_WEBHOOK_URL` in Vercel (Settings → Environment
   Variables) and in `.env.local` for local testing. No `NEXT_PUBLIC`
   prefix — this URL must not reach the browser.

**Failure behaviour is deliberate.** If the variable is missing in
production, or the sheet is unreachable, the endpoint returns an error rather
than success. The form then shows its "something went wrong — WhatsApp us
instead" state. Showing a success animation to someone whose enquiry went
nowhere is worse than showing an error, because they stop waiting for a reply
that is never coming. The full lead is also written to the platform logs on
failure, so it is recoverable.

**Notification is a separate problem.** A sheet stores; it does not tell
anyone. Until something emails or messages you on submit, someone has to
remember to open the sheet. Resend's free tier covers this in about fifteen
lines if you want it.

---

## Architecture

```
src/
  app/
    layout.tsx          metadata, fonts, JSON-LD injection
    page.tsx            section order = the conversion funnel
    api/enquiry/        lead endpoint (needs a destination)
    sitemap.ts robots.ts
  lib/
    site.ts             ← single source of truth for all content
    seo.ts              LodgingBusiness + FAQPage + Breadcrumb JSON-LD
    motion.ts           GSAP registration + shared motion vocabulary
  components/
    ui/                 Button, Magnetic, Reveal, SplitText, Figure, SectionHead
    <Section>.tsx       one file per page section
  lib/
    audiences.ts        copy for the two landing pages
    useDialog.ts        shared scroll-lock + focus-trap for every overlay
```

### Pages

| Route | Targets |
|---|---|
| `/` | `pg near christ university yeshwanthpur` |
| `/gents-pg-yeshwanthpur` | `yeshwanthpur pg for gents`, `boys pg near christ university yeshwanthpur campus` |

There is deliberately no ladies page. "ladies pg yeshwanthpur" is the heavier
cluster of the two and no competitor covers it well — but the property is
gents-only, so ranking for it would earn enquiries it can't serve. The site
says so plainly on the homepage and in the FAQ rather than letting someone
find out after a visit.

### The motion system

Motion is deliberately centralised so it reads as one hand:

- **`MOTION`** in `lib/motion.ts` holds the only duration / easing / distance
  values. Sections don't invent their own.
- **`<Reveal>`** is the single scroll-reveal primitive.
- **`<SplitText>`** does masked word reveals without the paid GSAP SplitText
  plugin. Words stay real text separated by real spaces — no `aria-hidden`
  duplicate, so headings aren't doubled for crawlers.
- **`<Figure>`** handles every image: clip-path wipe, slow scale-down,
  optional parallax. Transform + clip-path only — never layout properties.
- **`<SmoothScroll>`** runs Lenis off GSAP's ticker so ScrollTrigger never
  desyncs. Native wheel/touch semantics are preserved — no scroll hijacking.
- **`prefers-reduced-motion`** is honoured at three levels: Lenis is skipped,
  every GSAP effect early-returns to its final state, and a CSS block forces
  `[data-anim]` visible as a backstop.

### The signature interaction

`SignatureReveal.tsx` — a pinned, scrub-driven sequence where a small centred
room image expands to full-bleed while the ground shifts dark → ivory and four
words settle around it. Uses `gsap.matchMedia()` so the scroll distance is
shorter on mobile (140% vs 220%), and degrades to a static composition under
reduced motion.

---

## SEO

Keyword targeting is grounded in **live Google Autocomplete data**, not
guesses. See `infinity-living-target-keywords.csv` and
`infinity-living-competitor-seo-benchmark.csv` in `~/Downloads`.

What the data changed:

1. **Spelling.** Google normalises everything to **"yeshwanthpur"** —
   "yeshwantpur", "yashwantpur" and "yeswanthpur" all redirect there. Two
   ranking competitors use the wrong spelling in their URL and title. Every
   tag on this site uses `yeshwanthpur`.
2. **"PG", not "student accommodation."** The local search language is "PG".
   `student accommodation` appears only as a secondary term.
3. **"Gents PG".** Very high autocomplete density, and no ranking competitor
   gives that audience a proper section. That's why `Audience.tsx` exists —
   a real content section that also owns those keywords.
4. **Landmark proximity is untapped.** `pg near yeshwanthpur metro station`,
   `...railway station`, `...tcs office`, `pg near ikea nagasandra` all return
   suggestions and nobody targets them. They're in the Location section list.
5. **Nobody has structured data.** Zero of the four competitors that could be
   scraped ship any JSON-LD. This site ships `LodgingBusiness`, `FAQPage` and
   `BreadcrumbList`.

Phrases with **no evidence of demand** (0 autocomplete results) — deliberately
not built into the page: `pg for students yeshwanthpur`, `furnished pg
yeshwanthpur`, `ac pg yeshwanthpur`, `double sharing pg yeshwanthpur`, `pg
near christ university yeshwanthpur price`.

Prices are omitted from the JSON-LD `Offer` while they're placeholders —
publishing a fabricated price in schema is worse than publishing none.

### Off-page (not code)

The single highest-leverage action is a **Google Business Profile** with the
primary category *Paying Guest Accommodation*, real photos, and the exact
NAP used in `site.address`. Local pack rankings for "pg near christ
university yeshwanthpur" are driven far more by GBP + reviews than by
on-page work.

---

## Accessibility

Semantic sections, one `<h1>`, ordered `h2`/`h3`, keyboard-navigable
accordion and modals with focus trapping and Escape, visible focus rings,
`aria-label` on every icon-only control, alt text on every image, and full
reduced-motion support.

Every overlay (mobile menu, room modal, gallery lightbox) shares
`useDialog` — scroll lock, focus moved in, Tab trapped, Escape to close,
focus returned to the trigger. Verified in-browser end to end.
