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
    id: 'Klaviyo',
    company: 'Klaviyo',
    role: 'Security Risk Co-op',
    startDate: 'Jul 2026',
    endDate: 'Present',
    location: 'Boston, MA',
    logo: 'klaviyologo.webp',
    bullets: [
      'Working with both the Trust and Compliance and Risk teams to connect their GRC and Risk Management platforms',
    ],
    keyAreas: [
      'Risk Management',
      'GRC',
      'AWS',
      'Secrets Management',
      'Security Policy',
      'Data Engineering',
    ],
    tools: ['Snowflake', 'GitHub Actions', 'AWS', 'Terraform'],
  },
  {
    id: 'Code4Community',
    company: 'Code4Community',
    role: 'Software Engineer → Technical Lead',
    startDate: 'May 2025',
    endDate: 'Present',
    location: 'Boston, MA',
    logo: 'c4clogo.webp',
    bullets: [
      'Building out software for nonprofits around the Boston area: Boston Healthcare for the Homeless Program, FriendshipWorks',
      'Designed and implemented authentication and authorization flows for both organization partner applications and scaffolding for future projects',
    ],
    keyAreas: ['Authentication/Authorization', 'RBAC', 'API Development', 'Mentorship'],
    tools: [
      'NestJS',
      'PostgreSQL',
      'TypeORM',
      'AWS Cognito',
      'Jest',
      'Postman',
      'TypeScript',
      'React',
    ],
  },
  {
    id: 'FirstByte',
    company: 'FirstByte',
    role: 'President',
    startDate: 'Sep 2024',
    endDate: 'Present',
    location: 'Boston, MA',
    logo: 'firstbytelogo.webp',
    bullets: [
      'Lead 5 teams to bring CS/STEM accessibility to the greater Boston Area at different youth development organization for K-12 students',
      'Drove organization partners increase over 150%, developed internal engineering team, led multiple foundational Computer Science workshops'
    ],
    keyAreas: ['Teaching', 'Curriculum Development', 'Web Development', 'Leadership'],
  },
  {
    id: 'Cybersecurity_and_Privacy_Institute',
    company: 'Cybersecurity and Privacy Institute at Northeastern (Mon(IOT)r Group)',
    role: 'Cybersecurity Research Assistant',
    startDate: 'Jan 2026',
    endDate: 'May 2026',
    location: 'Boston, MA',
    bullets: [
      'Researched the network transmissions of over 80+ industry-standard IoT devices',
    ],
    keyAreas: ['IoT Security', 'Network Traffic Analysis', 'Privacy Research'],
    tools: ['Python', 'dpkt', 'cymruwhois', 'pandas', 'MaxMind GeoLite'],
  },
  {
    id: 'Liberty_Mutual_Insurance',
    company: 'Liberty Mutual Insurance',
    role: 'Cybersecurity and Technology Audit Co-Op',
    startDate: 'Jul 2025',
    endDate: 'Dec 2025',
    location: 'Boston, MA',
    logo: 'libertylogo.webp',
    bullets: [
      'Led testworks for Foreign and State Cybersecurity regulation compliance, client audit evidence and access group remediation requests'
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
];
