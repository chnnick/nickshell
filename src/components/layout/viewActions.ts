export type View =
  | { kind: 'home' }
  | { kind: 'about' }
  | { kind: 'experience' }
  | { kind: 'experience-item'; id: string }
  | { kind: 'projects' }
  | { kind: 'project-item'; id: string }
  | { kind: 'contact' };

export type ViewAction =
  | View
  | { kind: 'resume' }
  | { kind: 'mystery' };

export const commandForAction = (action: ViewAction): string => {
  switch (action.kind) {
    case 'home':
      return 'cd ~';
    case 'about':
      return 'cat about-me.txt';
    case 'experience':
      return 'ls experience';
    case 'experience-item':
      return `cat experience/${action.id}.txt`;
    case 'projects':
      return 'ls projects';
    case 'project-item':
      return `cat projects/${action.id}.txt`;
    case 'contact':
      return 'cat contact';
    case 'resume':
      return 'open resume.pdf';
    case 'mystery':
      return './mystery';
  }
};

export const breadcrumbForView = (view: View): string => {
  switch (view.kind) {
    case 'home':
      return '~';
    case 'about':
      return '~/about-me.txt';
    case 'experience':
      return '~/experience';
    case 'experience-item':
      return `~/experience/${view.id}.txt`;
    case 'projects':
      return '~/projects';
    case 'project-item':
      return `~/projects/${view.id}.txt`;
    case 'contact':
      return '~/contact';
  }
};
