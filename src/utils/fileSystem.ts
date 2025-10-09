import { aboutMeContent, experienceContent, projectsContent } from './textContent';

export interface FileSystemNode {
  name: string;
  type: 'file' | 'directory' | 'realfile' | 'executable';
  content?: string;
  jsxContent?: boolean; // Flag to indicate if content should be rendered as JSX
  children?: { [key: string]: FileSystemNode };
}

export class FileSystem {
  private root: FileSystemNode;

  constructor() {
    this.root = {
      name: '/',
      type: 'directory',
      children: {
        'about-me.txt': {
          name: 'about-me.txt',
          type: 'file',
          jsxContent: true,
          content: aboutMeContent
          },
        'experience': {
          name: 'experience',
          type: 'directory',
          children: {
            'Liberty_Mutual_Insurance.txt': {
              name: 'Liberty_Mutual_Insurance.txt',
              type: 'file',
              content: experienceContent['Liberty_Mutual_Insurance.txt']
            },
            'Code4Community.txt': {
              name: 'Code4Community.txt',
              type: 'file',
              content: experienceContent['Code4Community.txt']
            },
            'FirstByte.txt': {
              name: 'FirstByte.txt',
              type: 'file',
              content: experienceContent['FirstByte.txt']
            }
          }
        },
        'projects': {
          name: 'projects',
          type: 'directory',
          children: {
            'dream-store.txt': {
              name: 'dream-store.txt',
              type: 'file',
              content: projectsContent['dream-store.txt']
            },
            'throwapin.txt': {
              name: 'throwapin.txt',
              type: 'file',
              content: projectsContent['throwapin.txt']
            },
            'cipher-encryptor.txt': {
              name: 'cipher-encryptor.txt',
              type: 'file',
              content: projectsContent['cipher-encryptor.txt']
            },
            'mini-shell.txt': {
              name: 'mini-shell.txt',
              type: 'file',
              content: projectsContent['mini-shell.txt']
            }
          }
        },
        'resume.pdf': {
          name: 'resume.pdf',
          type: 'realfile',
          content: `RESUME HERE`
        }, 
        'mystery': {
          name: 'mystery',
          type: 'executable',
          content: `MYSTERY HERE`
        }
        }
      }
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