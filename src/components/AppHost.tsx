import React from 'react';
import { appFor } from '../sections/registry';
import type { AppId } from '../sections/view';

interface Props {
  activeApp: AppId | null;
  onClose: () => void;
}

// Renders whichever "app" modal is currently active. Adding a new executable
// app requires no changes here — only a manifest entry + an appFor mapping.
export const AppHost: React.FC<Props> = ({ activeApp, onClose }) => {
  if (!activeApp) return null;
  const App = appFor[activeApp];
  return <App isOpen onClose={onClose} />;
};
