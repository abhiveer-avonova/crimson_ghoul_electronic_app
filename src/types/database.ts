// ==============================================================================
// Crimson Ghoul Electronics: TypeScript Database Definitions
// ==============================================================================

export type UserRole = 'customer' | 'admin';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface ShippingAddress {
  fullName?: string;
  streetAddress?: string;
  apartment?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  shipping_address: ShippingAddress;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_key: string; // References STORE_ASSETS key in src/lib/assets.ts
  created_at: string;
}

export interface ElectronicsSpecs {
  processor?: string;
  ram?: string;
  storage?: string;
  graphics?: string;
  display?: string;
  battery?: string;
  camera?: string;
  cooling?: string;
  power?: string;
  sensor?: string;
  pollingRate?: string;
  switches?: string;
  driver?: string;
  frequencyResponse?: string;
  panel?: string;
  resolution?: string;
  refreshRate?: string;
  responseTime?: string;
  hdr?: string;
  ports?: string[];
  connectivity?: string[];
  waterResistance?: string;
  weight?: string;
  warranty?: string;
  [key: string]: unknown;
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  brand: string;
  description: string;
  price: number;
  specs: ElectronicsSpecs;
  image_keys: string[]; // References STORE_ASSETS keys
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  category?: Category | null;
  inventory?: Inventory | null;
}

export interface Inventory {
  product_id: string;
  sku: string;
  stock_quantity: number;
  low_stock_threshold: number;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  quantity: number;
  unit_price: number;
  product?: Product | null;
}

export interface Order {
  id: string;
  user_id: string | null;
  status: OrderStatus;
  total_amount: number;
  currency: string;
  stripe_payment_intent_id: string | null;
  stripe_session_id: string | null;
  shipping_details: ShippingAddress;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface WishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product?: Product;
}

