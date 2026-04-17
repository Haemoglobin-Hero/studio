"use client";

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shared/ProductCard';
import { useApp } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, Grid2X2, List, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';

export default function ShopPage() {
  const { products } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || p.category === category;
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, search, category, priceRange]);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-black font-headline tracking-tighter uppercase">Global Inventory</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest">{filteredProducts.length} Results detected</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search database..." 
                className="pl-10 h-11 border-primary/20 bg-card"
              />
            </div>
            <Button 
              variant="outline" 
              className={`h-11 border-primary/20 ${showFilters ? 'bg-primary/20' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          {showFilters && (
            <aside className="lg:w-64 space-y-8 glass p-6 rounded-2xl h-fit border-primary/20 animate-in slide-in-from-left duration-300">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold uppercase tracking-widest text-sm text-primary">Parameters</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)} className="h-6 w-6">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sector</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <Badge 
                      key={cat}
                      variant={category === cat ? "default" : "outline"}
                      className={`cursor-pointer px-3 py-1 ${category === cat ? 'bg-primary' : 'border-primary/20 hover:border-primary'}`}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Price Credits</label>
                  <span className="text-xs font-code text-primary">${priceRange[0]} - ${priceRange[1]}</span>
                </div>
                <Slider 
                  min={0} 
                  max={1000} 
                  step={10} 
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
              </div>

              <Button 
                variant="outline" 
                className="w-full border-primary/20 text-xs uppercase font-bold"
                onClick={() => {
                  setCategory('All');
                  setPriceRange([0, 1000]);
                  setSearch('');
                }}
              >
                Reset System
              </Button>
            </aside>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 glass rounded-3xl border-dashed border-primary/20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Search className="w-8 h-8" />
                </div>
                <p className="text-xl font-bold uppercase tracking-tighter">No signals detected</p>
                <p className="text-muted-foreground text-sm">Adjust your parameters and scan again.</p>
                <Button onClick={() => {setCategory('All'); setPriceRange([0, 1000]); setSearch('')}}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
