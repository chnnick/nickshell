import React, { useEffect, useState } from 'react';
import { galleryImages, type GalleryImage } from '../content/gallery';

interface Position {
  x: number;
  y: number;
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Function to generate random position within bounds
const getRandomPosition = (): Position => {
  const modalWidth = 800;
  const modalHeight = 600;
  const imageSize = 192; // 48 * 4 (w-48 h-48)
  const padding = 100;

  const maxX = modalWidth - imageSize - padding;
  const maxY = modalHeight - imageSize - padding;
  const centerX = modalWidth / 2;
  const centerY = modalHeight / 2;

  return {
    x: centerX + (Math.random() - 0.5) * maxX,
    y: centerY + (Math.random() - 0.5) * maxY,
  };
};

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [positions, setPositions] = useState<Record<number, Position>>({});
  const [zIndices, setZIndices] = useState<Record<number, number>>({});
  const [maxZIndex, setMaxZIndex] = useState(1);
  const [visibleImages, setVisibleImages] = useState<Record<number, boolean>>({});
  // Drives the container fade/scale-in on open and fade-out on close.
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const data = galleryImages;
    setImages(data);

    const initialPositions: Record<number, Position> = {};
    const initialZIndices: Record<number, number> = {};
    data.forEach((image) => {
      initialPositions[image.id] = getRandomPosition();
      initialZIndices[image.id] = Math.floor(Math.random() * 1000);
    });
    setPositions(initialPositions);
    setZIndices(initialZIndices);
    setMaxZIndex(Math.max(1, ...Object.values(initialZIndices)));

    // Container entrance on the next frame so the transition runs.
    const enter = window.setTimeout(() => setEntered(true), 20);

    // Staggered photo fade-in (snappy: ~90ms between each).
    const timers = data.map((image, index) =>
      window.setTimeout(() => {
        setVisibleImages((prev) => ({ ...prev, [image.id]: true }));
      }, 250 + 90 * index),
    );

    return () => {
      window.clearTimeout(enter);
      timers.forEach(window.clearTimeout);
    };
  }, [isOpen]);

  // Fade the container out, then unmount via onClose.
  const handleClose = () => {
    setEntered(false);
    window.setTimeout(onClose, 250);
  };

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleDragStart = (e: React.DragEvent, imageId: number) => {
    const dragImg = document.createElement('img');
    dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImg, 0, 0);

    const newZIndices = { ...zIndices };
    newZIndices[imageId] = maxZIndex + 1;
    setZIndices(newZIndices);
    setMaxZIndex(maxZIndex + 1);
  };

  const handleDrag = (e: React.DragEvent, imageId: number) => {
    if (e.clientX === 0 && e.clientY === 0) return; // Ignore invalid positions

    const modalContainer = e.currentTarget.closest('.modal-content');
    if (!modalContainer) return;

    const rect = modalContainer.getBoundingClientRect();
    const newPositions = { ...positions };
    newPositions[imageId] = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setPositions(newPositions);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 p-2 transition-opacity duration-300 ${
        entered ? 'bg-opacity-50 bg-black' : 'bg-opacity-0 bg-black'
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-gray-900 border border-gray-700 rounded-lg max-w-5xl w-full h-[95vh] flex flex-col transition-all duration-300 ${
          entered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">people, places, and such</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="modal-content relative w-full h-full overflow-hidden bg-gray-800 rounded-lg">
            {images.map((image) => {
              const position = positions[image.id] || getRandomPosition();
              return (
                <div
                  key={image.id}
                  className={`absolute cursor-move group transition-opacity duration-700 ${
                    visibleImages[image.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: zIndices[image.id] || 1,
                  }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, image.id)}
                  onDrag={(e) => handleDrag(e, image.id)}
                >
                  <div className="relative w-48 h-48">
                    <img
                      src={image.image_url}
                      alt={image.description || 'Gallery image'}
                      className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 w-full h-full"
                    />
                    <div className="absolute -bottom-8 left-0 right-0 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm text-center bg-black bg-opacity-50 rounded px-2 py-1">
                        {image.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
