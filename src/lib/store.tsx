"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageUrl: string;
  specifications?: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  address: {
    name: string;
    street: string;
    city: string;
    phone: string;
  };
};

interface AppContextType {
  user: User | null;
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  login: (email: string, role: 'user' | 'admin') => void;
  logout: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  placeOrder: (address: Order['address']) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Neon Horizon LED Kit',
    price: 129.99,
    category: 'Lighting',
    stock: 45,
    description: 'Vibrant programmable LED strips with 16 million colors.',
    imageUrl: 'https://picsum.photos/seed/lighting1/600/400',
    specifications: 'Length: 5m, Connectivity: WiFi/Bluetooth, App Support: LumensConnect'
  },
  {
    id: '2',
    name: 'Pulse Audio X',
    price: 249.99,
    category: 'Accessories',
    stock: 12,
    description: 'Immersive noise-cancelling headphones for professional audio work.',
    imageUrl: 'https://picsum.photos/seed/acc1/600/400',
    specifications: 'Battery: 40h, Driver: 50mm, Weight: 250g'
  },
  {
    id: '3',
    name: 'Quantum Core Processor',
    price: 599.99,
    category: 'Components',
    stock: 8,
    description: 'Next-gen processing power for high-performance builds.',
    imageUrl: 'https://picsum.photos/seed/comp1/600/400',
    specifications: 'Cores: 16, Threads: 32, Base Clock: 4.2GHz'
  },
  {
    id: '4',
    name: 'Flux Smart Watch v2',
    price: 199.99,
    category: 'Gadgets',
    stock: 30,
    description: 'Sleek futuristic wearable with health tracking and AI integration.',
    imageUrl: 'https://picsum.photos/seed/gadget1/600/400',
    specifications: 'Display: OLED, Battery: 7 days, Water Resist: 5ATM'
  }
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // LocalStorage persistence (Hydration-safe)
  useEffect(() => {
    const savedCart = localStorage.getItem('lumens_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedWish = localStorage.getItem('lumens_wish');
    if (savedWish) setWishlist(JSON.parse(savedWish));
    const savedUser = localStorage.getItem('lumens_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    const savedOrders = localStorage.getItem('lumens_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem('lumens_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lumens_wish', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lumens_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('lumens_orders', JSON.stringify(orders));
  }, [orders]);

  const login = (email: string, role: 'user' | 'admin') => {
    const newUser: User = { id: Math.random().toString(), email, name: email.split('@')[0], role };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const placeOrder = (address: Order['address']) => {
    if (!user) return;
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 900000) + 100000}`,
      userId: user.id,
      items: [...cart],
      total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
      status: 'pending',
      date: new Date().toISOString(),
      address
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
  };

  const addProduct = (p: Omit<Product, 'id'>) => {
    const newP = { ...p, id: Math.random().toString() };
    setProducts(prev => [newP, ...prev]);
  };

  const updateProduct = (p: Product) => {
    setProducts(prev => prev.map(item => item.id === p.id ? p : item));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(item => item.id !== id));
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  return (
    <AppContext.Provider value={{
      user, products, cart, wishlist, orders,
      login, logout, addToCart, removeFromCart, updateCartQuantity, toggleWishlist, placeOrder,
      addProduct, updateProduct, deleteProduct, updateOrderStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
