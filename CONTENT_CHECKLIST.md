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

- [ ] `testimonials` — add only verified, approved VLS learner testimonials. Do not fabricate names, quotes, or ratings. `quote` is optional on the `Testimonial` type — a photo-only "visual/video testimonial" card is supported when a written quote isn't available — but `name` and `role` still need to be real and verified, not invented.

## Contact & brand

- [x] `contactAddress` — confirmed: No. 1910, 2nd Floor, H Block, 5th Street, 12th Main Road, Anna Nagar West, Chennai, Tamil Nadu 600040
- [x] `contactNumberSecondary` — confirmed: +91 95000 25216
- [ ] `socialLinks` — confirm official social URLs from the official VLS website

## Assets

**Still blocked — no image files have actually been downloaded.** This session's network access to both `vlslawacademy.com` and `decodingofpractice.vlslawacademy.com` is rejected at the egress-policy layer (HTTP 403 on the CONNECT itself), so no binary files could be fetched despite having exact source URLs. Every component (`Logo`, `Hero`, `FastFacts`, `WhyAttend`, `Curriculum`, `Audience`, `WhyVls`, `Testimonials`) is wired via `next/image` to the exact target paths in `lib/assets.ts` and will display each photo automatically the moment it's added — no further code changes needed. See `ASSET_SOURCES.md` for the full per-file list, source URLs, and instructions.

- [ ] `public/images/vls/vls-logo.png`
- [ ] `public/images/vls/vls-legal-hero.jpg`
- [ ] `public/images/vls/vls-classroom-faculty-01.jpg`
- [ ] `public/images/vls/vls-training-wide-01.jpg`
- [ ] `public/images/vls/vls-classroom-learning-01.jpg`
- [ ] `public/images/vls/vls-academy-interior-01.jpg`
- [ ] `public/images/vls/vls-training-01.jpg`, `vls-training-02.jpg`, `vls-students-01.jpg` (WhyVls collage)
- [ ] `public/images/vls/vls-training-03.jpg`, `vls-academy-01.jpg` (downloaded per spec, not yet assigned to a section)
- [ ] `public/images/vls/vls-testimonial-01.jpg`, `vls-testimonial-02.png`, `vls-testimonial-03.png` — plus a verified name/role for each (see "Testimonials" below)
- [ ] Real 1200×630 social-share JPG/PNG (unrelated to the VLS asset list above)
- [ ] Official VLS favicon

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
