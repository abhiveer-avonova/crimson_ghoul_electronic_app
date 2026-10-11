import React from 'react';
import Link from 'next/link';
import { AccountNav } from '@/components/account/AccountNav';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-mono">
          <Link href="/" className="hover:text-rose-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-200">Operative Terminal</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-1">
            <AccountNav />
          </aside>

          {/* Main Account Content */}
          <main className="lg:col-span-3">{children}</main>
        </div>
      </div>
    </div>
  );
}

