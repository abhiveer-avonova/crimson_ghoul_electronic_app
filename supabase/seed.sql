-- ==============================================================================
-- Crimson Ghoul Electronics: Initial Seed Data
-- ==============================================================================

-- 1. Seed Categories
INSERT INTO public.categories (id, name, slug, description, image_key)
VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Desktop PCs & Rigs', 'desktop-pcs', 'Custom liquid-cooled gaming rigs, creator workstations, and performance towers.', 'category_desktop_pc'),
  ('c1000000-0000-0000-0000-000000000002', 'Laptops & Ultrabooks', 'laptops', 'Ultra-thin titanium creator notebooks, high-refresh gaming laptops, and mobile workstations.', 'category_laptops'),
  ('c1000000-0000-0000-0000-000000000003', 'Smartphones & Tablets', 'smartphones', 'Flagship ceramic smartphones, OLED displays, and wireless mobile ecosystems.', 'category_smartphones'),
  ('c1000000-0000-0000-0000-000000000004', 'PC Peripherals', 'peripherals', 'Precision mechanical keyboards, lightweight esports mice, and desk accessories.', 'category_peripherals'),
  ('c1000000-0000-0000-0000-000000000005', 'Audio & Headsets', 'audio', 'Audiophile studio headsets, planar drivers, and low-latency gaming audio.', 'category_audio'),
  ('c1000000-0000-0000-0000-000000000006', 'Components & GPUs', 'components', 'Next-gen graphics cards, high-speed DDR5 memory, and overclocked motherboards.', 'category_components')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_key = EXCLUDED.image_key;

