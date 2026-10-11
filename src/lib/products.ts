import { Product, Category } from '@/types/database';
import { createClient } from '@/lib/supabase/server';
import { SEED_CATEGORIES, SEED_PRODUCTS } from '@/data/seed-data';

export { SEED_CATEGORIES, SEED_PRODUCTS };

/**
 * Fetches products with optional category, brand, and search filters
 */
export async function getProducts(options?: {
  categorySlug?: string;
  brand?: string;
  maxPrice?: number;
  inStockOnly?: boolean;
  featuredOnly?: boolean;
  query?: string;
}): Promise<Product[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from('products').select('*, inventory(*), category:categories(*)');

    if (options?.featuredOnly) {
      query = query.eq('is_featured', true);
    }
    if (options?.brand) {
      query = query.eq('brand', options.brand);
    }
    if (options?.maxPrice) {
      query = query.lte('price', options.maxPrice);
    }
    if (options?.query) {
      query = query.ilike('name', `%${options.query}%`);
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return data as Product[];
    }
  } catch {
    // Fall back to seed data if database is not yet migrated
  }

  // Fallback to in-memory seed catalog
  let filtered = [...SEED_PRODUCTS];

  if (options?.featuredOnly) {
    filtered = filtered.filter((p) => p.is_featured);
  }
  if (options?.categorySlug) {
    const cat = SEED_CATEGORIES.find((c) => c.slug === options.categorySlug);
    if (cat) {
      filtered = filtered.filter((p) => p.category_id === cat.id);
    }
  }
  if (options?.brand) {
    filtered = filtered.filter((p) => p.brand.toLowerCase() === options.brand?.toLowerCase());
  }
  if (options?.maxPrice) {
    filtered = filtered.filter((p) => p.price <= (options.maxPrice || Infinity));
  }
  if (options?.inStockOnly) {
    filtered = filtered.filter((p) => (p.inventory?.stock_quantity ?? 0) > 0);
  }
  if (options?.query) {
    const q = options.query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  return filtered;
}

/**
 * Fetches a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, inventory(*), category:categories(*)')
      .eq('slug', slug)
      .single();

    if (!error && data) {
      return data as Product;
    }
  } catch {
    // Fall back to seed
  }

  const found = SEED_PRODUCTS.find((p) => p.slug === slug);
  return found || null;
}

/**
 * Fetches all categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (!error && data && data.length > 0) {
      return data as Category[];
    }
  } catch {
    // Fall back to seed
  }
  return SEED_CATEGORIES;
}

/**
 * Fetches a single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('categories').select('*').eq('slug', slug).single();
    if (!error && data) {
      return data as Category;
    }
  } catch {
    // Fall back to seed
  }
  return SEED_CATEGORIES.find((c) => c.slug === slug) || null;
}

