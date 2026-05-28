import React, { useCallback, useEffect, useRef, useState } from 'react';
import { experiences, projects } from '../content';
import { welcomeMessage } from '../utils/textContent';
import { CommandProcessor } from '../utils/commandProcessor';
import { FileSystem } from '../utils/fileSystem';
import { ContentPane } from './layout/ContentPane';
import { Sidebar } from './layout/Sidebar';
import {
  TerminalPane,
  type TerminalLine,
  type TerminalPaneHandle,
} from './layout/TerminalPane';
import {
  commandForAction,
  type View,
  type ViewAction,
} from './layout/viewActions';
import { ResumeModal } from './ResumeModal';
import { GalleryModal } from './GalleryModal';

const commandList = ['ls', 'cd', 'cat', 'open', 'pwd', 'clear', 'help'];

const fileSystem = new FileSystem();
const commandProcessor = new CommandProcessor();

const resolveCommandToAction = (
  raw: string,
  cwd: string,
): ViewAction | null => {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const [cmd, ...args] = trimmed.split(/\s+/);

  // ./mystery
  if (cmd === './mystery') return { kind: 'mystery' };
  if (cmd.startsWith('./') && cmd.substring(2) === 'mystery') {
    return { kind: 'mystery' };
  }

  if (cmd === 'open' && args[0] === 'resume.pdf') return { kind: 'resume' };

  if (cmd === 'cd') {
    if (!args.length || args[0] === '~' || args[0] === '/') return { kind: 'home' };
    const target = fileSystem.normalizePath(cwd, args[0]);
    if (target === '/experience') return { kind: 'experience' };
    if (target === '/projects') return { kind: 'projects' };
    return null;
  }

  if (cmd === 'ls') {
    const target = args[0] ? fileSystem.normalizePath(cwd, args[0]) : cwd;
    if (target === '/experience') return { kind: 'experience' };
    if (target === '/projects') return { kind: 'projects' };
    if (target === '/') return { kind: 'home' };
    return null;
  }

  if (cmd === 'cat' || cmd === 'open') {
    if (!args.length) return null;
    const target = fileSystem.normalizePath(cwd, args[0]);
    if (target === '/about-me.txt') return { kind: 'about' };
    if (target === '/contact') return { kind: 'contact' };
    const expMatch = target.match(/^\/experience\/(.+)\.txt$/);
    if (expMatch && experiences.find((e) => e.id === expMatch[1])) {
      return { kind: 'experience-item', id: expMatch[1] };
    }
    const projMatch = target.match(/^\/projects\/(.+)\.txt$/);
    if (projMatch && projects.find((p) => p.id === projMatch[1])) {
      return { kind: 'project-item', id: projMatch[1] };
    }
    return null;
  }

  return null;
};

const cwdForAction = (action: ViewAction, current: string): string => {
  switch (action.kind) {
    case 'home':
      return '/';
    case 'experience':
    case 'experience-item':
      return '/experience';
    case 'projects':
    case 'project-item':
      return '/projects';
    default:
      return current;
  }
};

