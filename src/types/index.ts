// User Types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  role: 'customer' | 'admin' | 'super-admin';
  avatar?: string;
  addresses?: Address[];
  preferences?: UserPreferences;
  loyaltyPoints?: number;
  totalSpent?: number;
}

export interface Address {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber?: string;
  isDefault: boolean;
}

export interface UserPreferences {
  newsletter: boolean;
  smsNotifications: boolean;
  currency: string;
  language: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: Category;
  subCategory?: Category;
  brand: string;
  sku: string;
  price: ProductPrice;
  inventory: ProductInventory;
  variants?: ProductVariant[];
  images: ProductImage[];
  specifications?: ProductSpecification[];
  reviews: ProductReviews;
  featured: boolean;
  tags: string[];
  status: 'active' | 'inactive' | 'draft' | 'discontinued';
  currentPrice: number;
  discountPercentage: number;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock' | 'backorder';
  mainImage: string;
}

export interface ProductPrice {
  original: number;
  sale?: number;
  cost?: number;
}

export interface ProductInventory {
  stock: number;
  lowStockThreshold: number;
  trackStock: boolean;
  allowBackorder: boolean;
}

export interface ProductVariant {
  name: string;
  options: ProductVariantOption[];
}

export interface ProductVariantOption {
  value: string;
  price?: number;
  stock?: number;
  sku?: string;
  images?: string[];
}

export interface ProductImage {
  url: string;
  alt?: string;
  isMain: boolean;
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface ProductReviews {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: {
    url: string;
    alt?: string;
  };
  icon?: string;
  parent?: string;
  level: number;
  status: 'active' | 'inactive';
  featured: boolean;
}

// Cart Types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variant?: {
    color?: string;
    size?: string;
    [key: string]: any;
  };
  price: number;
  total: number;
}

export interface Cart {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  total: number;
}

// Wishlist Types
export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  user: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  pricing: OrderPricing;
  payment: OrderPayment;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  tracking?: OrderTracking;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  product: string;
  name: string;
  sku: string;
  price: number;
  quantity: number;
  variant?: any;
  image: string;
}

export interface OrderPricing {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

export interface OrderPayment {
  method: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  paidAt?: string;
}

export interface OrderTracking {
  carrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  estimatedDelivery?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

// Filter Types
export interface ProductFilters {
  category?: string;
  brand?: string[];
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  tags?: string[];
}

export interface SortOption {
  label: string;
  value: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pages: number;
    count: number;
    total: number;
  };
}

// UI Types
export interface UIState {
  loading: boolean;
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  theme: 'light' | 'dark';
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}