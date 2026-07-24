// Stable URL served by the chnnick/resume repo's GitHub Pages.
// Update the resume by pushing a new PDF there — no changes needed here.
const RESUME_BASE = 'https://chnnick.github.io/resume/resume.pdf';

// Cache-buster: forces browsers/CDN to fetch the latest after a resume update.
export const resumeUrl = `${RESUME_BASE}?t=${Date.now()}`;
