import React, { useCallback, useRef, useState } from 'react';
import { contact } from '../content';
import { welcomeMessage } from '../utils/textContent';
import { CommandProcessor } from '../utils/commandProcessor';
import { FileSystem } from '../utils/fileSystem';
import {
  TerminalPane,
  type TerminalLine,
  type TerminalPaneHandle,
} from './layout/TerminalPane';
import { AppHost } from './AppHost';
import { promptSegments, runMessageForApp } from '../sections/derive';
import type { AppId } from '../sections/view';

const commandList = ['ls', 'cd', 'cat', 'open', 'pwd', 'clear', 'help'];

const fileSystem = new FileSystem();
const commandProcessor = new CommandProcessor();

export const Shell: React.FC = () => {
  const [cwd, setCwd] = useState('/');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: welcomeMessage },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const [activeApp, setActiveApp] = useState<AppId | null>(null);

  const terminalRef = useRef<TerminalPaneHandle>(null);

  const appendCommandLine = useCallback((command: string, atCwd: string) => {
    setHistory((prev) => [
      ...prev,
      { type: 'command', content: [...promptSegments(atCwd), { text: ` ${command}` }] },
    ]);
  }, []);

  // Open an app/modal with a short cinematic launch sequence in the terminal.
  const launchApp = useCallback((app: AppId) => {
    const lines = runMessageForApp(app);
    if (lines.length === 0) {
      setActiveApp(app);
      return;
    }
    lines.forEach((line, i) => {
      window.setTimeout(() => {
        setHistory((prev) => [...prev, { type: 'output', content: line }]);
      }, i * 250);
    });
    window.setTimeout(() => setActiveApp(app), lines.length * 250 + 150);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const command = raw.trim();
      if (!command) return;

      appendCommandLine(command, cwd);
      setCommandHistory((prev) => [...prev, command]);
      setHistoryIndex(-1);
      setInputValue('');

      const [cmd, ...args] = command.split(/\s+/);

      if (cmd === 'clear') {
        setHistory([]);
        return;
      }

      const result = commandProcessor.executeCommand(cmd, args, cwd, fileSystem);

      switch (result.kind) {
        case 'action':
          launchApp(result.action.app);
          return;
        case 'cd':
          setCwd(result.path);
          break;
        case 'text':
          setHistory((prev) => [
            ...prev,
            { type: result.isError ? 'error' : 'output', content: result.text },
          ]);
          break;
      }
    },
    [appendCommandLine, launchApp, cwd],
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
      <main className="flex-1 min-h-0 overflow-hidden">
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
      </main>

      <footer className="text-[10px] text-gray-500 text-center py-1 border-t border-green-500/10 font-mono">
        Created by Nick Chen
        {contact.map((c) => (
          <React.Fragment key={c.kind}>
            {' · '}
            <a
              href={c.href}
              className="hover:text-gray-300"
              {...(c.kind === 'email' ? {} : { target: '_blank', rel: 'noreferrer' })}
            >
              {c.display}
            </a>
          </React.Fragment>
        ))}
      </footer>

      <AppHost activeApp={activeApp} onClose={() => setActiveApp(null)} />
    </div>
  );
};
