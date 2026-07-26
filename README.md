# Consumer Protection Law Masterclass — VLS Law Academy

A production-ready, responsive landing page for VLS Law Academy's **2-Hour
Consumer Protection Law Masterclass**, built with Next.js (App Router),
TypeScript, and Tailwind CSS.

Live route: `/consumer-protection-law-masterclass`
Suggested subdomain when deployed: `https://consumerprotectionlaw.vlslawacademy.com/`

> **Before launch:** read `CONTENT_CHECKLIST.md` and `ASSET_SOURCES.md`. Several
> fields (date, fee, faculty, certificate/recording policy, official photos)
> are intentionally left as clearly labeled placeholders — see those files for
> what needs to be filled in.

## Tech stack

- Next.js 16 (App Router, React Server Components)
- TypeScript
- Tailwind CSS v4
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` — it redirects to `/consumer-protection-law-masterclass`.

## Project structure

```
app/
  consumer-protection-law-masterclass/   # the landing page (layout + page + metadata)
  privacy-policy/, terms-conditions/     # placeholder legal pages
  api/lead/route.ts                      # lead-intake API route
  layout.tsx, globals.css                # root layout, fonts, Tailwind theme
components/
  sections/                              # one component per landing-page section
  ui/                                    # reusable primitives (Button, Card, Accordion, form fields...)
data/
  masterclass.ts                         # <- ALL editable content lives here
lib/                                     # validation, analytics, lead submission, UTM capture, WhatsApp URL, etc.
types/
  masterclass.ts                         # shared TypeScript types for the config above
public/images/vls/                       # official VLS assets (logo, faculty, academy photos)
public/images/masterclass/               # masterclass-specific assets (social share image)
```

## Editing content

Everything editable lives in **`data/masterclass.ts`**. Components read from
this file — there is no content duplicated across components.

### Update the date and time

```ts
date: "2026-09-15",          // ISO date, or "TO_BE_CONFIRMED"
displayDate: "15 September 2026",
startTime: "18:00",
endTime: "20:00",
timeZone: "IST",
```

### Update the price

```ts
fee: 999,            // number, or null while unconfirmed
originalFee: 1499,   // only set for a genuine discount, else null
currency: "INR",
```

### Add faculty information

Faculty must be **confirmed for this specific masterclass** — do not reuse a
faculty member from another VLS program. Set the `faculty` object:

```ts
faculty: {
  name: "Adv. Jane Doe",
  photo: "/images/vls/vls-faculty-jane-doe.jpg", // add the file to public/images/vls/
  qualifications: ["LLB", "LLM"],
  designation: "Practising Advocate, Consumer Forums",
  areasOfPractice: ["Consumer Protection Law", "Civil Litigation"],
  experienceSummary: "10+ years of consumer litigation practice.",
  biography: "…",
  profileUrl: "https://…", // optional
}
```

Until this is set, the Faculty section automatically shows a tasteful "Faculty
Details Will Be Announced" placeholder.

### Add the payment link

```ts
paymentUrl: "https://payments.example.com/consumer-protection-law-masterclass",
```

Once set, a successful registration-form submission redirects the visitor here.

### Configure WhatsApp

```ts
whatsappNumber: "919500207811", // international format, no + or spaces
```

All WhatsApp buttons/links across the site (`lib/whatsapp.ts`) derive from this
single value — never hardcoded per component.

### Connect the lead API

The registration form posts to the site's own `/api/lead` route
(`app/api/lead/route.ts`), which forwards validated leads to an external
system if configured:

```bash
# .env.local
LEAD_API_ENDPOINT=https://your-crm.example.com/webhooks/leads
LEAD_API_KEY=your-secret-key
```

If `LEAD_API_ENDPOINT` is unset, leads are simply logged server-side — useful
for local development before a CRM is wired up. Copy `.env.example` to
`.env.local` to get started.

### Change registration status

```ts
registrationStatus: "OPEN" | "WAITLIST" | "CLOSED",
```

- **OPEN** — full registration form, price, and payment CTA.
- **WAITLIST** — simplified form (name, email, mobile) and "Join the Waitlist" messaging.
- **CLOSED** — no form; shows a "Request Next Masterclass Update" WhatsApp CTA.

### Certificate / recording / Q&A policy

```ts
certificateAvailable: true | false | null, // null renders "To be confirmed" in FAQ/fast facts
recordingAvailable: true | false | null,
qnaAvailable: true | false | null,          // also relabels the last agenda item to "…and Q&A"
```

### Registration deadline / countdown

```ts
registrationDeadline: "2026-09-10T23:59:59+05:30", // ISO datetime, or null
```

A countdown only renders on the final CTA section when this is a real,
confirmed value — there is no fake urgency or auto-resetting timer.

## Analytics

`lib/analytics.ts` exposes `trackEvent(name, payload)`, wired into the key
conversion events (`page_view`, `hero_register_click`, `form_submit`,
`payment_click`, `whatsapp_click`, `faq_open`, etc.). It pushes to
`window.dataLayer` and calls `window.gtag` / `window.fbq` if present. To wire
up real analytics:

1. Add `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_META_PIXEL_ID` to `.env.local`.
2. Add the corresponding loader `<script>` tags to `app/layout.tsx` (e.g. via
   `next/script`), guarded by `process.env.NEXT_PUBLIC_GA_ID`.

## UTM & attribution capture

`lib/utm.ts` captures `utm_source/medium/campaign/content/term`, `document.referrer`,
and the landing-page URL on first load (persisted in `sessionStorage`), and
attaches them to every lead payload via `lib/leads.ts`.

## Deployment

This is a standard Next.js App Router project — deploy it to any platform that
supports Next.js (Vercel, etc.):

```bash
npm run build
npm run start
```

Set the environment variables from `.env.example` in your hosting provider's
dashboard before going live. Once the intended subdomain
(`consumerprotectionlaw.vlslawacademy.com`) is pointed at the deployment,
double-check `data/masterclass.ts` → `seo.canonicalUrl` and
`app/layout.tsx` → `metadataBase` match it.

## Before going live

Read `CONTENT_CHECKLIST.md` (unconfirmed content fields) and
`ASSET_SOURCES.md` (image placeholders and their intended replacements) in
full — the site is code-complete but intentionally ships with placeholders
instead of invented dates, fees, faculty details, or stock photography.
