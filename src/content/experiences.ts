export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  logo?: string;
  bullets: string[];
  keyAreas?: string[];
  tools?: string[];
}

export const experiences: Experience[] = [
  {
    id: 'Liberty_Mutual_Insurance',
    company: 'Liberty Mutual Insurance',
    role: 'Cybersecurity Audit Co-Op',
    startDate: 'Jul 2025',
    endDate: 'Dec 2025',
    location: 'Boston, MA',
    logo: 'libertylogo.webp',
    bullets: [
      'Audit 17 enterprise cybersecurity policies across 4 SBUs for compliance',
      'Evaluate SDLC/DevOps security controls, and check IAM procedures using PowerBI, Aravo, Archer GRC',
      'Led Continuous Improvement initiatives, developed multiple AI agents for enhancing audit efficiency',
      'Updated 5+ onboarding IAM procedures for future new-hires',
    ],
    keyAreas: [
      'Cybersecurity Policy',
      'Application Security',
      'Change Management',
      'Backup/DR',
      'MFA',
      'Third-Party Vendor Risk',
      'Secrets Management',
    ],
    tools: ['PowerBI', 'Aravo', 'Archer GRC', 'AWS', 'Azure'],
  },
  {
    id: 'Code4Community',
    company: 'Code4Community',
    role: 'Full Stack Software Engineer',
    startDate: 'May 2025',
    endDate: 'Present',
    location: 'Boston, MA',
    logo: 'c4clogo.webp',
    bullets: [
      'Built NestJS/PostgreSQL/TypeORM backend with TypeScript/React frontend',
      'Developed recruitment portal for 70+ members across 3+ subteams',
      'Led TypeScript/React workshop for 80+ underclassmen',
      'Built backend for 9-week project-based curriculum',
    ],
    tools: ['NestJS', 'PostgreSQL', 'TypeORM', 'Jest', 'TypeScript', 'React'],
  },
  {
    id: 'FirstByte',
    company: 'FirstByte',
    role: 'President',
    startDate: 'Apr 2025',
    endDate: 'Present',
    location: 'Boston, MA',
    logo: 'firstbytelogo.webp',
    bullets: [
      'Lead 5 subteams, partnerships with 2 Boston youth organizations',
      'Increased potential partners by 200%, recruited 20+ new members',
      'Founded full-stack web dev curriculum for high school students',
      'Taught web development to 40+ students, presented at university hackathon',
      'Previously: React Team Mentor (founded React curriculum with Supabase) and Web Developer (rebuilt site in React/TypeScript/NextJS)',
    ],
    keyAreas: ['Teaching', 'Curriculum Development', 'Web Development', 'Leadership'],
  },
];
