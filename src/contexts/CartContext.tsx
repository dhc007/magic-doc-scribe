import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, RentalDuration } from '@/types/product';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, duration: RentalDuration) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateDuration: (duration: RentalDuration) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalDeposit: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, duration: RentalDuration) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, duration }
            : item
        );
      }
      return [...prev, { product, quantity: 1, duration }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateDuration = (duration: RentalDuration) => {
    setItems(prev => prev.map(item => ({ ...item, duration })));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = items.reduce((sum, item) => {
    const price = item.product.price[item.duration];
    return sum + (price * item.quantity);
  }, 0);

  const totalDeposit = items.reduce((sum, item) => {
    return sum + (item.product.deposit * item.quantity);
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateDuration,
      clearCart,
      totalItems,
      totalPrice,
      totalDeposit
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
