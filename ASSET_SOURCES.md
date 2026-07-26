# Asset Sources

This document records the origin of every visual asset used on the Consumer
Protection Law Masterclass landing page, per the project's asset-workflow
requirements.

## Why no real VLS photographs are included yet

This project was built in an isolated development environment whose outbound
network access is restricted by organizational policy to a small allowlist
(package registries, `anthropic.com`, etc.). Attempts to reach the two
reference sites failed at the network policy layer before any HTTP request
could be made:

- `https://decodingofpractice.vlslawacademy.com/` — connection blocked (403 from egress policy)
- `https://www.vlslawacademy.com/` — connection blocked (403 from egress policy)

Because these sites could not be inspected or fetched, **no images, logos, or
copy were copied from them**, and no substitute stock/AI-generated imagery was
used in their place, per the project's explicit instructions. Every image
slot on the site instead renders a clearly labeled placeholder (see below)
until real, authorized assets are supplied.

## How to add the real assets

1. Visit the two reference sites in a browser from a machine with normal
   network access.
2. Save the required images (see table below) into `public/images/vls/` or
   `public/images/masterclass/` using the suggested filenames.
3. Update the corresponding path in `data/masterclass.ts` (for the faculty
   photo and testimonial photos) or swap the placeholder component for a
   `next/image` reference in the relevant component (for the logo and
   academy/training photographs).
4. Replace the row below with the real source URL and confirm the "Intended
   Section" is still accurate.
5. Remove the placeholder-specific TODO comment from the component once a
   real asset is wired in.

## Asset log

| Local filename (planned) | Original page URL | Original image URL | Intended section | Status |
|---|---|---|---|---|
| `public/images/vls/vls-logo.png` | https://www.vlslawacademy.com/ | Not accessible — network blocked | Header logo, Footer logo | **Placeholder** — text-based lockup in `components/ui/Logo.tsx` |
| `public/images/vls/vls-training-session-01.jpg` | https://www.vlslawacademy.com/ | Not accessible — network blocked | Why VLS Law Academy section | **Placeholder** — `components/ui/PlaceholderImage.tsx` in `components/sections/WhyVls.tsx` |
| `public/images/vls/vls-classroom-01.jpg` | https://www.vlslawacademy.com/ | Not accessible — network blocked | Why VLS Law Academy section | **Placeholder** |
| `public/images/vls/vls-students-01.jpg` | https://www.vlslawacademy.com/ | Not accessible — network blocked | Why VLS Law Academy section | **Placeholder** |
| `public/images/vls/vls-faculty-[name].jpg` | Not applicable | Not applicable | Faculty section | **Not set** — faculty for this masterclass is unconfirmed (`faculty: null` in `data/masterclass.ts`); do not reuse a photograph from another VLS program |
| Testimonial photographs | https://decodingofpractice.vlslawacademy.com/ | Not accessible — network blocked | Testimonials section | **Not set** — `testimonials: []` in `data/masterclass.ts`; only verified, approved testimonials should be added |
| `public/images/masterclass/social-share.svg` | N/A — generated locally | N/A | Open Graph / Twitter card image | **Placeholder** — brand-colored SVG generated for this project; replace with a real 1200×630 JPG/PNG before launch |
| `app/favicon.ico` | N/A | N/A | Browser tab icon | **Placeholder** — default Next.js favicon left in place; replace with the official VLS favicon |

## Content checklist

See `CONTENT_CHECKLIST.md` for the full list of unconfirmed content fields
(date, fee, faculty, certificate policy, etc.) that must be finalized before
this site goes live, alongside the image checklist above.
