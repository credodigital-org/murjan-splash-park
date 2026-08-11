# API Reference — Murjan Splash Park

Base URL (local): `http://localhost:8000/api/v1/`
Interactive docs: `/api/schema/swagger-ui/`
Raw schema: `/api/schema/`

All endpoints are versioned under `/api/v1/`. Do not change endpoint names or
response shapes once frontend integration begins — add new fields/endpoints
instead of modifying existing ones where possible.

## Authentication

Admin-only write operations require a token:
```
POST /api/v1/auth/token/
Body: { "username": "...", "password": "..." }
Response: { "token": "..." }
```
Send subsequent requests with header: `Authorization: Token <token>`

Public (unauthenticated) requests can GET all content endpoints and POST to
`/contact/`. Everything else requires `is_staff=True`.

## Aggregate Endpoint (use this on the homepage)

`GET /api/v1/home/` — single call returning:
```json
{
  "hero": {...},
  "settings": {...},
  "banner": {...} | null,
  "features": [...],
  "gallery": [...],
  "testimonials": [...],
  "latest_blog_posts": [...],
  "pricing": [...]
}
```

## Individual Endpoints

| Endpoint | Methods | Auth | Notes |
|---|---|---|---|
| `/settings/` | GET, PATCH | GET public / PATCH admin | Singleton site settings |
| `/settings/hero/` | GET, PATCH | GET public / PATCH admin | Singleton homepage hero |
| `/settings/working-hours/` | GET, POST, PUT, DELETE | GET public / write admin | 7 rows, one per day |
| `/settings/special-hours/` | GET, POST, PUT, DELETE | GET public / write admin | Holiday overrides |
| `/settings/announcements/` | GET, POST, PUT, DELETE | GET public / write admin | Only active + non-expired shown publicly |
| `/settings/features/` | GET, POST, PUT, DELETE | GET public / write admin | "Why Murjan" cards |
| `/settings/testimonials/` | GET, POST, PUT, DELETE | GET public / write admin | |
| `/settings/seo/{page_slug}/` | GET, POST, PUT, DELETE | GET public / write admin | Per-page meta tags |
| `/pages/{slug}/` | GET, POST, PUT, DELETE | GET public / write admin | About, Attractions, Dining, FAQ, etc. |
| `/gallery/` | GET, POST, PUT, DELETE | GET public / write admin | `?category=` filter supported |
| `/blog/` | GET | public | List — published only for public users |
| `/blog/{slug}/` | GET, PUT, DELETE | GET public / write admin | |
| `/tickets/` | GET, POST, PUT, DELETE | GET public / write admin | **Display-only pricing — see note below** |
| `/contact/` | POST (public), GET/PUT/DELETE (admin) | mixed | Public can only submit |

## Important: Ticket Pricing ≠ Checkout Price

`/api/v1/tickets/` returns prices for **display purposes on the Tickets Info
page only**. It is not connected to Wix in any way. The actual amount
charged is whatever is configured in the Wix Events dashboard. If a price
changes, update both places — this API does not sync automatically (by
design; see project brief for the three sync options considered).

## Booking Redirect

There is no booking API. The frontend's "Book Tickets" button should read
`settings.booking_redirect_url` (from `/api/v1/settings/` or the `/home/`
aggregate) and link/redirect there. This is intentionally a single
configurable value — swap it in the admin panel if the booking URL changes,
or if the client later migrates off Wix entirely (see main README).

## Pagination

List endpoints (gallery, blog, tickets, etc.) are paginated:
```json
{ "count": 4, "next": null, "previous": null, "results": [...] }
```
The `/home/` aggregate endpoint is NOT paginated — it returns full arrays
directly, capped internally (e.g. gallery limited to 8, blog to 3 latest).
