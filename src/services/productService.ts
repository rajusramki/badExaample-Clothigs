import api from './api';
import { Product, ProductFilters, PaginatedResponse } from '../types';

interface ProductsResponse {
  success: boolean;
  products: Product[];
  count: number;
  total: number;
  page: number;
  pages: number;
}

interface ProductResponse {
  success: boolean;
  product: Product;
}

const productService = {
  async getProducts(params: {
    page?: number;
    limit?: number;
    sort?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  } = {}): Promise<ProductsResponse> {
    const response = await api.get('/products', { params });
    return response.data;
  },

  async getProduct(slug: string): Promise<ProductResponse> {
    const response = await api.get(`/products/${slug}`);
    return response.data;
  },

  async getFeaturedProducts(): Promise<ProductsResponse> {
    const response = await api.get('/products?featured=true&limit=8');
    return response.data;
  },

  async searchProducts(query: string): Promise<ProductsResponse> {
    const response = await api.get(`/products?search=${encodeURIComponent(query)}`);
    return response.data;
  },

  async getProductsByCategory(categorySlug: string, params: any = {}): Promise<ProductsResponse> {
    const response = await api.get(`/products?category=${categorySlug}`, { params });
    return response.data;
  },

  async getRelatedProducts(productId: string): Promise<ProductsResponse> {
    const response = await api.get(`/products/${productId}/related`);
    return response.data;
  },

  // Admin functions (if user is admin)
  async createProduct(productData: any): Promise<ProductResponse> {
    const response = await api.post('/products', productData);
    return response.data;
  },

  async updateProduct(productId: string, productData: any): Promise<ProductResponse> {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  },

  async deleteProduct(productId: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  },
};

export default productService;