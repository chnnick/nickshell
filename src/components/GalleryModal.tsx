import React, { useEffect, useState } from 'react';

interface GalleryImage {
  id: number;
  image_url: string;
  description: string;
}

interface Position {
  x: number;
  y: number;
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [positions, setPositions] = useState<Record<number, Position>>({});
  const [zIndices, setZIndices] = useState<Record<number, number>>({});
  const [maxZIndex, setMaxZIndex] = useState(1);
  const [visibleImages, setVisibleImages] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!isOpen) return;

    async function fetchImages() {
      try {
        const data = [
          { id: 1, image_url: `${import.meta.env.BASE_URL}gallery/halfmoonbay.png`, description: 'Half Moon Bay, CA' },
          { id: 2, image_url: `${import.meta.env.BASE_URL}gallery/northeastern.png`, description: 'Boston, MA' },
          { id: 3, image_url: `${import.meta.env.BASE_URL}gallery/tahoe.png`, description: 'Tahoe, CA' },
          { id: 4, image_url: `${import.meta.env.BASE_URL}gallery/waikiki.png`, description: 'Waikiki Beach, HI' }, 
          { id: 5, image_url: `${import.meta.env.BASE_URL}gallery/olympus.png`, description: 'Mount Olympus, Greece' },
          { id: 6, image_url: `${import.meta.env.BASE_URL}gallery/sofia.png`, description: 'Sofia, Bulgaria' },
          { id: 7, image_url: `${import.meta.env.BASE_URL}gallery/marthasvineyard.png`, description: 'Martha\'s Vineyard, MA' },
          { id: 8, image_url: `${import.meta.env.BASE_URL}gallery/madrid.png`, description: 'Madrid, Spain' },
          { id: 10, image_url: `${import.meta.env.BASE_URL}gallery/osaka.png`, description: 'Osaka, Japan' },
          { id: 11, image_url: `${import.meta.env.BASE_URL}gallery/kyoto.png`, description: 'Kyoto, Japan' },
          { id: 12, image_url: `${import.meta.env.BASE_URL}gallery/tokyo.png`, description: 'Tokyo, Japan' },
        ];

        setImages(data || []);
        
        // Initialize random positions and z-indices
        const initialPositions: Record<number, Position> = {};
        const initialZIndices: Record<number, number> = {};
        data?.forEach((image) => {
          initialPositions[image.id] = getRandomPosition();
          initialZIndices[image.id] = Math.floor(Math.random() * 1000);
        });
        setPositions(initialPositions);
        setZIndices(initialZIndices);
        setMaxZIndex(Math.max(...Object.values(initialZIndices)));

        // Start sequential fade-in animation
        data?.forEach((image, index) => {
          setTimeout(() => {
            setVisibleImages(prev => ({
              ...prev,
              [image.id]: true
            }));
          }, 200 * index); // 200ms delay between each image
        });
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [isOpen]);

  // Function to generate random position within bounds
  const getRandomPosition = () => {
    const modalWidth = 800; // Modal content width
    const modalHeight = 600; // Modal content height
    const imageSize = 192; // 48 * 4 (w-48 h-48)
    const padding = 100; // Padding from edges
    
    // Calculate available space
    const maxX = modalWidth - imageSize - padding;
    const maxY = modalHeight - imageSize - padding;
    
    // Center the spawn area and add randomness
    const centerX = modalWidth / 2;
    const centerY = modalHeight / 2;
    
    return {
      x: centerX + (Math.random() - 0.5) * maxX,
      y: centerY + (Math.random() - 0.5) * maxY,
    };
  };

  const handleDragStart = (e: React.DragEvent, imageId: number) => {
    // Set the drag image to be invisible
    const dragImg = document.createElement('img');
    dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImg, 0, 0);
    
    // Bring the dragged image to front
    const newZIndices = { ...zIndices };
    newZIndices[imageId] = maxZIndex + 1;
    setZIndices(newZIndices);
    setMaxZIndex(maxZIndex + 1);
  };

  const handleDrag = (e: React.DragEvent, imageId: number) => {
    if (e.clientX === 0 && e.clientY === 0) return; // Ignore invalid positions
    
    // Get the modal container bounds
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-5xl w-full h-[95vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">people, places, and such</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="flex-1 overflow-hidden p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-400"></div>
            </div>
          ) : (
            <div className="modal-content relative w-full h-full overflow-hidden bg-gray-800 rounded-lg">
              {images.map((image) => {
                const position = positions[image.id] || getRandomPosition();
                return (
                  <div
                    key={image.id}
                    className={`absolute cursor-move group transition-opacity duration-1000 ${
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
                        <p className="text-sm text-center bg-black bg-opacity-50 rounded px-2 py-1">{image.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
