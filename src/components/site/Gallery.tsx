import React, { useCallback, useEffect, useState } from 'react';
import { galleryImages } from '../../content';
import { Lightbox } from './Lightbox';
import { Section } from './Section';

/** Rows of photos shown before the reader asks for the rest. */
const INITIAL_ROWS = 3;

/** Tailwind's `sm`, where the grid below goes from 2 columns to 3. */
const SM = '(min-width: 640px)';

export const Gallery: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  // The collapsed view is three *rows*, so it has to follow the column count —
  // slicing to a fixed number would give 4.5 rows on mobile.
  const [columns, setColumns] = useState(() => (window.matchMedia(SM).matches ? 3 : 2));
  useEffect(() => {
    const mq = window.matchMedia(SM);
    const sync = () => setColumns(mq.matches ? 3 : 2);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const initialCount = INITIAL_ROWS * columns;
  const visible = expanded ? galleryImages : galleryImages.slice(0, initialCount);
  const hiddenCount = galleryImages.length - initialCount;

  // Warm the 1200px version on hover/focus so opening feels instantaneous.
  // Until then only the ~30 KB thumbnails are ever fetched.
  const prefetch = useCallback((src: string) => {
    const img = new Image();
    img.src = src;
  }, []);

  return (
    <Section label="My 5-9">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {visible.map((image, i) => (
          <button
            key={image.id}
            onClick={() => setOpenIndex(i)}
            onMouseEnter={() => prefetch(image.full)}
            onFocus={() => prefetch(image.full)}
            aria-label={`Open ${image.description}`}
            className="group block overflow-hidden rounded bg-surface"
          >
            <img
              src={image.thumb}
              alt={image.description}
              width={400}
              height={400}
              loading="lazy"
              decoding="async"
              className="aspect-square h-full w-full object-cover transition-opacity duration-150 group-hover:opacity-80"
            />
          </button>
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

      {openIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onIndexChange={setOpenIndex}
        />
      )}
    </Section>
  );
};
