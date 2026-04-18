// ─── Product & Style Data ───

export interface Product {
  id: number;
  brand: string;
  name: string;
  price: number;
  originalPrice: number | null;
  match: number;
  image: string;
  category: string;
}

export interface StyleTag {
  label: string;
  color: string;
  confidence: number;
  primary: boolean;
}

export const STYLE_TAGS: StyleTag[] = [
  { label: 'Streetwear',     color: '#0A84FF', confidence: 96, primary: true  },
  { label: 'Earth Tones',    color: '#8B7355', confidence: 87, primary: false },
  { label: 'Minimalist',     color: '#636366', confidence: 82, primary: false },
  { label: 'Casual Luxe',    color: '#A0916B', confidence: 78, primary: false },
  { label: 'Athleisure',     color: '#48484A', confidence: 65, primary: false },
  { label: 'Clean Lines',    color: '#2C2C2E', confidence: 58, primary: false },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    brand: 'COS',
    name: 'Linen-Blend Oversized Blazer',
    price: 175,
    originalPrice: 250,
    match: 96,
    image: '/assets/product_blazer.png',
    category: 'Jackets',
  },
  {
    id: 2,
    brand: 'Everlane',
    name: 'The Organic Cotton Crew',
    price: 38,
    originalPrice: null,
    match: 93,
    image: '/assets/product_tshirt.png',
    category: 'All',
  },
  {
    id: 3,
    brand: 'Arket',
    name: 'Relaxed Cargo Trousers',
    price: 89,
    originalPrice: 120,
    match: 91,
    image: '/assets/product_pants.png',
    category: 'All',
  },
  {
    id: 4,
    brand: 'Mansur Gavriel',
    name: 'Cloud Crossbody Bag',
    price: 295,
    originalPrice: null,
    match: 88,
    image: '/assets/product_bag.png',
    category: 'Accessories',
  },
  {
    id: 5,
    brand: 'Common Projects',
    name: 'Original Achilles Low',
    price: 340,
    originalPrice: 425,
    match: 85,
    image: '/assets/product_sneakers.png',
    category: 'Shoes',
  },
  {
    id: 6,
    brand: 'Auralee',
    name: 'Super Fine Wool Knit',
    price: 210,
    originalPrice: null,
    match: 82,
    image: '/assets/product_sweater.png',
    category: 'All',
  },
];

export const CATEGORIES = ['All', 'Jackets', 'Shoes', 'Accessories'] as const;

export const AI_PHRASES = [
  'Analyzing outfit...',
  'Detecting color palette...',
  'Matching silhouettes...',
  'Identifying trends...',
  'Curating picks for you...',
];
