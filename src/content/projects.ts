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

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/** Turns a "MMM YYYY" date into a sortable number. */
const dateKey = (date: string): number => {
  const [month, year] = date.split(' ');
  return Number(year) * 12 + MONTHS.indexOf(month);
};

const allProjects: Project[] = [
  {
    id: 'cloudsight',
    name: 'CloudSight',
    tagline: 'AWS Misconfiguration Scanner',
    date: 'Apr 2026',
    description:
      'Dockerized full-stack cloud security scanner that detects misconfigurations across EC2, S3, Lambda, and IAM.',
    features: [
      '8+ checks for AWS risks: IMDSv1 exposure, public S3 access, hardcoded Lambda secrets',
      'Neo4j-backed interactive attack graph to visualize findings and blast radius',
      'Validated against isolated CloudGoat AWS test scenarios',
      'Terraform-provisioned test environment with boto3 collection layer',
    ],
    tech: ['FastAPI', 'React', 'Neo4j', 'Docker', 'boto3', 'Terraform'],
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/chnnick/AWS-Misconfiguration-Scanner',
      },
    ],
  },
  {
    id: 'flock',
    name: 'flock',
    tagline: 'Shared Commute Connector',
    date: 'Feb 2026',
    description:
      'Mobile app for coordinating shared commutes, built at HackBeanPot with end-to-end authentication.',
    features: [
      'Led design and implementation of end-to-end auth for the mobile app',
      'Auth0 SDK in React Native with JWT validation enforced on FastAPI endpoints',
      'Google OAuth sign-in integration',
      'Auth0 Management API for full account deletion cascading across MongoDB',
      'API deployed on Railway',
    ],
    tech: ['FastAPI', 'React Native', 'MongoDB', 'Auth0', 'Railway'],
    links: [
      { label: 'DevPost', url: 'https://devpost.com/software/flock-b6vmnp' },
      { label: 'GitHub', url: 'https://github.com/chnnick/flock' },
    ],
    awards: ['MLH Best Use of Auth0 at HackBeanPot'],
  },
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
    tech: [
      'React',
      'TypeScript',
      'NextJS',
      'Supabase',
      'Stripe API',
      'Zustand',
    ],
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
      {
        label: 'GitHub',
        url: 'https://github.com/NoHaxsJustAsian/throw-a-pin',
      },
    ],
    awards: [
      'Honorable Mention for Best Overall Project at HackBeanPot (Got a mug)',
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
    links: [
      { label: 'GitHub', url: 'https://github.com/chnnick/cipher-maker' },
    ],
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

/** Ordered by date alone, most recent first. */
export const projects: Project[] = [...allProjects].sort(
  (a, b) => dateKey(b.date) - dateKey(a.date),
);
