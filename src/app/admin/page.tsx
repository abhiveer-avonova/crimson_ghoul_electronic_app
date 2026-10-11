'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Badge } from '@/components/ui/Badge';
import { SEED_PRODUCTS } from '@/data/seed-data';

interface RecentOrderSummary {
  id: string;
  status: string;
  total_amount: number;
  currency: string;
  created_at: string;
}

export default function AdminOverviewPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalRevenue: 6897.0,
    totalOrders: 3,
    lowStockCount: 2,
    activeProducts: SEED_PRODUCTS.length,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrderSummary[]>([]);

  const supabase = createClient();

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const [ordersRes, inventoryRes, productsRes] = await Promise.all([
          supabase.from('orders').select('*').order('created_at', { ascending: false }),
          supabase.from('inventory').select('*'),
          supabase.from('products').select('id', { count: 'exact' }),
        ]);

        const orders = ordersRes.data || [];
        const inventory = inventoryRes.data || [];

        if (orders.length > 0) {
          const revenue = orders.reduce((acc, o) => acc + (Number(o.total_amount) || 0), 0);
          const lowStock = inventory.filter(
            (inv) => inv.stock_quantity <= inv.low_stock_threshold
          ).length;

          setMetrics({
            totalRevenue: revenue,
            totalOrders: orders.length,
            lowStockCount: lowStock,
            activeProducts: productsRes.count || SEED_PRODUCTS.length,
          });
          setRecentOrders(orders.slice(0, 5));
        } else {
          // Demo fallback orders
          setRecentOrders([
            {
              id: 'ord-8472-a10f',
              status: 'processing',
              total_amount: 3499.0,
              currency: 'usd',
              created_at: new Date(Date.now() - 3600000).toISOString(),
            },
            {
              id: 'ord-9182-c20e',
              status: 'shipped',
              total_amount: 2299.0,
              currency: 'usd',
              created_at: new Date(Date.now() - 86400000).toISOString(),
            },
            {
              id: 'ord-1039-f30b',
              status: 'delivered',
              total_amount: 1099.0,
              currency: 'usd',
              created_at: new Date(Date.now() - 172800000).toISOString(),
            },
          ]);
        }
      } catch (err) {
        console.error('Error fetching admin metrics:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, [supabase]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400 font-mono text-xs">
        Compiling command telemetry...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>TOTAL REVENUE</span>
            <span className="text-emerald-400 font-bold">+18.4%</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            ${metrics.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Gross settled volume</span>
        </div>

        {/* Total Orders */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>ORDERS FULFILLED</span>
            <span className="text-cyan-400 font-bold">100%</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            {metrics.totalOrders}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Lifetime requisitions</span>
        </div>

        {/* Low Stock Alerts */}
        <div className="rounded-2xl border border-amber-900/40 bg-amber-950/20 p-5">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
            <span>STOCK WARNINGS</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-amber-300">
            {metrics.lowStockCount} Units
          </div>
          <span className="text-[10px] text-amber-500/80 mt-1 block">Below low-threshold</span>
        </div>

        {/* Active Products */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span>ACTIVE BLUEPRINTS</span>
            <span className="text-rose-400 font-bold">LIVE</span>
          </div>
          <div className="text-2xl font-extrabold font-mono text-white">
            {metrics.activeProducts}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">Active catalog listings</span>
        </div>
      </div>

      {/* Quick Operations Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
            Quick Command Actions
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Direct mutations to catalog and stock reserves</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/products/new"
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(225,29,72,0.3)] flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Hardware Blueprint
          </Link>
          <Link
            href="/admin/inventory"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Adjust Stock Reserves
          </Link>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
            Recent Hardware Dispatches
          </h2>
          <Link href="/admin/orders" className="text-xs font-mono text-cyan-400 hover:underline">
            View All Orders &rarr;
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="py-3 px-2">Order ID</th>
                <th className="py-3 px-2">Timestamp</th>
                <th className="py-3 px-2">Status</th>
                <th className="py-3 px-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-2 font-mono font-bold text-white">
                    #{ord.id.slice(0, 12)}
                  </td>
                  <td className="py-3.5 px-2 text-slate-400">
                    {new Date(ord.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-2">
                    <Badge
                      variant={
                        ord.status === 'delivered'
                          ? 'stock'
                          : ord.status === 'shipped'
                          ? 'spec'
                          : 'lowStock'
                      }
                    >
                      {ord.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-2 text-right font-mono font-bold text-white">
                    ${Number(ord.total_amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
