export type RentalDuration = 'daily' | 'weekly' | 'monthly';

export interface ProductPrice {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
  category: 'cycle' | 'accessory' | 'package';
  features: string[];
  price: ProductPrice;
  deposit: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  duration: RentalDuration;
}

export interface PartnerInfo {
  partnerId?: string;
  partnerName?: string;
  sourceType?: string;
}
