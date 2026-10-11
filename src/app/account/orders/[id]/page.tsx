'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Badge } from '@/components/ui/Badge';

interface OrderDetailItem {
  id: string;
  quantity: number;
  unit_price: number;
  product?: {
    name: string;
    slug: string;
  } | null;
}

interface OrderDetail {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  stripe_session_id?: string | null;
  shipping_details?: {
    name?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    address?: {
      line1?: string;
      city?: string;
      state?: string;
      postal_code?: string;
    };
  } | null;
  order_items?: OrderDetailItem[];
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchOrder() {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*, product:products(*))')
          .eq('id', id)
          .single();

        if (!error && data) {
          setOrder(data);
        }
      } catch (err) {
        console.error('Failed to load order receipt:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [id, supabase]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400 font-mono text-xs">
        Loading receipt #{id.slice(0, 8)}...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
        <h2 className="text-lg font-bold text-white mb-2">Order Not Located</h2>
        <p className="text-xs text-slate-400 mb-4">
          The requested order receipt does not exist or you do not have permission to view it.
        </p>
        <Link href="/account/orders" className="text-xs text-rose-400 font-semibold hover:underline">
          &larr; Return to Orders
        </Link>
      </div>
    );
  }

  const shipping = order.shipping_details || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/account/orders" className="text-xs text-slate-400 hover:text-white transition-colors">
              &larr; Orders
            </Link>
            <span className="text-slate-600">/</span>
            <h1 className="text-xl font-bold text-white font-mono">Order #{order.id.slice(0, 8)}</h1>
          </div>
          <p className="text-xs text-slate-400">
            Placed on{' '}
            {new Date(order.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <div>
          <Badge variant={order.status === 'delivered' ? 'stock' : 'spec'}>
            Status: {order.status.toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Itemized Hardware Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-300 mb-4">
          Itemized Hardware Breakdown
        </h2>

        <div className="divide-y divide-slate-800/80">
          {order.order_items?.map((item: OrderDetailItem) => (
            <div key={item.id} className="py-4 flex items-center justify-between gap-4">
              <div>
                <Link
                  href={item.product ? `/products/${item.product.slug}` : '#'}
                  className="text-sm font-bold text-white hover:text-rose-400 transition-colors"
                >
                  {item.product?.name || 'Hardware Unit'}
                </Link>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Qty: {item.quantity} &times; ${Number(item.unit_price).toFixed(2)}
                </div>
              </div>

              <div className="text-sm font-bold font-mono text-white">
                ${(item.quantity * Number(item.unit_price)).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Total Charged</span>
          <span className="text-2xl font-extrabold font-mono text-white">
            ${Number(order.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Shipping & Payment Meta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Delivery Destination
          </h3>
          <p className="text-sm text-slate-200">
            {shipping.name || 'Operative Delivery'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {shipping.address?.line1 || shipping.street || 'Standard Dispatch Sector'}
          </p>
          <p className="text-xs text-slate-400">
            {shipping.address?.city || shipping.city} {shipping.address?.state || shipping.state}{' '}
            {shipping.address?.postal_code || shipping.zip}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
            Payment Method
          </h3>
          <p className="text-sm text-slate-200 font-medium">
            Stripe Hosted Checkout
          </p>
          {order.stripe_session_id && (
            <p className="text-[10px] font-mono text-slate-500 mt-1 break-all">
              Session: {order.stripe_session_id}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
