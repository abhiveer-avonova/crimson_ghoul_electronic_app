import assetsData from '@/data/cloudinary-assets.json';

export interface CloudinaryAsset {
  id: string;
  publicId: string;
  url: string;
  width: number;
  height: number;
  format: string;
}

export const STORE_ASSETS = assetsData as Record<string, CloudinaryAsset>;

const FALLBACK_ASSET: CloudinaryAsset = {
  id: 'fallback',
  publicId: 'crimson_ghoul_store/fallback',
  url: '/window.svg',
  width: 1024,
  height: 1024,
  format: 'svg',
};

/**
 * Helper to get a Cloudinary asset by its unique key.
 */
export function getStoreAsset(key: string): CloudinaryAsset {
  return STORE_ASSETS[key] || FALLBACK_ASSET;
}

