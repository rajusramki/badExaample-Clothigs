import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WishlistItem, Product } from '../../types';

interface WishlistState {
  items: WishlistItem[];
  itemCount: number;
}

const initialState: WishlistState = {
  items: JSON.parse(localStorage.getItem('wishlist') || '[]'),
  itemCount: 0,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (!existingItem) {
        const newItem: WishlistItem = {
          id: `wishlist-${product.id}`,
          product,
          addedAt: new Date().toISOString(),
        };
        state.items.push(newItem);
        state.itemCount = state.items.length;
        localStorage.setItem('wishlist', JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
      state.itemCount = state.items.length;
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      state.itemCount = 0;
      localStorage.removeItem('wishlist');
    },
    toggleWishlistItem: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
      
      if (existingItemIndex >= 0) {
        state.items.splice(existingItemIndex, 1);
      } else {
        const newItem: WishlistItem = {
          id: `wishlist-${product.id}`,
          product,
          addedAt: new Date().toISOString(),
        };
        state.items.push(newItem);
      }
      
      state.itemCount = state.items.length;
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
  },
});

export const { 
  addToWishlist, 
  removeFromWishlist, 
  clearWishlist, 
  toggleWishlistItem 
} = wishlistSlice.actions;

export default wishlistSlice.reducer;