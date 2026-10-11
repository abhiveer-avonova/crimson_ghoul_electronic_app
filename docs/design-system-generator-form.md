# Design System Board Generator — Interactive Template Form

A reusable text-based configuration form that allows any creator, developer, or designer to input their brand variables and immediately generate:
1. An **AI Image Generation Prompt** that produces a customized, high-resolution Master Design System Style Guide Board (16:9 infographic format).
2. A **Companion Tailwind CSS Technical Specification** mapped directly to the chosen tokens.

---

## 1. User Input Form (Fill In Your Variables)

Fill in the bracketed variables `[...]` below according to your brand and design preferences:

```text
================================================================================
                    DESIGN SYSTEM BOARD CONFIGURATION FORM
================================================================================

[1. BRAND & IDENTITY]
- BRAND_NAME             : [ e.g., Crimson Ghoul Electronics ]
- INDUSTRY_NICHE         : [ e.g., Consumer electronics, desktop PCs, and gaming gear ]
- AESTHETIC_STYLE        : [ e.g., Dark obsidian cyber-tech with high-contrast crimson accents ]
- BOARD_ORIENTATION      : [ 16:9 widescreen ]

[2. COLOR PALETTE]
- CANVAS_BG_COLOR        : [ e.g., Dark Obsidian (#0B0F17) ]
- CARD_SURFACE_COLOR     : [ e.g., Deep Slate (#111827) ]
- PRIMARY_ACCENT_COLOR   : [ e.g., Vibrant Crimson Red (#E11D48) ]
- SECONDARY_ACCENT_COLOR : [ e.g., Ruby Highlight (#F43F5E) ]
- TECH_HIGHLIGHT_COLOR   : [ e.g., Cyber Cyan (#06B6D4) ]
- SUCCESS_STOCK_COLOR    : [ e.g., Emerald Green (#10B981) ]

[3. TYPOGRAPHY & TYPE SCALE]
- PRIMARY_FONT_STYLE     : [ e.g., Geometric Sans-Serif (Geist / Inter) ]
- MONOSPACE_FONT_STYLE   : [ e.g., Technical Monospace (Geist Mono / JetBrains Mono) ]
- DISPLAY_HEADING_SAMPLE : [ e.g., NEXT-GEN COMPUTING ]

[4. SHAPE, CORNERS & ELEVATION]
- CORNER_RADIUS_STYLE    : [ e.g., Rounded modern: sm 6px, md 12px, lg 16px, pill 9999px ]
- SHADOW_AND_GLOW_STYLE  : [ e.g., Deep ambient drop-shadows with subtle crimson neon rim glow ]

[5. COMPONENT SPECIMENS]
- PRIMARY_BUTTON_LABEL   : [ e.g., Add to Cart ]
- SPECIMEN_PRODUCT_TYPE  : [ e.g., Liquid-cooled flagship gaming laptop ]
- SAMPLE_SPEC_PILLS      : [ e.g., "32GB DDR5", "RTX 4090", "240Hz OLED" ]
- SAMPLE_DISCOUNT_BADGE  : [ e.g., Save 20% ]

[6. CORE DESIGN PRINCIPLES]
- PRINCIPLE_1            : [ e.g., 1. Precision Hardware Aesthetics ]
- PRINCIPLE_2            : [ e.g., 2. High Contrast Clarity ]
- PRINCIPLE_3            : [ e.g., 3. Subtle Cyber Refinement ]
- PRINCIPLE_4            : [ e.g., 4. Zero-Bloat Responsiveness ]
================================================================================
```

---

## 2. Automated Prompt Assembler

Once you fill in the variables above, substitute them into the template formula below. The result is ready to paste directly into **Google ImageFX (Imagen 3)**, **Bing Image Creator (DALL-E 3)**, or **Hugging Face (Flux.1)**:

### The Master Prompt Formula

