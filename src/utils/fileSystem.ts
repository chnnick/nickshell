import { buildFsChildren } from '../sections/derive';
import type { AppId } from '../sections/view';

export interface FileSystemNode {
  name: string;
  type: 'file' | 'directory' | 'realfile' | 'executable';
  content?: string;
  children?: { [key: string]: FileSystemNode };
  /** For realfile/executable nodes: the app/modal this node launches. */
  app?: AppId;
  /** For realfile/executable nodes: terminal lines shown before launch. */
  runMessage?: string[];
}

const buildRoot = (): FileSystemNode => ({
  name: '/',
  type: 'directory',
  children: buildFsChildren(),
});

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

  isExecutable(path: string): boolean {
    const node = this.getNode(path);
    return node?.type === 'executable' || false;
  }

  exists(path: string): boolean {
    return this.getNode(path) !== null;
  }

  normalizePath(currentPath: string, targetPath: string): string {
    if (targetPath === '~' || targetPath === '~/') {
      return '/';
    }

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
