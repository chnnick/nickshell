import { FileSystem } from './fileSystem';
import { helpText } from './textContent';
import { type OutputSegment, styleForPath } from '../sections/derive';
import type { AppAction } from '../sections/view';

/**
 * The typed outcome of running a command. Replaces the old magic-string
 * sentinels (OPEN_PDF:/OPEN_GALLERY:) and the "Changed to: <path>" parsing.
 *
 * `text` may be a plain string or a list of styled segments (used by `ls` to
 * color each entry by its manifest accent).
 */
export type CommandResult =
  | { kind: 'text'; text: string | OutputSegment[]; isError?: boolean }
  | { kind: 'cd'; path: string }
  | { kind: 'action'; action: AppAction };

const text = (value: string | OutputSegment[]): CommandResult => ({ kind: 'text', text: value });
const error = (value: string): CommandResult => ({ kind: 'text', text: value, isError: true });

export class CommandProcessor {
  executeCommand(
    command: string,
    args: string[],
    currentPath: string,
    fileSystem: FileSystem,
  ): CommandResult {
    switch (command.toLowerCase()) {
      case 'help':
        return text(helpText);
      case 'ls':
        return this.listFiles(args, currentPath, fileSystem);
      case 'cd':
        return this.changeDirectory(args, currentPath, fileSystem);
      case 'pwd':
        return text(currentPath === '/' ? '/' : currentPath);
      case 'cat':
        return this.readFile(args, currentPath, fileSystem);
      case 'open':
        return this.openFile(args, currentPath, fileSystem);
      default:
        if (command.startsWith('./')) {
          return this.openExecutable(command.substring(2), fileSystem);
        }
        return error(
          `bash: ${command}: command not found\n\nTry typing \`help\` to learn how to navigate!`,
        );
    }
  }

  private listFiles(args: string[], currentPath: string, fileSystem: FileSystem): CommandResult {
    const targetPath = args.length > 0 ? fileSystem.normalizePath(currentPath, args[0]) : currentPath;

    if (!fileSystem.exists(targetPath)) {
      return error(`ls: cannot access '${args[0]}': No such file or directory`);
    }

    if (!fileSystem.isDirectory(targetPath)) {
      return text(args[0]); // If it's a file, just return the filename
    }

    const files = fileSystem.listDirectory(targetPath);

    if (files.length === 0) {
      return text('Directory is empty');
    }

    const pathDisplay = targetPath === '/' ? '~' : targetPath;
    const segments: OutputSegment[] = [{ text: `Contents of ${pathDisplay}:\n\n`, muted: true }];

    for (const file of files) {
      const fullPath = targetPath === '/' ? `/${file}` : `${targetPath}/${file}`;
      const node = fileSystem.getNode(fullPath);
      const { accent, glyph } = styleForPath(fullPath);
      const isDir = node?.type === 'directory';
      const command = isDir
        ? `cd ${file}`
        : node?.type === 'executable'
          ? `./${file}`
          : node?.app
            ? `open ${file}`
            : `cat ${file}`;

      segments.push(
        { text: '  ' },
        { text: `${glyph} `, muted: true },
        { text: isDir ? `${file}/` : file, accent, command },
        { text: '\n' },
      );
    }

    segments.push({ text: '\nClick an entry, or type a command.', muted: true });
    return { kind: 'text', text: segments };
  }

  private changeDirectory(args: string[], currentPath: string, fileSystem: FileSystem): CommandResult {
    if (args.length === 0) {
      return { kind: 'cd', path: '/' };
    }

    const targetPath = fileSystem.normalizePath(currentPath, args[0]);

    if (!fileSystem.exists(targetPath)) {
      return error(`cd: ${args[0]}: No such file or directory`);
    }

    if (!fileSystem.isDirectory(targetPath)) {
      return error(`cd: ${args[0]}: Not a directory`);
    }

    return { kind: 'cd', path: targetPath };
  }

  private readFile(args: string[], currentPath: string, fileSystem: FileSystem): CommandResult {
    if (args.length === 0) {
      return error('cat: missing file operand\nTry `cat <filename>` or `ls` to see available files');
    }

    const targetPath = fileSystem.normalizePath(currentPath, args[0]);

    if (!fileSystem.exists(targetPath)) {
      return error(`cat: ${args[0]}: No such file or directory`);
    }

    if (fileSystem.isDirectory(targetPath)) {
      return error(`cat: ${args[0]}: Is a directory\nTry \`ls ${args[0]}\` instead`);
    }

    const content = fileSystem.readFile(targetPath);
    if (content === null) {
      return error(`cat: ${args[0]}: Permission denied`);
    }

    return text(content);
  }

  private openFile(args: string[], currentPath: string, fileSystem: FileSystem): CommandResult {
    if (args.length === 0) {
      return error('open: missing file operand\nTry `open <filename>` or `ls` to see available files');
    }

    const targetPath = fileSystem.normalizePath(currentPath, args[0]);
    const node = fileSystem.getNode(targetPath);

    if (!node) {
      return error(`open: ${args[0]}: No such file or directory`);
    }

    if (node.type === 'directory') {
      return error(`open: ${args[0]}: Is a directory\nTry \`ls ${args[0]}\` instead`);
    }

    // A node that launches an app (e.g. resume.pdf -> resume modal).
    if (node.app) {
      return { kind: 'action', action: { kind: 'app', app: node.app } };
    }

    if (node.type === 'file') {
      return text(node.content ?? '');
    }

    return error(`open: ${args[0]}: Permission denied`);
  }

  private openExecutable(name: string, fileSystem: FileSystem): CommandResult {
    if (!name) {
      return error('./: is a directory\nTry `./<filename>` or `ls` to see available files');
    }

    // Executables live at the root, so `./mystery` works from any directory.
    const node = fileSystem.getNode(`/${name}`);

    if (!node) {
      return error(`./: ${name}: No such file or directory`);
    }

    if (node.type === 'directory') {
      return error(`./: ${name}: Is a directory`);
    }

    if (node.app) {
      return { kind: 'action', action: { kind: 'app', app: node.app } };
    }

    if (node.type === 'file') {
      return text(node.content ?? '');
    }

    return error(`./: ${name}: Permission denied`);
  }
}