```text
High-resolution 8k professional UI/UX design system style guide sheet and UI component kit presentation board on a {CANVAS_BG_COLOR} background with clean modular 3-column infographic layout for {INDUSTRY_NICHE} brand called "{BRAND_NAME}", 16:9 widescreen canvas, {AESTHETIC_STYLE}:

Left column (Design Foundations): Brand color swatches displaying Hex codes with {CARD_SURFACE_COLOR} backgrounds, primary {PRIMARY_ACCENT_COLOR}, secondary {SECONDARY_ACCENT_COLOR}, technical highlight {TECH_HIGHLIGHT_COLOR}, and success indicator {SUCCESS_STOCK_COLOR}; typography type scale specimen from large bold {PRIMARY_FONT_STYLE} Display heading "{DISPLAY_HEADING_SAMPLE}" down to sharp {MONOSPACE_FONT_STYLE} tech spec labels; 8px spacing grid blocks; border radius scale ({CORNER_RADIUS_STYLE}); elevation drop-shadow cards with {SHADOW_AND_GLOW_STYLE}.

Center column (Interactive Components): Button hierarchy showing Primary {PRIMARY_ACCENT_COLOR} button with label "{PRIMARY_BUTTON_LABEL}", Secondary outline button, Ghost button, and disabled state; text inputs with search icon and placeholder text, clean dropdown selects, price range slider with neon thumb, toggle switches; product badge chips for "In Stock" ({SUCCESS_STOCK_COLOR} dot), "{SAMPLE_DISCOUNT_BADGE}" pill, and device spec pills ({SAMPLE_SPEC_PILLS}).

Right column (Patterns & Principles): Sticky dark navbar preview with minimal search bar and shopping cart badge; miniature sleek {SPECIMEN_PRODUCT_TYPE} product card specimen with hardware image and price tag; status alert banners (Success, Warning, Error); card containing 4 core design principles: "{PRINCIPLE_1}", "{PRINCIPLE_2}", "{PRINCIPLE_3}", "{PRINCIPLE_4}".

Sleek modern Figma Behance presentation board aesthetic, hyper-clean vector alignment, micro-detail typography, elegant glow accents, razor-sharp geometric UI design, studio product styling, 8k, photorealistic vector UI render, perfectly organized --ar 16:9
```

### Universal Negative Prompt
```text
blurry, low resolution, messy layout, overlapping text, chaotic composition, tilted canvas, photorealistic human faces, 3D character, cartoon, hand-drawn sketch, watermark, copyright logo, distorted buttons
```

---

## 3. Companion Technical Specification Template (Tailwind CSS v4)

Plugging in your variables also generates this ready-to-use CSS design token block:

```css
/* Paste into src/app/globals.css or your Tailwind stylesheet */
:root {
  /* Surfaces & Backgrounds */
  --bg-app: {CANVAS_BG_COLOR};
  --bg-card: {CARD_SURFACE_COLOR};
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-focus: {PRIMARY_ACCENT_COLOR};

  /* Brand Accents */
  --color-primary: {PRIMARY_ACCENT_COLOR};
  --color-secondary: {SECONDARY_ACCENT_COLOR};
  --color-tech: {TECH_HIGHLIGHT_COLOR};
  --color-success: {SUCCESS_STOCK_COLOR};

  /* Typography */
  --font-primary: "{PRIMARY_FONT_STYLE}", sans-serif;
  --font-mono: "{MONOSPACE_FONT_STYLE}", monospace;
}
```

---

## 4. Pre-Configured Preset Examples

Here are 3 distinct presets demonstrating how the form produces completely different visual design systems:

### Preset A: Clean Minimalist / Nordic White (Apple / Teenage Engineering)
* **Form Inputs**:
  - `BRAND_NAME`: "Klar Audio & Tech"
  - `CANVAS_BG_COLOR`: "Seamless Warm Alabaster (#F8F9FA)"
  - `CARD_SURFACE_COLOR`: "Pure White (#FFFFFF) with subtle 1px border"
  - `PRIMARY_ACCENT_COLOR`: "Matte Graphite Black (#1A1A1A)"
  - `SECONDARY_ACCENT_COLOR`: "Muted International Klein Blue (#0047FF)"
  - `AESTHETIC_STYLE`: "Bauhaus minimalist Scandinavian tech, diffused soft natural light, matte anodized aluminum textures"
  - `CORNER_RADIUS_STYLE`: "Soft rounded: 8px, 16px, 24px"
  - `SHADOW_AND_GLOW_STYLE`: "Ultra-soft diffused natural ambient contact shadows"
