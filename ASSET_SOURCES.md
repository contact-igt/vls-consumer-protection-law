# Asset Sources

This document records the origin, target path, and current status of every
visual asset the Consumer Protection Law Masterclass landing page expects.

## Current status: 6 of 14 assets imported and active

This session's direct network access to `www.vlslawacademy.com` and
`decodingofpractice.vlslawacademy.com` remains blocked at the egress-policy
layer (HTTP 403 on the CONNECT itself). The user worked around this by
capturing the images with an external extraction tool on their own machine
and uploading the results directly, which is how the six assets below were
obtained — **not** via this session fetching the URLs itself. The remaining
eight assets (hero image, three WhyVls collage photos, three testimonial
photos, one reserved photo) still need the same treatment.

Every image slot uses `components/ui/BrandImage.tsx` (photos) or
`components/ui/Logo.tsx` (logo), which render the real photo via `next/image`
when the file is present, and fall back to a quiet, brand-colored panel (no
dashed border, no "placeholder"/"coming soon" text, no broken image icon)
when it isn't. **Any of the remaining files will display automatically the
instant they're added at the paths below — no code changes needed.**

## How to add the remaining assets

1. Capture or save each remaining image (see table below).
2. Save it into `public/images/vls/` using the exact filename in the table —
   the path is already wired into the component listed.
3. Reload the site. `BrandImage`/`Logo` will pick it up automatically since
   the `onError` fallback simply stops firing once the file resolves.
4. Update the "Status" column below to "Imported and active".

## Asset log

| Local filename | Original page URL | Original image URL | Used in | Status |
|---|---|---|---|---|
| `public/images/vls/vls-logo.png` | https://decodingofpractice.vlslawacademy.com/ | .../assets/home/vls_logo.png | `components/ui/Logo.tsx` — header (desktop + mobile) and footer | **Imported and active.** RGBA PNG, transparent background preserved. |
| `public/images/vls/vls-classroom-faculty-01.jpg` | https://decodingofpractice.vlslawacademy.com/ | .../assets/home/fatsfact.jpeg | `components/sections/FastFacts.tsx` | **Imported and active.** Re-encoded to JPEG (quality 84) from the supplied capture; 1500×1125. |
| `public/images/vls/vls-training-wide-01.jpg` | https://decodingofpractice.vlslawacademy.com/ | .../assets/home/whycourse.jpeg | `components/sections/WhyAttend.tsx` | **Imported and active.** 1500×1125. |
| `public/images/vls/vls-classroom-learning-01.jpg` | https://decodingofpractice.vlslawacademy.com/ | .../assets/home/whatlearn.jpeg | `components/sections/Curriculum.tsx` | **Imported and active.** 1500×1125. |
| `public/images/vls/vls-academy-interior-01.jpg` | https://decodingofpractice.vlslawacademy.com/ | .../assets/home/whojoin.jpeg | `components/sections/Audience.tsx` | **Imported and active.** 1500×1125. |
| `public/images/vls/vls-training-03.jpg` | https://decodingofpractice.vlslawacademy.com/ | .../assets/home/img_9237.jpg | `components/sections/WhyVls.tsx` — used as the collage's wide top image | **Imported and active.** 1600×900. Originally slated for a not-yet-assigned slot; repurposed into the WhyVls collage (as a `wide` aspect image, not the originally planned `portrait` slot) since it was the only WhyVls-suitable photo supplied so far — update the layout again once `vls-training-01.jpg` (its originally intended slot) arrives. |
| `public/images/vls/vls-legal-hero.jpg` | https://decodingofpractice.vlslawacademy.com/ | .../assets/home/banner-img.jpg | `components/sections/Hero.tsx` — full-bleed hero background | **Not yet supplied.** Dark-panel fallback renders until added. |
| `public/images/vls/vls-training-01.jpg` | https://www.vlslawacademy.com/ | .../assets/images/IMG_9238.jpg | `components/sections/WhyVls.tsx` (collage) | **Not yet supplied.** |
| `public/images/vls/vls-training-02.jpg` | https://www.vlslawacademy.com/ | .../assets/images/IMG_9242.jpg | `components/sections/WhyVls.tsx` (collage) — currently unused in code pending this file | **Not yet supplied.** |
| `public/images/vls/vls-students-01.jpg` | https://www.vlslawacademy.com/ | .../assets/images/IMG_9240.jpg | `components/sections/WhyVls.tsx` (collage) | **Not yet supplied.** |
| `public/images/vls/vls-academy-01.jpg` | https://www.vlslawacademy.com/ | .../assets/images/IMG_9235.jpg | Reserved — not yet assigned to a section | **Not yet supplied.** |
| `public/images/vls/vls-testimonial-01.jpg` | https://decodingofpractice.vlslawacademy.com/ | .../assets/home/testimonialimg1.jpg | `components/sections/Testimonials.tsx` | **Not yet supplied.** Even once the image lands, `data/masterclass.ts` still needs a verified name/role — see "Testimonials" below. |
| `public/images/vls/vls-testimonial-02.png` | https://decodingofpractice.vlslawacademy.com/ | .../assets/home/testimonialimg2.png | `components/sections/Testimonials.tsx` | **Not yet supplied.** Same as above. |
| `public/images/vls/vls-testimonial-03.png` | https://decodingofpractice.vlslawacademy.com/ | .../assets/home/testimonialimg3.png | `components/sections/Testimonials.tsx` | **Not yet supplied.** Same as above. |
| `public/images/vls/vls-faculty-[name].jpg` | Not applicable | Not applicable | Faculty section | **Not set.** Faculty for this masterclass is unconfirmed (`faculty: null` in `data/masterclass.ts`) — do not reuse a photograph from another VLS program. |
| `public/images/masterclass/social-share.svg` | N/A — generated locally | N/A | Open Graph / Twitter card image | **Placeholder**, unrelated to the VLS asset list — brand-colored SVG; replace with a real 1200×630 JPG/PNG before launch. |
| `app/favicon.ico` | N/A | N/A | Browser tab icon | **Placeholder**, unrelated to the VLS asset list — default Next.js favicon. The real `vls-logo.png` is now available and could be used to generate a proper favicon. |

## Testimonials — text content, not just images

Even once the three testimonial images above are added, `data/masterclass.ts`
still needs a verified name and role for each (`Testimonial.quote` is
optional — a photo-only "visual testimonial" card is supported precisely for
this situation — but `name` and `role` are not, and none were available to
verify). Do not fabricate these.

## Content checklist

See `CONTENT_CHECKLIST.md` for the full list of unconfirmed content fields
(date, fee, faculty, certificate policy, etc.) that must be finalized before
this site goes live, alongside the image checklist above.
