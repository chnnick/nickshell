import type React from 'react';
import { topArtists, topTracks } from '../../content';
import { Row, Section } from './Section';

export const Music: React.FC = () => {
  // The snapshot is empty until scripts/fetch-spotify.mjs has run, and stays
  // empty if Spotify was unreachable at build time. Drop the whole section
  // rather than render a heading with nothing under it.
  if (!topTracks.length && !topArtists.length) return null;

  return (
    <Section label="music">
      <dl className="space-y-2">
        {topTracks.length ? (
          // Ordered because the ranking is the point, but the markers stay
          // hidden — "top 3" in the label already says it.
          <Row label="songs">
            <ol className="space-y-1">
              {topTracks.map((t) => (
                <li key={t.url}>
                  <a href={t.url} target="_blank" rel="noreferrer">
                    {t.name} <span className="text-muted">— {t.artist}</span> ↗
                  </a>
                </li>
              ))}
            </ol>
          </Row>
        ) : null}

        {topArtists.length ? (
          <Row label="artists">
            <ol className="space-y-1">
              {topArtists.map((a) => (
                <li key={a.url}>
                  <a href={a.url} target="_blank" rel="noreferrer">
                    {a.name} ↗
                  </a>
                </li>
              ))}
            </ol>
          </Row>
        ) : null}
      </dl>
    </Section>
  );
};
