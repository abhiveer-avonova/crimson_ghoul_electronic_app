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

/**
 * Helper to get a Cloudinary asset by its unique key.
 */
export function getStoreAsset(key: keyof typeof STORE_ASSETS): CloudinaryAsset {
  return STORE_ASSETS[key];
}

