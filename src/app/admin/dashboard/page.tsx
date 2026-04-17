"use client";

import React from 'react';
import { useApp } from '@/lib/store';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Users, Zap, TrendingUp, Package, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AdminDashboard() {
  const { orders, products, user } = useApp();

  // Guard: Admin only
  if (!user || user.role !== 'admin') {
    return <div className="p-20 text-center uppercase tracking-widest font-black">Access Denied // Authentication Failed</div>;
  }

  const stats = [
    { label: 'Total Revenue', value: `$${orders.reduce((acc, o) => acc + o.total, 0).toLocaleString()}`, icon: TrendingUp, color: 'text-green-400' },
    { label: 'System Orders', value: orders.length, icon: ShoppingBag, color: 'text-blue-400' },
    { label: 'Product Nodes', value: products.length, icon: Package, color: 'text-purple-400' },
    { label: 'Active Users', value: '1,242', icon: Users, color: 'text-yellow-400' },
  ];

  const chartData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black font-headline tracking-tighter uppercase">Forge Control Center</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest">Administrator: {user.name} // Status: Master</p>
          </div>
          <div className="flex gap-4">
            <Link href="/admin/products">
              <Button className="bg-primary text-primary-foreground font-bold h-12 px-6">Manage Inventory</Button>
            </Link>
            <Link href="/admin/orders">
              <Button variant="outline" className="border-primary/20 h-12 px-6">Review Manifests</Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((s, i) => (
            <Card key={i} className="glass border-white/5 hover:border-primary/30 transition-all group overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-white/5 ${s.color}`}>
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                    <Zap className="w-3 h-3 text-primary" /> Core Sync
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-black font-code">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{s.label}</p>
                </div>
              </CardContent>
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2 glass border-white/5">
            <CardHeader>
              <CardTitle className="uppercase tracking-widest text-sm font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Revenue Velocity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141B1F', border: '1px solid #0099FF', borderRadius: '8px' }}
                    itemStyle={{ color: '#0099FF', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 4 ? '#0099FF' : '#141B1F'} stroke="#0099FF" strokeWidth={1} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Orders Preview */}
          <Card className="glass border-white/5">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="uppercase tracking-widest text-sm font-bold flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Recent Manifests
              </CardTitle>
              <Link href="/admin/orders" className="text-[10px] uppercase font-bold text-primary hover:underline flex items-center gap-1">
                Expand <ExternalLink className="w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              {orders.slice(0, 5).map(o => (
                <div key={o.id} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group hover:border-primary/30 transition-all">
                  <div className="space-y-1">
                    <p className="font-bold text-xs uppercase tracking-tighter">ID: {o.id}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{o.date.split('T')[0]} // {o.items.length} Units</p>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/20 text-[8px] uppercase">{o.status}</Badge>
                </div>
              ))}
              {orders.length === 0 && (
                <div className="py-20 text-center opacity-20 flex flex-col items-center gap-4">
                  <ShoppingBag className="w-12 h-12" />
                  <p className="text-[10px] uppercase tracking-widest font-bold">No data detected</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
