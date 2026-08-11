# Frontend Integration Status

Snapshot as of merging Subin's uploaded project with the admin panel.

## What Subin delivered (audited, not assumed)

| File | Status |
|---|---|
| `src/pages/Home.jsx` | ✅ Fully built (431 lines), matches Figma — **static, not yet calling the API** |
| `src/pages/Gallery.jsx`, `Blog.jsx`, `Contact.jsx`, `Dining.jsx` | ❌ Stub placeholders only |
| `src/pages/Attractions.jsx` | ❌ Stub |
| `src/pages/Tickets.jsx` | ❌ Stub — **no Book Tickets button exists yet** |
| `src/services/*.js` | ⚠️ Written but unused by any page yet — and had real bugs, now fixed (see below) |

## Bugs found and fixed in the service layer

1. `blogService.js` called `/blogs` — wrong endpoint, real one is `/blog/`. Fixed.
2. `galleryService.js`, `contactService.js`, `settingsService.js` — missing
   trailing slashes on all endpoints. Fixed.
3. `.gitignore` didn't exclude `.env` (same gap found in earlier demo
   frontend). Fixed.
4. Added `ticketsService.js` and `pagesService.js` — didn't exist, needed
   once Tickets/Attractions/Dining get built out.
5. `getBlogs`/`getGalleryImages`/`getTicketPricing` now correctly unwrap
   DRF's paginated response shape (`{count, next, previous, results}`)
   instead of assuming a raw array.
6. Added `getHomeData()` to `settingsService.js` — calls the `/home/`
   aggregate endpoint, saves the pages above from making 5+ separate calls.

## What's left for the public site (not built by me — Subin's scope)

Each stub page needs to:
1. Call the relevant service (`getGalleryImages()`, `getBlogs()`,
   `getTicketPricing()`, `sendContactMessage()`, `getPage('attractions')`,
   `getPage('dining')`)
2. Handle loading/error/empty states (see `docs/FRONTEND_STANDARDS.md`
   Section 4 — this is required, not optional)
3. Tickets page specifically needs the Book Tickets button reading
   `settings.booking_redirect_url` — **never hardcode the Wix URL** (see
   `FRONTEND_STANDARDS.md` Section 5)

The now-fixed service layer is ready for this — no backend or service-layer
work is blocking Subin from finishing these pages.

## What's built and tested (admin panel, merged into this project)

Lives in `src/admin/`, fully separate from the public pages:
- Login (`/admin/login`) — real token auth against `/api/v1/auth/token/`
- Dashboard (`/admin`) — live counts from the API
- Full CRUD: Gallery, Blog, Tickets, Content Pages, Testimonials, Features,
  Announcements
- Editable singleton forms: Site Settings, Homepage Hero
- Inline-editable table: Working Hours
- Contact Messages: read/unread toggle, delete

Tested end-to-end against the real backend, including a verified full loop:
edit a gallery item via the admin's token-authenticated API call → confirm
the public-facing (fixed) `galleryService.js` reads the change correctly.

Scoped under a `.murjan-admin` CSS namespace so it cannot visually clash
with the public site's Tailwind styling, even though both live in the same
React app and bundle.

## Architecture decision made here

Per review, the admin panel was **merged into the same React app as the
public site** rather than kept as a separate project — shared service
layer, one deploy target, one `npm install`. Route structure:
- `/`, `/attractions`, `/dining`, `/gallery`, `/blog`, `/contact`, `/tickets`
  → public, wrapped in `Navbar`/`Footer`
- `/admin/*` → admin panel, wrapped in its own `AdminLayout`, protected by
  `ProtectedRoute`, completely separate from the public layout

## Immediate next steps

1. Send this status back to Subin — he needs to build out the 6 stub pages
   using the now-fixed service layer
2. You (or Subin) wire each stub page following the pattern already proven
   in the admin panel's data-fetching pages (loading/error states, calling
   the aggregate `/home/` endpoint where reasonable)
3. Once public pages are wired, re-run the full pre-launch checklist in
   `docs/WORKFLOW.md` Section 6
