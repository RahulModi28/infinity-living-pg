import type { Metadata } from "next";
import { site, rooms, depositFor, DEPOSIT_MONTHS } from "@/lib/site";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use & Stay",
  description:
    "Terms for using the Infinity Space website and the main terms of a stay: rent, deposit, minimum stay, meals and house rules.",
  alternates: { canonical: "/terms" },
};

/**
 * Two things on one page: terms for using the website, and a plain summary
 * of the stay terms already published elsewhere on the site (rent, deposit,
 * lock-in, curfew, visitors). Rent and deposit are rendered from site.ts, so
 * this page can't quote a stale number.
 *
 * Deliberately NOT stated here, because none of it has been confirmed: a
 * notice period, a cancellation or refund policy before move-in, and damage
 * deductions. Section 3 defers all of those to the written agreement signed
 * at booking — add them here once they are decided.
 */
const UPDATED = "2026-09-26";

const ul = "list-disc space-y-2 pl-5 marker:text-clay";
const a = "font-medium underline underline-offset-2";

export default function Terms() {
  const [single, double] = rooms;
  return (
    <LegalPage
      title="Terms of Use & Stay"
      updated={UPDATED}
      intro={
        <>
          <p>
            These terms cover two things: using this website (infinityspace4u.com), and the main
            terms of a stay at {site.name}, a gents PG at {site.address.street},{" "}
            {site.address.locality}, {site.address.city} {site.address.postalCode}. By using the site
            you agree to the website terms.
          </p>
          <p>
            The stay terms are a summary so that nothing comes as a surprise. Your stay itself is
            governed by the written agreement you sign at booking. If that agreement and this page
            ever differ, the agreement applies.
          </p>
        </>
      }
      sections={[
        {
          h2: "Information on this website",
          body: (
            <>
              <p>
                We keep rent, availability, amenities and photographs accurate and up to date, but
                they are indicative. Room availability in particular changes week to week. Nothing on
                this website is an offer of a room or forms a tenancy or licence agreement. A room is
                only reserved once we have confirmed it with you in writing.
              </p>
              <p>
                Distances and walking times are approximate and measured by road. Photographs are of
                the property but may not show the exact room you are offered.
              </p>
            </>
          ),
        },
        {
          h2: "Rent and what it includes",
          body: (
            <>
              <ul className={ul}>
                <li>
                  {single.name}: ₹{single.price} {single.priceNote}.
                </li>
                <li>
                  {double.name}: ₹{double.price} {double.priceNote}.
                </li>
              </ul>
              <p>
                Rent includes the furnished room, electricity, meals, Wi-Fi, housekeeping and laundry.
                Meals are four a day Monday to Friday, and breakfast and lunch on Saturday.
              </p>
            </>
          ),
        },
        {
          h2: "Deposit, minimum stay and leaving",
          body: (
            <>
              <ul className={ul}>
                <li>
                  The security deposit is {DEPOSIT_MONTHS} months&rsquo; rent (₹{depositFor(single)}{" "}
                  for single sharing, ₹{depositFor(double)} for double), paid on move-in.
                </li>
                <li>
                  The deposit is adjusted against your rent for April and May, so no rent is payable
                  for those two months.
                </li>
                <li>The minimum stay is 12 months.</li>
                <li>
                  The notice period, what happens if you leave before 12 months, and any cancellation
                  before move-in are set out in your written agreement. We give you these in writing
                  before you pay anything.
                </li>
              </ul>
            </>
          ),
        },
        {
          h2: "House rules",
          body: (
            <>
              <ul className={ul}>
                <li>{site.name} is a gents-only PG.</li>
                <li>Guests are allowed, but male visitors only.</li>
                <li>
                  The curfew is 11 pm. Later returns are possible with a parent&rsquo;s permission.
                </li>
                <li>
                  Respect other residents, the staff and the property. Rooms and common areas should
                  be left as you would expect to find them.
                </li>
              </ul>
              <p>
                Your written agreement may set out further rules, and it says what happens if they
                are broken.
              </p>
            </>
          ),
        },
        {
          h2: "Using this website",
          body: (
            <>
              <p>When you use this site or its enquiry form, please don&rsquo;t:</p>
              <ul className={ul}>
                <li>submit someone else&rsquo;s details without their permission, or false information;</li>
                <li>send spam, automated submissions or anything unlawful or abusive;</li>
                <li>try to disrupt the site, access parts of it that aren&rsquo;t public, or scrape it in bulk.</li>
              </ul>
              <p>
                The text, photographs and design of this site belong to {site.name}. You may share
                links to it, but please don&rsquo;t reuse the photographs or content, for example on a
                listing site, without our permission.
              </p>
            </>
          ),
        },
        {
          h2: "Links and third-party services",
          body: (
            <p>
              The site links to and embeds services we don&rsquo;t control, such as WhatsApp, Google
              Maps and Instagram, and may show adverts served by Google. We aren&rsquo;t responsible
              for their content or how they handle your data. Their own terms and privacy policies
              apply. How we handle your data is covered in our{" "}
              <a className={a} href="/privacy">
                privacy policy
              </a>
              .
            </p>
          ),
        },
        {
          h2: "Liability",
          body: (
            <p>
              We provide this website as it is and can&rsquo;t promise it will always be available or
              error-free. To the extent the law allows, we aren&rsquo;t liable for any loss that comes
              from relying on the website alone, without confirming details with us. Nothing in these
              terms limits any rights you have under Indian consumer law.
            </p>
          ),
        },
        {
          h2: "Governing law",
          body: (
            <p>
              These terms are governed by the laws of India. Any dispute that can&rsquo;t be resolved
              by talking to us first will be subject to the courts in Bengaluru, Karnataka.
            </p>
          ),
        },
        {
          h2: "Changes and contact",
          body: (
            <p>
              We may update these terms. The date at the top shows when they last changed. Questions?
              Email{" "}
              <a className={a} href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>{" "}
              or call{" "}
              <a className={a} href={`tel:${site.contact.phoneHref}`}>
                {site.contact.phoneDisplay}
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
