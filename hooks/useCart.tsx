'use client';

import { create } from 'zustand';
import { useSession } from 'next-auth/react';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (productId, quantity) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.productId === productId);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { productId, quantity }],
      };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
}));

export function useCart() {
  const { data: session } = useSession();
  const store = useCartStore();

  const addToCart = async (productId: string, quantity: number) => {
    if (session) {
      // Sync with server
      try {
        const response = await fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, quantity }),
        });
        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }
      } catch (error) {
        console.error('Error syncing cart:', error);
        throw error;
      }
    }
    store.addToCart(productId, quantity);
  };

  return {
    items: store.items,
    addToCart,
    removeFromCart: store.removeFromCart,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
  };
}



