import type React from 'react';
import { projects } from '../../content';
import { Marker, Section } from './Section';

export const Projects: React.FC = () => (
  <Section label="projects">
    <div className="space-y-6">
      {projects.map((p) => (
        <article key={p.id}>
          <div className="flex items-baseline gap-x-4">
            <h3 className="min-w-0 flex-1 font-medium">
              {p.name} <span className="font-normal text-muted">— {p.tagline}</span>
            </h3>
            <span className="shrink-0 text-[13px] text-muted">{p.date}</span>
          </div>

          <p className="mt-1 text-[13px] text-muted">{p.tech.join(' · ')}</p>

          {/* Links stay outside the disclosure so they're always one click away. */}
          {p.links?.length ? (
            <p className="mt-1 flex flex-wrap gap-x-3 text-[13px]">
              {p.links.map((l) => (
                <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </p>
          ) : null}

          <details className="mt-1">
            <summary className="flex items-baseline text-[13px] text-muted">
              <span>details</span>
              <Marker />
            </summary>

            <div className="mt-2">
              <p>{p.description}</p>

              <ul className="mt-2 space-y-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden className="text-muted">
                      –
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              {p.awards?.length ? (
                <ul className="mt-2 space-y-1 text-[13px] text-muted">
                  {p.awards.map((a) => (
                    <li key={a}>★ {a}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </details>
        </article>
      ))}
    </div>
  </Section>
);
