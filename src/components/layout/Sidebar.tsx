import React, { useState } from 'react';
import { experiences, projects } from '../../content';
import type { View, ViewAction } from './viewActions';

interface Props {
  view: View;
  onNavigate: (action: ViewAction) => void;
}

interface LeafProps {
  label: string;
  active: boolean;
  indent: number;
  prefix: string;
  onClick: () => void;
  accent?: 'green' | 'cyan' | 'yellow' | 'magenta';
}

const accentText = {
  green: 'text-green-300',
  cyan: 'text-cyan-300',
  yellow: 'text-yellow-300',
  magenta: 'text-fuchsia-300',
};

const Leaf: React.FC<LeafProps> = ({ label, active, indent, prefix, onClick, accent = 'green' }) => (
  <button
    onClick={onClick}
    className={`w-full text-left font-mono text-xs px-2 py-1 rounded transition-colors ${
      active
        ? 'bg-green-500/10 text-green-200'
        : `${accentText[accent]} hover:bg-green-500/5 hover:text-green-200`
    }`}
    style={{ paddingLeft: `${0.5 + indent * 1}rem` }}
  >
    <span className="text-gray-600 mr-1">{prefix}</span>
    {label}
  </button>
);

const DirHeader: React.FC<{
  label: string;
  open: boolean;
  onToggle: () => void;
  active: boolean;
}> = ({ label, open, onToggle, active }) => (
  <button
    onClick={onToggle}
    className={`w-full text-left font-mono text-xs px-2 py-1 rounded transition-colors ${
      active ? 'bg-green-500/10 text-green-200' : 'text-green-400 hover:bg-green-500/5'
    }`}
  >
    <span className="text-gray-600 mr-1">{open ? '▾' : '▸'}</span>
    {label}/
  </button>
);

export const Sidebar: React.FC<Props> = ({ view, onNavigate }) => {
  const [expOpen, setExpOpen] = useState(true);
  const [projOpen, setProjOpen] = useState(true);

  const isExperienceActive = view.kind === 'experience' || view.kind === 'experience-item';
  const isProjectsActive = view.kind === 'projects' || view.kind === 'project-item';

  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-green-500/20 bg-black/80 h-full overflow-y-auto py-3">
      <div className="px-3 pb-3 border-b border-green-500/10 mb-2">
        <p className="text-xs text-gray-500 font-mono">chnnick@portfolio</p>
        <p className="text-sm text-green-300 font-mono">~ (home)</p>
      </div>

      <nav className="flex flex-col gap-0.5">
        <Leaf
          label="home"
          prefix="$"
          indent={0}
          accent="green"
          active={view.kind === 'home'}
          onClick={() => onNavigate({ kind: 'home' })}
        />
        <Leaf
          label="about-me.txt"
          prefix="◇"
          indent={0}
          accent="green"
          active={view.kind === 'about'}
          onClick={() => onNavigate({ kind: 'about' })}
        />

        <DirHeader
          label="experience"
          open={expOpen}
          active={isExperienceActive}
          onToggle={() => {
            setExpOpen((v) => !v);
            onNavigate({ kind: 'experience' });
          }}
        />
        {expOpen &&
          experiences.map((e) => (
            <Leaf
              key={e.id}
              label={e.id}
              prefix="◇"
              indent={1}
              accent="cyan"
              active={view.kind === 'experience-item' && view.id === e.id}
              onClick={() => onNavigate({ kind: 'experience-item', id: e.id })}
            />
          ))}

        <DirHeader
          label="projects"
          open={projOpen}
          active={isProjectsActive}
          onToggle={() => {
            setProjOpen((v) => !v);
            onNavigate({ kind: 'projects' });
          }}
        />
        {projOpen &&
          projects.map((p) => (
            <Leaf
              key={p.id}
              label={p.id}
              prefix="◇"
              indent={1}
              accent="magenta"
              active={view.kind === 'project-item' && view.id === p.id}
              onClick={() => onNavigate({ kind: 'project-item', id: p.id })}
            />
          ))}

        <Leaf
          label="resume.pdf"
          prefix="◆"
          indent={0}
          accent="yellow"
          active={false}
          onClick={() => onNavigate({ kind: 'resume' })}
        />
        <Leaf
          label="contact"
          prefix="◇"
          indent={0}
          accent="yellow"
          active={view.kind === 'contact'}
          onClick={() => onNavigate({ kind: 'contact' })}
        />
        <Leaf
          label="./mystery"
          prefix="*"
          indent={0}
          accent="magenta"
          active={false}
          onClick={() => onNavigate({ kind: 'mystery' })}
        />
      </nav>

      <div className="mt-auto px-3 pt-3 border-t border-green-500/10 text-[10px] text-gray-500 font-mono">
        <p>tab: complete</p>
        <p>↑/↓: history</p>
        <p>ctrl-l: clear</p>
      </div>
    </aside>
  );
};
