"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useApp } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Truck, MapPin, CheckCircle2, Package, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, placeOrder, user } = useApp();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    street: '',
    city: '',
    phone: '',
    paymentMethod: 'cod'
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal > 500 ? subtotal : subtotal + 25;

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/auth');
      return;
    }
    
    setLoading(true);
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 2000));
    
    placeOrder({
      name: formData.name,
      street: formData.street,
      city: formData.city,
      phone: formData.phone
    });

    toast({
      title: "ORDER ENCRYPTED & PLACED",
      description: "Manifest sent to Forge warehouse for processing.",
    });

    setLoading(false);
    router.push('/dashboard');
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <Package className="w-16 h-16 text-muted-foreground mx-auto opacity-20" />
            <h2 className="text-2xl font-black uppercase tracking-tighter">Manifest Empty</h2>
            <Button onClick={() => router.push('/shop')}>Fill Inventory</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-black font-headline tracking-tighter uppercase mb-12">Final Authorization</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <form onSubmit={handleCompleteOrder} className="space-y-8">
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary">
                    <MapPin className="text-primary w-4 h-4" />
                  </div>
                  <h2 className="text-xl font-bold uppercase tracking-widest">Destination Node</h2>
                </div>
                
                <div className="glass p-8 rounded-2xl border-white/5 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Full Identifier</label>
                    <Input 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter Full Name" 
                      className="bg-secondary/30 border-white/10" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Sector / Street Address</label>
                    <Input 
                      required 
                      value={formData.street}
                      onChange={e => setFormData({...formData, street: e.target.value})}
                      placeholder="123 Tech Avenue" 
                      className="bg-secondary/30 border-white/10" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">City Hub</label>
                      <Input 
                        required 
                        value={formData.city}
                        onChange={e => setFormData({...formData, city: e.target.value})}
                        placeholder="Silicon Valley" 
                        className="bg-secondary/30 border-white/10" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Comm Link / Phone</label>
                      <Input 
                        required 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="+1 (555) 000-0000" 
                        className="bg-secondary/30 border-white/10" 
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary">
                    <CreditCard className="text-primary w-4 h-4" />
                  </div>
                  <h2 className="text-xl font-bold uppercase tracking-widest">Protocol Payment</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    className={`glass p-6 rounded-2xl border-2 transition-all cursor-pointer ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-white/5'}`}
                    onClick={() => setFormData({...formData, paymentMethod: 'cod'})}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <Truck className="w-8 h-8 text-primary" />
                      {formData.paymentMethod === 'cod' && <CheckCircle2 className="w-5 h-5 text-primary" />}
                    </div>
                    <p className="font-bold uppercase tracking-widest text-sm">Credits on Delivery</p>
                    <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">Pay upon successful node dropoff.</p>
                  </div>
                  
                  <div 
                    className={`glass p-6 rounded-2xl border-2 transition-all cursor-pointer opacity-50 grayscale`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <CreditCard className="w-8 h-8 text-muted-foreground" />
                      <span className="text-[8px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded uppercase font-bold">Offline</span>
                    </div>
                    <p className="font-bold uppercase tracking-widest text-sm">Neural Credit</p>
                    <p className="text-[8px] text-muted-foreground mt-1 uppercase tracking-wider">Direct digital link encryption.</p>
                  </div>
                </div>
              </section>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-20 bg-primary text-primary-foreground font-black uppercase tracking-[0.3em] text-xl glow-blue transition-glow"
              >
                {loading ? 'ENCRYPTING MANIFEST...' : 'AUTHORIZE ACQUISITION'}
              </Button>
            </form>

            {/* Summary Sidebar */}
            <div className="space-y-8">
              <Card className="glass border-primary/20 shadow-2xl overflow-hidden">
                <CardHeader className="bg-primary/5 border-b border-white/5">
                  <CardTitle className="uppercase tracking-widest text-sm font-bold flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" /> Order Manifest
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="max-h-[300px] overflow-y-auto space-y-4 pr-4 custom-scrollbar">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded border border-white/10 overflow-hidden relative">
                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-xs uppercase tracking-tighter line-clamp-1">{item.name}</p>
                            <p className="text-[10px] text-muted-foreground uppercase">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-code text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="space-y-3 font-code text-sm uppercase">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Inventory Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Logistics Fee</span>
                      <span>${subtotal > 500 ? '0.00' : '25.00'}</span>
                    </div>
                    <div className="flex justify-between text-xl font-black text-primary pt-4">
                      <span>GRAND TOTAL</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="glass p-6 rounded-2xl border-white/5 flex gap-4">
                <ShieldCheck className="w-10 h-10 text-primary shrink-0" />
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Forge Secure Protocols</p>
                  <p className="text-[10px] text-muted-foreground uppercase leading-relaxed tracking-wider">
                    Your acquisition is protected by military-grade encryption and forge-backed logistics. 
                    Tracking link will be provided upon dispatch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
