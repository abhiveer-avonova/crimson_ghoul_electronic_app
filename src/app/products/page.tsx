import React from 'react';
import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters } from '@/components/products/ProductFilters';

export const metadata = {
  title: 'All Electronics Catalog | Crimson Ghoul',
  description: 'Explore high-performance desktop PCs, creator laptops, flagship smartphones, and esports peripherals.',
};

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    inStock?: string;
    sort?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const categorySlug = params.category;
  const brand = params.brand;
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : undefined;
  const minPrice = params.minPrice ? parseFloat(params.minPrice) : undefined;
  const inStockOnly = params.inStock === 'true';
  const sort = params.sort || 'newest';

  const [allCategories, initialProducts] = await Promise.all([
    getCategories(),
    getProducts({
      categorySlug,
      brand,
      maxPrice,
      inStockOnly,
    }),
  ]);

  // Apply in-memory minPrice & sorting
  let products = initialProducts;
  if (minPrice !== undefined) {
    products = products.filter((p) => p.price >= minPrice);
  }

  if (sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === 'name') {
    products.sort((a, b) => a.name.localeCompare(b.name));
  }

  const activeCategory = allCategories.find((c) => c.slug === categorySlug);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-mono">
            <Link href="/" className="hover:text-rose-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-slate-200">Catalog</span>
            {activeCategory && (
              <>
                <span>/</span>
                <span className="text-rose-400">{activeCategory.name}</span>
              </>
            )}
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {activeCategory ? activeCategory.name : 'All Products'}
              </h1>
              <p className="mt-2 text-sm text-slate-400 max-w-2xl">
                {activeCategory?.description ||
                  'Engineered for maximum compute power, thermal efficiency, and precision hardware design.'}
              </p>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Showing <span className="text-rose-400 font-bold">{products.length}</span> items
            </div>
          </div>
        </div>

        {/* Main Grid with Filter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-1 lg:sticky lg:top-28">
            <ProductFilters categories={allCategories} />
          </aside>

          {/* Product Cards Grid */}
          <div className="lg:col-span-3">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">No Matching Electronics</h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                  We could not find any devices matching your exact filter criteria. Try adjusting your price range or selected brands.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)]"
                >
                  Clear All Filters
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