-- 2. Seed Products
INSERT INTO public.products (id, category_id, name, slug, brand, description, price, specs, image_keys, is_featured, is_active)
VALUES
  (
    'p1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000001',
    'Crimson Ghoul Apex Titan Gaming Rig',
    'apex-titan-gaming-rig',
    'Crimson Ghoul',
    'Flagship liquid-cooled gaming powerhouse engineered for 4K ray-traced gaming and extreme compute workloads. Encased in obsidian tempered glass with custom crimson fluid channels.',
    3499.00,
    '{
      "processor": "Intel Core i9-14900KS 6.2GHz",
      "ram": "64GB DDR5 6400MHz RGB",
      "storage": "4TB PCIe 4.0 NVMe SSD",
      "graphics": "NVIDIA GeForce RTX 4090 24GB",
      "cooling": "Custom Hard-Line Crimson Liquid Loop",
      "power": "1200W 80+ Titanium Modular",
      "warranty": "3-Year Premium On-Site"
    }'::jsonb,
    ARRAY['hero_gaming_pc', 'category_desktop_pc'],
    true,
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000002',
    'c1000000-0000-0000-0000-000000000002',
    'Vanguard Pro 16 Ultrabook',
    'vanguard-pro-16-ultrabook',
    'Vanguard',
    'Ultra-thin CNC titanium chassis housing flagship silicon with vapor-chamber cooling and a factory-calibrated 16-inch 3.2K 165Hz OLED display.',
    2299.00,
    '{
      "processor": "AMD Ryzen 9 8945HS 8-Core",
      "ram": "32GB LPDDR5X 7500MHz",
      "storage": "2TB PCIe 4.0 SSD",
      "graphics": "NVIDIA GeForce RTX 4070 Laptop 8GB",
      "display": "16.0 3.2K (3200x2000) 165Hz OLED 100% DCI-P3",
      "battery": "99.9Wh (Up to 14 Hours)",
      "weight": "1.78 kg"
    }'::jsonb,
    ARRAY['hero_creator_laptop', 'pdp_laptop_front', 'pdp_laptop_side'],
    true,
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000003',
    'c1000000-0000-0000-0000-000000000003',
    'Spectre Neo 5G Flagship Smartphone',
    'spectre-neo-5g-smartphone',
    'Spectre',
    'Bezel-less 6.8-inch curved LTPO AMOLED flagship with ceramic backplate, periscope optical zoom, and 120W wireless hyper-charging.',
    1099.00,
    '{
      "processor": "Snapdragon 8 Gen 3 4nm",
      "ram": "16GB LPDDR5X",
      "storage": "512GB UFS 4.0",
      "display": "6.8 1-120Hz LTPO AMOLED 2600 nits",
      "battery": "5400mAh 120W Wired / 50W Wireless",
      "camera": "50MP Main OIS + 50MP Ultra-Wide + 64MP Periscope 5x",
      "waterResistance": "IP68"
    }'::jsonb,
    ARRAY['hero_smartphone_ecosystem', 'pdp_phone_showcase', 'category_smartphones'],
    true,
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000004',
    'c1000000-0000-0000-0000-000000000004',
    'Ghoststrike V2 Ultralight Wireless Mouse',
    'ghoststrike-v2-wireless-mouse',
    'Ghoststrike',
    'Sub-49g competitive esports mouse featuring 8000Hz polling rate wireless connectivity, optical microswitches, and zero-latency tracking.',
    149.00,
    '{
      "sensor": "Focus Pro 35K Optical Sensor",
      "pollingRate": "True 8000Hz Wireless",
      "weight": "48 grams",
      "batteryLife": "Up to 95 Hours",
      "switches": "Gen-3 Optical Switches (100M Clicks)",
      "connectivity": ["2.4GHz Wireless", "Bluetooth 5.3", "USB-C Speedflex"]
    }'::jsonb,
    ARRAY['pdp_mouse', 'category_peripherals'],
    false,
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000005',
    'c1000000-0000-0000-0000-000000000004',
    'Horizon HorizonView 34-Inch Curved Ultrawide Monitor',
    'horizonview-34-curved-ultrawide',
    'Horizon',
    'Immersive 34-inch 1800R curved QD-OLED display delivering 0.03ms response times, 175Hz refresh rate, and deep infinity contrast for gaming and productivity.',
    899.00,
    '{
      "screenSize": "34.0 Curved (1800R)",
      "panel": "Quantum Dot OLED (QD-OLED)",
      "resolution": "UWQHD (3440 x 1440)",
      "refreshRate": "175Hz",
      "responseTime": "0.03ms GtG",
      "hdr": "VESA DisplayHDR True Black 400",
      "ports": ["2x DP 1.4", "1x HDMI 2.1", "USB-C 90W PD Hub"]
    }'::jsonb,
    ARRAY['pdp_monitor'],
    true,
    true
  ),
  (
    'p1000000-0000-0000-0000-000000000006',
    'c1000000-0000-0000-0000-000000000005',
    'Aether Sound Master Studio Wireless Headset',
    'aether-master-studio-headset',
    'Aether',
    'Audiophile closed-back planar magnetic wireless headset with active ambient noise cancellation and hi-res lossless wireless audio codec.',
    399.00,
    '{
      "driver": "50mm Planar Magnetic Drivers",
      "frequencyResponse": "10Hz - 45,000Hz",
      "connectivity": ["Lossless 2.4GHz Wireless", "Bluetooth 5.4 LDAC", "3.5mm Analog"],
      "batteryLife": "Up to 60 Hours (Fast Charge)",
      "microphone": "Broadcast-Grade Detachable Cardioid Mic",
      "weight": "320g"
    }'::jsonb,
    ARRAY['category_audio'],
    false,
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  specs = EXCLUDED.specs,
  image_keys = EXCLUDED.image_keys,
  is_featured = EXCLUDED.is_featured;

-- 3. Seed Inventory for Products
INSERT INTO public.inventory (product_id, sku, stock_quantity, low_stock_threshold)
VALUES
  ('p1000000-0000-0000-0000-000000000001', 'CG-TITAN-4090', 5, 2),
  ('p1000000-0000-0000-0000-000000000002', 'VNG-PRO16-OLED', 12, 3),
  ('p1000000-0000-0000-0000-000000000003', 'SPC-NEO-512GB', 20, 5),
  ('p1000000-0000-0000-0000-000000000004', 'GST-MOUSE-V2', 35, 10),
  ('p1000000-0000-0000-0000-000000000005', 'HRZ-UW34-QDOLED', 8, 2),
  ('p1000000-0000-0000-0000-000000000006', 'ATH-HEADSET-PRO', 15, 4)
ON CONFLICT (product_id) DO UPDATE SET
  sku = EXCLUDED.sku,
  stock_quantity = EXCLUDED.stock_quantity,
  low_stock_threshold = EXCLUDED.low_stock_threshold;

