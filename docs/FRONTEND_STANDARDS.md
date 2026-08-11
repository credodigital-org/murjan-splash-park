# Frontend Development Standards — Murjan Splash Park

For Subin (and anyone else touching the React frontend). Following these
keeps the handoff back to backend clean and avoids the common issues that
turn a "quick review" into a rebuild.

---

## 1. Project Structure

```
frontend/
├── src/
│   ├── assets/          images, fonts, static files
│   ├── components/      reusable, presentational — Button, Card, Navbar, Footer
│   ├── layouts/          MainLayout, etc. — page shells that wrap routes
│   ├── pages/            one file per route — Home, Gallery, Blog, Tickets, Contact
│   ├── services/         API calls only — one file per backend app (galleryService.js, etc.)
│   ├── hooks/             custom hooks (useFetch, useDebounce, etc.) if needed
│   ├── utils/             pure helper functions — formatDate, formatCurrency, etc.
│   ├── styles/            global CSS, Tailwind config extensions
│   ├── App.jsx
│   └── main.jsx
├── .env                   local only, never committed
├── .env.example
└── package.json
```

Keep this shape. Don't invent a parallel structure for "just this one page."

---

## 2. Service Layer — Non-Negotiable

**All API calls go through `services/`. Never call `fetch`/`axios` directly inside a component.**

```javascript
// services/api.js — the ONE shared instance
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
```

```javascript
// services/galleryService.js — one file per backend app
import api from "./api";

export const getGallery = (category) =>
  api.get("/gallery/", { params: category ? { category } : {} }).then((res) => res.data);
```

Why this matters: when the backend URL changes (staging → production), it's
a one-line env var change, not a find-and-replace across 15 components.

**Never hardcode the API base URL anywhere.** Always `import.meta.env.VITE_API_BASE_URL`.

---

## 3. Environment Variables

- `.env` is never committed — confirm it's in `.gitignore` before your first commit
- `.env.example` documents what variables exist, with placeholder values
- Vite requires the `VITE_` prefix for any env var used in frontend code — `VITE_API_BASE_URL`, not `API_BASE_URL`

---

## 4. Every Data-Fetching Page Needs Three States

Don't ship a page that only handles the happy path.

```jsx
export default function Gallery() {
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGallery().then(setImages).catch(() => setError(true));
  }, []);

  if (error) return <ErrorMessage />;        // API failed
  if (!images) return <Loader />;             // still loading
  if (images.length === 0) return <EmptyState />; // loaded, nothing to show

  return ( /* actual content */ );
}
```

Missing the empty state is the most common bug — a gallery with zero images
shouldn't render a blank broken-looking layout.

---

## 5. The "Book Tickets" Button

There is exactly one correct way to implement this — do not hardcode a Wix
URL anywhere:

```jsx
<BookTicketsButton bookingUrl={settings.booking_redirect_url} />
```

`settings.booking_redirect_url` comes from `/api/v1/settings/` (or the
`/home/` aggregate endpoint). This value is editable by the client from the
admin panel and may change. If you hardcode `https://book.murjansplashpark.com`
anywhere in the codebase, it will drift out of sync the moment the client
updates it in admin, and it also blocks the future custom-booking migration
(see `docs/FUTURE_CUSTOM_BOOKING.md`).

---

## 6. Component Standards

- **Functional components only**, with Hooks — no class components
- **One component per file**, file name matches component name (`Navbar.jsx` exports `Navbar`)
- **Props over hardcoded content** — if a component displays text/images that could plausibly come from the CMS, accept it as a prop rather than hardcoding it, even in the demo/early stage
- **No inline styles for anything beyond a one-off** — use Tailwind utility classes; if you're repeating the same inline style object across files, it should be a component or a Tailwind class
- **Default exports for pages**, named exports are fine for small shared utilities

---

## 7. Styling — Tailwind

- Use Tailwind utility classes as the default. Avoid custom CSS files unless something genuinely can't be expressed in utilities (rare)
- Follow the brand tokens already established for Code Leaf / Murjan work: keep colors consistent with the Figma (don't eyeball hex values — pull them from Figma's inspector)
- Mobile-first: write the base (unprefixed) classes for mobile layout, then layer `md:`/`lg:` prefixes for larger screens — not the reverse
- Test at minimum: 375px (mobile), 768px (tablet), 1440px (desktop) before considering a page "done"

---

## 8. Accessibility & SEO (don't skip these — they're graded in review)

- Every `<img>` needs meaningful `alt` text — pull from the CMS `alt_text`/`caption` field where available, don't leave it empty or generic ("image123.jpg")
- Use semantic HTML: `<nav>`, `<main>`, `<footer>`, `<button>` — not `<div onClick>` for interactive elements
- Each page needs its own `<title>` and meta description — use `react-helmet-async` (or equivalent) driven by the per-page SEO data from `/api/v1/settings/seo/{page_slug}/`, not a single static `index.html` title for the whole site
- Form inputs need associated `<label>` elements, not just placeholder text
- Color contrast: don't rely on gold-on-white or light-teal-on-white for body text — check contrast ratios, especially for the CTA buttons

---

## 9. Performance

- **Lazy-load images below the fold** (`loading="lazy"` on `<img>`, or a proper lazy-load component for galleries)
- **Don't fetch data you don't render** — if a page only needs 3 fields from an API response, that's fine (the backend already returns full objects), but don't make extra unnecessary API calls when `/home/` aggregate already has what you need
- Compress/optimize images before upload where possible — the backend doesn't do this automatically
- Avoid re-fetching on every render — `useEffect` dependency arrays should be correct (empty `[]` for "fetch once on mount" patterns, not omitted)

---

## 10. Error Handling Details

- Network/API failures should show a user-facing message, not a blank page or console-only error
- Form submissions (Contact page) need three states: idle → submitting → success/error, with the submit button disabled while submitting (prevents double-submits)
- Don't let an unhandled promise rejection silently fail — always `.catch()` or `try/catch` around API calls

---

## 11. Git Workflow

- Branch naming: `feature/<page-or-component-name>` (e.g. `feature/gallery-page`)
- Commit messages describe what changed, not "update" or "fix" — e.g. `Add loading and empty states to Gallery page`
- Don't commit `node_modules/`, `.env`, or `dist/` — verify `.gitignore` covers these before your first push
- Small, frequent commits over one giant commit at handoff time — makes review possible

---

## 12. Before Handoff — Self-Check

Run through this before sending any zip or opening a PR:

- [ ] `npm install && npm run dev` works on a clean clone with zero manual fixes
- [ ] No hardcoded API URLs — grep your codebase for `localhost` and `http://` to confirm
- [ ] No hardcoded Wix booking URL — grep for `book.murjansplashpark`
- [ ] Every page handles loading, error, and empty states
- [ ] Every image has alt text
- [ ] Tested at mobile, tablet, and desktop widths
- [ ] `npm run build` completes without errors
- [ ] No console errors/warnings in the browser devtools on any page
- [ ] `.env` is not in the zip/commit

---

## 13. What NOT to Build

- No booking, payment, or checkout logic — the "Book Tickets" button only ever redirects (see Section 5)
- No client-side data persistence beyond component state — this project has no requirement for localStorage-based features
- No new dependencies without checking first — stick to what's already in `package.json` (React, React Router, Axios, Tailwind) unless there's a genuine gap
