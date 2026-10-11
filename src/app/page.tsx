import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStoreAsset } from '@/lib/assets';
import { getProducts, SEED_CATEGORIES } from '@/lib/products';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default async function HomePage() {
  const featuredProducts = await getProducts({ featuredOnly: true });

  const heroGamingPc = getStoreAsset('hero_gaming_pc');
  const heroSale = getStoreAsset('hero_flash_sale_bg');
  const lifestyleDev = getStoreAsset('lifestyle_developer_setup');
  const lifestyleEsports = getStoreAsset('lifestyle_esports_setup');

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SHOWCASE SECTION */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-950 min-h-[500px] flex items-center shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroGamingPc.url}
              alt="Flagship Liquid Cooled Gaming Rig"
              fill
              className="object-cover object-right md:object-center opacity-85"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F17] via-[#0B0F17]/80 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-xl p-8 sm:p-12 space-y-5">
            <Badge variant="discount" className="uppercase tracking-widest text-[10px]">
              NEXT-GEN COMPUTING
            </Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              PRECISION <span className="text-rose-500">HARDWARE</span> FOR EXTREME RIGS
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Equip your battlestation with custom liquid-cooled desktop towers, titanium ultrabooks, and low-latency esports gear engineered for ray-traced dominance.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/products">
                <Button variant="primary" size="lg">
                  Explore Catalog
                </Button>
              </Link>
              <Link href="/categories/desktop-pcs">
                <Button variant="secondary" size="lg">
                  Custom Rigs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY TILES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Explore Hardware Categories
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select your tier of specialized electronics and peripherals
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 font-mono"
          >
            All Categories →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SEED_CATEGORIES.map((cat) => {
            const catAsset = getStoreAsset(cat.image_key);
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group relative rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-rose-500/50 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(225,29,72,0.2)]"
              >
                <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
                  <Image
                    src={catAsset.url}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-xs font-semibold text-slate-200 group-hover:text-rose-400 transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED ELECTRONICS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Featured Flagship Electronics
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Hand-picked devices benchmarked for highest frame rates and creator performance
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors font-mono"
          >
            View All ({featuredProducts.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. FLASH SALE CYBER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-rose-500/30 bg-slate-950 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_0_40px_rgba(225,29,72,0.15)]">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src={heroSale.url}
              alt="Cyber Tech Flash Deals"
              fill
              className="object-cover opacity-60"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          </div>

          {/* Left Details */}
          <div className="relative z-10 space-y-3 max-w-lg">
            <span className="font-mono text-xs text-rose-400 font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              Limited Hardware Allocation
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              CYBER FLASH DEALS: UP TO 25% OFF
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Special enterprise pricing on 34-inch QD-OLED ultrawides, titanium ultrabooks, and low-latency mechanical keyboards.
            </p>
          </div>

          {/* Action CTA */}
          <div className="relative z-10 shrink-0">
            <Link href="/products?maxPrice=2500">
              <Button variant="primary" size="lg">
                Shop Flash Deals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. LIFESTYLE BATTLESTATION HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Designed for Creators & Esports Champions
          </h2>
          <p className="text-xs text-slate-400">
            Clean minimalist developer workspaces and ambient dark gaming battlestations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Setup 1 */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video group">
            <Image
              src={lifestyleDev.url}
              alt="Minimalist Software Engineering Workspace"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider">
                  Workstation Environment
                </span>
                <h3 className="text-base font-bold text-white">Developer & Creator Studios</h3>
              </div>
            </div>
          </div>

          {/* Setup 2 */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video group">
            <Image
              src={lifestyleEsports.url}
              alt="Esports Night Battlestation"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-rose-400 tracking-wider">
                  Esports Rig
                </span>
                <h3 className="text-base font-bold text-white">Competitive Low-Latency Setup</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
