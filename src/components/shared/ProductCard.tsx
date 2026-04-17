"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Zap } from 'lucide-react';
import { Product, useApp } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="group relative bg-card border border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint="electronic product"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-xs text-primary font-bold uppercase tracking-widest flex items-center gap-1">
            <Zap className="w-3 h-3" /> View Specs
          </p>
        </div>
      </Link>
      
      <button 
        onClick={() => toggleWishlist(product.id)}
        className={`absolute top-3 right-3 p-2 rounded-full glass border ${isWishlisted ? 'text-red-500 border-red-500/50' : 'text-white border-white/10'} hover:scale-110 transition-all z-10`}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      <div className="p-4 space-y-3">
        <div>
          <Badge variant="outline" className="text-[10px] uppercase border-accent text-accent mb-1 tracking-tighter">
            {product.category}
          </Badge>
          <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors truncate">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold font-code text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <Button 
            size="sm" 
            onClick={() => addToCart(product)}
            className="bg-primary text-primary-foreground hover:bg-primary/80 h-8 px-3 transition-glow"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
