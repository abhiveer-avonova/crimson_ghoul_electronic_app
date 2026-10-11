import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FOLDER = 'crimson_ghoul_store';

/**
 * Uploads an asset (from a URL or local file path) to Cloudinary.
 * @param {string} source - URL or local file path.
 * @param {string} publicId - Desired public_id within the folder.
 * @param {string[]} tags - Tags for organization.
 */
export async function uploadAsset(source, publicId, tags = []) {
  try {
    console.log(`Uploading ${publicId} from ${source.substring(0, 50)}...`);
    const result = await cloudinary.uploader.upload(source, {
      folder: FOLDER,
      public_id: publicId,
      overwrite: true,
      tags: ['ecommerce', 'crimson_ghoul', ...tags],
    });
    console.log(`✓ Uploaded ${publicId}: ${result.secure_url}`);
    return {
      id: publicId,
      publicId: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
    };
  } catch (error) {
    console.error(`✗ Error uploading ${publicId}:`, error.message);
    throw error;
  }
}

/**
 * Saves uploaded assets metadata to a JSON registry.
 * @param {Array} assets
 */
export function saveRegistry(assets) {
  const outputPath = path.resolve('src/data/cloudinary-assets.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  
  let existing = {};
  if (fs.existsSync(outputPath)) {
    try {
      existing = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    } catch {}
  }

  assets.forEach((a) => {
    existing[a.id] = a;
  });

  fs.writeFileSync(outputPath, JSON.stringify(existing, null, 2), 'utf8');
  console.log(`✓ Updated asset registry at ${outputPath}`);
}

