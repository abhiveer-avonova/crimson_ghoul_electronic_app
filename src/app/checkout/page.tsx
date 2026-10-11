'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/useCartStore';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { User } from '@supabase/supabase-js';

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const subtotal = totalPrice();
  const shippingCost = subtotal >= 100 || subtotal === 0 ? 0 : 15;
  const estimatedTax = subtotal * 0.08;
  const orderTotal = subtotal + shippingCost + estimatedTax;

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  const supabase = createClient();

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profile) {
          const addr = profile.shipping_address || {};
          setShippingDetails((prev) => ({
            ...prev,
            name: profile.full_name || '',
            email: user.email || '',
            street: addr.street || '',
            city: addr.city || '',
            state: addr.state || '',
            zip: addr.zip || '',
          }));
        } else {
          setShippingDetails((prev) => ({
            ...prev,
            email: user.email || '',
          }));
        }
      }
    }

    loadUser();
  }, [supabase]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          shippingAddress: shippingDetails,
          userId: user?.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to initialize checkout.');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No redirect URL received from Stripe.');
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'An unexpected error occurred during checkout.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full text-center p-8 rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white mb-2">Cart is Currently Empty</h1>
          <p className="text-xs text-slate-400 mb-6">
            You must add at least one hardware device to your cart before proceeding to checkout.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)]"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-mono">
          <Link href="/" className="hover:text-rose-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-rose-400 transition-colors">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-rose-400">Checkout Dispatch</span>
        </nav>

        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-8">
          Hardware Checkout Terminal
        </h1>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center gap-3">
            <svg className="w-4 h-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Shipping Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                <h2 className="text-base font-bold font-mono uppercase tracking-wider text-white">
                  1. Dispatch Coordinates
                </h2>
                {!user && (
                  <Link href="/login?next=/checkout" className="text-xs text-rose-400 hover:underline">
                    Sign in to prefill
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Recipient Full Name</label>
                  <Input
                    type="text"
                    required
                    value={shippingDetails.name}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                    placeholder="Alex Vance"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Confirmation Email</label>
                  <Input
                    type="email"
                    required
                    value={shippingDetails.email}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                    placeholder="operator@crimsonghoul.io"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Street Address</label>
                <Input
                  type="text"
                  required
                  value={shippingDetails.street}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, street: e.target.value })}
                  placeholder="1042 Obsidian Way, Suite 400"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">City</label>
                  <Input
                    type="text"
                    required
                    value={shippingDetails.city}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                    placeholder="Neo Tokyo"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">State / Region</label>
                  <Input
                    type="text"
                    required
                    value={shippingDetails.state}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })}
                    placeholder="CA"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Postal Code</label>
                  <Input
                    type="text"
                    required
                    value={shippingDetails.zip}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, zip: e.target.value })}
                    placeholder="94107"
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Notice */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 text-rose-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Encrypted Stripe Checkout</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Upon submission, you will be redirected to the official Stripe hosted checkout platform. Payment details are fully encrypted and never stored on our application servers.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-6 lg:sticky lg:top-28 shadow-2xl">
              <h2 className="text-base font-bold font-mono uppercase tracking-wider text-white pb-4 border-b border-slate-800">
                Order Ledger ({items.reduce((acc, i) => acc + i.quantity, 0)} Items)
              </h2>

              {/* Items List */}
              <div className="divide-y divide-slate-800/80 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 overflow-hidden shrink-0">
                      <Image
                        src={item.image || '/window.svg'}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <span className="text-[11px] font-mono text-slate-400">
                        Qty {item.quantity} &times; ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-xs font-bold font-mono text-white">
                      ${(item.quantity * item.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-slate-200">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Express Shipping</span>
                  <span className={shippingCost === 0 ? 'text-emerald-400' : 'text-slate-200'}>
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-slate-200">${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-slate-800">
                  <span>Total Due</span>
                  <span className="text-rose-400">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full justify-center shadow-[0_0_25px_rgba(225,29,72,0.35)]"
              >
                {loading ? 'Routing to Stripe...' : `Pay with Card • $${orderTotal.toFixed(2)}`}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
