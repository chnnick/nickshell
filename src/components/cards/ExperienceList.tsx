import React from 'react';
import { experiences } from '../../content';
import { ExperienceCard } from './ExperienceCard';

export const ExperienceList: React.FC = () => (
  <div className="space-y-4">
    {experiences.map((exp) => (
      <ExperienceCard key={exp.id} experience={exp} />
    ))}
  </div>
);
