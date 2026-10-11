# Crimson Ghoul Electronics — Design System Technical Specification

This technical specification translates the visual language defined in the **Master Design System Board** into exact **Tailwind CSS v4** design tokens, classes, and component patterns.

---

## 1. Color Palette Tokens

```css
:root {
  /* Surfaces & Backgrounds */
  --bg-app: #0b0f17;          /* Obsidian canvas base */
  --bg-card: #111827;         /* Deep slate card surface */
  --bg-card-hover: #1e293b;   /* Hover surface */
  --border-subtle: #1f293d;   /* 1px structural dividing lines */
  --border-focus: #e11d48;    /* Crimson active focus border */

  /* Primary Brand: Crimson */
  --crimson-primary: #e11d48; /* Main CTA, active states */
  --crimson-hover: #be123c;   /* Button hover */
  --crimson-glow: rgba(225, 29, 72, 0.35); /* Neon glow effect */
  --crimson-subtle: rgba(225, 29, 72, 0.12); /* Badge background */

  /* Secondary Accents */
  --ruby-accent: #f43f5e;     /* High-impact highlight / sale badge */
  --cyber-cyan: #06b6d4;      /* Tech spec highlights (CPU, RAM) */
  --emerald-stock: #10b981;   /* "In Stock" indicator */
  --amber-warning: #f59e0b;   /* "Low Stock" indicator */
  --slate-muted: #64748b;     /* Muted body text / captions */
  --text-primary: #f8fafc;    /* Crisp primary typography */
}
```

### Tailwind Utility Mapping
| Role | Tailwind Class | Hex / Value |
| :--- | :--- | :--- |
| **Canvas Background** | `bg-[#0B0F17]` | `#0B0F17` |
| **Card Surface** | `bg-slate-900` / `bg-[#111827]` | `#111827` |
| **Primary Crimson** | `bg-rose-600` / `bg-[#E11D48]` | `#E11D48` |
| **Crimson Glow Shadow** | `shadow-[0_0_20px_rgba(225,29,72,0.35)]` | Drop glow |
| **Cyber Cyan Spec** | `text-cyan-400` / `bg-cyan-950/40` | `#06B6D4` |
| **In-Stock Green** | `text-emerald-400` / `bg-emerald-950/40` | `#10B981` |

---

## 2. Typography & Type Scale

* **Primary Font**: `Geist Sans` or `Inter` (neutral, modern geometric sans-serif).
* **Specs & Code Font**: `Geist Mono` or `JetBrains Mono` (for clock speeds, RAM, GPU specs, SKUs).

| Level | Size | Weight | Line Height | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | 36px / 2.25rem | Bold (700) | 1.1 | `text-4xl font-bold tracking-tight` | Hero headlines |
| **H1** | 28px / 1.75rem | Bold (700) | 1.2 | `text-2xl sm:text-3xl font-bold` | Page titles, product titles |
| **H2** | 22px / 1.375rem| Semibold (600) | 1.3 | `text-xl sm:text-2xl font-semibold` | Section headers |
| **H3** | 18px / 1.125rem| Medium (500) | 1.4 | `text-lg font-medium` | Card headings |
| **Body** | 16px / 1rem | Regular (400) | 1.5 | `text-base text-slate-200` | Paragraphs, descriptions |
| **Small / Caption** | 14px / 0.875rem| Regular (400) | 1.4 | `text-sm text-slate-400` | Secondary metadata |
| **Spec Monospace**| 13px / 0.8125rem| Medium (500) | 1.4 | `font-mono text-xs text-cyan-400` | "DDR5 6000MHz", "RTX 4090" |

---

## 3. Spacing System (8pt Grid)

We enforce standard multiples of 4px / 8px:
- `4px` (`p-1` / `gap-1`): Micro padding inside chips and badges.
- `8px` (`p-2` / `gap-2`): Compact element spacing, icon buttons.
- `12px` (`p-3` / `gap-3`): Input inner padding.
- `16px` (`p-4` / `gap-4`): Standard component padding, product card body.
- `24px` (`p-6` / `gap-6`): Modal dialogs, dashboard panels, card grid gaps.
- `32px` (`p-8` / `gap-8`): Section separation on standard pages.
- `64px` (`py-16`): Major landing page section spacing.

---

## 4. Border Radius & Elevation Shadows

* **Border Radius**:
  - `rounded-md` (`6px`): Small badges, spec chips, checkboxes.
  - `rounded-xl` (`12px`): Input fields, buttons, interactive cards.
  - `rounded-2xl` (`16px`): Product cards, modal windows, hero banners.
  - `rounded-full` (`9999px`): Pill tags, notification count badges, avatar circles.
* **Shadows & Glows**:
  - `shadow-sm`: `0 1px 2px 0 rgba(0,0,0,0.4)`
  - `shadow-lg`: `0 10px 15px -3px rgba(0,0,0,0.6)`
  - `shadow-crimson`: `shadow-[0_0_25px_rgba(225,29,72,0.25)]`
  - `border-glass`: `border border-slate-800/80 backdrop-blur-md`

---

## 5. Component Implementations

### Buttons
```tsx
// Primary Button (Crimson Glow)
<button className="px-5 py-2.5 rounded-xl font-medium text-white bg-rose-600 hover:bg-rose-700 shadow-[0_0_20px_rgba(225,29,72,0.35)] transition-all duration-200 active:scale-[0.98]">
  Add to Cart
</button>

// Secondary Button (Slate Outline)
<button className="px-5 py-2.5 rounded-xl font-medium text-slate-200 bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 transition-all">
  View Specs
</button>
```

### Form Inputs
```tsx
<div className="relative">
  <input
    type="text"
    placeholder="Search laptops, GPUs, peripherals..."
    className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors"
  />
</div>
```

### Status Badges & Spec Pills
```tsx
// In Stock Badge
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-800/50">
  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
  In Stock
</span>

// Discount Pill
<span className="px-2 py-0.5 rounded-md text-xs font-bold text-white bg-rose-600">
  -20%
</span>

// Hardware Spec Pill
<span className="px-2.5 py-1 rounded-lg font-mono text-xs text-cyan-300 bg-cyan-950/40 border border-cyan-800/40">
  32GB DDR5
</span>
```

---

## 6. Core Design Principles

1. **Precision Hardware Aesthetics**: High-contrast, clean 1px borders, subtle glassmorphism that reflects the industrial design of modern consumer electronics.
2. **Subtle Cyber Accents**: Use deep obsidian surfaces as the backdrop; restrict vibrant crimson red to primary interactive focus points (CTAs, alerts, active tabs).
3. **Information Density with Breathing Room**: Technical specifications (RAM, CPU, resolution) are presented in concise monospace pills so customers can evaluate hardware at a glance.
4. **Performance & Responsiveness**: Clean, native Tailwind utility styling with zero bloat and smooth 200ms ease transitions.

