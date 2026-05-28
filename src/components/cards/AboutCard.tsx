import React from 'react';
import { about } from '../../content';
import { contact } from '../../content';
import { Chip, TerminalPanel } from '../ui/TerminalPanel';

const base = import.meta.env.BASE_URL;

export const AboutCard: React.FC = () => {
  return (
    <TerminalPanel header="~/about-me.txt" accent="green">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`${base}${about.headshot}`}
          alt={about.name}
          className="w-48 h-48 rounded-md object-cover border border-green-500/30 self-center md:self-start"
        />
        <div className="flex-1 space-y-4 text-sm text-green-200 leading-relaxed">
          <div>
            <p className="text-cyan-300 text-base">{about.greeting}</p>
            {about.blurb.map((line, i) => (
              <p key={i} className="mt-2">
                {line}
              </p>
            ))}
          </div>

          <div>
            <p className="text-yellow-300">// education</p>
            <p>
              {about.education.degree}, {about.education.school}
              {about.education.graduation ? ` (${about.education.graduation})` : ''}
            </p>
            {about.education.minor && <p>Minor: {about.education.minor}</p>}
            {about.education.gpa && <p>GPA: {about.education.gpa}</p>}
            {about.education.honors?.length ? (
              <p>Honors: {about.education.honors.join(', ')}</p>
            ) : null}
          </div>

          {about.skills.map((group) => (
            <div key={group.label}>
              <p className="text-yellow-300">// {group.label.toLowerCase()}</p>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <Chip key={item} accent="cyan">
                    {item}
                  </Chip>
                ))}
              </div>
            </div>
          ))}

          <div>
            <p className="text-yellow-300">// interests</p>
            <p>{about.interests.join(' · ')}</p>
          </div>

          <div>
            <p className="text-fuchsia-300">{about.seeking}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {contact.map((c) => (
                <a
                  key={c.kind}
                  href={c.href}
                  target={c.kind === 'email' ? undefined : '_blank'}
                  rel="noreferrer"
                  className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
                >
                  {c.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TerminalPanel>
  );
};
