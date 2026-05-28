import React from 'react';
import { welcomeMessage } from '../../utils/textContent';
import { TerminalPanel } from '../ui/TerminalPanel';
import type { ViewAction } from '../layout/viewActions';

interface QuickStart {
  label: string;
  hint: string;
  action: ViewAction;
}

const quickStart: QuickStart[] = [
  { label: 'About me', hint: 'cat about-me.txt', action: { kind: 'about' } },
  { label: 'Experience', hint: 'ls experience', action: { kind: 'experience' } },
  { label: 'Projects', hint: 'ls projects', action: { kind: 'projects' } },
  { label: 'Resume', hint: 'open resume.pdf', action: { kind: 'resume' } },
  { label: 'Contact', hint: 'cat contact', action: { kind: 'contact' } },
  { label: 'Photo gallery', hint: './mystery', action: { kind: 'mystery' } },
];

interface Props {
  onNavigate: (action: ViewAction) => void;
}

export const HomeCard: React.FC<Props> = ({ onNavigate }) => (
  <div className="space-y-4">
    <TerminalPanel header="~ (home)" accent="green">
      <pre className="text-green-400 text-[10px] sm:text-xs leading-tight whitespace-pre overflow-x-auto">
        {welcomeMessage}
      </pre>
    </TerminalPanel>

    <TerminalPanel header="quick-start.sh" accent="cyan">
      <p className="text-xs text-gray-400 mb-3">
        New here? Click any of these. Or type the same command into the terminal below.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {quickStart.map((q) => (
          <button
            key={q.label}
            onClick={() => onNavigate(q.action)}
            className="text-left border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/5 rounded-md px-3 py-2 transition-colors"
          >
            <p className="text-cyan-300 text-sm">{q.label}</p>
            <p className="text-gray-500 text-xs font-mono">$ {q.hint}</p>
          </button>
        ))}
      </div>
    </TerminalPanel>
  </div>
);
