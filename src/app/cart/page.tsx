"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useApp } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity } = useApp();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center border border-primary glow-blue">
            <ShoppingBag className="text-primary w-6 h-6" />
          </div>
          <h1 className="text-4xl font-black font-headline tracking-tighter uppercase">Cart Manifest</h1>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="glass p-6 rounded-2xl border-white/5 flex flex-col sm:flex-row items-center gap-6 transition-all hover:border-primary/30">
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-white/10 shrink-0">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="font-bold text-xl uppercase tracking-tighter">{item.name}</h3>
                      <p className="font-code font-bold text-primary text-xl">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="text-muted-foreground text-xs uppercase tracking-widest">{item.category} / Sector-04</p>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-6 pt-4">
                      <div className="flex items-center bg-secondary/50 rounded-lg p-1 border border-white/10">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-primary/20 hover:text-primary"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-10 text-center font-code font-bold">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-primary/20 hover:text-primary"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-destructive gap-2 h-8"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-[10px] uppercase font-bold tracking-widest">Remove</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="glass p-8 rounded-3xl border-primary/20 space-y-8 sticky top-24 shadow-2xl shadow-primary/5">
                <h2 className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" /> Total Computation
                </h2>

                <div className="space-y-4 font-code">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping Fee</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Protocol Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="h-px bg-white/5 my-4" />
                  <div className="flex justify-between text-2xl font-black text-primary">
                    <span>FINAL TOTAL</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <Link href="/checkout">
                    <Button className="w-full h-16 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] transition-glow text-lg">
                      Proceed to Checkout <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/shop">
                    <Button variant="ghost" className="w-full h-12 uppercase text-[10px] tracking-widest font-bold">
                      Continue Scouring
                    </Button>
                  </Link>
                </div>

                <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 flex gap-4">
                  <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
                  <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-wider">
                    All transactions are encrypted via 256-bit secure core. Forge protection active.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 glass rounded-3xl border-dashed border-primary/20 space-y-8">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary/40 animate-pulse">
              <ShoppingBag className="w-12 h-12" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Your cart is offline</h2>
              <p className="text-muted-foreground uppercase tracking-widest text-xs">No items detected in your local storage manifest.</p>
            </div>
            <Link href="/shop">
              <Button size="lg" className="bg-primary text-primary-foreground font-bold uppercase tracking-widest glow-blue">
                Browse Global Inventory
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
