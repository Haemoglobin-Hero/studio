"use client";

import React, { useState } from 'react';
import { useApp, Product } from '@/lib/store';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Trash2, Plus, Sparkles, Image as ImageIcon, Zap } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { generateProductDescription } from '@/ai/flows/generate-product-description-flow';

export default function AdminProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, user } = useApp();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    description: '',
    category: 'Gadgets',
    stock: 0,
    imageUrl: 'https://picsum.photos/seed/tech/600/400'
  });

  if (!user || user.role !== 'admin') return <div className="p-20 text-center uppercase tracking-widest font-black">Access Denied</div>;

  const handleEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      price: p.price,
      description: p.description,
      category: p.category,
      stock: p.stock,
      imageUrl: p.imageUrl
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      updateProduct({ ...formData, id: editingProduct.id });
    } else {
      addProduct(formData);
    }
    setIsDialogOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', price: 0, description: '', category: 'Gadgets', stock: 0, imageUrl: 'https://picsum.photos/seed/tech/600/400' });
  };

  const handleAIHelp = async () => {
    if (!formData.name) return;
    setIsGenerating(true);
    try {
      const result = await generateProductDescription({
        productName: formData.name,
        category: formData.category,
        keyFeatures: [formData.description || 'Modern electronics']
      });
      setFormData(prev => ({ ...prev, description: result.description }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black font-headline tracking-tighter uppercase">Inventory Grid</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest">Active nodes in forge warehouse</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingProduct(null)} className="bg-primary text-primary-foreground font-black h-12 px-6 glow-blue">
                <Plus className="w-5 h-5 mr-2" /> Inject New Node
              </Button>
            </DialogTrigger>
            <DialogContent className="glass border-primary/20 max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
                  {editingProduct ? 'Update Node Data' : 'New Product Injection'}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-6 py-6">
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Product Identifier</label>
                  <Input 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Quantum Link v2" 
                    className="bg-secondary/30 border-white/10" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Price Credits</label>
                  <Input 
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="bg-secondary/30 border-white/10" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Inventory Count</label>
                  <Input 
                    type="number"
                    value={formData.stock}
                    onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})}
                    className="bg-secondary/30 border-white/10" 
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <div className="flex justify-between">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Manifest Description</label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-primary text-[10px] font-bold gap-1"
                      onClick={handleAIHelp}
                      disabled={isGenerating}
                    >
                      <Sparkles className="w-3 h-3" /> {isGenerating ? 'Analyzing...' : 'AI ASSIST'}
                    </Button>
                  </div>
                  <Textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="bg-secondary/30 border-white/10" 
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Visual Asset URL</label>
                  <div className="flex gap-4">
                    <Input 
                      value={formData.imageUrl}
                      onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                      className="bg-secondary/30 border-white/10 flex-1" 
                    />
                    <div className="w-12 h-10 rounded border border-white/10 overflow-hidden shrink-0">
                      <Image src={formData.imageUrl} alt="preview" width={48} height={40} className="object-cover h-full" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="uppercase text-[10px] font-black">Abort</Button>
                <Button onClick={handleSave} className="bg-primary text-primary-foreground font-black px-8">Confirm Injection</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="glass rounded-2xl border-white/5 overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="uppercase text-[10px] font-black tracking-widest">Asset</TableHead>
                <TableHead className="uppercase text-[10px] font-black tracking-widest">Identifier</TableHead>
                <TableHead className="uppercase text-[10px] font-black tracking-widest">Sector</TableHead>
                <TableHead className="uppercase text-[10px] font-black tracking-widest">Credits</TableHead>
                <TableHead className="uppercase text-[10px] font-black tracking-widest">Inventory</TableHead>
                <TableHead className="uppercase text-[10px] font-black tracking-widest text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id} className="border-white/5 hover:bg-white/5 transition-all group">
                  <TableCell>
                    <div className="w-12 h-12 rounded-lg border border-white/10 overflow-hidden relative">
                      <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-bold uppercase tracking-tighter">{p.name}</TableCell>
                  <TableCell>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-2 py-1 rounded">
                      {p.category}
                    </span>
                  </TableCell>
                  <TableCell className="font-code font-bold">${p.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${p.stock < 10 ? 'bg-red-500' : 'bg-primary'}`} 
                          style={{ width: `${Math.min(100, (p.stock / 50) * 100)}%` }} 
                        />
                      </div>
                      <span className="text-[10px] font-bold text-muted-foreground">{p.stock}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(p)} className="h-8 w-8 hover:bg-primary/20 hover:text-primary">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteProduct(p.id)} className="h-8 w-8 hover:bg-red-500/20 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>

      <Footer />
    </div>
  );
}
