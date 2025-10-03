import { FileSystem } from './fileSystem';

export class CommandProcessor {
  executeCommand(command: string, args: string[], currentPath: string, fileSystem: FileSystem): string {
    switch (command.toLowerCase()) {
      case 'help':
        return this.showHelp();
      case 'ls':
        return this.listFiles(args, currentPath, fileSystem);
      case 'cd':
        return this.changeDirectory(args, currentPath, fileSystem);
      case 'pwd':
        return currentPath === '/' ? '/' : currentPath;
      case 'cat':
        return this.readFile(args, currentPath, fileSystem);
      case 'open':
        return this.openFile(args, currentPath, fileSystem);
      default:
        return `bash: ${command}: command not found\n\nTry (or click)\`help\`to learn how to navigate my site!`;
    }
  }

  private showHelp(): string {
    return `
Uh oh... how did you get here? I hope this is just Nick accessing this terminal!
In any case, here's a list of commands you can use:

AVAILABLE COMMANDS
📁 Navigation:
  \`ls\`        - List files and directories
  \`cd <dir>\`  - Change directory (try \`cd projects\` or \`cd about-me\`)
  \`pwd\`       - Show current directory
  \`cd ..\`     - Go back one directory

📖 Reading Files:
  \`cat <file>\` - Display file contents
  \`open <file>\` - Open files 

🧹 Utilities:
  \`clear\`     - Clear terminal screen
  \`help\`      - Show this help message

💡 Tips:
• Try clicking on highlighted \`commands\` in the output!
• Use Tab for auto-completion
• Use ↑/↓ for command history
• Start with \`ls\` to see what's available

Ready to explore? Try: \`ls\` or \`cd about-me\``;
  }

  private listFiles(args: string[], currentPath: string, fileSystem: FileSystem): string {
    const targetPath = args.length > 0 ? fileSystem.normalizePath(currentPath, args[0]) : currentPath;
    
    if (!fileSystem.exists(targetPath)) {
      return `ls: cannot access '${args[0]}': No such file or directory`;
    }

    if (!fileSystem.isDirectory(targetPath)) {
      return args[0]; // If it's a file, just return the filename
    }

    const files = fileSystem.listDirectory(targetPath);
    
    if (files.length === 0) {
      return 'Directory is empty';
    }

    // Add clickable navigation for directories and files
    const output = files.map(file => {
      const fullPath = targetPath === '/' ? `/${file}` : `${targetPath}/${file}`;
      if (fileSystem.isDirectory(fullPath)) {
        return `📁 ${file}/  (try: \`cd ${file}\`)`;
      } else if (fileSystem.isFile(fullPath))   {
        return `📄 ${file}  (try: \`cat ${file}\`)`;
      } else {
        return `📄 ${file}  (try: \`open ${file}\`)`;
      }
    }).join('\n');

    const pathDisplay = targetPath === '/' ? '~' : targetPath;
    return `Contents of ${pathDisplay}:\n\n${output}\n\n💡 Click on any command above or type it manually!`;
  }

  private changeDirectory(args: string[], currentPath: string, fileSystem: FileSystem): string {
    if (args.length === 0) {
      return 'Changed to: /';
    }

    const targetPath = fileSystem.normalizePath(currentPath, args[0]);
    
    if (!fileSystem.exists(targetPath)) {
      return `cd: ${args[0]}: No such file or directory`;
    }

    if (!fileSystem.isDirectory(targetPath)) {
      return `cd: ${args[0]}: Not a directory`;
    }

    return `Changed to: ${targetPath}`;
  }

  private readFile(args: string[], currentPath: string, fileSystem: FileSystem): string {
    if (args.length === 0) {
      return 'cat: missing file operand\nTry \`cat <filename>\` or \`ls\` to see available files';
    }

    const targetPath = fileSystem.normalizePath(currentPath, args[0]);
    
    if (!fileSystem.exists(targetPath)) {
      return `cat: ${args[0]}: No such file or directory`;
    }

    if (fileSystem.isDirectory(targetPath)) {
      return `cat: ${args[0]}: Is a directory\nTry \`ls ${args[0]}\` instead`;
    }

    const content = fileSystem.readFile(targetPath);
    if (content === null) {
      return `cat: ${args[0]}: Permission denied`;
    }

    return content;
  }

  private openFile(args: string[], currentPath: string, fileSystem: FileSystem): string {
    if (args.length === 0) {
      return 'open: missing file operand\nTry \`open <filename>\` or \`ls\` to see available files';
    }

    const targetPath = fileSystem.normalizePath(currentPath, args[0]);
    
    if (!fileSystem.exists(targetPath)) {
      return `open: ${args[0]}: No such file or directory`;
    }

    if (fileSystem.isDirectory(targetPath)) {
      return `open: ${args[0]}: Is a directory\nTry \`ls ${args[0]}\` instead`;
    }

    // Check if it's a PDF file
    if (args[0].toLowerCase().endsWith('.pdf')) {
      return `OPEN_PDF:${args[0]}`; // Special return value to trigger PDF modal
    }

    // For non-PDF files, just read them normally
    const content = fileSystem.readFile(targetPath);
    if (content === null) {
      return `open: ${args[0]}: Permission denied`;
    }

    return content;
  }
}