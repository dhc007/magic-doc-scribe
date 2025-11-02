import { Product } from '@/types/product';
import cycle1 from '@/assets/cycle-1.jpg';
import cycle2 from '@/assets/cycle-2.jpg';
import cycle3 from '@/assets/cycle-3.jpg';

export const products: Product[] = [
  {
    id: 'city-cruiser',
    name: 'City Cruiser',
    shortDescription: 'Perfect for daily commuting and city rides',
    image: cycle1,
    category: 'cycle',
    features: [
      '50 km range per charge',
      'Lightweight aluminum frame',
      'Disc brakes',
      'LED headlight & taillight'
    ],
    price: {
      daily: 299,
      weekly: 1799,
      monthly: 5999
    },
    deposit: 3000
  },
  {
    id: 'eco-rider',
    name: 'Eco Rider',
    shortDescription: 'Eco-friendly and efficient for all terrains',
    image: cycle2,
    category: 'cycle',
    features: [
      '60 km range per charge',
      'Shock absorption',
      'Digital display',
      'USB charging port'
    ],
    price: {
      daily: 349,
      weekly: 1999,
      monthly: 6999
    },
    deposit: 3500
  },
  {
    id: 'mountain-pro',
    name: 'Mountain Pro',
    shortDescription: 'Built for adventure and rough terrains',
    image: cycle3,
    category: 'cycle',
    features: [
      '70 km range per charge',
      'All-terrain tires',
      'Premium suspension',
      'GPS tracking'
    ],
    price: {
      daily: 449,
      weekly: 2499,
      monthly: 8999
    },
    deposit: 5000
  }
];
