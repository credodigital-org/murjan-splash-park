# Murjan Splash Park — Final Project Workflow

End-to-end reference: architecture → build → test → integrate → deploy → launch.

---

## 0. Architecture (locked, don't revisit)

```
                        Visitor
                           │
                           ▼
              www.murjansplashpark.com
             (React + Vite, hosted on Vercel)
                           │
              ┌────────────┴────────────┐
              ▼                         ▼
        Content Pages              "Book Tickets"
     (Home, Gallery, Blog,              │
      Attractions, Dining,              ▼
      Tickets Info, Contact)   book.murjansplashpark.com
              │                    (Existing Wix Events —
              ▼                     untouched, unchanged)
     api.murjansplashpark.com               │
   (Django + DRF, hosted on Render)          ▼
              │                    Wix Checkout → Payment
              ▼                     → Confirmation
        Neon PostgreSQL
```

**Non-negotiables:**
- Booking/payment logic stays 100% in Wix. Never build it into this codebase.
- Ticket prices shown on your site are **display-only** — not connected to Wix checkout. Update both places if a price changes.
- Media files go to Supabase/S3, never Render's local disk (it's ephemeral).

---

## 1. Local Development Loop

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data
python manage.py runserver

# Frontend (separate terminal)
cd frontend-demo   # or frontend/ after Subin's handoff
npm install
npm run dev
```

**Verify before doing any new work:**
- `http://localhost:8000/api/v1/home/` → JSON response
- `http://localhost:8000/admin/` → logs in
- `http://localhost:8000/api/schema/swagger-ui/` → loads
- `http://localhost:5173` → shows real data, not blank

**Ongoing loop while building:** edit code → both servers hot-reload → after any model change, `makemigrations && migrate` → spot-check the endpoint with `curl` or Swagger before moving on.

---

## 2. Backend Build Order (already complete in the delivered zip)

1. `core` — base timestamp model
2. `accounts` — custom `AdminUser`
3. `site_settings` — settings, hero, working hours, announcements, features, testimonials, SEO
4. `pages` — About/Attractions/Dining/FAQ editable content
5. `gallery` — images with categories, ordering, alt text
6. `blog` — posts with SEO fields
7. `tickets` — display-only pricing
8. `contact` — form submissions
9. `/api/v1/home/` — aggregate endpoint combining all of the above
10. Django Admin polish — previews, fieldsets, filters, readonly timestamps
11. `seed_data` command, `.env.example`, `README.md`, full `docs/` set

This part is done and clean-clone tested. Don't re-architect it — extend only if a genuinely new requirement appears.

---

## 3. Demo Frontend → Final Frontend Handoff

```bash
git checkout -b integrate-final-frontend

# Back up the demo, extract Subin's zip separately first (check for
# node_modules/.env/dist and delete before copying anywhere)
mv frontend-demo frontend-demo-backup
cp -r /path/to/subins-extracted-zip ./frontend
cd frontend
```

**Reconnect:**
1. Confirm `services/api.js` uses `import.meta.env.VITE_API_BASE_URL` — fix if hardcoded
2. Create `frontend/.env`: `VITE_API_BASE_URL=http://localhost:8000/api/v1`
3. Audit every service file against `docs/API.md` — field names, pagination shape (`{count, next, previous, results}`), and confirm the Tickets page reads `settings.booking_redirect_url` rather than a hardcoded Wix link

**Test and commit:**
```bash
npm install && npm run dev
# click through every page against the real running backend
git add . && git commit -m "Replace demo frontend with final UI from Subin"
git push origin integrate-final-frontend
```
Merge → `develop` → test again → merge → `main`.

---

## 4. Deployment

### Database — Neon
Create project, copy connection string → used as `DATABASE_URL` on Render.

### Backend — Render
1. **Set Python version first** — Django 6 requires Python 3.12+. `runtime.txt` (`python-3.12.7`) is already in `backend/`; verify Render picks it up under service Environment settings.
2. New Web Service → connect repo → root directory `backend/`
3. Build: `pip install -r requirements.txt`
4. Start: `gunicorn config.wsgi:application`
5. Environment variables: `SECRET_KEY` (new, not the dev one), `DEBUG=False`, `ALLOWED_HOSTS`, `DATABASE_URL`, `CORS_ALLOWED_ORIGINS`, `USE_S3=True` + Supabase/S3 credentials
6. Via Render shell: `python manage.py migrate && python manage.py createsuperuser`

### Frontend — Vercel
1. Import `frontend/` project, framework preset: Vite
2. Env var: `VITE_API_BASE_URL=https://api.murjansplashpark.com/api/v1`
3. Deploy

---

## 5. Domain & Subdomain Setup

| Domain | Points to | Who configures |
|---|---|---|
| `murjansplashpark.com` / `www.` | Vercel (frontend) | You — add domain in Vercel, set `A`/`CNAME` at registrar |
| `api.murjansplashpark.com` | Render (backend) | You — add custom domain in Render, `CNAME` at registrar |
| `book.murjansplashpark.com` | Wix (booking) | Client's Wix account — you just verify it resolves correctly |

**Order:**
1. Backend live on `api.` subdomain with HTTPS working
2. Frontend live on `www.`/root, pointing `VITE_API_BASE_URL` at the real `api.` domain
3. Confirm `book.` subdomain resolves to Wix correctly (client-side responsibility)
4. Update `SiteSettings.booking_redirect_url` in admin to the real `book.` URL if not already
5. Full click-through test on **production URLs**, not staging, before calling it launched
6. Update SEO defaults/sitemap to reference the real domain, not localhost/preview URLs

DNS propagation can take minutes to 48 hours — don't schedule a client demo immediately after a DNS change.

---

## 6. Pre-Launch Checklist

- [ ] Clean clone → `README.md`/`SETUP.md` only → everything works with zero manual fixes
- [ ] `manage.py check` → 0 issues
- [ ] All admin CRUD tested: gallery, blog, working hours, tickets, contact, settings
- [ ] Contact form submission tested end-to-end (submit → appears in admin)
- [ ] "Book Tickets" button redirects to the real Wix URL, not a placeholder
- [ ] Media uploads survive a Render redeploy (proves S3/Supabase is actually wired, not local disk)
- [ ] SEO: sitemap.xml, robots.txt, meta tags per page checked on production domain
- [ ] Mobile responsive check on the final frontend (not just desktop)
- [ ] Client walkthrough on production URLs before final sign-off

---

## 7. Post-Launch / Ongoing

- Client manages content via `/admin/` — no code changes needed for gallery, blog, hours, pricing display, announcements
- If ticket prices change: update in **both** this admin panel and Wix
- Future Phase 2 (if client wants to drop Wix): see `README.md` "Key Design Decisions" — booking redirect is a single configurable field, making that swap a frontend one-liner; the real work is building actual booking/payment apps, which don't exist yet by design
