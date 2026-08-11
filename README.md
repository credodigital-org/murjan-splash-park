# Murjan Splash Park — Website Rebuild

New React + Django website for Murjan Splash Park. Booking, ticketing, and
payments remain on the existing Wix Events setup — this project handles all
informational/content pages plus a custom admin panel.

## Project Structure

```
murjan-splash-park/
├── backend/            Django + DRF API and Django Admin (interim tool)
├── frontend/            The real React app (from Subin, Figma-based) — public
│                        site AND the custom admin panel live in ONE app.
│                        Public pages: src/pages/. Admin panel: src/admin/.
│                        This replaced the earlier standalone demo frontend
│                        and standalone admin-panel project — merged into one
│                        for a single deploy target and shared service layer.
├── docs/                API.md, DEPLOYMENT.md, SETUP.md, etc.
└── README.md            This file
```

## Quick Start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env               # fill in real values
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data         # populates demo content
python manage.py runserver
```
- Admin panel: http://localhost:8000/admin/
- API root: http://localhost:8000/api/v1/
- Swagger docs: http://localhost:8000/api/schema/swagger-ui/

### Frontend — Public Site + Admin Panel (one app)
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173 (or whichever port Vite picks) — reads
`VITE_API_BASE_URL` from `.env`.

- **Public site**: `/`, `/attractions`, `/dining`, `/gallery`, `/blog`,
  `/contact`, `/tickets` — Subin's Figma-based pages. As of this handoff,
  `Home.jsx` is fully built (static, not yet wired to the API); the other
  pages are still stubs and need to be built out + connected to the
  service layer in `src/services/`.
- **Admin panel**: `/admin/login`, `/admin` (dashboard), and one route per
  resource (`/admin/gallery`, `/admin/blog`, `/admin/tickets`, etc.) — fully
  built and tested, log in with the superuser you created above. Lives
  entirely in `src/admin/` with its own scoped CSS (`.murjan-admin`
  namespace) so it can't clash with the public site's Tailwind styling, and
  its own layout/routing/auth, isolated from the public pages.

Django Admin (`/admin/` on the **backend**, not the frontend) still works
too and remains available as a fallback — same API underneath, nothing to
keep in sync between the two.

## Key Design Decisions

1. **Booking stays on Wix.** The "Book Tickets" button redirects to
   `SiteSettings.booking_redirect_url` (editable from the admin, not
   hardcoded). No booking, payment, or order logic exists in this codebase.
2. **Ticket pricing shown on the site is DISPLAY ONLY.** It does not drive
   checkout. If a price changes, update it in both this admin panel AND Wix.
3. **Media storage.** Local disk in development. In production, do NOT rely
   on Render's disk (it's ephemeral on redeploy) — set `USE_S3=True` and
   configure Supabase/S3 credentials in `.env`.
4. **API contract stability.** Endpoint names and response shapes under
   `/api/v1/` should not change once Subin starts integrating the final
   frontend. See `docs/API.md`.
5. **Custom user model** (`apps.accounts.AdminUser`) was used from the start
   intentionally — switching from Django's default `User` later is a much
   bigger migration than starting with a custom one.

## Handoff Workflow (when Subin's final ZIP arrives)

1. Extract into a new branch — do not overwrite `frontend-demo` directly.
2. Reuse: `src/services/*.js`, routing structure, `.env` pattern.
3. Replace: page/component visuals only.
4. Point `VITE_API_BASE_URL` at the same backend — no backend changes needed
   if the final frontend calls the same endpoints.
5. Test end-to-end against the real (not seeded) data before deploying.

See `docs/DEPLOYMENT.md` for Render/Vercel/Neon deployment steps.

## Future: Custom Booking System (Not Built Yet)

The current architecture is deliberately structured so that Wix can be
replaced with a custom booking system later without reworking existing
code — see `docs/FUTURE_CUSTOM_BOOKING.md` for the readiness notes, planned
app structure, and migration steps. Nothing in that document is built; it's
a plan to follow if/when the client confirms this direction.
