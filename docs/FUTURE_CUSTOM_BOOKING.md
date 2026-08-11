# Future Custom Booking System — Migration Readiness & Plan

**Status:** Not built. This document exists so that if/when the client wants
to replace Wix with a fully custom booking system, the path is already
planned and the current codebase is already structured to support it
cheaply. Nothing in this document should be built until that decision is
made and confirmed.

---

## 1. Why the Current Build Is Already Ready

The architecture was deliberately kept decoupled from Wix so this swap is
possible without reworking existing apps:

- **Single point of control.** The "Book Tickets" button everywhere on the
  site reads one field: `SiteSettings.booking_redirect_url`. It is not
  hardcoded anywhere in frontend or backend logic. Confirmed by code audit —
  the only other references to the Wix URL are in seed/demo data, not
  application logic.
- **No Wix data synced into this database.** Orders, customers, and payment
  records live only in Wix. This project's database has zero tables that
  assume Wix's data shape, so there's nothing to untangle later.
- **Existing apps don't need to change.** `gallery`, `blog`, `pages`,
  `site_settings`, `contact` — none of them reference booking. A booking
  system is purely additive: new apps alongside the existing ones.
- **`tickets` app is display-only by design**, not wired to any checkout
  logic — so it can either stay as-is (informational) or be extended into
  real inventory/pricing for the new system without breaking its current use.

**Net effect:** switching the "Book Tickets" button to point at a new
internal booking flow is a one-line config change once the new system
exists. The real work is building that system — which is genuinely new
scope, not a refactor.

---

## 2. What Actually Needs to Be Built (Phase 2 scope)

This is new development, budgeted and scheduled separately from the current
project — not a quick add-on.

### New Django apps
```
apps/
  events/     → EventDate (per-day capacity, session times if applicable)
  bookings/   → Booking (the order), BookingItem (line items per ticket type)
  payments/   → Payment, PaymentWebhookLog
  checkin/    → ticket scan/redemption tracking (gate staff use)
```
(`tickets` app already exists for pricing — extend it rather than duplicate.)

### Key model decisions to make before writing code
- **Capacity model:** per-date only, or per-date-per-ticket-type? Water
  parks usually cap by date for safety/space — confirm with the client
  before modeling this.
- **Booking vs Ticket distinction:** a Booking is one order; it generates N
  individual Tickets (one per admitted person), each with its own QR code.
  Don't conflate these into one model.
- **Booking status state machine:** `pending → payment_processing →
  confirmed → cancelled/refunded`. Explicit field, controlled transitions —
  payment webhooks drive this asynchronously, so it can't be inferred from
  other state.

### Core API surface
```
GET  /api/v1/events/dates/
GET  /api/v1/events/dates/{id}/tickets/
POST /api/v1/bookings/
POST /api/v1/bookings/{id}/checkout/        → returns Razorpay order
POST /api/v1/payments/webhook/               → server-to-server only
GET  /api/v1/bookings/{id}/
GET  /api/v1/bookings/{id}/ticket/           → PDF/QR download
POST /api/v1/tickets/{qr_token}/checkin/     → gate staff scan endpoint
```

### Critical technical requirements (non-negotiable when building this)
1. **Atomic capacity holds.** Decrement capacity at booking creation inside
   a transaction (`select_for_update()`), or use a short-lived reservation
   with a TTL (e.g. 10-minute hold released if payment isn't completed).
   Without this, two people can book the last slot simultaneously.
2. **Webhook is the source of truth for payment status** — never trust a
   frontend "payment succeeded" callback alone. Verify Razorpay's webhook
   signature server-side before marking a booking confirmed.
3. **Idempotent webhook handling** — Razorpay retries webhooks; use the
   payment ID as an idempotency key so a booking isn't double-processed.
4. **Signed QR tokens** — encode booking ID + ticket ID + HMAC secret so gate
   staff can verify a ticket without it being spoofable, and so scanning
   works even with unreliable venue internet if you cache verification
   logic appropriately.
5. **Abandoned booking cleanup** — a scheduled task (Celery beat or similar)
   to release held capacity from unpaid/expired bookings.

### Payment integration
Razorpay, matching your existing stack. Server creates the order and
returns `order_id`/`key` to the frontend, which opens Razorpay's checkout
widget — you never handle raw card data.

---

## 3. What Does NOT Transfer From Wix

Be upfront with the client about this before starting Phase 2:

- **Historical order/customer data stays in Wix.** There's no clean API
  export that maps Wix's order history into a new schema. The realistic
  approach is a hard cutover date — bookings before date X stay in Wix
  (client can still view Wix reports for historical data), bookings after
  go through the new system. Don't attempt to merge the two datasets.
- **Existing customers' Wix accounts/order history** aren't portable to the
  new system. If this matters to the client, keep Wix reporting access
  available read-only after cutover.

---

## 4. Migration / Cutover Steps (when the time comes)

1. Build and fully test the new booking system on staging, end-to-end,
   including real Razorpay test transactions.
2. Run the new system **in parallel** with Wix for a short window if
   possible — e.g. soft-launch to a small percentage of traffic, or a
   manually-shared "try our new booking" link — before full cutover.
3. Pick a hard cutover date. Communicate it clearly to the client and any
   staff who handle bookings/check-in.
4. On cutover day: change `SiteSettings.booking_redirect_url` behavior —
   either repoint the "Book Tickets" button to `/tickets` (internal route)
   instead of the external Wix URL, or simply stop using the redirect
   pattern and route directly to the new booking flow. This is the one-line
   change referenced in Section 1.
5. Keep the Wix site/booking page accessible (even if unlinked) for a
   period afterward, in case of edge cases with pre-cutover bookings needing
   support.
6. Monitor closely for the first week — this is where race conditions,
   webhook failures, or capacity bugs would surface under real traffic.

---

## 5. Testing Priorities (in order of what breaks in production)

1. Concurrent booking race conditions (double-booking the last slot)
2. Webhook failure/retry handling
3. Expired/abandoned booking cleanup
4. Refund/cancellation flow end-to-end
5. QR check-in flow under real venue network conditions

---

## 6. Estimating This Work

Treat Phase 2 as a new project scoped and quoted separately — it includes
payment gateway integration, capacity/inventory logic, ticket generation,
gate check-in tooling, and refund/cancellation handling, all of which
currently live entirely inside Wix and don't exist in this codebase. Budget
it accordingly rather than as an extension of the current sprint.
