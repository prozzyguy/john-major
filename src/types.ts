export type Product = {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  subcategory?: string;
  ram?: string;
  storage?: string;
  color?: string;
  variant?: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  inStock: boolean;
  description: string;
  specifications: Record<string, string>;
  featured?: boolean;
  new?: boolean;
  popular?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  order_number: string;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  notes?: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  status: string;
  created_at: string;
};
