import React from 'react';
import { experiences, projects } from '../../content';
import { AboutCard } from '../cards/AboutCard';
import { ContactCard } from '../cards/ContactCard';
import { ExperienceCard } from '../cards/ExperienceCard';
import { ExperienceList } from '../cards/ExperienceList';
import { HomeCard } from '../cards/HomeCard';
import { ProjectCard } from '../cards/ProjectCard';
import { ProjectGrid } from '../cards/ProjectGrid';
import { breadcrumbForView, type View, type ViewAction } from './viewActions';

interface Props {
  view: View;
  onNavigate: (action: ViewAction) => void;
}

const NotFound: React.FC<{ message: string }> = ({ message }) => (
  <p className="text-red-400 font-mono text-sm">{message}</p>
);

export const ContentPane: React.FC<Props> = ({ view, onNavigate }) => {
  const breadcrumb = breadcrumbForView(view);

  let body: React.ReactNode = null;
  switch (view.kind) {
    case 'home':
      body = <HomeCard onNavigate={onNavigate} />;
      break;
    case 'about':
      body = <AboutCard />;
      break;
    case 'experience':
      body = <ExperienceList />;
      break;
    case 'experience-item': {
      const exp = experiences.find((e) => e.id === view.id);
      body = exp ? (
        <ExperienceCard experience={exp} />
      ) : (
        <NotFound message={`cat: experience/${view.id}.txt: No such file or directory`} />
      );
      break;
    }
    case 'projects':
      body = <ProjectGrid />;
      break;
    case 'project-item': {
      const p = projects.find((x) => x.id === view.id);
      body = p ? (
        <ProjectCard project={p} />
      ) : (
        <NotFound message={`cat: projects/${view.id}.txt: No such file or directory`} />
      );
      break;
    }
    case 'contact':
      body = <ContactCard />;
      break;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <div className="font-mono text-xs text-gray-500">
        <span className="text-green-500">chnnick@portfolio</span>:
        <span className="text-cyan-400">{breadcrumb}</span>$
      </div>
      {body}
    </div>
  );
};
