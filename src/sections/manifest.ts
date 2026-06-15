// The single source of truth for the portfolio's "filesystem".
//
// Each entry in `sections` declares everything needed to wire a piece of
// content into the shell: where it lives (path), how it renders as a `cat`-able
// text file (toText), the accent color + glyph it gets in `ls` and the prompt,
// and — for resume.pdf / ./mystery — which app/modal it launches. The virtual
// filesystem and the terminal's coloring are all DERIVED from this array
// (see derive.ts), so adding or renaming a section is a one-file change here.

import { about, type About } from '../content/about';
import { contact } from '../content/contact';
import { experiences, type Experience } from '../content/experiences';
import { projects, type Project } from '../content/projects';
import type { AppId } from './view';

// ---------------------------------------------------------------------------
// Text formatters — turn structured content into the plain text shown by `cat`.
// ---------------------------------------------------------------------------

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

export const contactToText = (): string => {
  const lines: string[] = ['Contact:'];
  for (const c of contact) lines.push(`  ${c.label}: ${c.display} <${c.href}>`);
  return lines.join('\n');
};

// ---------------------------------------------------------------------------
// Section descriptors.
// ---------------------------------------------------------------------------

export type Accent = 'green' | 'cyan' | 'yellow' | 'magenta';

interface SectionBase {
  id: string;
  /** Canonical absolute path of the filesystem node (e.g. '/about-me.txt'). */
  path: string;
  /** Display label (may differ from node name, e.g. './mystery'). */
  label: string;
  /** Glyph shown before the name in `ls` output. */
  prefix: string;
  /** Accent color used for this section in `ls` and the prompt path. */
  accent: Accent;
}

/** A single `cat`-able text file (e.g. about-me.txt, contact). */
export interface FileSection extends SectionBase {
  node: 'file';
  toText: () => string;
}

/** One `cat`-able file inside a collection directory. */
export interface CollectionItem {
  id: string;
  filename: string;
  toText: () => string;
}

/** A directory of N `cat`-able items (experience, projects). */
export interface CollectionSection extends SectionBase {
  node: 'directory';
  items: CollectionItem[];
}

// Erase the item type at construction time so `Section` stays concrete (no
// generic variance headaches downstream).
const collectionItems = <T>(
  arr: T[],
  id: (item: T) => string,
  toText: (item: T) => string,
): CollectionItem[] =>
  arr.map((item) => ({ id: id(item), filename: `${id(item)}.txt`, toText: () => toText(item) }));

/** A file that opens an app/modal instead of printing text (resume.pdf). */
export interface RealFileSection extends SectionBase {
  node: 'realfile';
  app: AppId;
  /** Terminal lines shown before the app opens (cinematic launch). */
  runMessage: string[];
}

/** An `./executable` that opens an app/modal (./mystery). */
export interface ExecutableSection extends SectionBase {
  node: 'executable';
  app: AppId;
  runMessage: string[];
}

export type Section =
  | FileSection
  | CollectionSection
  | RealFileSection
  | ExecutableSection;

// Ordered to match the desired `ls /` listing order.
export const sections: Section[] = [
  {
    id: 'about',
    path: '/about-me.txt',
    label: 'about-me.txt',
    prefix: '◇',
    accent: 'green',
    node: 'file',
    toText: () => aboutToText(about),
  },
  {
    id: 'experience',
    path: '/experience',
    label: 'experience',
    prefix: '◇',
    accent: 'cyan',
    node: 'directory',
    items: collectionItems(experiences, (e) => e.id, experienceToText),
  },
  {
    id: 'projects',
    path: '/projects',
    label: 'projects',
    prefix: '◇',
    accent: 'magenta',
    node: 'directory',
    items: collectionItems(projects, (p) => p.id, projectToText),
  },
  {
    id: 'resume',
    path: '/resume.pdf',
    label: 'resume.pdf',
    prefix: '◆',
    accent: 'yellow',
    node: 'realfile',
    app: 'resume',
    runMessage: ['Opening resume.pdf...'],
  },
  {
    id: 'contact',
    path: '/contact',
    label: 'contact',
    prefix: '◇',
    accent: 'yellow',
    node: 'file',
    toText: contactToText,
  },
  {
    id: 'mystery',
    path: '/mystery',
    label: './mystery',
    prefix: '*',
    accent: 'magenta',
    node: 'executable',
    app: 'gallery',
    runMessage: [
      'initializing mystery.exe...',
      'decrypting photo archive...',
      'loading memories...',
      'done — opening viewer ✦',
    ],
  },
];

/** The last path segment = the filesystem node name (e.g. '/mystery' -> 'mystery'). */
export const nodeName = (section: Section): string =>
  section.path.split('/').filter(Boolean).pop() ?? section.path;
