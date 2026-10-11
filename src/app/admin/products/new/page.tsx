'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { STORE_ASSETS } from '@/lib/assets';
import { SEED_CATEGORIES } from '@/data/seed-data';
import { Category } from '@/types/database';

export default function NewProductPage() {
  const router = useRouter();
  const supabase = createClient();

  const [categories, setCategories] = useState<Category[]>(SEED_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    brand: 'Crimson Ghoul',
    category_id: SEED_CATEGORIES[0]?.id || '',
    price: '1999.00',
    stock_quantity: '10',
    description: '',
    is_featured: false,
    image_key: 'hero_gaming_pc',
    specs: {
      processor: 'Intel Core i9-14900K 6.0GHz',
      graphics: 'NVIDIA GeForce RTX 4080 Super 16GB',
      ram: '32GB DDR5 6000MHz',
      storage: '2TB NVMe PCIe 4.0 SSD',
      warranty: '3-Year Premium Replacement',
    },
  });

  useEffect(() => {
    async function loadCats() {
      const { data } = await supabase.from('categories').select('*');
      if (data && data.length > 0) {
        setCategories(data as Category[]);
        setForm((prev) => ({ ...prev, category_id: data[0].id }));
      }
    }
    loadCats();
  }, [supabase]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setForm((prev) => ({
      ...prev,
      name: val,
      slug: generatedSlug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const priceNum = parseFloat(form.price);
      const stockNum = parseInt(form.stock_quantity, 10);

      if (isNaN(priceNum) || priceNum < 0) {
        throw new Error('Valid price is required.');
      }

      // 1. Insert product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert({
          name: form.name,
          slug: form.slug,
          brand: form.brand,
          category_id: form.category_id,
          description: form.description || `${form.brand} high-performance electronics hardware.`,
          price: priceNum,
          specs: form.specs,
          image_keys: [form.image_key],
          is_featured: form.is_featured,
          is_active: true,
        })
        .select('id')
        .single();

      if (productError) {
        throw new Error(productError.message);
      }

      if (productData) {
        // 2. Insert inventory
        const sku = `${form.brand.slice(0, 3).toUpperCase()}-${form.slug.slice(0, 8).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
        await supabase.from('inventory').insert({
          product_id: productData.id,
          sku,
          stock_quantity: stockNum,
          low_stock_threshold: 3,
        });
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to deploy product to database.');
      setLoading(false);
    }
  };

  const assetOptions = Object.keys(STORE_ASSETS);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
        <Link href="/admin/products" className="text-xs text-slate-400 hover:text-white transition-colors">
          &larr; Catalog
        </Link>
        <span className="text-slate-600">/</span>
        <h1 className="text-xl font-bold text-white font-mono uppercase tracking-wider">
          Deploy New Hardware Blueprint
        </h1>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center gap-3">
          <svg className="w-4 h-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
        {/* Core Info */}
        <div>
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-4">
            1. Core Hardware Identity
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Hardware Title</label>
              <Input
                type="text"
                required
                value={form.name}
                onChange={handleNameChange}
                placeholder="Titan RTX Super Rig"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">URL Slug</label>
              <Input
                type="text"
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="titan-rtx-super-rig"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">Brand / Manufacturer</label>
            <Input
              type="text"
              required
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">Category</label>
            <select
              value={form.category_id}
              onChange={(e) => setForm({ ...form, category_id: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-sans text-xs focus:outline-none focus:border-rose-500"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">Retail Price ($ USD)</label>
            <Input
              type="number"
              step="0.01"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full"
            />
          </div>
        </div>

        {/* Stock & Assets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">Initial Inventory Count</label>
            <Input
              type="number"
              required
              value={form.stock_quantity}
              onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">Cloudinary Asset Key</label>
            <select
              value={form.image_key}
              onChange={(e) => setForm({ ...form, image_key: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-xs focus:outline-none focus:border-rose-500"
            >
              {assetOptions.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 mb-1.5">Description Overview</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Engineered with custom liquid cooling, titanium reinforced frame..."
            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />
        </div>

        {/* Technical Specs */}
        <div className="pt-4 border-t border-slate-800">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-4">
            2. Hardware Specifications JSON
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Processor / SoC</label>
              <Input
                type="text"
                value={form.specs.processor}
                onChange={(e) =>
                  setForm({ ...form, specs: { ...form.specs, processor: e.target.value } })
                }
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">GPU / Graphics</label>
              <Input
                type="text"
                value={form.specs.graphics}
                onChange={(e) =>
                  setForm({ ...form, specs: { ...form.specs, graphics: e.target.value } })
                }
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">System Memory</label>
              <Input
                type="text"
                value={form.specs.ram}
                onChange={(e) =>
                  setForm({ ...form, specs: { ...form.specs, ram: e.target.value } })
                }
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">Primary Storage</label>
              <Input
                type="text"
                value={form.specs.storage}
                onChange={(e) =>
                  setForm({ ...form, specs: { ...form.specs, storage: e.target.value } })
                }
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Flagship Switch */}
        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="featured"
            checked={form.is_featured}
            onChange={(e) => setForm({ ...form, is_featured: e.target.checked })}
            className="w-4 h-4 rounded text-rose-600 bg-slate-900 border-slate-700 focus:ring-rose-500"
          />
          <label htmlFor="featured" className="text-xs font-bold text-white select-none">
            Promote to Flagship / Featured Showcase Carousel
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            Cancel
          </Link>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Deploying...' : 'Deploy Blueprint to Catalog'}
          </Button>
        </div>
      </form>
    </div>
  );
}
