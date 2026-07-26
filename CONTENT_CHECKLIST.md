# Pre-Launch Content Checklist

This site is code-complete and deployable, but the following fields are
intentionally placeholders (never invented values) and must be confirmed and
entered into `data/masterclass.ts` before publishing.

## Event details

- [ ] `date` and `displayDate` — final masterclass date
- [ ] `startTime`, `endTime`, `timeZone` — final session time
- [ ] `format` — Online (Live) / Offline / Hybrid
- [ ] `platform` (if online) or `venue` (if offline/hybrid)
- [ ] `registrationDeadline` — only set if a real deadline exists; enables the countdown on the final CTA section
- [ ] `registrationStatus` — OPEN / WAITLIST / CLOSED

## Commercial

- [ ] `fee` and `originalFee` (leave `originalFee` null unless a genuine discount applies)
- [ ] `paymentUrl` — live payment link; the registration form redirects here on success once set

## Policies

- [ ] `certificateAvailable` — true/false once confirmed (currently `null`)
- [ ] `recordingAvailable` — true/false once confirmed (currently `null`)
- [ ] `qnaAvailable` — true/false once confirmed (currently `null`); also swaps the last agenda item to "Key Takeaways and Q&A"

## Faculty

- [ ] `faculty` — set once a faculty member is confirmed **for this specific masterclass**. Do not reuse faculty from another VLS program. Populate `photo` with a local path under `public/images/vls/`.

## Testimonials

- [ ] `testimonials` — add only verified, approved VLS learner testimonials. Do not fabricate names, quotes, or ratings.

## Contact & brand

- [ ] `contactAddress` — confirm from the official VLS website
- [ ] `contactNumberSecondary` — only add after confirming from the official VLS website
- [ ] `socialLinks` — confirm official social URLs from the official VLS website

## Assets

See `ASSET_SOURCES.md` for the full image checklist (logo, academy photos, faculty photo, social-share image, favicon).

## Integrations

- [ ] `.env` — `LEAD_API_ENDPOINT` / `LEAD_API_KEY` for the CRM/lead destination
- [ ] `.env` — analytics IDs (`NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID`) and their loader scripts in `app/layout.tsx`
- [ ] Confirm `whatsappNumber` is the correct number for this masterclass

## Final QA pass

- [ ] Search the codebase for "2 Day", "2-Day", "Day 1", "Day 2", "Two Days" — none should exist outside this checklist
- [ ] Test all three registration states (OPEN / WAITLIST / CLOSED)
- [ ] Test the form validation, success, and error states
- [ ] Test WhatsApp and payment-redirect links
- [ ] Test at 360–1440px widths, confirm no horizontal scroll
- [ ] Run `npm run build` and `npm run lint` clean