export const Shell: React.FC = () => {
  const [view, setView] = useState<View>({ kind: 'home' });
  const [cwd, setCwd] = useState('/');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: welcomeMessage },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [showResume, setShowResume] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const terminalRef = useRef<TerminalPaneHandle>(null);
  const welcomeShownRef = useRef(true);

  useEffect(() => {
    // single-shot: ensure ref is acknowledged
    welcomeShownRef.current = true;
  }, []);

  const appendCommandLine = useCallback((command: string, atCwd: string) => {
    const prompt = `chnnick@portfolio:${atCwd === '/' ? '~' : atCwd}$`;
    setHistory((prev) => [...prev, { type: 'command', content: `${prompt} ${command}` }]);
  }, []);

  const applyAction = useCallback((action: ViewAction) => {
    if (action.kind === 'resume') {
      setShowResume(true);
      return;
    }
    if (action.kind === 'mystery') {
      setShowGallery(true);
      return;
    }
    setView(action);
    setCwd(cwdForAction(action, '/'));
  }, []);

  const navigateTo = useCallback(
    (action: ViewAction) => {
      const targetCwd = action.kind === 'resume' || action.kind === 'mystery' ? cwd : cwdForAction(action, cwd);
      const cmd = commandForAction(action);
      appendCommandLine(cmd, action.kind === 'resume' || action.kind === 'mystery' ? cwd : targetCwd);
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
      applyAction(action);
    },
    [appendCommandLine, applyAction, cwd],
  );

  const runCommand = useCallback(
    (raw: string) => {
      const command = raw.trim();
      if (!command) return;

      appendCommandLine(command, cwd);
      setCommandHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);
      setInputValue('');

      const [cmd, ...args] = command.split(/\s+/);

      // Pure-terminal commands first
      if (cmd === 'clear') {
        setHistory([]);
        return;
      }

      // Try to map to a view action (for content-pane sync)
      const action = resolveCommandToAction(command, cwd);

      if (cmd === 'cd') {
        const result = commandProcessor.executeCommand('cd', args, cwd, fileSystem);
        if (result.startsWith('Changed to')) {
          const newPath = result.split(': ')[1];
          setCwd(newPath);
          if (action) applyAction(action);
        } else {
          setHistory((prev) => [...prev, { type: 'error', content: result }]);
        }
        return;
      }

      if (cmd === 'open' && args[0] === 'resume.pdf') {
        setShowResume(true);
        setHistory((prev) => [...prev, { type: 'output', content: 'Opening resume PDF...' }]);
        return;
      }

      if (cmd === './mystery' || (cmd.startsWith('./') && cmd.substring(2) === 'mystery')) {
        setShowGallery(true);
        setHistory((prev) => [...prev, { type: 'output', content: 'Executing...' }]);
        return;
      }

      const result = commandProcessor.executeCommand(cmd, args, cwd, fileSystem);

      if (result.startsWith('OPEN_PDF:')) {
        setShowResume(true);
        setHistory((prev) => [...prev, { type: 'output', content: 'Opening PDF...' }]);
        return;
      }
      if (result.startsWith('OPEN_GALLERY:')) {
        setShowGallery(true);
        setHistory((prev) => [...prev, { type: 'output', content: 'Executing...' }]);
        return;
      }

      const type =
        result.includes('command not found') || result.includes('No such file')
          ? 'error'
          : 'output';
      setHistory((prev) => [...prev, { type, content: result }]);

      // Sync content pane when the command maps to a view
      if (action && action.kind !== 'resume' && action.kind !== 'mystery') {
        applyAction(action);
      }
    },
    [appendCommandLine, applyAction, cwd],
  );

  const handleHistoryUp = useCallback(() => {
    if (commandHistory.length === 0) return;
    const newIndex =
      historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
    setHistoryIndex(newIndex);
    setInputValue(commandHistory[newIndex]);
  }, [commandHistory, historyIndex]);

  const handleHistoryDown = useCallback(() => {
    if (historyIndex === -1) return;
    const newIndex = historyIndex + 1;
    if (newIndex >= commandHistory.length) {
      setHistoryIndex(-1);
      setInputValue('');
    } else {
      setHistoryIndex(newIndex);
      setInputValue(commandHistory[newIndex]);
    }
  }, [commandHistory, historyIndex]);

  const handleTabComplete = useCallback(() => {
    const input = inputValue.trim();
    const parts = input.split(/\s+/);
    const command = parts[0] ?? '';
    const args = parts.slice(1);

    if (parts.length === 1) {
      const matches = commandList.filter((c) => c.startsWith(command.toLowerCase()));
      if (matches.length === 1) {
        setInputValue(matches[0] + ' ');
      } else if (matches.length > 1) {
        setHistory((prev) => [
          ...prev,
          { type: 'output', content: `Available commands: ${matches.join(', ')}` },
        ]);
      }
      return;
    }

    const files = fileSystem.listDirectory(cwd);
    const lastArg = args[args.length - 1] || '';
    const matches = files.filter((f) => f.startsWith(lastArg));
    if (matches.length === 1) {
      const newArgs = [...args.slice(0, -1), matches[0]];
      setInputValue(command + ' ' + newArgs.join(' '));
    } else if (matches.length > 1) {
      setHistory((prev) => [
        ...prev,
        { type: 'output', content: `Available files: ${matches.join(', ')}` },
      ]);
    }
  }, [cwd, inputValue]);

  const handleClickableCommand = useCallback(
    (cmd: string) => {
      runCommand(cmd);
    },
    [runCommand],
  );

  return (
    <div className="h-screen flex flex-col bg-black text-green-400 font-mono">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar view={view} onNavigate={navigateTo} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-[2] min-h-0 overflow-hidden">
              <ContentPane view={view} onNavigate={navigateTo} />
            </div>
            <div className="flex-1 min-h-[180px] max-h-[40vh]">
              <TerminalPane
                ref={terminalRef}
                cwd={cwd}
                history={history}
                inputValue={inputValue}
                onInputChange={setInputValue}
                onSubmit={() => runCommand(inputValue)}
                onHistoryUp={handleHistoryUp}
                onHistoryDown={handleHistoryDown}
                onTabComplete={handleTabComplete}
                onClear={() => setHistory([])}
                onClickableCommand={handleClickableCommand}
              />
            </div>
          </div>
        </main>
      </div>

      <footer className="text-[10px] text-gray-500 text-center py-1 border-t border-green-500/10 font-mono">
        Created by Nick Chen ·{' '}
        <a href="mailto:chen.nich@northeastern.edu" className="hover:text-gray-300">
          chen.nich@northeastern.edu
        </a>{' '}
        ·{' '}
        <a
          href="https://www.linkedin.com/in/nckchen/"
          className="hover:text-gray-300"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/nckchen
        </a>{' '}
        ·{' '}
        <a
          href="https://github.com/chnnick"
          className="hover:text-gray-300"
          target="_blank"
          rel="noreferrer"
        >
          github.com/chnnick
        </a>
      </footer>

      <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />
      <GalleryModal isOpen={showGallery} onClose={() => setShowGallery(false)} />
    </div>
  );
};
