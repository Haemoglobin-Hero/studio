"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shared/ProductCard';
import { useApp } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ChevronRight, Cpu, Lamp, MousePointer2, Settings, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: 'Lighting', icon: Lamp, color: 'text-yellow-400' },
  { name: 'Accessories', icon: MousePointer2, color: 'text-blue-400' },
  { name: 'Gadgets', icon: Zap, color: 'text-green-400' },
  { name: 'Components', icon: Cpu, color: 'text-purple-400' },
];

export default function Home() {
  const { products } = useApp();
  const featured = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="https://picsum.photos/seed/hero/1920/1080" 
              alt="Background" 
              fill 
              className="object-cover brightness-[0.2]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <Badge variant="outline" className="border-primary text-primary px-4 py-1 animate-pulse">
                SYSTEMS ONLINE // v2.0
              </Badge>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] font-headline">
                POWER YOUR <br />
                <span className="text-primary glow-text-aqua">WORLD</span> WITH <br />
                LUMENS
              </h1>
              <p className="text-xl text-muted-foreground font-light max-w-lg leading-relaxed">
                Premium electronics, high-performance components, and cutting-edge lighting solutions for the tech-driven future.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/shop">
                  <Button size="lg" className="h-14 px-8 text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-glow">
                    Enter Warehouse
                  </Button>
                </Link>
                <Link href="/categories">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-white/20 hover:bg-white/5">
                    Browse Categories
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground opacity-50">
            <p className="text-[10px] uppercase tracking-[0.5em]">Scroll to scan</p>
            <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-24 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div className="space-y-2">
                <p className="text-primary font-bold text-sm uppercase tracking-widest">Departments</p>
                <h2 className="text-4xl font-bold font-headline">MODULAR CATEGORIES</h2>
              </div>
              <Link href="/categories" className="text-muted-foreground hover:text-primary transition-all flex items-center gap-1 group text-sm">
                View all sectors <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <Link key={cat.name} href={`/shop?category=${cat.name}`} className="group relative h-48 rounded-2xl glass border border-white/5 flex flex-col items-center justify-center gap-4 transition-all hover:border-primary/50 hover:glow-blue overflow-hidden">
                  <div className={`p-4 rounded-xl bg-white/5 ${cat.color} group-hover:scale-110 transition-transform`}>
                    <cat.icon className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-lg tracking-tight">{cat.name}</span>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-16 space-y-4">
              <Badge className="bg-accent/10 text-accent border-accent/20">HOT DROPS</Badge>
              <h2 className="text-5xl font-black tracking-tighter uppercase font-headline">LATEST TECHNOLOGY</h2>
              <div className="w-24 h-1.5 bg-primary rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="/shop">
                <Button variant="link" className="text-primary hover:text-primary/80 text-lg uppercase tracking-widest font-bold flex items-center gap-2 mx-auto">
                  LOAD FULL INVENTORY <Zap className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <section className="container mx-auto px-4 pb-24">
          <div className="relative rounded-3xl overflow-hidden bg-primary/10 border border-primary/20 p-12 flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter font-headline leading-none">
                MEMBER EXCLUSIVE: <br />
                <span className="text-primary">20% DISCOUNT</span> ON FIRST ORDER
              </h3>
              <p className="text-muted-foreground max-w-md">
                Join the Forge community and unlock exclusive access to pre-market drops, limited editions, and member-only pricing.
              </p>
              <Button size="lg" className="bg-primary text-primary-foreground hover:glow-blue font-bold px-8">
                INITIATE JOIN SEQUENCE
              </Button>
            </div>
            <div className="flex-1 relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image src="https://picsum.photos/seed/promo/800/600" alt="Promo" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-card/30 border-y border-white/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 glow-text-aqua uppercase tracking-widest font-headline">USER TRANSMISSIONS</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Apex Raptor", text: "The Quantum Core Processor doubled my compile speeds. Essential gear.", rating: 5 },
                { name: "Neon Ghost", text: "Best lighting kits in the industry. The app integration is flawless.", rating: 5 },
                { name: "Binary Blade", text: "Fast shipping to the wasteland. LumensForge never misses.", rating: 4 }
              ].map((test, i) => (
                <div key={i} className="glass p-8 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex gap-1 text-primary">
                    {[...Array(test.rating)].map((_, j) => <Zap key={j} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="italic text-muted-foreground leading-relaxed">&ldquo;{test.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {test.name[0]}
                    </div>
                    <span className="font-bold text-sm tracking-widest">{test.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const Badge = ({ children, variant, className, ...props }: any) => {
  const styles = variant === 'outline' ? 'border border-primary' : 'bg-primary';
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${styles} ${className}`} {...props}>
      {children}
    </span>
  );
};
