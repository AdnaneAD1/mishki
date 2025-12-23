'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@mishki/firebase';

interface CartItem {
  id: string;
  nom: string;
  reference: string;
  prixHT: number;
  quantite: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantite'>, quantite: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantite: number) => void;
  clearCart: () => void;
  total: number;
  setCartOwner: (userId: string | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const storageKey = (uid: string | null) => (uid ? `mishki_b2b_cart_user_${uid}` : 'mishki_b2b_cart_guest');

  const loadCart = (uid: string | null) => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(storageKey(uid)) : null;
    if (!stored) return [] as CartItem[];
    try {
      return JSON.parse(stored) as CartItem[];
    } catch {
      return [] as CartItem[];
    }
  };

  const mergeCarts = (a: CartItem[], b: CartItem[]) => {
    const map = new Map<string, CartItem>();
    [...a, ...b].forEach((item) => {
      const existing = map.get(item.id);
      if (existing) {
        map.set(item.id, { ...existing, quantite: existing.quantite + item.quantite });
      } else {
        map.set(item.id, { ...item });
      }
    });
    return Array.from(map.values());
  };

  // Hydrate (guest by default)
  useEffect(() => {
    setItems(loadCart(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync cart owner with Firebase auth state (merge guest -> user)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCartOwner(user ? user.uid : null);
    });
    return () => unsub();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(storageKey(userId), JSON.stringify(items));
  }, [items, userId]);

  const addToCart = (item: Omit<CartItem, 'quantite'>, quantite: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantite: i.quantite + quantite } : i
        );
      }
      return [...prev, { ...item, quantite }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantite: number) => {
    const min = 100;
    const nextQty = Math.max(min, quantite);
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantite: nextQty } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const setCartOwner = (newUserId: string | null) => {
    const targetCart = loadCart(newUserId);
    const merged = mergeCarts(items, targetCart);
    setUserId(newUserId);
    setItems(merged);
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey(newUserId), JSON.stringify(merged));
    }
  };

  const total = items.reduce((sum, item) => sum + item.prixHT * item.quantite, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, setCartOwner }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
