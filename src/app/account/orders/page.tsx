'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Badge } from '@/components/ui/Badge';

interface UserOrder {
  id: string;
  user_id?: string;
  status: string;
  total_amount: number;
  created_at: string;
  order_items?: { id: string }[];
}

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase
            .from('orders')
            .select('*, order_items(*, product:products(*))')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

          if (!error && data) {
            setOrders(data);
          }
        }
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [supabase]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge variant="stock">Delivered</Badge>;
      case 'shipped':
        return <Badge variant="spec">Shipped</Badge>;
      case 'processing':
        return <Badge variant="lowStock">Processing</Badge>;
      case 'cancelled':
        return <Badge variant="outOfStock">Cancelled</Badge>;
      default:
        return <Badge variant="neutral">Pending</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400 font-mono text-xs">
        Accessing acquisition ledger...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Acquisition History</h1>
          <p className="text-xs text-slate-400 mt-1">Review your hardware shipments and order receipts</p>
        </div>
        <span className="text-xs font-mono text-slate-500">
          Total Orders: <span className="text-rose-400 font-bold">{orders.length}</span>
        </span>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-bold text-white">
                    Order #{order.id.slice(0, 8)}
                  </span>
                  {getStatusBadge(order.status)}
                  <span className="text-xs text-slate-400">
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>

                <div className="text-xs text-slate-300">
                  {order.order_items?.length || 0} hardware items
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Total Billed</div>
                  <div className="text-base font-bold font-mono text-white">
                    ${Number(order.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>

                <Link
                  href={`/account/orders/${order.id}`}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                >
                  View Receipt
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Past Acquisitions</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">
            You haven&apos;t placed any orders yet. Explore our catalog of high-end rigs, creator notebooks, and gear.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Explore Hardware Catalog
          </Link>
        </div>
      )}
    </div>
  );
}
