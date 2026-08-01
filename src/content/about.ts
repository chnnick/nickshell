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
  greeting: "Hi! I'm Nick.",
  headshot: 'headshot-256.webp',
  blurb: [
    "I'm a Cybersecurity student at Northeastern University, graduating May 2027.",
    'I am passionate about offensive and defensive security, software development, and policy, with experience in each one!',
  ],
  education: {
    school: 'Northeastern University',
    degree: 'B.S. Cybersecurity',
    minor: 'Law & Public Policy',
    gpa: '3.72',
    honors: ["Dean's List"],
    graduation: 'May 2027',
  },
  skills: [
    {
      label: 'Languages',
      items: ['Java', 'JavaScript', 'TypeScript', 'C', 'Python', 'Terraform', 'SQL', 'Bash'],
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
        'React Native',
        'NestJS',
        'NextJS',
        'FastAPI',
        'AWS',
        'Supabase',
        'MongoDB',
      ],
    },
  ],
  seeking: 'Seeking opportunities starting Summer 2027!',
  interests: [
    'The 1975',
    'Youth Education',
    'Philosophy',
    'Classical Guitar',
    'Snowboarding',
    'Ping Pong',
    'Electronic Music'
  ],
};
