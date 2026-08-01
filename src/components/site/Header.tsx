import type React from 'react';
import { about, contact, resumeUrl } from '../../content';

const asset = (file: string) => `${import.meta.env.BASE_URL}${file}`;

export const Header: React.FC = () => {
  const { education } = about;

  return (
    <header className="flex items-start gap-4">
      <img
        src={asset(about.headshot)}
        width={56}
        height={56}
        alt={`${about.name} headshot`}
        // Above the fold — index.html preloads this so the fetch starts during
        // HTML parse rather than waiting for React to mount.
        decoding="async"
        className="h-14 w-14 shrink-0 rounded-full object-cover"
      />

      <div className="min-w-0">
        <h1 className="text-[18px] font-medium leading-snug">{about.name}</h1>

        <p className="mt-0.5 text-[13px] text-muted">
          {education.degree} · {education.school}
          {education.graduation ? ` · ${education.graduation}` : ''}
        </p>

        <nav className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[13px]">
          {contact.map((c) => (
            <a
              key={c.kind}
              href={c.href}
              {...(c.kind === 'email' ? {} : { target: '_blank', rel: 'noreferrer' })}
            >
              {c.label.toLowerCase()}
            </a>
          ))}
          <a href={resumeUrl} target="_blank" rel="noreferrer">
            resume ↗
          </a>
        </nav>
      </div>
    </header>
  );
};
