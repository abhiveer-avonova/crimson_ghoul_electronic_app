import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/products';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductActions } from '@/components/products/ProductActions';
import { ProductCard } from '@/components/products/ProductCard';
import { Badge } from '@/components/ui/Badge';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Crimson Ghoul',
    };
  }

  return {
    title: `${product.name} | Crimson Ghoul Electronics`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = (await getProducts({ featuredOnly: true }))
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const stock = product.inventory?.stock_quantity ?? 10;
  const lowThreshold = product.inventory?.low_stock_threshold ?? 3;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= lowThreshold;

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-mono">
          <Link href="/" className="hover:text-rose-400 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-rose-400 transition-colors">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-slate-200 line-clamp-1">{product.name}</span>
        </nav>

        {/* Main Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Gallery View */}
          <ProductGallery
            imageKeys={product.image_keys}
            productName={product.name}
          />

          {/* Device Details & Purchasing */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
                  {product.brand}
                </span>
                {product.is_featured && <Badge variant="featured">Flagship</Badge>}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price & Stock Status */}
            <div className="flex items-center justify-between py-4 border-y border-slate-800/80">
              <div>
                <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block">Retail Price</span>
                <div className="text-3xl font-extrabold font-mono text-white">
                  ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div>
                {isOutOfStock ? (
                  <Badge variant="outOfStock">Out of Stock</Badge>
                ) : isLowStock ? (
                  <Badge variant="lowStock">Low Stock ({stock} left)</Badge>
                ) : (
                  <Badge variant="inStock">In Stock & Ready to Ship</Badge>
                )}
              </div>
            </div>

            {/* Overview Description */}
            <p className="text-sm leading-relaxed text-slate-300">
              {product.description}
            </p>

            {/* Key Specs Highlights */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="rounded-xl bg-slate-900/60 border border-slate-800/70 p-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Hardware Highlights
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {product.specs.processor && (
                    <div className="flex flex-col">
                      <span className="text-slate-500 font-mono">Processor</span>
                      <span className="text-slate-200 font-semibold">{product.specs.processor}</span>
                    </div>
                  )}
                  {product.specs.graphics && (
                    <div className="flex flex-col">
                      <span className="text-slate-500 font-mono">Graphics</span>
                      <span className="text-slate-200 font-semibold">{product.specs.graphics}</span>
                    </div>
                  )}
                  {product.specs.ram && (
                    <div className="flex flex-col">
                      <span className="text-slate-500 font-mono">Memory</span>
                      <span className="text-slate-200 font-semibold">{product.specs.ram}</span>
                    </div>
                  )}
                  {product.specs.storage && (
                    <div className="flex flex-col">
                      <span className="text-slate-500 font-mono">Storage</span>
                      <span className="text-slate-200 font-semibold">{product.specs.storage}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Purchasing Controls */}
            <ProductActions product={product} />

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/60 text-center">
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
                <svg className="w-5 h-5 mx-auto text-rose-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div className="text-[11px] font-bold text-slate-200">Express Delivery</div>
                <div className="text-[10px] text-slate-500">Free on orders $100+</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
                <svg className="w-5 h-5 mx-auto text-cyan-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="text-[11px] font-bold text-slate-200">3-Year Warranty</div>
                <div className="text-[10px] text-slate-500">Official manufacturer</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/40">
                <svg className="w-5 h-5 mx-auto text-emerald-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <div className="text-[11px] font-bold text-slate-200">30-Day Guarantee</div>
                <div className="text-[10px] text-slate-500">Hassle-free returns</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specifications Table */}
        {product.specs && Object.keys(product.specs).length > 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 mb-20">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Full Technical Specifications
            </h2>

            <div className="divide-y divide-slate-800/80">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="sm:col-span-2 text-sm text-slate-200 font-medium">
                    {Array.isArray(value) ? value.join(', ') : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Electronics Section */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Recommended For You
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Complementary hardware and flagship alternatives.
                </p>
              </div>
              <Link
                href="/products"
                className="text-xs font-mono font-semibold text-rose-400 hover:text-rose-300 transition-colors uppercase tracking-wider"
              >
                View Catalog &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

