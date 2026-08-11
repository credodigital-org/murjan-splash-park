# Local Setup — Murjan Splash Park

## Prerequisites
- Python 3.11+
- Node.js 18+
- Git

## Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate            # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```
Local dev defaults to SQLite — you do not need Postgres running locally.
Leave `DATABASE_URL` empty in `.env` for this.

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data
python manage.py runserver
```

Verify it worked:
- http://localhost:8000/api/v1/home/ → should return JSON with seeded content
- http://localhost:8000/admin/ → log in with your superuser
- http://localhost:8000/api/schema/swagger-ui/ → interactive API docs

## Frontend Setup
```bash
cd frontend-demo
npm install
npm run dev
```
- http://localhost:5173 → should show live data from the backend (not
  hardcoded placeholders) — if pages are blank, check the backend is
  running and `VITE_API_BASE_URL` in `.env` matches it.

## Environment Variables Reference

See `backend/.env.example` for the full list with comments. Never commit
`.env` — it's already in `.gitignore`.

## Common Issues

| Symptom | Likely Cause |
|---|---|
| Frontend shows "Could not load..." | Backend not running, or CORS not allowing `localhost:5173` |
| `/admin/` 500 error on custom fields | Forgot to run `makemigrations` + `migrate` after a model change |
| Images don't appear after upload | Local dev is fine (uses `media/` folder); in production, confirm `USE_S3=True` is set |
| Duplicate seed data after re-running `seed_data` | Command uses `get_or_create` keyed by name/slug — if you renamed seed values between runs, old rows won't be replaced automatically; clean up manually via `/admin/` |
