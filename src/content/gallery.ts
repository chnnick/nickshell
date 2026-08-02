export interface GalleryImage {
  id: number;
  /** 400px WebP shown in the grid. */
  thumb: string;
  /** 1000px WebP, fetched only when the lightbox opens. */
  full: string;
  description: string;
}

const base = import.meta.env.BASE_URL;

// Both derivatives are generated from assets-src/gallery by `npm run images`.
const photo = (id: number, name: string, description: string): GalleryImage => ({
  id,
  thumb: `${base}gallery/${name}-400.webp`,
  full: `${base}gallery/${name}-1000.webp`,
  description,
});

export const galleryImages: GalleryImage[] = [
  photo(1, 'halfmoonbay', 'Half Moon Bay, CA'),
  photo(2, 'northeastern', 'Boston, MA'),
  photo(3, 'tahoe', 'Tahoe, CA'),
  photo(4, 'waikiki', 'Waikiki Beach, HI'),
  photo(5, 'olympus', 'Mount Olympus, Greece'),
  photo(6, 'sofia', 'Sofia, Bulgaria'),
  photo(7, 'marthasvineyard', "Martha's Vineyard, MA"),
  photo(8, 'madrid', 'Madrid, Spain'),
  photo(10, 'osaka', 'Osaka, Japan'),
  photo(11, 'kyoto', 'Kyoto, Japan'),
  photo(12, 'tokyo', 'Tokyo, Japan'),
  photo(13, 'kokohead', 'Koko Head, HI'),
  photo(14, 'halfdome', 'Half Dome, Yosemite, CA'),
  photo(15, 'diamondhead', 'Diamond Head, HI'),
];
