import React, { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import { type OutputSegment, promptSegments } from '../../sections/derive';
import type { Accent } from '../../sections/manifest';

export interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string | OutputSegment[];
}

// Mirrors the old sidebar's per-section palette so the terminal keeps the same
// color scheme.
const accentClass: Record<Accent, string> = {
  green: 'text-green-300',
  cyan: 'text-cyan-300',
  yellow: 'text-yellow-300',
  magenta: 'text-fuchsia-300',
};

const renderSegments = (segments: OutputSegment[], onClickable: (cmd: string) => void) =>
  segments.map((seg, i) => {
    const color = seg.accent ? accentClass[seg.accent] : seg.muted ? 'text-gray-500' : undefined;
    if (seg.command) {
      const cmd = seg.command;
      return (
        <button
          key={i}
          onClick={() => onClickable(cmd)}
          className={`${color ?? 'text-cyan-400'} underline hover:bg-gray-800/60 rounded transition-colors`}
        >
          {seg.text}
        </button>
      );
    }
    return (
      <span key={i} className={color}>
        {seg.text}
      </span>
    );
  });

export interface TerminalPaneHandle {
  focus: () => void;
}

interface Props {
  cwd: string;
  history: TerminalLine[];
  inputValue: string;
  onInputChange: (v: string) => void;
  onSubmit: () => void;
  onHistoryUp: () => void;
  onHistoryDown: () => void;
  onTabComplete: () => void;
  onClear: () => void;
  onClickableCommand: (cmd: string) => void;
}

const renderContent = (content: string, onClickable: (cmd: string) => void) => {
  const pattern = /`([^`]+)`/g;
  const parts = content.split(pattern);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <button
          key={i}
          onClick={() => onClickable(part)}
          className="text-cyan-400 hover:text-cyan-300 underline hover:bg-gray-800 px-1 rounded transition-colors"
        >
          {part}
        </button>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

export const TerminalPane = forwardRef<TerminalPaneHandle, Props>(function TerminalPane(
  {
    cwd,
    history,
    inputValue,
    onInputChange,
    onSubmit,
    onHistoryUp,
    onHistoryDown,
    onTabComplete,
    onClear,
    onClickableCommand,
  },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const promptStr = `chnnick@portfolio:${cwd === '/' ? '~' : cwd}$`;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onHistoryUp();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onHistoryDown();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      onTabComplete();
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      onClear();
    }
  };

  return (
    <div className="flex flex-col bg-black border-t border-green-500/20 h-full">
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-green-500/10 text-xs text-gray-500 font-mono">
        <span className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500/80" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <span className="w-2 h-2 rounded-full bg-green-500/80" />
        </span>
        <span>terminal — {promptStr}</span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-2 text-sm font-mono cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div
            key={i}
            className={
              line.type === 'command'
                ? 'text-white'
                : line.type === 'error'
                  ? 'text-red-400'
                  : 'text-green-400'
            }
          >
            <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
              {typeof line.content === 'string'
                ? renderContent(line.content, onClickableCommand)
                : renderSegments(line.content, onClickableCommand)}
            </pre>
          </div>
        ))}

        <div className="flex items-center text-white">
          <span className="mr-2">{renderSegments(promptSegments(cwd), onClickableCommand)}</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-sm"
            autoFocus
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>
      </div>
    </div>
  );
});
