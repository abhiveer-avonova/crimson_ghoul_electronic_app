'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Badge } from '@/components/ui/Badge';
import { SEED_PRODUCTS } from '@/data/seed-data';

interface InventoryItemWithProduct {
  product_id: string;
  sku: string;
  stock_quantity: number;
  low_stock_threshold: number;
  product?: {
    name: string;
    slug: string;
    brand: string;
    price: number;
  } | null;
}

export default function AdminInventoryPage() {
  const [inventoryList, setInventoryList] = useState<InventoryItemWithProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function loadInventory() {
      try {
        const { data, error } = await supabase
          .from('inventory')
          .select('*, product:products(name, slug, brand, price)')
          .order('stock_quantity', { ascending: true });

        if (!error && data && data.length > 0) {
          setInventoryList(data);
        } else {
          // Fallback to seed products inventory
          const seedInv = SEED_PRODUCTS.map((p) => ({
            product_id: p.id,
            sku: p.inventory?.sku || 'SKU-DEFAULT',
            stock_quantity: p.inventory?.stock_quantity ?? 10,
            low_stock_threshold: p.inventory?.low_stock_threshold ?? 3,
            product: {
              name: p.name,
              slug: p.slug,
              brand: p.brand,
              price: p.price,
            },
          }));
          setInventoryList(seedInv);
        }
      } catch (err) {
        console.error('Failed to load inventory:', err);
      } finally {
        setLoading(false);
      }
    }

    loadInventory();
  }, [supabase]);

  const updateStock = async (productId: string, newStock: number) => {
    const safeStock = Math.max(0, newStock);
    setUpdatingId(productId);

    try {
      await supabase
        .from('inventory')
        .update({
          stock_quantity: safeStock,
          updated_at: new Date().toISOString(),
        })
        .eq('product_id', productId);

      setInventoryList((prev) =>
        prev.map((item) =>
          item.product_id === productId ? { ...item, stock_quantity: safeStock } : item
        )
      );
    } catch (err) {
      console.error('Failed to update stock:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400 font-mono text-xs">
        Auditing hardware stock reserves...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white font-mono uppercase tracking-wider">
            Inventory & Reserves Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time stock quantities and threshold warning levels
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Hardware Unit</th>
                <th className="py-3.5 px-4">SKU Code</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Current Stock</th>
                <th className="py-3.5 px-4 text-right">Modifier Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {inventoryList.map((item) => {
                const stock = item.stock_quantity;
                const threshold = item.low_stock_threshold;
                const isOutOfStock = stock <= 0;
                const isLow = stock > 0 && stock <= threshold;

                return (
                  <tr key={item.product_id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <Link
                        href={item.product?.slug ? `/products/${item.product.slug}` : '#'}
                        className="font-bold text-white hover:text-rose-400 transition-colors block max-w-xs truncate"
                      >
                        {item.product?.name || 'Device'}
                      </Link>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {item.product?.brand} • ${item.product?.price?.toFixed(2)}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-cyan-400 font-semibold">
                      {item.sku}
                    </td>

                    <td className="py-3.5 px-4">
                      {isOutOfStock ? (
                        <Badge variant="outOfStock">DEPLETED</Badge>
                      ) : isLow ? (
                        <Badge variant="lowStock">LOW ({stock})</Badge>
                      ) : (
                        <Badge variant="stock">NORMAL</Badge>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="text-base font-extrabold font-mono text-white">
                        {stock}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          disabled={stock <= 0 || updatingId === item.product_id}
                          onClick={() => updateStock(item.product_id, stock - 1)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono font-bold flex items-center justify-center disabled:opacity-30 transition-colors"
                        >
                          -
                        </button>
                        <button
                          type="button"
                          disabled={updatingId === item.product_id}
                          onClick={() => updateStock(item.product_id, stock + 1)}
                          className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono font-bold flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          disabled={updatingId === item.product_id}
                          onClick={() => {
                            const val = prompt('Enter new exact stock count:', String(stock));
                            if (val !== null) {
                              const parsed = parseInt(val, 10);
                              if (!isNaN(parsed) && parsed >= 0) {
                                updateStock(item.product_id, parsed);
                              }
                            }
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-800/50 hover:bg-cyan-900/60 text-cyan-300 text-[11px] font-mono transition-colors"
                        >
                          Set
                        </button>
                      </div>
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
