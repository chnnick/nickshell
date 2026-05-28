import { about, About } from './about';
import { contact, ContactLink } from './contact';
import { experiences, Experience } from './experiences';
import { projects, Project } from './projects';
import { galleryImages, GalleryImage } from './gallery';

export { about, contact, experiences, projects, galleryImages };
export type { About, ContactLink, Experience, Project, GalleryImage };

export const experienceFilename = (id: string) => `${id}.txt`;
export const projectFilename = (id: string) => `${id}.txt`;

export const aboutToText = (data: About): string => {
  const lines: string[] = [];
  lines.push(`${data.greeting}`);
  lines.push('');
  lines.push(...data.blurb);
  lines.push('');
  lines.push(`Education: ${data.education.degree}, ${data.education.school}`);
  if (data.education.minor) lines.push(`  Minor: ${data.education.minor}`);
  if (data.education.gpa) lines.push(`  GPA: ${data.education.gpa}`);
  if (data.education.honors?.length) lines.push(`  Honors: ${data.education.honors.join(', ')}`);
  if (data.education.graduation) lines.push(`  Graduation: ${data.education.graduation}`);
  lines.push('');
  for (const group of data.skills) {
    lines.push(`${group.label}: ${group.items.join(', ')}`);
  }
  lines.push('');
  lines.push(data.seeking);
  lines.push('');
  lines.push('Contact:');
  for (const c of contact) {
    lines.push(`  ${c.label}: ${c.display}`);
  }
  return lines.join('\n');
};

export const experienceToText = (exp: Experience): string => {
  const lines: string[] = [];
  lines.push(`${exp.role} @ ${exp.company}`);
  lines.push(`${exp.startDate} - ${exp.endDate} | ${exp.location}`);
  lines.push('');
  lines.push('Responsibilities:');
  for (const b of exp.bullets) lines.push(`  - ${b}`);
  if (exp.keyAreas?.length) {
    lines.push('');
    lines.push(`Key Areas: ${exp.keyAreas.join(', ')}`);
  }
  if (exp.tools?.length) {
    lines.push(`Tools: ${exp.tools.join(', ')}`);
  }
  return lines.join('\n');
};

export const projectToText = (p: Project): string => {
  const lines: string[] = [];
  lines.push(`${p.name} - ${p.tagline}`);
  lines.push(p.date);
  if (p.links?.length) {
    lines.push(`Links: ${p.links.map((l) => `${l.label} <${l.url}>`).join(', ')}`);
  }
  if (p.awards?.length) {
    for (const a of p.awards) lines.push(`Award: ${a}`);
  }
  lines.push('');
  lines.push(p.description);
  lines.push('');
  lines.push('Features:');
  for (const f of p.features) lines.push(`  - ${f}`);
  lines.push('');
  lines.push(`Tech: ${p.tech.join(', ')}`);
  return lines.join('\n');
};
