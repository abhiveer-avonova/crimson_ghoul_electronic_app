'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { getStoreAsset } from '@/lib/assets';

interface ProductGalleryProps {
  imageKeys: string[];
  productName: string;
}

export function ProductGallery({ imageKeys, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fallback if empty image_keys
  const keys = imageKeys.length > 0 ? imageKeys : ['category_desktop_pc'];
  const activeKey = keys[selectedIndex] || keys[0];
  const activeAsset = getStoreAsset(activeKey);
  const mainImageUrl = activeAsset?.url || '/window.svg';

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Stage */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl flex items-center justify-center group">
        <Image
          src={mainImageUrl}
          alt={`${productName} view ${selectedIndex + 1}`}
          fill
          priority
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails Row */}
      {keys.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {keys.map((key, idx) => {
            const asset = getStoreAsset(key);
            const thumbUrl = asset?.url || '/window.svg';
            const isSelected = idx === selectedIndex;

            return (
              <button
                key={key + idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                  isSelected
                    ? 'border-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.4)] scale-105'
                    : 'border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={thumbUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
