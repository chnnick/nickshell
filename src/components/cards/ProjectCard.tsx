import React from 'react';
import type { Project } from '../../content';
import { Chip, TerminalPanel } from '../ui/TerminalPanel';

interface Props {
  project: Project;
  href?: string;
}

export const ProjectCard: React.FC<Props> = ({ project, href }) => {
  const header = href ?? `~/projects/${project.id}.txt`;
  return (
    <TerminalPanel header={header} accent="magenta">
      <div className="space-y-3 text-sm text-green-200">
        <div>
          <h3 className="text-fuchsia-300 text-base">{project.name}</h3>
          <p className="text-green-300">{project.tagline}</p>
          <p className="text-gray-400 text-xs mt-1">{project.date}</p>
        </div>

        {project.links?.length ? (
          <div className="flex flex-wrap gap-3 text-xs">
            {project.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        ) : null}

        {project.awards?.length ? (
          <div className="space-y-1">
            {project.awards.map((a) => (
              <p key={a} className="text-yellow-300 text-xs">
                ★ {a}
              </p>
            ))}
          </div>
        ) : null}

        <p>{project.description}</p>

        <div>
          <p className="text-yellow-300 text-xs">// features</p>
          <ul className="mt-1 space-y-1 pl-2">
            {project.features.map((f, i) => (
              <li key={i}>
                <span className="text-fuchsia-400 mr-2">›</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-yellow-300 text-xs">// tech</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <Chip key={t} accent="magenta">
                {t}
              </Chip>
            ))}
          </div>
        </div>
      </div>
    </TerminalPanel>
  );
};
