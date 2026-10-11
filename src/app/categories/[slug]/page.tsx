import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProducts } from '@/lib/products';
import { getStoreAsset } from '@/lib/assets';
import { ProductCard } from '@/components/products/ProductCard';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found | Crimson Ghoul',
    };
  }

  return {
    title: `${category.name} | Crimson Ghoul Electronics`,
    description: category.description || `Browse our collection of ${category.name}.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProducts({ categorySlug: slug });
  const categoryAsset = category.image_key ? getStoreAsset(category.image_key) : null;
  const bannerUrl = categoryAsset?.url || '/window.svg';

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
            Categories
          </Link>
          <span>/</span>
          <span className="text-rose-400">{category.name}</span>
        </nav>

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 mb-12 shadow-2xl">
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <Image
              src={bannerUrl}
              alt={category.name}
              fill
              priority
              className="object-cover object-center scale-105 filter brightness-75 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17] via-transparent to-transparent" />

            {/* Banner Text Overlay */}
            <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-[10px] font-mono uppercase tracking-widest mb-3">
                Hardware Category
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                {category.name}
              </h1>
              <p className="mt-2 text-sm text-slate-300 drop-shadow">
                {category.description}
              </p>
            </div>
          </div>

          {/* Sub-bar */}
          <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Showing <span className="text-rose-400 font-bold">{products.length}</span> devices in this series
            </span>
            <Link
              href={`/products?category=${category.slug}`}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
            >
              Filter in Catalog &rarr;
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
            <h3 className="text-lg font-bold text-white mb-2">No Products Currently Listed</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              New shipments for {category.name} are currently in transit. Explore our other categories in the meantime.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Browse All Electronics
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
