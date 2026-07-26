# Asset Sources

This document records the origin, target path, and current status of every
visual asset the Consumer Protection Law Masterclass landing page expects.

## Current status: code is wired, binary files are still missing

The components below (`Logo`, `Hero`, `FastFacts`, `WhyAttend`, `Curriculum`,
`Audience`, `WhyVls`, `Testimonials`) all reference `next/image` pointed at
the exact local paths listed in the table below and centralized in
`lib/assets.ts`. **The image files themselves have not been downloaded** —
every attempt to reach the two source domains from this environment was
rejected at the network-egress policy layer before any HTTP request reached
the target server:

- `https://www.vlslawacademy.com/` — CONNECT rejected, HTTP 403 (org egress policy)
- `https://decodingofpractice.vlslawacademy.com/` — CONNECT rejected, HTTP 403 (org egress policy)

This was re-verified directly against the literal image URLs supplied
(e.g. `https://www.vlslawacademy.com/assets/images/vls_logo.png`), with the
same result. This is a policy restriction on this session's outbound network,
not a problem with the URLs or the target server, and it isn't something a
different URL or retry can work around.

Per the project's explicit rules, **no substitute stock photography or
AI-generated imagery was used in place of the missing files.** Instead, every
image slot uses `components/ui/BrandImage.tsx` (photos) or
`components/ui/Logo.tsx` (logo), which render the real photo via `next/image`
when the file is present, and fall back to a quiet, brand-colored panel (no
dashed border, no "placeholder"/"coming soon" text, no broken image icon) when
it isn't. **The instant each file below is added at its exact path, it will
display with no further code changes.**

## How to add the real assets

1. From a machine with normal network access, open the two reference pages
   and save each image listed below.
2. Save it into `public/images/vls/` using the exact filename in the table —
   the path is already wired into the component listed.
3. Reload the site. `BrandImage`/`Logo` will pick it up automatically (no
   code change needed) since the `onError` fallback simply stops firing once
   the file resolves.
4. Update the "Status" column below to "Imported and active".

## Asset log

| Local filename | Original page URL | Original image URL | Used in | Status |
|---|---|---|---|---|
| `public/images/vls/vls-logo.png` | https://www.vlslawacademy.com/ | https://www.vlslawacademy.com/assets/images/vls_logo.png | `components/ui/Logo.tsx` — header (desktop + mobile) and footer | **Blocked — not downloaded.** Code wired via `next/image`; text-lockup fallback renders until the file is added. |
| `public/images/vls/vls-legal-hero.jpg` | https://decodingofpractice.vlslawacademy.com/ | https://decodingofpractice.vlslawacademy.com/assets/home/banner-img.jpg | `components/sections/Hero.tsx` — full-bleed hero background | **Blocked — not downloaded.** Dark-panel fallback renders until the file is added. |
| `public/images/vls/vls-classroom-faculty-01.jpg` | https://decodingofpractice.vlslawacademy.com/ | https://decodingofpractice.vlslawacademy.com/assets/home/fatsfact.jpeg | `components/sections/FastFacts.tsx` | **Blocked — not downloaded.** |
| `public/images/vls/vls-training-wide-01.jpg` | https://decodingofpractice.vlslawacademy.com/ | https://decodingofpractice.vlslawacademy.com/assets/home/whycourse.jpeg | `components/sections/WhyAttend.tsx` | **Blocked — not downloaded.** |
| `public/images/vls/vls-classroom-learning-01.jpg` | https://decodingofpractice.vlslawacademy.com/ | https://decodingofpractice.vlslawacademy.com/assets/home/whatlearn.jpeg | `components/sections/Curriculum.tsx` | **Blocked — not downloaded.** |
| `public/images/vls/vls-academy-interior-01.jpg` | https://decodingofpractice.vlslawacademy.com/ | https://decodingofpractice.vlslawacademy.com/assets/home/whojoin.jpeg | `components/sections/Audience.tsx` | **Blocked — not downloaded.** |
| `public/images/vls/vls-training-01.jpg` | https://www.vlslawacademy.com/ | https://www.vlslawacademy.com/assets/images/IMG_9238.jpg | `components/sections/WhyVls.tsx` (collage) | **Blocked — not downloaded.** |
| `public/images/vls/vls-training-02.jpg` | https://www.vlslawacademy.com/ | https://www.vlslawacademy.com/assets/images/IMG_9242.jpg | `components/sections/WhyVls.tsx` (collage) | **Blocked — not downloaded.** |
| `public/images/vls/vls-students-01.jpg` | https://www.vlslawacademy.com/ | https://www.vlslawacademy.com/assets/images/IMG_9240.jpg | `components/sections/WhyVls.tsx` (collage) | **Blocked — not downloaded.** |
| `public/images/vls/vls-training-03.jpg` | https://www.vlslawacademy.com/ | https://www.vlslawacademy.com/assets/images/IMG_9237.jpg | Reserved — not yet assigned to a section | **Blocked — not downloaded.** |
| `public/images/vls/vls-academy-01.jpg` | https://www.vlslawacademy.com/ | https://www.vlslawacademy.com/assets/images/IMG_9235.jpg | Reserved — not yet assigned to a section | **Blocked — not downloaded.** |
| `public/images/vls/vls-testimonial-01.jpg` | https://decodingofpractice.vlslawacademy.com/ | https://decodingofpractice.vlslawacademy.com/assets/home/testimonialimg1.jpg | `components/sections/Testimonials.tsx` | **Blocked — not downloaded.** No entry added to `data/masterclass.ts` yet: the photo alone isn't enough — a name and role are needed too, and none could be verified from the reference site (also blocked). See "Testimonials" below. |
| `public/images/vls/vls-testimonial-02.png` | https://decodingofpractice.vlslawacademy.com/ | https://decodingofpractice.vlslawacademy.com/assets/home/testimonialimg2.png | `components/sections/Testimonials.tsx` | **Blocked — not downloaded.** Same as above. |
| `public/images/vls/vls-testimonial-03.png` | https://decodingofpractice.vlslawacademy.com/ | https://decodingofpractice.vlslawacademy.com/assets/home/testimonialimg3.png | `components/sections/Testimonials.tsx` | **Blocked — not downloaded.** Same as above. |
| `public/images/vls/vls-faculty-[name].jpg` | Not applicable | Not applicable | Faculty section | **Not set.** Faculty for this masterclass is unconfirmed (`faculty: null` in `data/masterclass.ts`) — do not reuse a photograph from another VLS program. |
| `public/images/masterclass/social-share.svg` | N/A — generated locally | N/A | Open Graph / Twitter card image | **Placeholder**, unrelated to this task's asset list — brand-colored SVG; replace with a real 1200×630 JPG/PNG before launch. |
| `app/favicon.ico` | N/A | N/A | Browser tab icon | **Placeholder**, unrelated to this task's asset list — default Next.js favicon; replace with the official VLS favicon. |

## Testimonials — text content, not just images

Even once the three testimonial images above are added, `data/masterclass.ts`
still needs a verified name and role for each (`Testimonial.quote` is
optional — a photo-only "visual testimonial" card is supported precisely for
this situation — but `name` and `role` are not, and none were available to
verify). Do not fabricate these; pull them from the reference site once it's
reachable, or ask whoever manages the official site's testimonial content for
the source names/roles/quotes directly.

## Content checklist

See `CONTENT_CHECKLIST.md` for the full list of unconfirmed content fields
(date, fee, faculty, certificate policy, etc.) that must be finalized before
this site goes live, alongside the image checklist above.
