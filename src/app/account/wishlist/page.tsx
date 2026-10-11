'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { getStoreAsset } from '@/lib/assets';
import { ProductCard } from '@/components/products/ProductCard';
import { Product } from '@/types/database';

export default function WishlistPage() {
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase
            .from('wishlists')
            .select('*, product:products(*, inventory(*))')
            .eq('user_id', user.id);

          if (!error && data) {
            setWishlistItems(data.map((item) => item.product).filter(Boolean));
          }
        }
      } catch (err) {
        console.error('Failed to load wishlist:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, [supabase]);

  const emptyAsset = getStoreAsset('empty_wishlist');
  const emptyImageUrl = emptyAsset?.url || '/window.svg';

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400 font-mono text-xs">
        Accessing hardware wishlist...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Saved Hardware Units</h1>
          <p className="text-xs text-slate-400 mt-1">Bookmarked hardware configurations and devices</p>
        </div>
        <span className="text-xs font-mono text-slate-500">
          Saved: <span className="text-rose-400 font-bold">{wishlistItems.length}</span>
        </span>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
          <div className="relative w-44 h-44 mx-auto mb-6 rounded-2xl overflow-hidden bg-slate-950/60 border border-slate-800/80 shadow-[0_0_30px_rgba(225,29,72,0.15)] flex items-center justify-center">
            <Image
              src={emptyImageUrl}
              alt="Empty Wishlist"
              fill
              className="object-cover object-center"
            />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Wishlist Terminal Empty</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto mb-6">
            You haven&apos;t saved any hardware components yet. Click the heart icon on any device to monitor it here.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)]"
          >
            Explore Catalog
          </Link>
        </div>
      )}
    </div>
  );
}
