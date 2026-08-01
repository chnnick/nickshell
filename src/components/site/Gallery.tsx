import React, { useCallback, useState } from 'react';
import { galleryImages } from '../../content';
import { Lightbox } from './Lightbox';
import { Section } from './Section';

export const Gallery: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Warm the 1200px version on hover/focus so opening feels instantaneous.
  // Until then only the ~30 KB thumbnails are ever fetched.
  const prefetch = useCallback((src: string) => {
    const img = new Image();
    img.src = src;
  }, []);

  return (
    <Section label="outside work">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {galleryImages.map((image, i) => (
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
