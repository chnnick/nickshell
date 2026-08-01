import React, { useCallback, useEffect, useRef } from 'react';
import type { GalleryImage } from '../../content';

interface Props {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export const Lightbox: React.FC<Props> = ({ images, index, onClose, onIndexChange }) => {
  const image = images[index];
  const closeRef = useRef<HTMLButtonElement>(null);

  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + images.length) % images.length),
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // Lock background scroll while open. `scrollbar-gutter: stable` on <html>
  // (index.css) means this can't shift the page underneath.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.description}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-overlay p-4"
      onClick={onClose}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 text-[13px] text-muted hover:text-fg"
      >
        close ✕
      </button>

      {/* Arrows sit in the same row as the photo so they hug its edges and stay
          put when the caption below reflows. */}
      <div className="flex max-w-full items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="shrink-0 px-3 py-6 text-[13px] text-muted hover:text-fg"
        >
          ←
        </button>

        <img
          // Keying on src drops the previous decoded frame instead of showing a
          // stale image while the next one loads.
          key={image.full}
          src={image.full}
          alt={image.description}
          width={1000}
          height={1000}
          decoding="async"
          className="max-h-[78vh] min-w-0 w-auto max-w-full object-contain"
        />

        <button
          onClick={() => go(1)}
          aria-label="Next photo"
          className="shrink-0 px-3 py-6 text-[13px] text-muted hover:text-fg"
        >
          →
        </button>
      </div>

      <div
        className="flex flex-col items-center gap-3 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[13px]">{image.description}</span>
        <p className="text-[13px] text-muted">
          {index + 1} / {images.length}
        </p>
      </div>
    </div>
  );
};
