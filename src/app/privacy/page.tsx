import type { Metadata } from "next";
import { site } from "@/lib/site";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Infinity Space collects when you enquire about a room, why, who it is shared with, how long it is kept, and how to have it corrected or deleted.",
  alternates: { canonical: "/privacy" },
};

/**
 * Written against what the site actually does, not a template: the enquiry
 * form and the WhatsApp gate post to /api/enquiry, which forwards to a Google
 * Apps Script that files the lead in a Google Sheet and emails the owner (and
 * the enquirer, if they gave an address). The WhatsApp gate remembers name
 * and number in localStorage. AdSense and the Google Maps embeds load on
 * every visit; GA4 and the Meta pixel only when their env vars are set.
 *
 * If any of that changes — a new form field, a CRM, a different analytics
 * tool — this page has to change with it, and `UPDATED` with it.
 */
const UPDATED = "2026-09-26";

const ul = "list-disc space-y-2 pl-5 marker:text-clay";
const a = "font-medium underline underline-offset-2";

const addr = `${site.address.street}, ${site.address.locality}, ${site.address.city}, ${site.address.state} ${site.address.postalCode}`;

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated={UPDATED}
      intro={
        <>
          <p>
            This policy explains what information {site.name} collects through this website
            (infinityspace4u.com) and when you contact us, what we use it for, who else sees it, and
            the choices you have. {site.name} is a gents PG at {addr}.
          </p>
          <p>
            In short: we collect only what we need to answer your enquiry, we don&rsquo;t sell it or
            pass it to brokers, and you can ask us to delete it at any time.
          </p>
        </>
      }
      sections={[
        {
          h2: "What we collect",
          body: (
            <>
              <p>
                <strong>When you fill in the enquiry form:</strong> your name and phone number
                (required), and optionally your email address, preferred room type, move-in date and
                any message you write.
              </p>
              <p>
                <strong>When you tap a WhatsApp button:</strong> before WhatsApp opens, we ask for
                your name and phone number so we know who to expect. The conversation itself then
                happens on WhatsApp, and we see whatever you send us there.
              </p>
              <p>
                <strong>When you call or email us:</strong> your number or address, and whatever you
                tell us.
              </p>
              <p>
                <strong>Automatically, when you browse:</strong> like almost every website, our
                hosting provider records technical details such as your IP address, browser type and
                the pages requested, to run and secure the site. See section 4 for analytics,
                advertising and maps.
              </p>
              <p>
                We do not ask for identity documents, payment details or anything else sensitive
                through this website. Anything needed for a stay is collected in person when you
                move in, not online.
              </p>
            </>
          ),
        },
        {
          h2: "What we use it for",
          body: (
            <ul className={ul}>
              <li>To reply to your enquiry: confirming availability, sharing rent and photos, and arranging a visit.</li>
              <li>To send you an acknowledgement email if you gave us an email address.</li>
              <li>To follow up about the enquiry you made. We won&rsquo;t add you to marketing lists or send unrelated promotions.</li>
              <li>To understand, in aggregate, which pages are read and which contact options people use, so we can improve the site.</li>
              <li>To keep the site secure and working.</li>
            </ul>
          ),
        },
        {
          h2: "Where it is stored and who can see it",
          body: (
            <>
              <p>
                Enquiries are sent to a private Google Sheet in our Google account and emailed to us.
                Only the people who run {site.name} can see them. We use these service providers to
                operate the site, and each handles data under its own terms:
              </p>
              <ul className={ul}>
                <li><strong>Vercel</strong>: hosts the website.</li>
                <li><strong>Google</strong>: Google Sheets and Gmail (storing and notifying us of enquiries), Google Maps, and Google Analytics and AdSense where enabled.</li>
                <li><strong>WhatsApp (Meta)</strong>: if you choose to message us there.</li>
              </ul>
              <p>
                These providers may store data on servers outside India. We do not sell, rent or trade
                your details, and we don&rsquo;t share them with brokers, listing platforms or other PGs.
                We will disclose information only if the law requires it, for example to the police
                or a court.
              </p>
            </>
          ),
        },
        {
          h2: "Cookies, analytics, advertising and maps",
          body: (
            <>
              <ul className={ul}>
                <li>
                  <strong>Google Analytics</strong> (when enabled) counts visits and records which
                  pages are viewed and which contact buttons are tapped. It uses cookies. We never
                  send it your name, phone number or email address.
                </li>
                <li>
                  <strong>Meta Pixel</strong> (when enabled) records page views and contact-button
                  taps so we can measure Facebook and Instagram adverts. It uses cookies.
                </li>
                <li>
                  <strong>Google AdSense</strong>: this site loads Google&rsquo;s advertising script.
                  Google and its partners may use cookies to show and measure ads, including ads
                  based on your earlier visits to this and other websites. You can turn off
                  personalised ads at{" "}
                  <a className={a} href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
                    adssettings.google.com
                  </a>
                  . See also{" "}
                  <a className={a} href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
                    how Google uses information from sites that use its services
                  </a>
                  .
                </li>
                <li>
                  <strong>Google Maps</strong>: the location map is embedded from Google, which may set
                  its own cookies when the map loads.
                </li>
                <li>
                  <strong>Your browser&rsquo;s own storage</strong>: after you enter your name and
                  number for WhatsApp once, your browser remembers them so you aren&rsquo;t asked
                  again. They stay on your device. Clearing your browser&rsquo;s site data removes
                  them. We also store a flag for the current visit so the loading animation only
                  plays once.
                </li>
              </ul>
              <p>You can block or delete cookies in your browser settings. The site still works without them.</p>
            </>
          ),
        },
        {
          h2: "How long we keep it",
          body: (
            <>
              <p>
                If you enquire but don&rsquo;t move in, we keep your enquiry for up to 12 months
                after our last contact, so we can answer follow-up questions, then delete it.
              </p>
              <p>
                If you become a resident, the details you gave us become part of your tenancy records.
                We keep those for as long as you stay and afterwards for as long as the law requires.
              </p>
              <p>You can ask us to delete an enquiry sooner. See section 6.</p>
            </>
          ),
        },
        {
          h2: "Your rights",
          body: (
            <>
              <p>
                Under India&rsquo;s Digital Personal Data Protection Act, 2023, you can ask us to:
              </p>
              <ul className={ul}>
                <li>tell you what personal data we hold about you and how we have used it;</li>
                <li>correct or update it;</li>
                <li>delete it, and withdraw any consent you gave;</li>
                <li>deal with a complaint about how we have handled it.</li>
              </ul>
              <p>
                Email{" "}
                <a className={a} href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>{" "}
                or call{" "}
                <a className={a} href={`tel:${site.contact.phoneHref}`}>
                  {site.contact.phoneDisplay}
                </a>
                . We&rsquo;ll respond within 7 days. If you aren&rsquo;t satisfied with our response,
                you may complain to the Data Protection Board of India.
              </p>
            </>
          ),
        },
        {
          h2: "Enquiries for someone under 18",
          body: (
            <p>
              Many of our residents are first-year students. If the person who will be staying is
              under 18, we ask that a parent or guardian makes the enquiry or is included in it. We
              don&rsquo;t knowingly collect a minor&rsquo;s details without a parent&rsquo;s
              involvement. If you think we have, contact us and we&rsquo;ll delete them.
            </p>
          ),
        },
        {
          h2: "Security",
          body: (
            <p>
              The site is served only over HTTPS. Enquiries are stored in an account protected by
              its own login, and the address they are sent to is kept on the server, never in the
              browser. No system is perfectly secure. If we ever learn that your data has been
              exposed, we will tell you and the authorities as the law requires.
            </p>
          ),
        },
        {
          h2: "Changes to this policy",
          body: (
            <p>
              If we change how we handle personal data, we&rsquo;ll update this page and the date at
              the top. Significant changes will apply only to information collected after the update.
            </p>
          ),
        },
        {
          h2: "Contact",
          body: (
            <p>
              {site.name}, {addr}.<br />
              Email:{" "}
              <a className={a} href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              <br />
              Phone:{" "}
              <a className={a} href={`tel:${site.contact.phoneHref}`}>
                {site.contact.phoneDisplay}
              </a>
            </p>
          ),
        },
      ]}
    />
  );
}
