export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Education {
  school: string;
  degree: string;
  minor?: string;
  gpa?: string;
  honors?: string[];
  graduation?: string;
}

export interface About {
  name: string;
  greeting: string;
  headshot: string;
  blurb: string[];
  education: Education;
  skills: SkillGroup[];
  seeking: string;
  interests: string[];
}

export const about: About = {
  name: 'Nick Chen',
  greeting: "Hey there! I'm Nick.",
  headshot: 'headshot.png',
  blurb: [
    "I'm a Cybersecurity student at Northeastern University, graduating May 2027.",
    'I am passionate about offensive and defensive security, software development, and compliance, with experience in all three.',
  ],
  education: {
    school: 'Northeastern University',
    degree: 'B.S. Cybersecurity',
    minor: 'Law & Public Policy',
    gpa: '3.70',
    honors: ["Dean's List"],
    graduation: 'May 2027',
  },
  skills: [
    {
      label: 'Languages',
      items: ['Java', 'JavaScript', 'TypeScript', 'C', 'Python', 'SQL', 'Go', 'Swift'],
    },
    {
      label: 'Security',
      items: [
        'BurpSuite',
        'MetaSploit',
        'IDA Pro',
        'WireShark',
        'NMap',
        'PowerBI',
        'Splunk',
        'Aravo',
        'Archer GRC',
      ],
    },
    {
      label: 'Tools/Frameworks',
      items: [
        'React',
        'NestJS',
        'NextJS',
        'AWS',
        'Supabase',
        'PostgreSQL',
        'MongoDB',
      ],
    },
  ],
  seeking: 'Seeking Summer 2026 & Fall 2026 opportunities!',
  interests: [
    'Teaching',
    'Building',
    'Reading philosophy',
    'Playing guitar',
    'Snowboarding',
    'Ping pong',
  ],
};
