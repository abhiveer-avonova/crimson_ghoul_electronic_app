"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/database";
import { getStoreAsset } from "@/lib/assets";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/store/useCartStore";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  // Resolve primary image from STORE_ASSETS or direct url
  const primaryKey = product.image_keys?.[0];
  const asset = primaryKey ? getStoreAsset(primaryKey) : null;
  const imageUrl = asset?.url || "/window.svg";

  const isLowStock = Boolean(
    product.inventory &&
    product.inventory.stock_quantity > 0 &&
    product.inventory.stock_quantity <= product.inventory.low_stock_threshold,
  );
  const isOutOfStock = Boolean(
    product.inventory && product.inventory.stock_quantity === 0,
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: imageUrl,
      slug: product.slug,
    });
  };

  return (
    <div className="group relative rounded-2xl bg-slate-900/80 border border-slate-800/80 hover:border-rose-500/50 hover:shadow-[0_0_25px_rgba(225,29,72,0.15)] transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Stage */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square w-full bg-slate-950 overflow-hidden"
      >
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.is_featured && <Badge variant="discount">FEATURED</Badge>}
          {isOutOfStock ? (
            <Badge variant="outOfStock">Out of Stock</Badge>
          ) : isLowStock ? (
            <Badge variant="lowStock">Low Stock</Badge>
          ) : (
            <Badge variant="stock">In Stock</Badge>
          )}
        </div>

        {/* Quick Brand Chip */}
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-950/80 text-slate-300 border border-slate-800/80 backdrop-blur-sm">
            {product.brand}
          </span>
        </div>
      </Link>

      {/* Body Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link
            href={`/products/${product.slug}`}
            className="block group-hover:text-rose-400 transition-colors"
          >
            <h3 className="font-semibold text-sm text-slate-100 line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Quick Hardware Specs Pills */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {product.specs?.ram && (
              <Badge variant="spec">{product.specs.ram}</Badge>
            )}
            {product.specs?.graphics && (
              <Badge variant="spec" className="line-clamp-1 max-w-37.5">
                {product.specs.graphics.split(" ")[0]}{" "}
                {product.specs.graphics.split(" ")[1] || ""}
              </Badge>
            )}
            {product.specs?.processor && !product.specs?.graphics && (
              <Badge variant="spec" className="line-clamp-1 max-w-37.5">
                {product.specs.processor.split(" ")[0]}{" "}
                {product.specs.processor.split(" ")[1] || ""}
              </Badge>
            )}
            {product.specs?.display && (
              <Badge variant="spec">
                {product.specs.display.split(" ")[0]}
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing & Cart Action */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">
              Price
            </span>
            <span className="text-base font-bold font-mono text-white">
              $
              {product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>

          <Button
            size="sm"
            variant="primary"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="shrink-0"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
