'use client';

import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface ProductFiltersProps {
  categories?: { id: string; name: string; slug: string }[];
  brands?: string[];
}

export function ProductFilters({
  categories = [
    { id: '1', name: 'Desktop PCs & Rigs', slug: 'desktop-pcs' },
    { id: '2', name: 'Laptops & Ultrabooks', slug: 'laptops' },
    { id: '3', name: 'Smartphones & Tablets', slug: 'smartphones' },
    { id: '4', name: 'PC Peripherals', slug: 'peripherals' },
    { id: '5', name: 'Audio & Headsets', slug: 'audio' },
    { id: '6', name: 'Components & GPUs', slug: 'components' },
  ],
  brands = ['Crimson Ghoul', 'Vanguard', 'Spectre', 'Ghoststrike', 'Horizon', 'Aether'],
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get('category') || '';
  const selectedBrand = searchParams.get('brand') || '';
  const maxPrice = searchParams.get('maxPrice') || '4000';
  const inStockOnly = searchParams.get('inStock') === 'true';

  const applyFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '' || value === '4000' || value === 'false') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    router.push(pathname);
  };

  return (
    <aside className="w-full lg:w-64 space-y-6 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 className="font-semibold text-sm text-slate-100 flex items-center gap-2">
          <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </h3>
        <button
          onClick={handleClear}
          className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
          Category
        </label>
        <div className="space-y-1">
          <button
            onClick={() => applyFilters({ category: null })}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
              !selectedCategory
                ? 'bg-rose-600/20 text-rose-400 font-semibold border border-rose-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => applyFilters({ category: cat.slug })}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-rose-600/20 text-rose-400 font-semibold border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
          Brand
        </label>
        <div className="space-y-1">
          <button
            onClick={() => applyFilters({ brand: null })}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
              !selectedBrand
                ? 'bg-rose-600/20 text-rose-400 font-semibold border border-rose-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            All Brands
          </button>
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => applyFilters({ brand })}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                selectedBrand === brand
                  ? 'bg-rose-600/20 text-rose-400 font-semibold border border-rose-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Max Price Range Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-slate-300 uppercase tracking-wider font-mono">
            Max Price
          </span>
          <span className="font-mono text-rose-400 font-bold">${maxPrice}</span>
        </div>
        <input
          type="range"
          min="100"
          max="4000"
          step="100"
          value={maxPrice}
          onChange={(e) => applyFilters({ maxPrice: e.target.value })}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-600"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>$100</span>
          <span>$4,000</span>
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
        <span className="text-xs text-slate-300">In Stock Only</span>
        <button
          onClick={() => applyFilters({ inStock: !inStockOnly ? 'true' : null })}
          className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
            inStockOnly ? 'bg-rose-600' : 'bg-slate-800'
          }`}
        >
          <div
            className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition-transform ${
              inStockOnly ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </aside>
  );
}

