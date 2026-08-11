# Murjan Splash Park — Complete Project Overview

Everything about this project in one place: what it is, how it's built, what's
done, what's left, and where to find deeper detail.

---

## 1. Project Summary

**Client:** Murjan Splash Park (Abu Dhabi water park)
**What's being built:** A brand new website (React + Django) replacing the
client's current Wix site, while **keeping Wix's existing booking/ticketing/
payment system exactly as-is** — this project handles content pages and a
custom admin panel only.
**Team:** Hameema (backend developer + coordinator), Subin (frontend
developer, junior), a separate final-UI team building against Figma.

---

## 2. Why This Architecture

The client's Wix booking system already works and generates revenue —
rebuilding it would cost significant time/budget for little business value.
So the project is split into two decoupled halves:

```
                     Visitor
                        │
                        ▼
         www.murjansplashpark.com
        (React + Django — this project)
                        │
       ┌────────────────┴────────────────┐
       ▼                                  ▼
  Content Pages                    "Book Tickets"
  (Home, Attractions,                    │
   Dining, Gallery,                      ▼
   Blog, Contact,               book.murjansplashpark.com
   Tickets Info)                (Existing Wix Events —
                                  untouched, unchanged)
                                          │
                                          ▼
                              Wix Checkout → Payment →
                                  Confirmation
```

**The single connection point** between the two systems is one field —
`SiteSettings.booking_redirect_url` — read by one shared button component.
Nothing else links them. This is what makes a future custom booking system
possible later without reworking anything (see Section 11).

---

## 3. Technology Stack

### Backend
| Piece | Technology |
|---|---|
| Framework | Django 6.0 (Python) |
| API layer | Django REST Framework (DRF) |
| Database | PostgreSQL via Neon (production) / SQLite (local dev) |
| API docs | drf-spectacular (Swagger/OpenAPI) |
| Auth | Token authentication (DRF TokenAuth) |
| Media storage | Local disk (dev) / Supabase or S3 via django-storages (production) |
| Config | python-decouple (.env-based) |
| Production server | gunicorn |

### Frontend (demo, to be replaced by final Figma UI)
| Piece | Technology |
|---|---|
| Framework | React 19 |
| Build tool | Vite |
| Routing | react-router-dom |
| HTTP client | axios (single shared instance) |
| Styling | Tailwind CSS |

### Hosting
| Layer | Service |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | Neon |
| Media | Supabase Storage / S3 |
| Booking (existing) | Wix Events |

---

## 4. Backend Structure — 8 Django Apps

| App | Purpose |
|---|---|
| `core` | Base timestamp model (`created_at`/`updated_at`), the `/home/` aggregate endpoint |
| `accounts` | Custom `AdminUser` model (role-based: owner/manager/content_editor) |
| `site_settings` | Site-wide settings, hero section, working hours, special hours, announcement banner, feature highlights ("Why Murjan"), testimonials, per-page SEO |
| `pages` | Generic editable content pages — About, Attractions, Dining, FAQ, Terms, Privacy |
| `gallery` | Photo gallery — title, image, alt text, caption, category, ordering, featured flag |
| `blog` | Blog posts — title, slug, excerpt, content, SEO fields, draft/published status, featured flag |
| `tickets` | **Display-only** ticket pricing — name, age group, price, description |
| `contact` | Contact form submissions — read/unread status, reply tracking |

Every app follows the same internal pattern: **Model → Admin → Serializer →
ViewSet → URL**. Public GET requests need no auth; all writes require
`is_staff=True`.

---

## 5. Key Models (Full Field List)

Documented in full in `docs/DATABASE.md` inside the project zip. Summary of
the notable ones:

- **SiteSettings** — singleton (`pk=1`), holds phone/email/address/socials/footer/booking URL/default SEO
- **HeroSection** — singleton, homepage headline/subheadline/background/CTA
- **GalleryImage** — `category` choices (water_slides, lazy_river, kiddie_zone, dining, events, general), `featured` boolean for homepage preview
- **BlogPost** — auto-slug from title, `status` (draft/published), `featured` boolean
- **TicketType** — display pricing only, **not connected to Wix checkout** — see Section 9
- **ContactMessage** — `is_read`, `replied_at` for admin tracking

No foreign keys exist between apps — everything is intentionally decoupled
for a project this size.

---

## 6. API Reference (Summary)

Base: `/api/v1/`. Full detail in `docs/API.md`.

```
GET  /api/v1/home/                     ← single aggregate call for homepage
GET  /api/v1/settings/
GET  /api/v1/settings/hero/
GET  /api/v1/settings/working-hours/
GET  /api/v1/settings/special-hours/
GET  /api/v1/settings/announcements/
GET  /api/v1/settings/features/
GET  /api/v1/settings/testimonials/
GET  /api/v1/settings/seo/{page_slug}/
GET  /api/v1/pages/{slug}/
GET  /api/v1/gallery/                  ← ?category= filter supported
GET  /api/v1/blog/  and /blog/{slug}/
POST /api/v1/contact/                  ← public, no auth
GET  /api/v1/tickets/                  ← display pricing only
POST /api/v1/auth/token/               ← admin login, returns token
```

