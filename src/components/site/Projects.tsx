import React, { useState } from 'react';
import { projects } from '../../content';
import { Marker, Section } from './Section';

/** Projects shown before the reader asks for the rest. */
const INITIAL_COUNT = 3;

export const Projects: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? projects : projects.slice(0, INITIAL_COUNT);
  const hiddenCount = projects.length - INITIAL_COUNT;

  return (
    <Section label="projects">
      <div className="space-y-6">
        {visible.map((p) => (
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

      {hiddenCount > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-6 flex cursor-pointer items-baseline text-[13px] text-muted"
        >
          <span>{expanded ? 'show less' : `show ${hiddenCount} more`}</span>
          <span aria-hidden className="ml-3 shrink-0 select-none">
            {expanded ? '−' : '+'}
          </span>
        </button>
      ) : null}
    </Section>
  );
};
