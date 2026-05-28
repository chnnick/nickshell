export interface GalleryImage {
  id: number;
  image_url: string;
  description: string;
}

const base = import.meta.env.BASE_URL;

export const galleryImages: GalleryImage[] = [
  { id: 1, image_url: `${base}gallery/halfmoonbay.png`, description: 'Half Moon Bay, CA' },
  { id: 2, image_url: `${base}gallery/northeastern.png`, description: 'Boston, MA' },
  { id: 3, image_url: `${base}gallery/tahoe.png`, description: 'Tahoe, CA' },
  { id: 4, image_url: `${base}gallery/waikiki.png`, description: 'Waikiki Beach, HI' },
  { id: 5, image_url: `${base}gallery/olympus.png`, description: 'Mount Olympus, Greece' },
  { id: 6, image_url: `${base}gallery/sofia.png`, description: 'Sofia, Bulgaria' },
  { id: 7, image_url: `${base}gallery/marthasvineyard.png`, description: "Martha's Vineyard, MA" },
  { id: 8, image_url: `${base}gallery/madrid.png`, description: 'Madrid, Spain' },
  { id: 10, image_url: `${base}gallery/osaka.png`, description: 'Osaka, Japan' },
  { id: 11, image_url: `${base}gallery/kyoto.png`, description: 'Kyoto, Japan' },
  { id: 12, image_url: `${base}gallery/tokyo.png`, description: 'Tokyo, Japan' },
];
