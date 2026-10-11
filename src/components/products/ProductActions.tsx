'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/database';
import { useCartStore } from '@/lib/store/useCartStore';
import { Button } from '@/components/ui/Button';
import { getStoreAsset } from '@/lib/assets';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const router = useRouter();
  const { addItem, openCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const stock = product.inventory?.stock_quantity ?? 10;
  const isOutOfStock = stock <= 0;

  const primaryKey = product.image_keys?.[0];
  const asset = primaryKey ? getStoreAsset(primaryKey) : null;
  const imageUrl = asset?.url || '/window.svg';

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: imageUrl,
        slug: product.slug,
      });
    }
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      openCart();
    }, 400);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageUrl,
      slug: product.slug,
    });
    router.push('/checkout');
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="space-y-4 pt-4 border-t border-slate-800">
      {/* Quantity & Wishlist */}
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-1">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1 || isOutOfStock}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
          >
            -
          </button>
          <span className="w-12 text-center text-sm font-bold font-mono text-white">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
            disabled={quantity >= stock || isOutOfStock}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={toggleWishlist}
          aria-label="Save to wishlist"
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
            isWishlisted
              ? 'border-rose-500 bg-rose-500/10 text-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.2)]'
              : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:text-white'
          }`}
        >
          <svg
            className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill={isWishlisted ? 'currentColor' : 'none'}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {isWishlisted ? 'Saved' : 'Wishlist'}
        </button>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          variant="primary"
          size="lg"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
          className={`w-full justify-center transition-all ${
            addedAnimation ? 'scale-95 bg-emerald-600' : ''
          }`}
        >
          {addedAnimation ? (
            'Added to Cart!'
          ) : isOutOfStock ? (
            'Out of Stock'
          ) : (
            <>
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Add to Cart
            </>
          )}
        </Button>

        <Button
          variant="secondary"
          size="lg"
          disabled={isOutOfStock}
          onClick={handleBuyNow}
          className="w-full justify-center"
        >
          Instant Checkout
        </Button>
      </div>
    </div>
  );
}
