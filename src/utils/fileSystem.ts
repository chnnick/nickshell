export interface FileSystemNode {
  name: string;
  type: 'file' | 'directory' | 'realfile';
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
          content: `Hey there! 👋
I'm Nick, a Cybersecurity student at Northeastern University, Graduating in May 2027!
<img src="/headshot.png" alt="Nick's Headshot" style="max-width: 200px; border-radius: 10px; margin: 10px 0;" />
🎓 B.S. Cybersecurity | Minor: Law & Public Policy | GPA: 3.70 | Dean's List

I am passionate about offensive and defensive security, software development, and compliance, with experience in all three!
I love teaching, building, reading philosophy, playing guitar, snowboarding, and ping pong!

💻 Languages: Java, JavaScript, TypeScript, C, Python, SQL
🛡️ Security: BurpSuite, MetaSploit, IDA Pro, WireShark, NMap, PowerBI, Aravo, Archer GRC
🚀 Tools/Frameworks: React, NestJS, NextJS, AWS, Supabase, PostgreSQL

🎯 Seeking Summer 2026 & Fall 2026 opportunities!`
          },
        'experience': {
          name: 'experience',
          type: 'directory',
          children: {
            'Liberty_Mutual_Insurance.txt': {
              name: 'Liberty_Mutual_Insurance.txt',
              type: 'file',
              content: `Cybersecurity Audit Co-Op @ Liberty Mutual Insurance
📅 July 2025 - Present | 📍 Boston, MA

🛡️ Responsibilities:
• Audit 17 enterprise cybersecurity policies across 4 SBUs for compliance
• Evaluate SDLC/DevOps security controls, and check IAM procedures using PowerBI, Aravo, Archer GRC
• Led Continuous Improvement, developed an AI agent for auditing client communications
• Updated 5+ onboarding IAM procedures for future new-hires

🎯 Key Areas: Cybersecurity Policy, Application Security, Change Management, 
Backup/DR, MFA, Third-Party Vendor Risk, Secrets Management

🛠️ Tools: PowerBI, Aravo, Archer GRC, AWS, Azure`
            },
            'Code4Community.txt': {
              name: 'Code4Community.txt',
              type: 'file',
              content: `Full Stack Software Engineer @ Code4Community
📅 May 2025 - Present | 📍 Boston, MA

🚀 Key Work:
• Built NestJS/PostgreSQL/TypeORM backend with TypeScript/React frontend
• Developed recruitment portal for 70+ members across 3+ subteams
• Led TypeScript/React workshop for 80+ underclassmen
• Built backend for 9-week project-based curriculum

🛠️ Tech Stack: NestJS, PostgreSQL, TypeORM, Jest, TypeScript, React`
            },
            'FirstByte.txt': {
              name: 'FirstByte.txt',
              type: 'file',
              content: `President @ FirstByte
📅 April 2025 - Present | 📍 Boston, MA

🚀 Leadership:
• Lead 5 subteams, partnerships with 2 Boston youth organizations
• Increased potential partners by 200%, recruited 20+ new members
• Founded full-stack web dev curriculum for high school students
• Taught web development to 40+ students, presented at university hackathon

🌟 Previous Roles:
• React Team Mentor: Founded React curriculum with Supabase integration
• Web Developer: Rebuilt website using React, TypeScript, NextJS

🛠️ Focus: Teaching, Curriculum Development, Web Development, Leadership`
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
              content: `💈 DreamStore - Online Barber Store/Gallery
📅 May 2025 | Full-stack E-commerce Platform

📖 Description:
E-commerce platform with customer store and secure admin portal for barber operations.

🚀 Features:
• Stripe payment processing and checkout
• Supabase Auth-secured admin portal
• Persistent shopping cart with Zustand
• Real-time stock validation
• Secure image management

🛠️ Tech: React, TypeScript, NextJS, Supabase, Stripe API, Zustand`
            },
            'throwapin.txt': {
              name: 'throwapin.txt',
              type: 'file',
              content: `📍 ThrowAPin - Digital Road Trip Planner
📅 February 2025 | 🔗 throwapin.com
🏆 Honorable Mention for Best Overall Project at HackBeanPot

📖 Description:
Interactive road trip planner with 3D mapping and personalized itineraries.

🚀 Features:
• Interactive 3D mapping with Three.js
• Google Places & Directions API integration
• User authentication and saved trip planning via Supabase
• Geospatial data with Leaflet.js/GeoJSON

🛠️ Tech: NextJS, React, TypeScript, Three.js, Leaflet.js, Google APIs, Supabase
🏆 Won Honorable Mention against 100+ contestants at 36-hour hackathon (and won a mug!)`
            },
            'cipher-encryptor.txt': {
              name: 'cipher-encryptor.txt',
              type: 'file',
              content: `🔐 Cipher Encryptor - Basic CLI Security Tool
📅 January 2025 | Python

📖 Description:
Command-line encryption tool with cryptanalysis capabilities for penetration testing.

🚀 Features:
• Vigenère and Caesar (ROT) cipher implementation
• Extended ASCII support with secure validation
• Brute-force attack capabilities for security testing
• Input validation and error handling

🛠️ Tech: Python, Cryptography, CLI Design
🎯 Use Cases: Security education, penetration testing, cipher analysis`
            },
            'mini-shell.txt': {
              name: 'mini-shell.txt',
              type: 'file',
              content: `🐚 Mini Shell in C - Northeastern Systems Project
📅 October 2024 | C, Linux

📖 Description:
Fully functional Linux shell with advanced process management and I/O capabilities.

🚀 Features:
• Built-in commands (cd, help, prev, source)
• I/O redirection and pipe implementation
• Process management with fork/exec
• Command parsing and tokenization
• Concurrent command execution

🛠️ Tech: C, Linux System Calls (fork, exec, pipe, dup2)
📚 Skills: Process management, IPC, memory management, system programming`
            }
          }
        },
        'resume.pdf': {
          name: 'resume.pdf',
          type: 'realfile',
          content: `RESUME HERE`
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