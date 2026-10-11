import React from 'react';
import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';

export const metadata = {
  title: 'Search Electronics | Crimson Ghoul',
  description: 'Search our catalog of high-performance electronics, PCs, and peripherals.',
};

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() || '';

  const [products, categories] = await Promise.all([
    query ? getProducts({ query }) : Promise.resolve([]),
    getCategories(),
  ]);

  const popularTags = ['RTX 4090', 'OLED', 'Gaming Rig', 'Wireless Mouse', 'Titanium', 'Creator Laptop'];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-mono">
          <Link href="/" className="hover:text-rose-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-200">Search</span>
          {query && (
            <>
              <span>/</span>
              <span className="text-rose-400">&ldquo;{query}&rdquo;</span>
            </>
          )}
        </nav>

        {/* Search Header & Input */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Search Hardware Catalog
          </h1>

          <form action="/search" method="GET" className="relative max-w-2xl">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by device model, GPU, specs, or keyword..."
              className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 font-sans text-sm transition-all shadow-inner"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Search
            </button>
          </form>

          {/* Popular Tag Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-4 text-xs">
            <span className="text-slate-500 font-mono">Popular:</span>
            {popularTags.map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Results Section */}
        {query ? (
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
              <div className="text-sm text-slate-300">
                Found <span className="font-bold text-white font-mono">{products.length}</span> results for &ldquo;
                <span className="text-rose-400 font-semibold">{query}</span>&rdquo;
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-400">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">No Matching Results</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                  We couldn&apos;t find any devices matching &ldquo;{query}&rdquo;. Check for spelling errors or try broader keywords.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {categories.slice(0, 4).map((c) => (
                    <Link
                      key={c.id}
                      href={`/categories/${c.slug}`}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                    >
                      Browse {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-8 sm:p-12">
            <h2 className="text-lg font-bold text-white mb-4">Browse by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/categories/${c.slug}`}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-rose-500/50 hover:shadow-[0_0_15px_rgba(225,29,72,0.15)] transition-all flex flex-col items-center text-center group"
                >
                  <span className="text-xs font-bold text-slate-200 group-hover:text-rose-400 transition-colors">
                    {c.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

