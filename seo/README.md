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
      reviews. Once real reviews exist, add them to `reviews` in
      `src/lib/site.ts` and the schema will emit AggregateRating automatically.
- [ ] Justdial listing
- [ ] Student-housing marketplaces that already rank for "PG near Christ
      University Yeshwanthpur": myroomie.in, podhostels.in, rentorio.in,
      easemyliving.com, payingguestinbengaluru.com
- [ ] Answer the existing Quora threads for this query honestly, and say
      you're the owner.
- [ ] A short walk-through video on YouTube (campus → PG route, room tour).
      YouTube already ranks for "best pg near christ university yeshwantpur".
      Link it from the gallery and add it to `sameAs` in `src/lib/seo.ts`.

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
