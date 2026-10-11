'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Badge } from '@/components/ui/Badge';

interface AdminOrder {
  id: string;
  user_id?: string | null;
  status: string;
  total_amount: number;
  currency: string;
  shipping_details?: { name?: string; city?: string } | null;
  created_at: string;
  order_items?: { id: string; quantity: number; unit_price: number }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*, product:products(*))')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setOrders(data);
        } else {
          // Demo fallback
          setOrders([
            {
              id: 'ord-8472-a10f-9481',
              user_id: 'usr-customer-01',
              status: 'processing',
              total_amount: 3499.0,
              currency: 'usd',
              shipping_details: { name: 'Dr. Katherine Cross', city: 'Neo Tokyo' },
              created_at: new Date(Date.now() - 3600000).toISOString(),
              order_items: [{ id: 'item-1', quantity: 1, unit_price: 3499.0 }],
            },
            {
              id: 'ord-9182-c20e-8219',
              user_id: 'usr-customer-02',
              status: 'shipped',
              total_amount: 2299.0,
              currency: 'usd',
              shipping_details: { name: 'Elena Rostova', city: 'Berlin' },
              created_at: new Date(Date.now() - 86400000).toISOString(),
              order_items: [{ id: 'item-2', quantity: 1, unit_price: 2299.0 }],
            },
            {
              id: 'ord-1039-f30b-5512',
              user_id: 'usr-customer-03',
              status: 'delivered',
              total_amount: 1099.0,
              currency: 'usd',
              shipping_details: { name: 'Marcus Chen', city: 'San Francisco' },
              created_at: new Date(Date.now() - 172800000).toISOString(),
              order_items: [{ id: 'item-3', quantity: 1, unit_price: 1099.0 }],
            },
          ]);
        }
      } catch (err) {
        console.error('Failed to load admin orders:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [supabase]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', orderId)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge variant="stock">DELIVERED</Badge>;
      case 'shipped':
        return <Badge variant="spec">SHIPPED</Badge>;
      case 'processing':
        return <Badge variant="lowStock">PROCESSING</Badge>;
      case 'cancelled':
        return <Badge variant="outOfStock">CANCELLED</Badge>;
      default:
        return <Badge variant="neutral">PENDING</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400 font-mono text-xs">
        Loading order fulfillment manifest...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white font-mono uppercase tracking-wider">
            Order Fulfillment & Logistics
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Requisition statuses and customer delivery updates ({orders.length} total)
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer Destination</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {orders.map((order) => {
                const shipping = order.shipping_details || {};
                const customerName = shipping.name || 'Anonymous Operative';
                const destination = shipping.city || 'Standard Sector';

                return (
                  <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      #{order.id.slice(0, 12)}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-white block">{customerName}</span>
                      <span className="text-[10px] text-slate-500">{destination}</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      {order.order_items?.length || 1} units
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      ${Number(order.total_amount).toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4">{getStatusBadge(order.status)}</td>

                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={order.status}
                        disabled={updatingId === order.id}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-mono text-[11px] focus:outline-none focus:border-cyan-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