Interactive docs live at `/api/schema/swagger-ui/` once the backend is
running.

---

## 7. Admin Panel

**Current state:** Django's built-in admin, heavily customized — image
previews, organized fieldsets, list filters, inline-editable fields, readonly
timestamps.

**Confirmed direction:** the client wants a **custom** admin panel (Option
B from earlier discussion) — meaning eventually a separate React app
consuming the same DRF APIs with the same `is_staff` permission checks
already built into every endpoint. The backend requires no changes for
this; only a new frontend needs to be built.

**What the client can manage:** working hours, special/holiday hours,
announcement banner, ticket pricing (display), gallery photos, blog posts,
page content (About/Attractions/Dining/FAQ), testimonials, feature
highlights, site settings (contact info, socials, footer), SEO per page,
and contact form submissions.

---

## 8. Frontend (Demo) Structure

```
frontend-demo/src/
├── services/     one file per backend app — ALL API calls go through here
├── components/   Navbar, Loader, ErrorMessage, BookTicketsButton
├── pages/        Home, Gallery, Blog, BlogDetail, Tickets, Contact
├── App.jsx        routing
└── main.jsx
```

This demo frontend is intentionally unstyled/functional — its only job is
to prove the API layer works. It will be replaced by the final Figma-based
UI from Subin/the design team, which will reuse the exact same
`services/` files, routes, and API contract. Full coding standards for
that handoff are in `docs/FRONTEND_STANDARDS.md`.

---

## 9. Important Business Rule: Ticket Pricing ≠ Checkout Price

`/api/v1/tickets/` returns prices shown on the website's Tickets Info page
**for reference only**. It has zero connection to what Wix actually charges
at checkout. If a price changes, it must be updated in **both** places —
this was a deliberate architectural decision (Option B of three considered)
to avoid the complexity/fragility of live-syncing with Wix's API.

---

## 10. Domains

| Domain | Points to | Configured by |
|---|---|---|
| `murjansplashpark.com` / `www.` | Vercel (frontend) | You |
| `api.murjansplashpark.com` | Render (backend) | You |
| `book.murjansplashpark.com` | Wix (booking) | Client's Wix account — you just verify |

Full DNS/SSL steps are in `docs/DEPLOYMENT.md`.

---

## 11. Future: Custom Booking System (Not Built Yet)

The architecture already supports replacing Wix later without reworking
existing apps — confirmed by code audit: the booking URL is referenced from
exactly one field, through one shared component, nowhere else. Full plan
(new apps needed, data model decisions, payment integration, migration/
cutover steps, what doesn't transfer from Wix) is documented separately in
`docs/FUTURE_CUSTOM_BOOKING.md`. Nothing in that plan is built — it's there
so the decision is cheap to act on later, not scope-creep now.

---

## 12. Status — What's Done vs What's Left

### Done and verified (clean-clone tested, zero manual fixes needed)
- All 8 backend apps: models, admin, serializers, views, URLs
- Migrations generated and applied cleanly
- `seed_data` command populates realistic demo content
- `/api/v1/home/` aggregate endpoint tested live
- Contact form POST tested working
- CORS tested working between real frontend/backend dev servers
- Swagger docs generating correctly
- Demo frontend builds clean, renders real API data
- Full documentation set: README, API.md, DATABASE.md, DEPLOYMENT.md,
  SETUP.md, WORKFLOW.md, FRONTEND_STANDARDS.md, FUTURE_CUSTOM_BOOKING.md
- Python 3.12 pinned for Render (`runtime.txt`) — caught via research, since
  Django 6 requires it and Render doesn't default to it automatically

### Not done / waiting on external input
- Client confirmation on exact admin panel scope (custom React admin — direction confirmed, not yet built)
- Real images/content (currently placeholder seed data)
- Object storage credentials (Supabase/S3 bucket setup — flag is wired, needs your account)
- Actual Render/Vercel/Neon deployment (documented, not executed — needs your accounts)
- Domain DNS configuration (needs registrar access)
- Subin's final Figma-based frontend (backend is ready to receive it any time)
- Custom booking system (documented for the future, intentionally not built)

---

## 13. Where Everything Lives

All of the above is packaged in the project zip delivered earlier:
```
murjan-splash-park/
├── backend/           full Django project, ready to run
├── frontend-demo/     full React demo, ready to run
├── docs/
│   ├── API.md
│   ├── DATABASE.md
│   ├── DEPLOYMENT.md
│   ├── SETUP.md
│   ├── WORKFLOW.md
│   ├── FRONTEND_STANDARDS.md
│   └── FUTURE_CUSTOM_BOOKING.md
└── README.md
```

This document is the index — if you need depth on any one topic, the
corresponding file above has it.
