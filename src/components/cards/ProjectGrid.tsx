import React from 'react';
import { projects } from '../../content';
import { ProjectCard } from './ProjectCard';

export const ProjectGrid: React.FC = () => (
  <div className="grid gap-4 md:grid-cols-2">
    {projects.map((p) => (
      <ProjectCard key={p.id} project={p} />
    ))}
  </div>
);
