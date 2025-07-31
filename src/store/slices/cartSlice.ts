import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product } from '../../types';

interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  total: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cart') || '[]'),
  itemCount: 0,
  subtotal: 0,
  total: 0,
  isOpen: false,
};

// Calculate cart totals
const calculateTotals = (items: CartItem[]) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  return { itemCount, subtotal, total: subtotal };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity: number; variant?: any }>) => {
      const { product, quantity, variant } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === product.id && 
        JSON.stringify(item.variant) === JSON.stringify(variant)
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        state.items[existingItemIndex].quantity += quantity;
        state.items[existingItemIndex].total = 
          state.items[existingItemIndex].quantity * state.items[existingItemIndex].price;
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          product,
          quantity,
          variant,
          price: product.currentPrice,
          total: product.currentPrice * quantity,
        };
        state.items.push(newItem);
      }

      const totals = calculateTotals(state.items);
      state.itemCount = totals.itemCount;
      state.subtotal = totals.subtotal;
      state.total = totals.total;

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      
      const totals = calculateTotals(state.items);
      state.itemCount = totals.itemCount;
      state.subtotal = totals.subtotal;
      state.total = totals.total;

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          item.quantity = quantity;
          item.total = item.price * quantity;
        }
      }

      const totals = calculateTotals(state.items);
      state.itemCount = totals.itemCount;
      state.subtotal = totals.subtotal;
      state.total = totals.total;

      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
      state.subtotal = 0;
      state.total = 0;
      localStorage.removeItem('cart');
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

// Initialize cart totals on app load
export const initializeCart = () => (dispatch: any) => {
  const items = JSON.parse(localStorage.getItem('cart') || '[]');
  if (items.length > 0) {
    const totals = calculateTotals(items);
    dispatch(cartSlice.actions.setTotals(totals));
  }
};

// Add setTotals action for initialization
cartSlice.actions.setTotals = (state: any, action: PayloadAction<{itemCount: number; subtotal: number; total: number}>) => {
  state.itemCount = action.payload.itemCount;
  state.subtotal = action.payload.subtotal;
  state.total = action.payload.total;
};

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  toggleCart, 
  openCart, 
  closeCart 
} = cartSlice.actions;

export default cartSlice.reducer;