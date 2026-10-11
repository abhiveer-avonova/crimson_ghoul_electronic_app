'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { getStoreAsset } from '@/lib/assets';
import { Badge } from '@/components/ui/Badge';
import { SEED_PRODUCTS } from '@/data/seed-data';
import { Product } from '@/types/database';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, inventory(*), category:categories(*)')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setProducts(data as Product[]);
        } else {
          setProducts(SEED_PRODUCTS);
        }
      } catch (err) {
        console.error('Failed to load admin products:', err);
        setProducts(SEED_PRODUCTS);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [supabase]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to deactivate and remove this hardware listing?')) {
      return;
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .update({ is_active: false })
        .eq('id', id)
        .select('id');

      if (error) {
        throw new Error(error.message);
      }

      if (!data || data.length === 0) {
        throw new Error('Product deactivation failed: no rows were affected.');
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Delete product error:', err);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400 font-mono text-xs">
        Loading product blueprints...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white font-mono uppercase tracking-wider">
            Hardware Catalog Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Active blueprints in public marketplace ({products.length} registered)
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)] flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Deploy New Device
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-mono uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Device</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Stock</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {products.map((p) => {
                const primaryKey = p.image_keys?.[0];
                const asset = primaryKey ? getStoreAsset(primaryKey) : null;
                const imageUrl = asset?.url || '/window.svg';
                const stock = p.inventory?.stock_quantity ?? 10;

                return (
                  <tr key={p.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                        <Image
                          src={imageUrl}
                          alt={p.name}
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <Link
                          href={`/products/${p.slug}`}
                          className="font-bold text-white hover:text-rose-400 transition-colors truncate block"
                        >
                          {p.name}
                        </Link>
                        <span className="text-[10px] text-slate-500 font-mono">
                          slug: {p.slug}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-cyan-400">{p.brand}</td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-white">{stock}</span>
                      <span className="text-[10px] text-slate-500 ml-1">units</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-white">
                      ${p.price.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4">
                      {p.is_featured ? (
                        <Badge variant="featured">FLAGSHIP</Badge>
                      ) : (
                        <Badge variant="neutral">STANDARD</Badge>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${p.slug}`}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold transition-colors"
                        >
                          View
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          className="px-2.5 py-1 rounded-lg bg-red-950/40 border border-red-800/50 hover:bg-red-900/60 text-red-300 text-[11px] font-semibold transition-colors"
                        >
                          Remove
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
