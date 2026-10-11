import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-rose-600 flex items-center justify-center text-white font-mono text-xs font-bold shadow-[0_0_10px_rgba(225,29,72,0.5)]">
                CG
              </div>
              <span className="font-extrabold text-sm text-white font-mono tracking-wider">
                CRIMSON<span className="text-rose-500">GHOUL</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs text-xs">
              High-performance consumer electronics, liquid-cooled desktop rigs, ultrabooks, and esports peripherals engineered for extreme workloads.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-400">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Direct Cloud Delivery & Guaranteed Warranty
            </div>
          </div>

          {/* Catalog Categories */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Categories
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/categories/desktop-pcs" className="hover:text-rose-400 transition-colors">
                  Custom Gaming Rigs & Desktops
                </Link>
              </li>
              <li>
                <Link href="/categories/laptops" className="hover:text-rose-400 transition-colors">
                  Ultrabooks & Mobile Workstations
                </Link>
              </li>
              <li>
                <Link href="/categories/smartphones" className="hover:text-rose-400 transition-colors">
                  Flagship Smartphones & 5G
                </Link>
              </li>
              <li>
                <Link href="/categories/peripherals" className="hover:text-rose-400 transition-colors">
                  Keyboards, Mice & Peripherals
                </Link>
              </li>
              <li>
                <Link href="/categories/audio" className="hover:text-rose-400 transition-colors">
                  Studio Planar Audio & Headsets
                </Link>
              </li>
              <li>
                <Link href="/categories/components" className="hover:text-rose-400 transition-colors">
                  GPUs, Storage & Components
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Portal */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Account & Support
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/account/orders" className="hover:text-rose-400 transition-colors">
                  Track Your Orders
                </Link>
              </li>
              <li>
                <Link href="/account/wishlist" className="hover:text-rose-400 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/account/profile" className="hover:text-rose-400 transition-colors">
                  Account Settings & Address
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-rose-400 transition-colors">
                  Admin Dashboard Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Guarantees */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Guarantees
            </h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-slate-200 font-medium text-xs">
                <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Stripe Encrypted Checkout
              </div>
              <p className="text-[11px] text-slate-400">
                End-to-end 256-bit payment encryption with real-time inventory reservation.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Crimson Ghoul Electronics, Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Next.js 16 + Tailwind CSS v4</span>
            <span>Supabase + Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

