import React, { useState } from 'react';
import { galleryImages } from '../../content';
import { Lightbox } from '../site/Lightbox';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * What `./mystery` launches. Reuses the site's Lightbox — inside the terminal
 * route's `.theme-terminal` scope its backdrop resolves dark, so it reads as a
 * photo viewer rather than a page overlay.
 */
export const GalleryApp: React.FC<Props> = ({ isOpen, onClose }) => {
  const [index, setIndex] = useState(0);
  if (!isOpen) return null;

  return (
    <Lightbox
      images={galleryImages}
      index={index}
      onClose={onClose}
      onIndexChange={setIndex}
    />
  );
};
