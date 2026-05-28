import React from 'react';

interface TerminalPanelProps {
  header: string;
  accent?: 'green' | 'cyan' | 'yellow' | 'magenta';
  children: React.ReactNode;
  className?: string;
}

const accentMap = {
  green: 'border-green-500/40 text-green-400',
  cyan: 'border-cyan-500/40 text-cyan-400',
  yellow: 'border-yellow-500/40 text-yellow-400',
  magenta: 'border-fuchsia-500/40 text-fuchsia-400',
};

export const TerminalPanel: React.FC<TerminalPanelProps> = ({
  header,
  accent = 'green',
  children,
  className = '',
}) => {
  const accentClasses = accentMap[accent];
  return (
    <section
      className={`relative bg-black/60 border ${accentClasses.split(' ')[0]} rounded-md font-mono ${className}`}
    >
      <header
        className={`flex items-center gap-2 px-3 py-1.5 border-b ${accentClasses.split(' ')[0]} text-xs ${accentClasses.split(' ')[1]} bg-black/40`}
      >
        <span className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500/80" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <span className="w-2 h-2 rounded-full bg-green-500/80" />
        </span>
        <span className="truncate">{header}</span>
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
};

interface ChipProps {
  children: React.ReactNode;
  accent?: 'green' | 'cyan' | 'yellow' | 'magenta';
}

const chipAccentMap = {
  green: 'border-green-500/40 text-green-300 bg-green-500/5',
  cyan: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/5',
  yellow: 'border-yellow-500/40 text-yellow-300 bg-yellow-500/5',
  magenta: 'border-fuchsia-500/40 text-fuchsia-300 bg-fuchsia-500/5',
};

export const Chip: React.FC<ChipProps> = ({ children, accent = 'cyan' }) => (
  <span
    className={`inline-block border ${chipAccentMap[accent]} rounded px-2 py-0.5 text-xs font-mono`}
  >
    {children}
  </span>
);
