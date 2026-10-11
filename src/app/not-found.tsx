import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStoreAsset } from '@/lib/assets';

export default function NotFound() {
  const notFoundAsset = getStoreAsset('empty_404');
  const imageUrl = notFoundAsset?.url || '/window.svg';

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex items-center justify-center px-4 py-24">
      <div className="max-w-lg w-full text-center">
        {/* 404 Illustration */}
        <div className="relative w-64 h-64 mx-auto mb-8 rounded-3xl overflow-hidden bg-slate-900/50 border border-slate-800 shadow-[0_0_50px_rgba(225,29,72,0.15)] flex items-center justify-center">
          <Image
            src={imageUrl}
            alt="404 - Device Not Found"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs uppercase tracking-widest mb-4">
          Error 404 — Signal Terminated
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          Hardware Not Located
        </h1>

        <p className="text-sm text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">
          The requested device blueprint or URL does not exist or has been relocated to another sector.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(225,29,72,0.35)]"
          >
            Return to Home
          </Link>
          <Link
            href="/products"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}

