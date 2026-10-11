'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/useCartStore';
import { useIsMounted } from '@/lib/hooks/useIsMounted';

export function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const mounted = useIsMounted();
  const { openCart, totalItems } = useCartStore();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const cartCount = mounted ? totalItems() : 0;

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-red-700 flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.4)] group-hover:shadow-[0_0_20px_rgba(225,29,72,0.6)] transition-all">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider text-base text-white font-mono group-hover:text-rose-400 transition-colors">
              CRIMSON<span className="text-rose-500">GHOUL</span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 font-mono -mt-1 uppercase">
              Electronics
            </span>
          </div>
        </Link>

        {/* Primary Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-white hover:text-rose-400 transition-colors">
            Home
          </Link>
          <Link href="/products" className="hover:text-white hover:text-rose-400 transition-colors">
            Products
          </Link>
          <Link href="/categories/desktop-pcs" className="hover:text-white hover:text-rose-400 transition-colors">
            Desktops
          </Link>
          <Link href="/categories/laptops" className="hover:text-white hover:text-rose-400 transition-colors">
            Laptops
          </Link>
          <Link href="/categories/peripherals" className="hover:text-white hover:text-rose-400 transition-colors">
            Peripherals
          </Link>
        </nav>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex flex-1 max-w-xs relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search electronics..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
          />
          <svg
            className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </form>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {/* Wishlist */}
          <Link
            href="/account/wishlist"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors relative"
            title="Wishlist"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>

          {/* User Account / Profile */}
          <Link
            href="/account/profile"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
            title="Account Profile"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>

          {/* Cart Trigger */}
          <button
            onClick={openCart}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-rose-500/50 hover:bg-slate-800 text-slate-200 transition-all cursor-pointer select-none"
            title="Shopping Cart"
          >
            <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-xs font-mono font-bold text-white bg-rose-600 px-1.5 py-0.5 rounded-full min-w-5 text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

