export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  date: string;
  description: string;
  features: string[];
  tech: string[];
  links?: ProjectLink[];
  awards?: string[];
}

export const projects: Project[] = [
  {
    id: 'dream-store',
    name: 'DreamStore',
    tagline: 'Online Barber Store/Gallery',
    date: 'May 2025',
    description:
      'E-commerce platform with customer store and secure admin portal for barber operations.',
    features: [
      'Stripe payment processing and checkout',
      'Supabase Auth-secured admin portal',
      'Persistent shopping cart with Zustand',
      'Real-time stock validation',
      'Secure image management',
    ],
    tech: ['React', 'TypeScript', 'NextJS', 'Supabase', 'Stripe API', 'Zustand'],
    links: [{ label: 'GitHub', url: 'https://github.com/chnnick/dreamstore' }],
  },
  {
    id: 'throwapin',
    name: 'ThrowAPin',
    tagline: 'Digital Road Trip Planner',
    date: 'Feb 2025',
    description:
      'Interactive road trip planner with 3D mapping and personalized itineraries.',
    features: [
      'Interactive 3D mapping with Three.js',
      'Google Places & Directions API integration',
      'User authentication and saved trip planning via Supabase',
      'Geospatial data with Leaflet.js/GeoJSON',
    ],
    tech: [
      'NextJS',
      'React',
      'TypeScript',
      'Three.js',
      'Leaflet.js',
      'Google APIs',
      'Supabase',
    ],
    links: [
      { label: 'throwapin.com', url: 'https://throwapin.com' },
      { label: 'GitHub', url: 'https://github.com/NoHaxsJustAsian/throw-a-pin' },
    ],
    awards: [
      'Honorable Mention for Best Overall Project at HackBeanPot',
      'Won against 100+ contestants at a 36-hour hackathon (and won a mug!)',
    ],
  },
  {
    id: 'cipher-encryptor',
    name: 'Cipher Encryptor',
    tagline: 'Basic CLI Security Tool',
    date: 'Jan 2025',
    description:
      'Command-line encryption tool with cryptanalysis capabilities for penetration testing.',
    features: [
      'Vigenere and Caesar (ROT) cipher implementation',
      'Extended ASCII support with secure validation',
      'Brute-force attack capabilities for security testing',
      'Input validation and error handling',
    ],
    tech: ['Python', 'Cryptography', 'CLI Design'],
    links: [{ label: 'GitHub', url: 'https://github.com/chnnick/cipher-maker' }],
  },
  {
    id: 'mini-shell',
    name: 'Mini Shell in C',
    tagline: 'Northeastern Systems Project',
    date: 'Oct 2024',
    description:
      'Fully functional Linux shell with advanced process management and I/O capabilities.',
    features: [
      'Built-in commands (cd, help, prev, source)',
      'I/O redirection and pipe implementation',
      'Process management with fork/exec',
      'Command parsing and tokenization',
      'Concurrent command execution',
    ],
    tech: ['C', 'Linux System Calls (fork, exec, pipe, dup2)'],
  },
  {
    id: 'scrambler',
    name: 'Scrambler',
    tagline: 'CSV/Excel Anonymization Tool',
    date: 'Oct 2025',
    description:
      'A Python tool for anonymizing sensitive data in CSV and Excel files while preserving data structure and relationships. Perfect for creating test datasets, protecting privacy, and preparing data for sharing.',
    features: [
      'Anonymizes sensitive data across CSV/Excel and clipboard input while preserving data relationships via pandas',
      'Auto-detection for 10+ sensitive data types (SSN, PII, financial) using regex patterns and Faker library',
      'User-first CLI tool with Colorama styling, seed reproducibility, JSON rule usage, OpenPyXL excel sheet building',
      'Smart data detection for email, phone, name, SSN, address, date, ID, and numeric data',
      'Consistent mapping with seed-based reproducible results',
      'Clipboard support for direct Excel/Google Sheets processing',
      'Custom JSON rules to override automatic detection',
    ],
    tech: ['Python', 'pandas', 'Faker', 'OpenPyXL', 'Colorama', 'regex'],
    links: [{ label: 'GitHub', url: 'https://github.com/chnnick/scrambler' }],
  },
];
