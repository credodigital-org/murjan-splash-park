# Deployment — Murjan Splash Park

## Database — Neon PostgreSQL
1. Create a Neon project, copy the connection string.
2. Set it as `DATABASE_URL` in Render's environment variables (format:
   `postgres://user:password@host/dbname`).

## Backend — Render
0. **Python version — do this first.** This project uses Django 6.0, which
   requires Python 3.12+. A `runtime.txt` (`python-3.12.7`) is included in
   `backend/` so Render picks the right version automatically — but verify
   in Render's dashboard under your service's Environment settings that it
   picked up 3.12+, not an older default. Deploys will fail to install
   dependencies otherwise.
1. New Web Service → connect the `backend/` folder (or repo root with a
   root directory override).
2. Build command: `pip install -r requirements.txt`
3. Start command: `gunicorn config.wsgi:application` (add `gunicorn` to
   requirements.txt before deploying — not included in local dev deps).
4. Environment variables — set all of these (do not leave `.env` values as
   local defaults):
   - `SECRET_KEY` — generate a new one, never reuse the dev key
   - `DEBUG=False`
   - `ALLOWED_HOSTS` — your Render domain + custom domain
   - `DATABASE_URL` — from Neon
   - `CORS_ALLOWED_ORIGINS` — your Vercel frontend URL(s)
   - `USE_S3=True` + Supabase/S3 credentials — **do not skip this**, Render's
     disk is ephemeral and uploaded images will be lost on redeploy otherwise
5. After first deploy, run migrations + seed via Render's shell:
   ```
   python manage.py migrate
   python manage.py createsuperuser
   ```

## Frontend — Vercel
1. Import the `frontend-demo/` (or final frontend) project.
2. Framework preset: Vite.
3. Environment variable: `VITE_API_BASE_URL=https://<your-render-app>.onrender.com/api/v1`
4. Deploy.

## Staging vs Production

Recommended: deploy a staging environment early (per the original plan) —
Render + Vercel both support this cheaply. Share staging URLs with Subin so
frontend integration happens against real data, not local guesses.

## Post-Deploy Checklist
- [ ] `/api/schema/swagger-ui/` loads and lists all endpoints
- [ ] `/admin/` loads and login works
- [ ] CORS allows the deployed frontend origin (test a real fetch, not just curl)
- [ ] Media uploads persist after a redeploy (proves S3/Supabase is wired correctly)
- [ ] `/api/v1/home/` returns real (not seed) data before going live
- [ ] "Book Tickets" button redirects to the correct Wix URL
