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
    "I am a student at Northeastern University, majoring in Cybersecurity with a minor in Law & Public Policy. I am passionate about offensive and defensive cybersecurity, software development, and exploring the impact of technology on our lives. I love to learn and teach!"
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
      label: 'Certifications',
      items: ['ISC2 Certified in Cybersecurity', 'CodePath Intermediate Cybersecurity'],
    },
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
