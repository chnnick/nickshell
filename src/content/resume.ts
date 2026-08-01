// Stable URL served by the chnnick/resume repo's GitHub Pages.
// Update the resume by pushing a new PDF there — no changes needed here.
const RESUME_BASE = 'https://chnnick.github.io/resume/resume.pdf';

// Cache-buster. Bump this by hand after pushing a new PDF — it used to be
// `Date.now()`, which busted the cache on every single page load.
export const resumeUrl = `${RESUME_BASE}?v=2`;
