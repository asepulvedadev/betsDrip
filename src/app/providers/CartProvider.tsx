"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, size: string | undefined, quantity: number) => void;
  clear: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "bestdrip_cart_v1";

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setIsHydrated(true);
        return;
      }
      const parsed: CartItem[] = JSON.parse(raw);
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      setItems([]);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.productId === item.productId && i.size === item.size
      );
      if (existingIndex >= 0) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + item.quantity,
        };
        return next;
      }
      return [...prev, item];
    });
  };

  const removeItem = (productId: string, size?: string) => {
    setItems((prev) => prev.filter((i) => !(i.productId === productId && i.size === size)));
  };

  const updateQuantity = (productId: string, size: string | undefined, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.productId === productId && i.size === size ? { ...i, quantity } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const clear = () => setItems([]);

  const { totalItems, subtotal } = useMemo(() => {
    const totalItemsCalc = items.reduce((acc, i) => acc + i.quantity, 0);
    const subtotalCalc = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
    return { totalItems: totalItemsCalc, subtotal: subtotalCalc };
  }, [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    totalItems,
    subtotal,
  };

  return (
    <CartContext.Provider value={value}>
      {/* Evitar UI inconsistente antes de hidratar */}
      {isHydrated ? children : null}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
};


