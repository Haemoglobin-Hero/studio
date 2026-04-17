import React from 'react';
import Link from 'next/link';
import { Terminal, Twitter, Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-primary/10 pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary">
              <Terminal className="text-primary w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tighter font-headline">
              LUMENS<span className="text-primary">FORGE</span>
            </span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Leading the charge in futuristic electronics. High-performance components, lighting, and gadgets for the next generation of tech enthusiasts.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all">
              <Github className="w-4 h-4" />
            </Link>
            <Link href="#" className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all">
              <Linkedin className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-accent font-bold mb-6 text-sm uppercase tracking-widest glow-text-aqua">Navigation</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="/shop" className="hover:text-primary transition-colors">Shop Catalog</Link></li>
            <li><Link href="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
            <li><Link href="/offers" className="hover:text-primary transition-colors">Promotions</Link></li>
            <li><Link href="/new" className="hover:text-primary transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-accent font-bold mb-6 text-sm uppercase tracking-widest glow-text-aqua">Support</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
            <li><Link href="/returns" className="hover:text-primary transition-colors">Returns & Warranty</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-accent font-bold mb-6 text-sm uppercase tracking-widest glow-text-aqua">Contact</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-primary" /> support@lumensforge.tech</li>
            <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-primary" /> +1 (555) 000-TECH</li>
            <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> Warehouse 42, Silicon Valley, CA</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground gap-4">
        <p>&copy; 2024 LUMENSFORGE INC. ALL RIGHTS RESERVED.</p>
        <p>ENCRYPTED SYSTEM ACCESS GRANTED.</p>
      </div>
    </footer>
  );
}
