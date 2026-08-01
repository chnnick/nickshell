// Tier-2 (view) registry: maps section "apps" (executables / real files) to the
// React modal components that render them. Imported by the UI (AppHost), never
// by the logic layer — keeping React out of fileSystem.ts / commandProcessor.ts.
//
import type React from 'react';
import { GalleryApp } from '../components/terminal/GalleryApp';
import { ResumeModal } from '../components/terminal/ResumeModal';
import type { AppId } from './view';

export interface AppProps {
  isOpen: boolean;
  onClose: () => void;
}

export const appFor: Record<AppId, React.FC<AppProps>> = {
  gallery: GalleryApp,
  resume: ResumeModal,
};
