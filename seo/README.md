# SEO & AI Overview action plan

Follow-up to the Semrush audit of 27 Sep 2026 (0 ranking keywords, Site Audit
94/100, 43 referring domains, Authority Score 2). The on-site fixes are in
the code. The steps below happen outside the repo and need someone with the
right account access.

## 1. Disavow the spam backlinks (do this first)

`disavow.txt` lists 41 of the 43 referring domains. They're PBN directories,
fake "Fiverr SEO" testimonial sites and casino/pharma spam. Upload the file in
Google Search Console under **Disavow links**. If an agency or Fiverr gig
bought these links, stop it.

## 2. Validate the structured data after the deploy

Semrush flagged 6 pages with structured-data errors. All 6 came from one
cause: the site-wide LodgingBusiness schema used `nearbyAttraction`, which
isn't a schema.org property. That's fixed. After deploying:

- Run the homepage, `/gents-pg-yeshwanthpur`, `/faq` and a blog post through
  https://validator.schema.org and https://search.google.com/test/rich-results
- Re-run Semrush Site Audit (project 31374187). The "structured data markup
  errors" count should drop to 0.
- In Search Console, request indexing for `/`, `/gents-pg-yeshwanthpur` and the
  two new posts, then run `npm run indexnow`.

## 3. Build entity signals from zero

Use exactly the same name, address and phone (NAP) as the site and the schema:

> Infinity Space · No. 435, Anaga Building, Andrahalli Main Road, Gopal Nagar,
> HMT Layout, Bengaluru, Karnataka 560073 · +91 99595 60047

- [ ] Google Business Profile: verify it. Category "Paying guest house" or
      "Hostel", add the website, photos and rent, and ask real residents for
      reviews. Reviews there are what give the business stars in Google
      search and Maps.
- [ ] Justdial listing
- [ ] Student-housing marketplaces that already rank for "PG near Christ
      University Yeshwanthpur": myroomie.in, podhostels.in, rentorio.in,
      easemyliving.com, payingguestinbengaluru.com
- [ ] Answer the existing Quora threads for this query honestly, and say
      you're the owner.
- [ ] A short walk-through video on YouTube (campus → PG route, room tour).
      YouTube already ranks for "best pg near christ university yeshwantpur".
      Link it from the gallery and add it to `sameAs` in `src/lib/seo.ts`.

### From the On Page SEO Checker's backlink suggestions

Semrush suggested links from domains like yahoo.com, maps.me, lnk.bio and
rocketreach.co. Most of those sites can't be asked for a link. Below is what
each one means for a PG, and the way to get there honestly:

- [ ] **Bing Places for Business** (bingplaces.com). Yahoo search runs on
      Bing, so this is how to show up on yahoo.com. You can import it
      straight from your Google Business Profile. It also feeds Bing's local
      results and ChatGPT/Copilot answers.
- [ ] **OpenStreetMap** (openstreetmap.org). maps.me and many other map apps
      use OSM data. Add the building as a "guest_house" or "hostel" with the
      name, address, phone and website. It's free, and the edit shows up
      within days.
- [ ] **lnk.bio** (or Linktree). A free link-in-bio page for the Instagram
      profile, linking to the website, WhatsApp and Google Maps.
- [ ] **Apple Business Connect** (businessconnect.apple.com). Gets the PG
      onto Apple Maps, which iPhone users open by default.
- [ ] **Local directories:** Justdial, Sulekha, and the student-housing
      sites listed above. addresspage.com and rocketreach.co are generic
      business directories and are low priority.

Skip anything sold as "backlinks" or "DA boost". That's how the spam links
in `disavow.txt` got there.

### Reviews

Collect real reviews from current residents, with their permission:

- [ ] Ask each resident to leave a Google review (share the "Ask for
      reviews" link from Google Business Profile).
- [ ] Send the ones they're happy to have on the website, with first name,
      course or job, a 1–5 rating, and their words, to add to `reviews` in
      `src/lib/site.ts`. They appear in the homepage reviews section. They
      are not marked up as rating schema, because Google ignores reviews a
      business hosts about itself ("self-serving"). Never add invented reviews:
      it breaks Google's rules and consumer-protection law.

## 4. Track progress

Add these keywords to the Semrush Position Tracking project. It's already set
up but has no keywords yet.

- pg near christ university
- pg near christ university yeshwanthpur
- pg near christ university yeshwantpur
- best pg near christ university
- single sharing pg bangalore
- gents pg yeshwanthpur
- boys pg near christ university yeshwanthpur campus
- pg near nagasandra metro

Re-run Site Audit monthly.

## 5. Keep key pages fresh (quarterly)

Pages under about 90 days old get cited in AI answers more often. Each
quarter, check rent and availability in `src/lib/site.ts`. Refresh room
photos when anything changes. Set `updated:` on any blog post you revise.
