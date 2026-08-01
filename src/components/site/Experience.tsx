import type React from 'react';
import { experiences, type Experience as Role } from '../../content';
import { Marker, Section } from './Section';

/** Compact left-column label: "now" for current roles, otherwise the end year. */
const endLabel = (role: Role) =>
  role.endDate.toLowerCase() === 'present' ? 'now' : role.endDate.split(' ').pop();

export const Experience: React.FC = () => (
  <Section label="experience">
    <div className="space-y-1">
      {experiences.map((role) => (
        <details key={role.id} className="group">
          <summary className="flex items-baseline gap-x-4 py-1">
            <span className="w-12 shrink-0 text-[13px] text-muted">{endLabel(role)}</span>
            <span className="min-w-0 flex-1">
              <span className="block">{role.role}</span>
              <span className="block text-muted">@ {role.company}</span>
            </span>
            <Marker />
          </summary>

          <div className="mb-3 ml-0 pl-0 sm:ml-16">
            <p className="text-[13px] text-muted">
              {role.startDate} – {role.endDate} · {role.location}
            </p>

            <ul className="mt-2 space-y-1">
              {role.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span aria-hidden className="text-muted">
                    –
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {role.keyAreas?.length ? (
              <p className="mt-2 text-[13px] text-muted">{role.keyAreas.join(' · ')}</p>
            ) : null}

            {role.tools?.length ? (
              <p className="mt-1 text-[13px] text-muted">{role.tools.join(' · ')}</p>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  </Section>
);
