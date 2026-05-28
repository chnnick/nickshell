import {
  about,
  experiences,
  projects,
  experienceFilename,
  projectFilename,
  aboutToText,
  experienceToText,
  projectToText,
} from '../content';

export interface FileSystemNode {
  name: string;
  type: 'file' | 'directory' | 'realfile' | 'executable';
  content?: string;
  children?: { [key: string]: FileSystemNode };
}

const buildRoot = (): FileSystemNode => {
  const experienceChildren: Record<string, FileSystemNode> = {};
  for (const exp of experiences) {
    const filename = experienceFilename(exp.id);
    experienceChildren[filename] = {
      name: filename,
      type: 'file',
      content: experienceToText(exp),
    };
  }

  const projectChildren: Record<string, FileSystemNode> = {};
  for (const p of projects) {
    const filename = projectFilename(p.id);
    projectChildren[filename] = {
      name: filename,
      type: 'file',
      content: projectToText(p),
    };
  }

  return {
    name: '/',
    type: 'directory',
    children: {
      'about-me.txt': {
        name: 'about-me.txt',
        type: 'file',
        content: aboutToText(about),
      },
      experience: {
        name: 'experience',
        type: 'directory',
        children: experienceChildren,
      },
      projects: {
        name: 'projects',
        type: 'directory',
        children: projectChildren,
      },
      'resume.pdf': {
        name: 'resume.pdf',
        type: 'realfile',
        content: 'RESUME HERE',
      },
      contact: {
        name: 'contact',
        type: 'file',
        content: 'Run `cat contact` to view contact info, or click the sidebar to open the contact page.',
      },
      mystery: {
        name: 'mystery',
        type: 'executable',
        content: 'MYSTERY HERE',
      },
    },
  };
};

export class FileSystem {
  private root: FileSystemNode;

  constructor() {
    this.root = buildRoot();
  }

  getNode(path: string): FileSystemNode | null {
    if (path === '/') return this.root;

    const parts = path.split('/').filter(Boolean);
    let current = this.root;

    for (const part of parts) {
      if (!current.children || !current.children[part]) {
        return null;
      }
      current = current.children[part];
    }

    return current;
  }

  listDirectory(path: string): string[] {
    const node = this.getNode(path);
    if (!node || node.type !== 'directory' || !node.children) {
      return [];
    }
    return Object.keys(node.children);
  }

  readFile(path: string): string | null {
    const node = this.getNode(path);
    if (!node || node.type !== 'file') {
      return null;
    }
    return node.content || '';
  }

  isDirectory(path: string): boolean {
    const node = this.getNode(path);
    return node?.type === 'directory' || false;
  }

  isFile(path: string): boolean {
    const node = this.getNode(path);
    return node?.type === 'file' || false;
  }

  isRealFile(path: string): boolean {
    const node = this.getNode(path);
    return node?.type === 'realfile' || false;
  }

  isExecutable(path: string): boolean {
    const node = this.getNode(path);
    return node?.type === 'executable' || false;
  }

  exists(path: string): boolean {
    return this.getNode(path) !== null;
  }

  normalizePath(currentPath: string, targetPath: string): string {
    if (targetPath.startsWith('/')) {
      return targetPath === '/' ? '/' : targetPath;
    }

    if (targetPath === '.') {
      return currentPath;
    }

    if (targetPath === '..') {
      if (currentPath === '/') return '/';
      const parts = currentPath.split('/').filter(Boolean);
      parts.pop();
      return parts.length === 0 ? '/' : '/' + parts.join('/');
    }

    const newPath = currentPath === '/' ? `/${targetPath}` : `${currentPath}/${targetPath}`;
    return newPath;
  }
}
