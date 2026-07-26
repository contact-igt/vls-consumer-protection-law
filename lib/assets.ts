// Central manifest of expected local VLS asset paths. Every path here is
// wired into its section via BrandImage/Logo, which gracefully falls back
// to a brand-colored panel (never a broken image) until the real file is
// added at this exact path. See ASSET_SOURCES.md for provenance and status.

export const VLS_ASSETS = {
  logo: "/images/vls/vls-logo.png",
  heroLegal: "/images/vls/vls-legal-hero.jpg",
  classroomFaculty: "/images/vls/vls-classroom-faculty-01.jpg",
  trainingWide: "/images/vls/vls-training-wide-01.jpg",
  classroomLearning: "/images/vls/vls-classroom-learning-01.jpg",
  academyInterior: "/images/vls/vls-academy-interior-01.jpg",
  training01: "/images/vls/vls-training-01.jpg",
  training02: "/images/vls/vls-training-02.jpg",
  students01: "/images/vls/vls-students-01.jpg",
  training03: "/images/vls/vls-training-03.jpg",
  academy01: "/images/vls/vls-academy-01.jpg",
  testimonial01: "/images/vls/vls-testimonial-01.jpg",
  testimonial02: "/images/vls/vls-testimonial-02.png",
  testimonial03: "/images/vls/vls-testimonial-03.png",
} as const;
