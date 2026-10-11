'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '@/types/database';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fullName, setFullName] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    async function loadProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setUser(user);
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (data) {
            setProfile(data);
            setFullName(data.full_name || '');
            if (data.shipping_address && typeof data.shipping_address === 'object') {
              setShippingAddress((prev) => ({
                ...prev,
                ...data.shipping_address,
              }));
            }
          }
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [supabase]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          shipping_address: shippingAddress,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'success', text: 'Operative profile updated successfully.' });
      }
    } catch (err: unknown) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Update failed.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center text-slate-400 font-mono text-xs">
        Loading profile data...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-white">Operative Identification</h1>
            <Badge variant={profile?.role === 'admin' ? 'featured' : 'spec'}>
              {profile?.role === 'admin' ? 'ADMINISTRATOR' : 'CUSTOMER'}
            </Badge>
          </div>
          <p className="text-xs font-mono text-slate-400">
            ID: <span className="text-slate-300">{user?.id || 'Unknown'}</span>
          </p>
        </div>

        {profile?.role === 'admin' && (
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Admin Dashboard &rarr;
          </Link>
        )}
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-3 border ${
            message.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
              : 'bg-red-950/60 border-red-800 text-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-300 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Email Address</label>
              <Input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full opacity-60 cursor-not-allowed bg-slate-950"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Full Name</label>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Vance"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/80">
          <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-300 mb-4">
            Default Delivery Sector
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Street Address</label>
              <Input
                type="text"
                value={shippingAddress.street}
                onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                placeholder="1042 Obsidian Way, Suite 400"
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">City</label>
                <Input
                  type="text"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  placeholder="Neo Tokyo"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">State / Region</label>
                <Input
                  type="text"
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  placeholder="CA"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">Postal Code</label>
                <Input
                  type="text"
                  value={shippingAddress.zip}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                  placeholder="94107"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Profile Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
