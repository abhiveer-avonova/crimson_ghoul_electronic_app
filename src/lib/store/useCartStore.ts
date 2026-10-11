import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  slug?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === newItem.id);
          if (existing) {
            return {
              isOpen: true,
              items: state.items.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + (newItem.quantity || 1) }
                  : item
              ),
            };
          }
          return {
            isOpen: true,
            items: [...state.items, { ...newItem, quantity: newItem.quantity || 1 }],
          };
        });
      },
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.id !== id)
              : state.items.map((item) =>
                  item.id === id ? { ...item, quantity } : item
                ),
        }));
      },
      clearCart: () => set({ items: [] }),
      totalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'crimson-cart-storage',
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);