* **Assembled Prompt**:
  ```text
  High-resolution 8k professional UI/UX design system style guide sheet on a Seamless Warm Alabaster (#F8F9FA) background with clean modular 3-column infographic layout for minimalist tech audio brand called "Klar Audio & Tech", 16:9 widescreen canvas, Bauhaus Scandinavian tech aesthetic: Left column color chips in Matte Graphite (#1A1A1A), Pure White, and Klein Blue (#0047FF), Swiss Grotesk type scale; Center column showing minimalist matte black buttons, clean inputs, and hardware spec pills; Right column showing clean floating audio player card and 4 principles: "1. Functional Clarity", "2. Honest Materials", "3. Pure Audio", "4. Timeless Form" --ar 16:9
  ```

---

### Preset B: Neon Cyber Matrix / Hardcore Gaming (Razer / ROG Style)
* **Form Inputs**:
  - `BRAND_NAME`: "Viper Apex Rigs"
  - `CANVAS_BG_COLOR`: "Deep Pitch Black Carbon (#050505)"
  - `CARD_SURFACE_COLOR`: "Brushed Dark Gunmetal (#0E1116)"
  - `PRIMARY_ACCENT_COLOR`: "Electric Cyber Emerald (#00FF66)"
  - `SECONDARY_ACCENT_COLOR`: "Acid Lime (#A3E635)"
  - `AESTHETIC_STYLE`: "Futuristic esports HUD telemetry, glowing neon laser lines, aggressive angular polygon cuts"
  - `CORNER_RADIUS_STYLE`: "Sharp chamfered edges and angular 4px cuts"
  - `SHADOW_AND_GLOW_STYLE`: "Vibrant emerald green laser bloom and neon backglow"
* **Assembled Prompt**:
  ```text
  High-resolution 8k professional UI/UX design system style guide sheet on a Deep Pitch Black Carbon (#050505) background with modular 3-column infographic layout for high-performance esports hardware brand called "Viper Apex Rigs", 16:9 widescreen canvas, futuristic HUD telemetry aesthetic: Left column showing Electric Cyber Emerald (#00FF66) and Gunmetal swatches with angular chamfered borders; Center column showing neon green glowing buttons, dark tactical inputs, and overclocking spec badges; Right column showing liquid-cooled PC card and principles: "1. Zero Latency", "2. Peak Frame Rates", "3. Thermal Dominance", "4. Cyber Precision" --ar 16:9
  ```

---

### Preset C: Luxury Monolith / Audiophile Gold (Bang & Olufsen / Porsche Design)
* **Form Inputs**:
  - `BRAND_NAME`: "Aureus Sound Labs"
  - `CANVAS_BG_COLOR`: "Deep Charcoal Titanium (#121316)"
  - `CARD_SURFACE_COLOR`: "Smoked Quartz Glass (#1A1C22)"
  - `PRIMARY_ACCENT_COLOR`: "Brushed Champagne Gold (#D4AF37)"
  - `SECONDARY_ACCENT_COLOR`: "Warm Bronze (#A3704C)"
  - `AESTHETIC_STYLE`: "High-end luxury acoustic audio, frosted glassmorphism, brushed brass hardware accents"
  - `CORNER_RADIUS_STYLE`: "Architectural rounded: 10px, 20px"
  - `SHADOW_AND_GLOW_STYLE`: "Subtle warm amber rim lighting and velvety deep drop shadows"
* **Assembled Prompt**:
  ```text
  High-resolution 8k professional UI/UX design system style guide sheet on a Deep Charcoal Titanium (#121316) background with modular 3-column infographic layout for luxury high-end audiophile brand called "Aureus Sound Labs", 16:9 widescreen canvas, luxury acoustic design aesthetic: Left column showing Champagne Gold (#D4AF37) and Smoked Glass swatches, elegant serif and grotesque type scale; Center column showing brushed gold outline buttons and precision acoustic spec chips; Right column showing open-back planar headphones card and principles: "1. Acoustic Purity", "2. Crafted Luxury", "3. Architectural Restraint", "4. Lifelong Durability" --ar 16:9
  ```

