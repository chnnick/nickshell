// Pure functions that derive everything from the section manifest: the virtual
// filesystem tree, terminal output styling (accents/glyphs/prompt), and app
// launch messages. No React. The logic layer (fileSystem / commandProcessor)
// depends only on this + manifest.

import type { FileSystemNode } from '../utils/fileSystem';
import {
  type Accent,
  type CollectionSection,
  nodeName,
  type Section,
  sections,
} from './manifest';
import type { AppId } from './view';

const collections = (): CollectionSection[] =>
  sections.filter((s): s is CollectionSection => s.node === 'directory');

// ---------------------------------------------------------------------------
// Terminal output styling — derived from the same manifest accents/glyphs the
// old sidebar used, so `ls`, the prompt path, and filenames carry per-section
// colors in the single-terminal UI.
// ---------------------------------------------------------------------------

/** A run of terminal text with optional accent color / muted (gray) / click. */
export interface OutputSegment {
  text: string;
  accent?: Accent;
  /** Render gray (glyphs, host prefix, hints). */
  muted?: boolean;
  /** If set, render as a clickable button that runs this command. */
  command?: string;
  /** If set, render as an inline image (URL with BASE_URL already prepended). */
  image?: string;
  /** Alt text for an image segment. */
  alt?: string;
}

/** The accent + sidebar glyph for a filesystem path, from the manifest. */
export const styleForPath = (path: string): { accent: Accent; glyph: string } => {
  for (const s of sections) {
    if (s.path === path) return { accent: s.accent, glyph: s.prefix };
  }
  for (const col of collections()) {
    if (path.startsWith(`${col.path}/`)) return { accent: col.accent, glyph: '◇' };
  }
  return { accent: 'green', glyph: '◇' };
};

/** The accent color a working directory should tint its prompt path with. */
export const accentForPath = (path: string): Accent =>
  path === '/' ? 'green' : styleForPath(path).accent;

/** Prompt segments (`chnnick@portfolio:<path>$`) with the path tinted by cwd. */
export const promptSegments = (cwd: string): OutputSegment[] => [
  { text: 'chnnick@portfolio:', muted: true },
  { text: cwd === '/' ? '~' : cwd, accent: accentForPath(cwd) },
  { text: '$', muted: true },
];

/** Build the children of the root directory from the manifest. */
export const buildFsChildren = (): Record<string, FileSystemNode> => {
  const children: Record<string, FileSystemNode> = {};
  for (const s of sections) {
    const name = nodeName(s);
    switch (s.node) {
      case 'file':
        children[name] = { name, type: 'file', content: s.toText() };
        break;
      case 'directory': {
        const itemChildren: Record<string, FileSystemNode> = {};
        for (const item of s.items) {
          itemChildren[item.filename] = {
            name: item.filename,
            type: 'file',
            content: item.toText(),
          };
        }
        children[name] = { name, type: 'directory', children: itemChildren };
        break;
      }
      case 'realfile':
        children[name] = { name, type: 'realfile', app: s.app, runMessage: s.runMessage };
        break;
      case 'executable':
        children[name] = { name, type: 'executable', app: s.app, runMessage: s.runMessage };
        break;
    }
  }
  return children;
};

const appSection = (app: AppId): Section | undefined =>
  sections.find(
    (s) => (s.node === 'realfile' || s.node === 'executable') && s.app === app,
  );

/** Terminal lines to print when an app launches (cinematic feedback). */
export const runMessageForApp = (app: AppId): string[] => {
  const s = appSection(app);
  return s && (s.node === 'realfile' || s.node === 'executable') ? s.runMessage : [];
};
