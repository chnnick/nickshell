export type ContactKind = 'email' | 'linkedin' | 'github';

export interface ContactLink {
  label: string;
  href: string;
  kind: ContactKind;
  display: string;
}

export const contact: ContactLink[] = [
  {
    kind: 'email',
    label: 'Email',
    display: 'chen.nich@northeastern.edu',
    href: 'mailto:chen.nich@northeastern.edu',
  },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    display: 'linkedin.com/in/nckchen',
    href: 'https://www.linkedin.com/in/nckchen/',
  },
  {
    kind: 'github',
    label: 'GitHub',
    display: 'github.com/chnnick',
    href: 'https://github.com/chnnick',
  },
];
