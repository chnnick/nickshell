import React, { useState, useEffect, useRef } from 'react';
import { CommandProcessor } from '../utils/commandProcessor';
import { FileSystem } from '../utils/fileSystem';
import { ResumeModal } from './ResumeModal';

  interface TerminalLine {
    type: 'command' | 'output' | 'error';
    content: string;
    timestamp?: string;
  }

  export const Terminal: React.FC = () => {
    const [currentPath, setCurrentPath] = useState('/');
    const [inputValue, setInputValue] = useState('');
    const [history, setHistory] = useState<TerminalLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const welcomeShownRef = useRef(false);
    
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);
    const commandProcessor = new CommandProcessor();
    const fileSystem = new FileSystem();

    useEffect(() => {
      if (!welcomeShownRef.current) {
        // Show ASCII art and welcome message
        const asciiArt = `::::    ::: ::::::::::: ::::::::  :::    ::: ::::::::  :::    ::: :::::::::: :::        :::        
:+:+:   :+:     :+:    :+:    :+: :+:   :+: :+:    :+: :+:    :+: :+:        :+:        :+:        
:+:+:+  +:+     +:+    +:+        +:+  +:+  +:+        +:+    +:+ +:+        +:+        +:+        
+#+ +:+ +#+     +#+    +#+        +#++:++   +#++:++#++ +#++:++#++ +#++:++#   +#+        +#+        
+#+  +#+#+#     +#+    +#+        +#+  +#+         +#+ +#+    +#+ +#+        +#+        +#+        
#+#   #+#+#     #+#    #+#    #+# #+#   #+# #+#    #+# #+#    #+# #+#        #+#        #+#        
###    #### ########### ########  ###    ### ########  ###    ### ########## ########## ########## 

Welcome to Nickshell! My personal website(terminal)!
Type (or click) \`help\` to get started and explore my work.`;

        setHistory(prev => [
          ...prev,
          { type: 'output', content: asciiArt }
        ]);
        welcomeShownRef.current = true;
      }
    }, []);

    useEffect(() => {
      // Auto-focus input and scroll to bottom
      if (inputRef.current) {
        inputRef.current.focus();
      }
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, [history]);

    const handleCommand = (command: string) => {
      if (!command.trim()) return;

      const [cmd, ...args] = command.trim().split(' ');
      const prompt = `chnnick@portfolio:${currentPath === '/' ? '~' : currentPath}$`;
      
      setHistory(prev => [
        ...prev,
        { type: 'command', content: `${prompt} ${command}` }
      ]);

      if (cmd === 'cd') {
        const result = commandProcessor.executeCommand(cmd, args, currentPath, fileSystem);
        if (result.startsWith('Changed to')) {
          const newPath = result.split(': ')[1];
          setCurrentPath(newPath);
        } else {
          setHistory(prev => [
            ...prev,
            { type: 'error', content: result }
          ]);
        }
      } else if (cmd === 'clear') {
        setHistory([]);
      } else if (cmd === 'open' && args.length === 1 && args[0] === 'resume.pdf') {
        // Special handling for resume.pdf - show modal instead of inline content
        setShowResumeModal(true);
        setHistory(prev => [
          ...prev,
          { type: 'output', content: 'Opening resume PDF in modal...' }
        ]);
      } else if (cmd === 'open') {
        // Handle open command
        const result = commandProcessor.executeCommand(cmd, args, currentPath, fileSystem);
        if (result.startsWith('OPEN_PDF:')) {
          // Special handling for PDF files - show modal
          setShowResumeModal(true);
          setHistory(prev => [
            ...prev,
            { type: 'output', content: 'Opening PDF in modal...' }
          ]);
        } else {
          const type = result.includes('command not found') || result.includes('No such file') ? 'error' : 'output';
          setHistory(prev => [
            ...prev,
            { type, content: result }
          ]);
        }
      } else {
        const result = commandProcessor.executeCommand(cmd, args, currentPath, fileSystem);
        const type = result.includes('command not found') || result.includes('No such file') ? 'error' : 'output';
        
        setHistory(prev => [
          ...prev,
          { type, content: result }
        ]);
      }

      // Update command history
      setCommandHistory(prev => [...prev, command]);
      setHistoryIndex(-1);
      setInputValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleCommand(inputValue);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex]);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex !== -1) {
          const newIndex = historyIndex + 1;
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1);
            setInputValue('');
          } else {
            setHistoryIndex(newIndex);
            setInputValue(commandHistory[newIndex]);
          }
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        handleTabComplete();
      } else if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        setHistory([]);
      }
    };

  const handleClickableCommand = (command: string) => {
    setInputValue(command);
    handleCommand(command);
  };

  const handleTabComplete = () => {
    const input = inputValue.trim();
    const parts = input.split(' ');
    const command = parts[0];
    const args = parts.slice(1);
    
    // Available commands
    const commands = ['ls', 'cd', 'cat', 'open', 'pwd', 'clear', 'help'];
    
    if (parts.length === 1) {
      // Complete command names
      const matches = commands.filter(cmd => cmd.startsWith(command.toLowerCase()));
      if (matches.length === 1) {
        setInputValue(matches[0] + ' ');
      } else if (matches.length > 1) {
        // Show available commands
        setHistory(prev => [
          ...prev,
          { type: 'output', content: `Available commands: ${matches.join(', ')}` }
        ]);
      }
    } else {
      // Complete file/directory names
      const currentDir = currentPath === '/' ? '/' : currentPath;
      const files = fileSystem.listDirectory(currentDir);
      const lastArg = args[args.length - 1] || '';
      const matches = files.filter(file => file.startsWith(lastArg));
      
      if (matches.length === 1) {
        const newArgs = [...args.slice(0, -1), matches[0]];
        setInputValue(command + ' ' + newArgs.join(' '));
      } else if (matches.length > 1) {
        // Show available files
        setHistory(prev => [
          ...prev,
          { type: 'output', content: `Available files: ${matches.join(', ')}` }
        ]);
      }
    }
  };

    const renderContent = (content: string, isJSX: boolean = false) => {
      if (isJSX) {
        // For JSX content, we need to parse and render HTML/JSX
        // Handle clickable commands in output
        const clickablePattern = /`([^`]+)`/g;
        const parts = content.split(clickablePattern);
        
        return parts.map((part, index) => {
          if (index % 2 === 1) {
            // This is a clickable command
            return (
              <button
                key={index}
                onClick={() => handleClickableCommand(part)}
                className="text-cyan-400 hover:text-cyan-300 underline hover:bg-gray-800 px-1 rounded transition-colors duration-200"
              >
                {part}
              </button>
            );
          }
          // For JSX content, render HTML safely
          return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
        });
      } else {
        // Handle clickable commands in output
        const clickablePattern = /`([^`]+)`/g;
        const parts = content.split(clickablePattern);
        
        return parts.map((part, index) => {
          if (index % 2 === 1) {
            // This is a clickable command
            return (
              <button
                key={index}
                onClick={() => handleClickableCommand(part)}
                className="text-cyan-400 hover:text-cyan-300 underline hover:bg-gray-800 px-1 rounded transition-colors duration-200"
              >
                {part}
              </button>
            );
          }
          return <span key={index}>{part}</span>;
        });
      }
    };

    return (
      <div className="h-screen flex flex-col bg-black text-green-400 p-4">
        {/* Terminal Header */}
        <div className="flex items-center mb-4 text-gray-400">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm">chnnick@portfolio: ~</span>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
        >
          {history.map((line, index) => (
            <div key={index} className={`mb-1 ${
              line.type === 'command' ? 'text-white' : 
              line.type === 'error' ? 'text-red-400' : 'text-green-400'
            }`}>
              {line.type === 'output' ? (
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {renderContent(line.content, line.content.includes('<img') || line.content.includes('<div') || line.content.includes('<span'))}
                </pre>
              ) : (
                <div className="font-mono text-sm">{line.content}</div>
              )}
            </div>
          ))}
          
          {/* Current Input Line */}
          <div className="flex items-center text-white">
            <span className="mr-2 text-sm">
              chnnick@portfolio:{currentPath === '/' ? '~' : currentPath}$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono text-sm"
              autoFocus
            />
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          Created by Nick Chen | <a href="mailto:chen.nich@northeastern.edu">chen.nich@northeastern.edu</a> | <a href="https://www.linkedin.com/in/nckchen/">linkedin.com/in/nckchen</a> | <a href="https://github.com/chnnick">github.com/chnnick</a> 
        </div>
        
        {/* Resume Modal */}
        <ResumeModal
          isOpen={showResumeModal}
          onClose={() => setShowResumeModal(false)}
        />
      </div>
    );
  };