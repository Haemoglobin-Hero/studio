"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, User, Search, Menu, X, Terminal } from 'lucide-react';
import { useApp } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function Navbar() {
  const { cart, wishlist, user, logout } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 glass border-b border-primary/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary glow-blue transition-all group-hover:scale-110">
            <Terminal className="text-primary w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tighter text-foreground font-headline">
            LUMENS<span className="text-primary">FORGE</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider">Shop</Link>
          <Link href="/categories" className="hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider">Categories</Link>
          <Link href="/offers" className="hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider">Offers</Link>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            className="bg-secondary/50 border-primary/20 pl-10 h-9 focus-visible:ring-primary focus-visible:ring-offset-0" 
            placeholder="Scan inventory..." 
          />
        </div>

        <div className="flex items-center gap-2">
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative hover:text-accent">
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-accent text-accent-foreground text-[10px]">
                  {wishlist.length}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:text-primary">
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-primary text-primary-foreground text-[10px]">
                  {cart.reduce((acc, i) => acc + i.quantity, 0)}
                </Badge>
              )}
            </Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-4 ml-2">
              <Link href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}>
                <Button variant="outline" size="sm" className="hidden sm:flex border-primary text-primary hover:bg-primary/10">
                  <User className="w-4 h-4 mr-2" />
                  {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                </Button>
              </Link>
              <Button onClick={logout} variant="ghost" size="sm" className="hidden sm:block text-muted-foreground hover:text-destructive">
                Exit
              </Button>
            </div>
          ) : (
            <Link href="/auth">
              <Button size="sm" className="ml-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-blue">
                Access System
              </Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-primary/20 p-4 space-y-4 animate-in slide-in-from-top duration-300">
          <Link href="/shop" onClick={() => setIsOpen(false)} className="block py-2 text-lg font-medium">Shop</Link>
          <Link href="/categories" onClick={() => setIsOpen(false)} className="block py-2 text-lg font-medium">Categories</Link>
          <Link href="/offers" onClick={() => setIsOpen(false)} className="block py-2 text-lg font-medium">Offers</Link>
          {user && (
             <Link href={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} onClick={() => setIsOpen(false)} className="block py-2 text-lg font-medium">
               {user.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
             </Link>
          )}
          {!user && (
            <Link href="/auth" onClick={() => setIsOpen(false)} className="block py-2 text-lg font-medium text-primary">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
