"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useApp, Product } from '@/lib/store';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Zap, Truck, ShieldCheck, RefreshCcw, Sparkles } from 'lucide-react';
import { generateProductDescription } from '@/ai/flows/generate-product-description-flow';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { products, addToCart, toggleWishlist, wishlist } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [aiContent, setAiContent] = useState<{ description: string; specifications: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
    } else {
      router.push('/shop');
    }
  }, [id, products, router]);

  const handleGenAI = async () => {
    if (!product) return;
    setIsGenerating(true);
    try {
      const result = await generateProductDescription({
        productName: product.name,
        category: product.category,
        keyFeatures: [product.description]
      });
      setAiContent(result);
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-3xl overflow-hidden glass border border-primary/20 shadow-2xl">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                fill 
                className="object-cover" 
                priority
                data-ai-hint="high tech product"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-primary/20 text-primary border-primary backdrop-blur-md px-4 py-1.5 uppercase font-bold tracking-widest text-xs">
                  AVAILABLE IN STOCK
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden glass border border-white/5 cursor-pointer hover:border-primary/50 transition-all">
                  <Image src={product.imageUrl} alt="thumbnail" width={150} height={150} className="object-cover h-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-accent text-accent uppercase tracking-widest text-[10px] font-bold">
                  {product.category}
                </Badge>
                <div className="flex gap-0.5 text-primary">
                  {[...Array(5)].map((_, i) => <Zap key={i} className="w-3 h-3 fill-current" />)}
                </div>
              </div>
              <h1 className="text-5xl font-black font-headline tracking-tighter uppercase leading-tight">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-4 pt-2">
                <span className="text-4xl font-black font-code text-primary">${product.price}</span>
                <span className="text-muted-foreground line-through text-lg font-code opacity-50">${(product.price * 1.2).toFixed(2)}</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed text-lg">
                {aiContent ? aiContent.description : product.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="h-16 flex-1 px-8 text-lg font-bold bg-primary text-primary-foreground hover:glow-blue transition-glow"
                onClick={() => addToCart(product)}
              >
                <ShoppingCart className="w-6 h-6 mr-3" />
                INITIATE ACQUISITION
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className={`h-16 w-16 p-0 border-white/10 ${isWishlisted ? 'text-red-500 border-red-500/30' : ''}`}
                onClick={() => toggleWishlist(product.id)}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-4 glass p-4 rounded-xl border-white/5">
                <Truck className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest">Rapid Delivery</p>
                  <p className="text-xs text-muted-foreground">Ships in 24 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4 glass p-4 rounded-xl border-white/5">
                <ShieldCheck className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest">Secure Core</p>
                  <p className="text-xs text-muted-foreground">2 Year Tech Warranty</p>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold uppercase tracking-widest text-accent glow-text-aqua">Technical Specs</h3>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-primary gap-2 h-8 px-2"
                  onClick={handleGenAI}
                  disabled={isGenerating}
                >
                  <Sparkles className="w-4 h-4" />
                  {isGenerating ? 'Analyzing...' : 'AI Enhancement'}
                </Button>
              </div>
              
              <div className="glass p-6 rounded-2xl border-white/10 space-y-4">
                {isGenerating ? (
                   <div className="space-y-4">
                     <Skeleton className="h-4 w-full bg-primary/10" />
                     <Skeleton className="h-4 w-3/4 bg-primary/10" />
                     <Skeleton className="h-4 w-5/6 bg-primary/10" />
                   </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {aiContent ? (
                      <div className="text-sm whitespace-pre-wrap text-muted-foreground">{aiContent.specifications}</div>
                    ) : (
                      <>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-muted-foreground text-xs uppercase font-bold">Category</span>
                          <span className="font-code text-sm">{product.category}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-muted-foreground text-xs uppercase font-bold">Inventory Count</span>
                          <span className="font-code text-sm">{product.stock} units</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-muted-foreground text-xs uppercase font-bold">Core Features</span>
                          <span className="font-code text-sm text-right max-w-[200px]">{product.specifications || "Standard Module Pack"}</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
