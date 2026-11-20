import { create } from 'zustand';

export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: { name: string; priceModifier: number };
  selectedAddons?: Array<{ name: string; price: number }>;
  notes?: string;
  restaurantId: string;
}

interface CartStore {
  items: CartItem[];
  restaurantId: string | null;
  tableNumber: string | null;
  orderType: 'QR_TABLE' | 'DELIVERY' | 'COLLECTION';
  setTableNumber: (tableNumber: string | null) => void;
  setOrderType: (orderType: 'QR_TABLE' | 'DELIVERY' | 'COLLECTION') => void;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalCount: () => number;
  subtotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  restaurantId: null,
  tableNumber: null,
  orderType: 'DELIVERY',
  setTableNumber: (tableNumber) => set({ tableNumber, orderType: tableNumber ? 'QR_TABLE' : 'DELIVERY' }),
  setOrderType: (orderType) => set({ orderType }),
  addItem: (item) => {
    const id = `${item.menuItemId}-${item.selectedSize?.name || 'def'}-${(item.selectedAddons || []).map((a) => a.name).sort().join('-')}`;
    set((state) => {
      // If adding from a different restaurant, reset cart
      if (state.restaurantId && state.restaurantId !== item.restaurantId) {
        return {
          restaurantId: item.restaurantId,
          items: [{ ...item, id, quantity: item.quantity || 1 }],
        };
      }

      const existingIndex = state.items.findIndex((i) => i.id === id);
      if (existingIndex > -1) {
        const nextItems = [...state.items];
        nextItems[existingIndex].quantity += item.quantity || 1;
        return { items: nextItems, restaurantId: item.restaurantId };
      }
      return {
        items: [...state.items, { ...item, id, quantity: item.quantity || 1 }],
        restaurantId: item.restaurantId,
      };
    });
  },
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
  updateQuantity: (id, delta) =>
    set((state) => {
      const nextItems = state.items
        .map((i) => {
          if (i.id === id) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[];
      return { items: nextItems };
    }),
  clearCart: () => set({ items: [], restaurantId: null, tableNumber: null }),
  totalCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
  subtotal: () =>
    get().items.reduce((sum, i) => {
      const sizeMod = i.selectedSize?.priceModifier || 0;
      const addonsTotal = (i.selectedAddons || []).reduce((aSum, a) => aSum + a.price, 0);
      return sum + (i.price + sizeMod + addonsTotal) * i.quantity;
    }, 0),
}));
