import { ProductCategory, ProductType } from './enums';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: Address;
  loyaltyPoints: number;
}

export interface Address {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export type ImageSource = number | { uri: string };

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  type: ProductType;
  price: number;
  images: ImageSource[];
  inStock: boolean;
  featured: boolean;
  onSale: boolean;
  salePrice?: number;
  // Product properties
  sku?: string;
  // Fabric specific properties
  composition?: string | {
    enchimento: string;
    revestimento: string;
    [key: string]: string;
  };
  width?: number; // in cm
  weight?: number; // in g/m²
  // Product dimensions
  dimensions?: string | {
    [key: string]: string;
  };
  variants?: Array<{
    id: string;
    name: string;
    dimensions: string;
    includes: string;
    price: number;
  }>;
  color: string;
  colors?: string[];
  pattern: string;
  brand?: string;
  unitCount?: number;
  features?: string[];
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  meters?: number; // for fabrics
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress: Address;
  createdAt: Date;
  estimatedDelivery: Date;
  trackingCode?: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'pix' | 'credit-card' | 'boleto';

export interface Filter {
  category?: ProductCategory;
  priceRange?: [number, number];
  color?: string;
  inStock?: boolean;
  onSale?: boolean;
}

export interface Favorite {
  id: string;
  userId: string;
  productId: string;
  addedAt: Date;
}
