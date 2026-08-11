# SEO Migration Notes — From Weebly to New Site

Based on actual Google Search Console data pulled from the client's current
site (`murjansplashpark.weebly.com`), last 28 days at time of review.

## Key Findings

- **593 clicks, 12.2K impressions total** — almost entirely attributed to
  the homepage. This is effectively a single-page site from an SEO
  standpoint; no complex multi-page redirect mapping is needed.
- **Top query: "murjan splash park" (169 clicks, branded search).** This is
  the single biggest asset — branded search recovers quickly after a domain
  change because it's driven by name recognition, not URL/domain authority.
- **Fast-growing queries to protect:**
  - "water park abu dhabi" — up 650%
  - "murjan splash park tickets" — up 350%, clear commercial/booking intent
  - "splash park abu dhabi" — up 59%
  - "khalifa park water park" — up 25%
- **98% of clicks from UAE** — confirms a purely local audience; local SEO
  (Google Business Profile accuracy, local schema) matters more than broad
  international SEO tactics.
- **Domain situation:** current site is on a free Weebly subdomain, not
  their purchased custom domain (`murjansplashpark.com`, bought via Wix,
  currently unused). This means there is no domain-level 301 redirect
  option — Weebly won't set up redirects for a subdomain they control, and
  they're shutting the platform down regardless. Going live on the
  client's own domain is a stronger long-term position than staying on a
  builder subdomain either way.

## What This Changed in the Build

1. **`sitemap.xml` and `robots.txt` are now actually implemented**
   (`apps/core/sitemap_views.py`, wired at `/sitemap.xml` and `/robots.txt`).
   Previously these were only documented as a requirement, not built — worth
   catching before launch given the SEO stakes here. The sitemap
   auto-includes published pages and blog posts with no manual maintenance.
   **Update `BASE_URL` in `sitemap_views.py` to the real production domain
   before deploying — currently set to `https://murjansplashpark.com`.**

2. **Seed data for `PageSEO` (home, tickets, attractions) now uses the
   actual keywords found above** instead of generic placeholder text —
   see `apps/core/management/commands/seed_data.py`. When entering real
   content in the admin panel later, keep these phrases naturally present:
   "Murjan Splash Park," "Abu Dhabi," "water park," "Khalifa Park," and for
   the Tickets page specifically: "tickets," "book."

3. **No redirect-map system was built** — deliberately, since the traffic
   data shows it isn't needed here (single effective page, no domain-level
   redirect capability anyway). If a future project has a multi-page Weebly
   site with page-level rankings, that would need actual redirect logic at
   the Vercel config level — not the case here.

## Still Needed (not code — client/content tasks)

- [ ] Google Business Profile: confirm name/address/phone exactly match
      what will be on the new site
- [ ] Once live, submit `https://murjansplashpark.com/sitemap.xml` to
      Google Search Console and verify the new domain as a property
      (separate from the old Weebly property)
- [ ] Give the Tickets page real content/design priority — it's the
      fastest-growing commercial-intent query and currently likely
      underserved on a single-page Weebly site
- [ ] Monitor Search Console for the new domain for 2-3 months post-launch
      to confirm branded search recovers as expected
