import React from 'react';
import type { Experience } from '../../content';
import { Chip, TerminalPanel } from '../ui/TerminalPanel';

const base = import.meta.env.BASE_URL;

interface Props {
  experience: Experience;
  href?: string;
}

export const ExperienceCard: React.FC<Props> = ({ experience, href }) => {
  const header = href ?? `~/experience/${experience.id}.txt`;
  return (
    <TerminalPanel header={header} accent="cyan">
      <div className="space-y-3 text-sm text-green-200">
        <div className="flex items-start gap-4">
          {experience.logo && (
            <img
              src={`${base}${experience.logo}`}
              alt={`${experience.company} logo`}
              className="w-16 h-16 rounded-md object-cover border border-cyan-500/30 shrink-0"
            />
          )}
          <div className="flex-1">
            <h3 className="text-cyan-300 text-base">{experience.role}</h3>
            <p className="text-green-300">@ {experience.company}</p>
            <p className="text-gray-400 text-xs mt-1">
              {experience.startDate} – {experience.endDate} · {experience.location}
            </p>
          </div>
        </div>

        <ul className="space-y-1 pl-2">
          {experience.bullets.map((b, i) => (
            <li key={i} className="text-green-200">
              <span className="text-cyan-400 mr-2">›</span>
              {b}
            </li>
          ))}
        </ul>

        {experience.keyAreas?.length ? (
          <div>
            <p className="text-yellow-300 text-xs">// key areas</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {experience.keyAreas.map((a) => (
                <Chip key={a} accent="yellow">
                  {a}
                </Chip>
              ))}
            </div>
          </div>
        ) : null}

        {experience.tools?.length ? (
          <div>
            <p className="text-yellow-300 text-xs">// tools</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {experience.tools.map((t) => (
                <Chip key={t} accent="cyan">
                  {t}
                </Chip>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </TerminalPanel>
  );
};
