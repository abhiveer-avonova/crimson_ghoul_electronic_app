import React, { Suspense } from 'react';
import Link from 'next/link';
import { ClearCartOnMount } from '@/components/checkout/ClearCartOnMount';

export const metadata = {
  title: 'Payment Successful | Crimson Ghoul',
  description: 'Your hardware order has been received and is being prepared for dispatch.',
};

interface SuccessPageProps {
  searchParams: Promise<{
    session_id?: string;
  }>;
}

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex items-center justify-center px-4 py-24">
      <Suspense fallback={null}>
        <ClearCartOnMount />
      </Suspense>

      <div className="max-w-lg w-full text-center p-8 sm:p-12 rounded-3xl border border-slate-800 bg-slate-900/70 shadow-[0_0_60px_rgba(225,29,72,0.15)]">
        {/* Glow checkmark circle */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
          Payment Verified
        </span>

        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
          Acquisition Confirmed
        </h1>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          Your hardware requisition has been verified and registered in the dispatch queue. A confirmation receipt has been sent to your email.
        </p>

        {session_id && (
          <div className="mb-8 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
              Stripe Transaction Session ID
            </span>
            <span className="font-mono text-xs text-slate-300 break-all select-all">
              {session_id}
            </span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/account/orders"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(225,29,72,0.35)]"
          >
            Track in Terminal
          </Link>
          <Link
            href="/products"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

