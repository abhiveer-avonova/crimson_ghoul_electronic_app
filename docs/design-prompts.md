# Crimson Ghoul Electronics — Design Template Image Prompts

A modular, copy-paste prompt library tailored for free image generation tools (**Google ImageFX / Imagen 3**, **Bing Image Creator / DALL-E 3**, and **Hugging Face Flux.1 / SDXL**).

All prompts are calibrated for a **Hybrid Design System**:
- **Marketing & Hero Surfaces**: *Crimson Cyber* (dark obsidian palette, sleek matte textures, ruby/crimson neon accents).
- **Product Catalog & PDP**: *Clean Minimalist Studio* (neutral light/gray backdrops, studio softbox lighting, zero text for accessible HTML/CSS overlays).
- **Text Policy**: Zero baked-in typography. All headings, price badges, and buttons are designed to be overlaid using Tailwind CSS.

---

## 1. Free AI Image Generators Guide

You can copy and paste any prompt below directly into these free web tools:
1. **Google ImageFX (Imagen 3)**: [aitestkitchen.withgoogle.com/tools/image-fx](https://aitestkitchen.withgoogle.com/tools/image-fx) — Photorealistic textures and clean studio lighting.
2. **Microsoft Designer / Bing Image Creator (DALL-E 3)**: [bing.com/create](https://www.bing.com/create) — Free with Microsoft account, adheres well to complex descriptions.
3. **Hugging Face (Flux.1 Schnell / Dev)**: [huggingface.co/spaces/black-forest-labs/FLUX.1-schnell](https://huggingface.co/spaces/black-forest-labs/FLUX.1-schnell) — State-of-the-art open weights model, fast and artifact-free.

---

## 2. Universal Negative Prompt

Add this to the **Negative Prompt** field (or append to models that support it):
```text
text, watermark, typography, letters, logo, brand name, words, price tag, blurry, low resolution, noisy, grain, distorted geometry, warped lines, oversaturated, amateur photography
```

---

## 3. Hero Banners & Promotional Sliders (Aspect Ratio: 16:9)

> **Placement**: Homepage Top Banner, Sale Announcement Carousel (`src/app/page.tsx`).  
> **Composition Note**: Framed with generous negative space on the left side to accommodate Tailwind text headlines and CTA buttons.

### Hero 1: Flagship Liquid-Cooled Gaming PC
```text
Commercial product photography of an ultra-modern custom desktop gaming PC placed on the right side of the frame, dark obsidian carbon fiber desk surface, tempered glass chassis revealing clean cable management, liquid cooling pipes with subtle deep crimson red coolant fluid, matte black internal components, soft ambient ruby-red backlighting, left side of the frame left open with clean dark slate gradient space for UI text overlay, cinematic dramatic studio rim lighting, 8k resolution, photorealistic, no text, no watermark --ar 16:9
```

### Hero 2: Ultra-Thin Creator Laptop Showcase
```text
High-end commercial hero shot of a slim premium titanium alloy laptop floating slightly at an angle, lid open displaying a vivid dark abstract wallpaper, sleek minimalist keyboard deck, subtle crimson edge glow underneath, dark futuristic tech studio environment, elegant dark reflective surface, composition offset to the right with empty dark space on the left for web typography, hyper-detailed metallic finish, 8k, photorealistic commercial ad, no text, no logo --ar 16:9
```

### Hero 3: Next-Gen Smartphone & Accessories Ecosystem
```text
Studio advertisement hero banner featuring a modern bezel-less flagship smartphone resting on dark slate geometric podiums, accompanied by minimalist wireless charging dock and wireless earbuds in an open case, subtle crimson neon laser accent line reflecting on matte glass back, moody dark minimalist studio backdrop, wide-angle cinematic shot, negative space on top and left for overlay text, clean lines, photorealistic product photography, 8k, no text --ar 16:9
```

### Hero 4: Cyber Flash Sale / Tech Deals Background
```text
Futuristic high-tech warehouse and digital showroom background, sleek dark metallic server racks, glowing crimson red optical fiber lines and light bars running through the floor, empty clean foreground with dark glossy floor reflecting ambient red lights, wide panoramic perspective, perfect background for an electronics eCommerce sale banner, volumetric atmospheric haze, 8k, photorealistic, no text, no people --ar 16:9
```

---

## 4. Category Navigation Cards & Tiles (Aspect Ratio: 4:3 or 1:1)

> **Placement**: Homepage Category Grid, Mega-menu navigation (`src/components/layout/Navbar.tsx`, `src/app/categories/`).

### Category 1: Desktop PCs & Custom Rigs
```text
Commercial product photo of a high-end desktop computer tower on a dark graphite pedestal, tinted glass panel, sleek brushed aluminum front panel with a single crimson LED indicator strip, dramatic studio rim light, clean dark charcoal studio backdrop, square composition, ultra-clean, 8k, photorealistic, no text --ar 1:1
```

### Category 2: Laptops & Ultrabooks
```text
Sleek open ultrabook laptop resting on a minimalist concrete plinth, 45-degree angle view, slim bezel display, matte gunmetal chassis, precision engineered hinges, subtle warm and crimson ambient lighting, clean minimal studio background, product catalog photography, sharp focus, 8k, no text --ar 1:1
```

### Category 3: Smartphones & Tablets
```text
Two modern flagship smartphones leaning against each other on a dark stone pedestal, one showing front bezel-less screen and one showing matte ceramic back with precision camera island, subtle crimson rim lighting, studio dark-room photography, centered composition, ultra-sharp details, 8k, no text --ar 1:1
```

### Category 4: PC Peripherals (Keyboards & Mice)
```text
A premium custom mechanical keyboard with matte black keycaps and subtle red artisan accent keys, paired with an ergonomic lightweight gaming mouse beside it, sitting on a dark felt desk mat, studio overhead three-quarter angle, diffused softbox lighting with soft red glow, 8k, clean product photo, no text --ar 1:1
```

### Category 5: Audio & Studio Headsets
```text
Professional over-ear studio headphones resting on an aluminum headphone stand, matte black metal headband, plush memory foam earcups, subtle crimson stitching accents, dramatic moody studio lighting, dark neutral backdrop, photorealistic product shot, 8k, no text --ar 1:1
```

### Category 6: PC Hardware & Components (GPUs & Motherboards)
```text
An ultra-high-performance graphics card (GPU) displayed diagonally, triple cooling fans, brushed gunmetal backplate with subtle crimson RGB accent strip along the edge, studio lighting with light streaks, dark tech backdrop, crisp focus on heatsink fins, 8k, product photography, no text --ar 1:1
```

---

## 5. Product Detail Page (PDP) Studio Mockups (Aspect Ratio: 1:1)

> **Placement**: Product Grid (`src/app/products/page.tsx`), Product Detail Gallery (`src/app/products/[slug]/page.tsx`).  
> **Aesthetic**: *Clean Minimalist Studio* (eCommerce standard: pure light gray/white neutral background, soft contact drop shadows, zero distracting clutter for fast background clipping).

### PDP 1: Flagship Gaming Laptop (Front Angle)
```text
Professional e-commerce catalog studio photograph of a premium thin gaming laptop, screen tilted back at 110 degrees, crisp high-res display, matte dark gray metal finish, isolated on an immaculate seamless light-gray studio background, soft natural contact shadow directly below, bright diffused 5500K studio softbox lighting, centered product framing, high commercial quality, 8k, no text, no logo --ar 1:1
```

### PDP 2: Flagship Gaming Laptop (Side Profile & Ports)
```text
Side profile product photography of a slim modern high-performance laptop, open at 90 degrees, highlighting the ultra-thin aluminum chassis, USB-C and HDMI ports, precision ventilation vents, pure clean white-gray studio backdrop, soft contact shadow, commercial catalog shot, 8k, no text --ar 1:1
```

### PDP 3: Flagship Smartphone (Triple-Angle Showcase)
```text
E-commerce studio product photograph displaying a modern premium smartphone in three perspectives (front screen, side profile, and back camera housing), floating in a row, pure white cyclorama background, soft uniform studio light, ultra-crisp reflections on polished aluminum frame, 8k, photorealistic, no text --ar 1:1
```

### PDP 4: Ergonomic Wireless Gaming Mouse
```text
E-commerce catalog photo of an ergonomic matte-black wireless gaming mouse, three-quarter top-down angle, textured grip sides, precision scroll wheel, resting on an immaculate pure white studio surface with soft natural shadow, clean neutral lighting, high-end commercial tech product photography, 8k, no text --ar 1:1
```

### PDP 5: 34-Inch Curved Ultrawide Monitor
```text
Commercial studio shot of a 34-inch curved ultrawide gaming monitor on a minimalist aluminum desk stand, thin borderless frame, screen displaying a sleek dark wallpaper, seamless off-white studio background, balanced studio light, crisp edges, centered composition, 8k, no text --ar 1:1
```

---

## 6. Lifestyle & Contextual Desk Environments (Aspect Ratio: 16:9)

> **Placement**: About Us page, Feature Highlights, Newsletter Section, Blog/Community cards.

### Lifestyle 1: Modern Tech Developer Battlestation
```text
Wide-angle lifestyle photograph of an aesthetic minimalist software engineering workspace, curved dual monitors mounted on an arm above a solid walnut standing desk, clean mechanical keyboard, ergonomic chair, ambient warm light bar over the monitor, subtle crimson LED light strip behind the desk, potted succulent, cozy modern apartment loft in the background with soft bokeh, authentic architectural photography, 8k, no text, no people --ar 16:9
```

### Lifestyle 2: Esports Gaming Setup with Crimson Glow
```text
Cinematic photography of a high-end competitive esports gaming desk setup at night, custom liquid-cooled PC tower with crimson red LED glow on the desk, high-refresh-rate gaming monitor, mechanical keyboard, mouse with braided cord, dark moody room with acoustic wall panels and ambient red backlighting, atmospheric cinematic lighting, 8k, photorealistic, no text --ar 16:9
```

---

## 7. UI Empty States & Illustrations (Aspect Ratio: 1:1)

> **Placement**: Empty Cart (`/cart`), Wishlist Empty (`/account/wishlist`), 404 Page (`/not-found`).

### Empty State 1: Empty Shopping Cart
```text
Minimalist 3D render illustration of an empty sleek metallic shopping cart with futuristic glowing wheels, resting on a clean dark slate floor with soft crimson rim lighting, modern isometric tech aesthetic, clean clean gradient background, UI asset quality, cute and modern, 8k, no text --ar 1:1
```

### Empty State 2: Empty Wishlist / Tech Heart
```text
Modern 3D tech illustration of a glowing geometric heart sculpture made of circuit board traces and matte obsidian metal, floating gently above a clean minimalist surface, subtle red neon illumination, modern clean UI illustration for an empty wishlist page, 8k, no text --ar 1:1
```

### Empty State 3: 404 Disconnected Cable / Microchip
```text
Modern 3D isometric tech illustration of a stylish glowing USB-C cable unplugged near an elegant futuristic computer microchip, subtle red warning LED pulse, clean dark background, sleek tech UI icon illustration, 8k, no text --ar 1:1
```

