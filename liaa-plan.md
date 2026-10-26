# Liaa Website — Implementation Plan

## Overview

Liaa is a Nigerian bakery (cakes, pastries, loaf cakes, bento cakes) with a client-side-only website.
There is no backend. Orders are placed by pre-filling a WhatsApp message and redirecting the customer.
The site is a single-page React + Vite app styled with Tailwind CSS, using **remixicon** for icons (`.jsx` files, no TypeScript).

**Brand colours (from designs):**
- Primary amber/gold: `#F5A623` / Tailwind `amber-400`
- Dark chocolate brown: `#3B1A0E` / Tailwind `[#3B1A0E]` (used for headings, nav, footer bg)
- Off-white/cream card bg: `#FAF7F2`
- Dashed card border: dotted/dashed amber-200
- CTA button: amber-400 background, dark-brown text, full rounded pill

**Typography (from designs):**
- Headings: bold serif (e.g. `font-serif font-bold`)
- Category label above heading: uppercase, tracking-widest, small, amber-400
- Body: sans-serif, muted brown

---

## Product Data Model

All product data lives in a static file (`src/data/products.ts`). No API calls.

```ts
// src/data/products.ts
export type ProductVariant = {
  id: string;          // e.g. "bento-regular"
  label: string;       // e.g. "Regular Bento"
  priceNGN: number;    // e.g. 10500
};

export type ProductCard = {
  id: string;          // e.g. "bento-cakes"
  name: string;        // e.g. "Bento Cakes"
  categoryId: string;  // foreign key to Category
  variants: ProductVariant[];
  whatsappLink: string; // pre-filled WhatsApp enquiry link for this product
};

export type Category = {
  id: string;          // e.g. "bento-parfait"
  label: string;       // e.g. "Bento & Parfait"
  subtitle: string;    // e.g. "BENTO CAKES · CAKE PARFAIT"
  description: string;
  whatsappEnquiryLink: string;
};
```

**Categories (from designs, in tab order):**
1. Birthday Cakes
2. Bento & Parfait — Bento Cakes, Cake Parfait
3. Cupcakes & Foil Cakes — Cupcakes (boxes), Foil Cakes
4. Naked Cakes — Vanilla / Marble / Chocolate / Red Velvet / Blackforest / Carrot (6", 7", 8")
5. Loaf Cakes — Cornmeal Loaf, Banana Loaf
6. Pastries and Box Treats — Meat Pies, Tray of Small Chops, Chocolate Chip Cookies, Brownies, Bento Cakes (per slice), Chin Chin, Pastry Box

---

## CartContext Schema

```ts
// src/context/CartContext.tsx

export type CartItem = {
  variantId: string;       // unique key — matches ProductVariant.id
  productName: string;     // e.g. "Bento Cakes"
  variantLabel: string;    // e.g. "Customised"
  priceNGN: number;        // price at time of adding (snapshot)
  quantity: number;        // always >= 1
};

export type CartState = {
  items: CartItem[];
};

export type CartContextValue = {
  items: CartItem[];
  totalItems: number;                          // sum of all quantities — used for badge
  totalPriceNGN: number;                       // sum of item.price * item.quantity
  addItem: (variant: ProductVariant, productName: string) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, qty: number) => void;  // qty=0 removes item
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
};
```

**LocalStorage sync logic:**
- Key: `"liaa_cart"` — stores `CartState` as JSON.
- On mount: read `localStorage.getItem("liaa_cart")`, parse, hydrate state. If parse fails, default to `{ items: [] }`.
- On every state change: `useEffect` runs `localStorage.setItem("liaa_cart", JSON.stringify({ items }))`.
- `clearCart` also calls `localStorage.removeItem("liaa_cart")`.
- UI open/close state (`isCartOpen`, `isCheckoutOpen`) is NOT persisted — it resets on page reload.

---

## WhatsApp Checkout Logic

`src/utils/whatsapp.ts` builds the `wa.me` URL:

```
https://wa.me/2349137164903?text=<encoded message>
```

Message template (from checkout form fields):
```
Hi Liaa! I'd like to place an order.

Name: {customerName}
Delivery / Pickup: {deliveryPickup}
Date Needed: {dateNeeded}
Delivery Address: {deliveryAddress}
Flavour / Design / Cake Message: {cakeMessage}

Order:
- {quantity}x {productName} ({variantLabel}) — ₦{price}
...

Estimated Total: ₦{totalPriceNGN}
(Delivery fee to be confirmed)
```

The phone number is stored as a single constant in `src/utils/whatsapp.ts`.

---

## Component Tree

```
App
├── CartProvider                    (wraps entire app, manages cart + modal state)
│
└── main layout
    ├── Header
    │   ├── Logo (img)
    │   ├── NavLinks (Home, Menu, About, Contact)
    │   ├── CartIconButton           (ShoppingCart icon + badge showing totalItems)
    │   └── MobileMenuButton         (hamburger, toggles MobileNavDrawer)
    │       └── MobileNavDrawer      (slide-in overlay on mobile)
    │
    ├── HeroSection
    │   ├── HeroTextBlock            ("Cakes made / baked for you" + CTA button)
    │   └── HeroImageBlock           (product photography, rounded corners)
    │
    ├── MenuSection                  (id="menu" — anchor target from nav)
    │   ├── MenuSectionHeader        ("OUR MENU" label + heading + subtext)
    │   ├── CategoryTabs             (pill-shaped tab strip, horizontally scrollable on mobile)
    │   └── CategoryPanel            (renders for active category)
    │       ├── CategoryHeader       (name, subtitle, description, enquiry WhatsApp link)
    │       └── ProductGrid          (flex-wrap of ProductCard components)
    │           └── ProductCard[]
    │               ├── CardTitle    (e.g. "Bento Cakes")
    │               ├── VariantList
    │               │   └── VariantRow[] (label, price, "+ Order" button)
    │               └── QuickOrderLink ("Quick Order On WhatsApp" — amber, underlined)
    │
    ├── HowToOrderSection            (3-step process with icons, dark brown bg)
    │
    ├── AboutSection                 (brand story, "Baked with care" badge image)
    │
    ├── GallerySection               (masonry/grid of food photography)
    │
    ├── ContactSection               (dark brown bg, contact details + social links)
    │
    └── Footer
    
    ── CartDrawer                    (fixed overlay, renders when isCartOpen=true)
    │   ├── DrawerHeader             ("Your Order" title + X close button)
    │   ├── CartItemList
    │   │   └── CartItemRow[]        (name, price, qty stepper, Remove link in amber)
    │   ├── EstimatedTotal           (price + "Delivery fee confirmed on WhatsApp" note)
    │   └── SendOrderButton          (amber pill CTA → opens CheckoutModal)
    │
    └── CheckoutModal               (centered modal, renders when isCheckoutOpen=true)
        ├── ModalHeader              ("Order Details" + X close)
        ├── OrderSummaryLine         (product name, variant, price at top — from designs)
        ├── CheckoutForm
        │   ├── CustomerNameInput
        │   ├── DeliveryPickupInput
        │   ├── DateNeededInput
        │   ├── DeliveryAddressInput
        │   └── CakeMessageInput     (textarea — "Flavour, Design or Cake Message")
        ├── EstimatedTotal
        └── SendOnWhatsAppButton     (amber pill CTA → builds URL → window.open)
```

---

## Page Sections (Scroll Order)

| # | Section | Key Behaviour |
|---|---------|---------------|
| 1 | Header | Sticky, transparent → solid on scroll, cart badge |
| 2 | Hero | Full-width dark brown bg, headline + CTA "Order Now" scrolls to #menu |
| 3 | Menu | Amber bg, category tabs, product cards with variant rows |
| 4 | How to Order | 3-step dark-brown card strip |
| 5 | About | Split layout — Liaa brand image left, copy right |
| 6 | Gallery | Photo grid (food photography from assets) |
| 7 | Contact | Dark brown bg, WhatsApp/Instagram/email links |
| 8 | Footer | Minimal — logo + copyright |

---

## File & Folder Structure

```
src/
├── main.tsx
├── App.tsx
├── index.css                    (Tailwind directives + custom font imports)
│
├── context/
│   └── CartContext.jsx          (CartProvider + useCart hook) ✅ DONE
│
├── data/
│   └── products.js              (all category + product + variant data)
│
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── MobileNavDrawer.jsx
│   │
│   ├── sections/
│   │   ├── HeroSection.jsx
│   │   ├── MenuSection.jsx
│   │   ├── HowToOrderSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── GallerySection.jsx
│   │   └── ContactSection.jsx
│   │
│   ├── menu/
│   │   ├── CategoryTabs.jsx
│   │   ├── CategoryPanel.jsx
│   │   ├── ProductCard.jsx
│   │   └── VariantRow.jsx
│   │
│   └── cart/
│       ├── CartDrawer.jsx
│       ├── CartItemRow.jsx
│       ├── CheckoutModal.jsx
│       └── CheckoutForm.jsx
│
└── assets/                      (images imported directly by components)
```

---

## Sub-Tasks

### Task 1 — Project Scaffold
**Intent:** Bootstrap the Vite + React (JSX, no TypeScript) project, install dependencies, configure Tailwind, set brand tokens.
**Expected Outcomes:**
- `npm run dev` starts without errors
- Tailwind custom colours available globally via config
- Brand fonts configured in `index.css`
- Empty `App.jsx` renders without errors
**Todo:**
- [ ] Run `npm create vite@latest . -- --template react`
- [ ] Install `tailwindcss`, `postcss`, `autoprefixer`, `remixicon`
- [ ] Init Tailwind (`npx tailwindcss init -p`), configure `content` paths
- [ ] Add brand colour tokens to `tailwind.config.js` (liaa-brown `#3B1A0E`, liaa-amber `#F5A623`, liaa-cream `#FAF7F2`)
- [ ] Add Google Font import (serif for headings) to `index.css`
- [ ] Create empty placeholder sections in `App.jsx`
- [ ] Update `AGENTS.md` with build commands
**Status:** [ ] pending

---

### Task 2 — Product Data
**Intent:** Encode the complete menu (all 6 categories, all products, all variants with prices in NGN) into a static JS file. This is the single source of truth for the entire menu.
**Expected Outcomes:**
- `src/data/products.js` exports `CATEGORIES` and `PRODUCTS` arrays
- Every variant seen in design files is represented with exact prices
- WhatsApp enquiry links use `2349137164903`
**Todo:**
- [ ] Create `src/data/products.js` with JSDoc-commented shapes
- [ ] Enter all 6 categories with labels, subtitles, descriptions
- [ ] Enter all product cards and variants with exact prices from design files
- [ ] WhatsApp number: `2349137164903` (already set in CartContext — build enquiry links consistently)
**Status:** [ ] pending

---

### Task 3 — CartContext + LocalStorage
**Intent:** Implement the cart state as a React Context that persists to LocalStorage.
**Expected Outcomes:**
- `CartProvider` wraps `App` and exposes `useCart()` hook
- Adding the same variant increments quantity; does not duplicate
- State survives page refresh (hydrated from `liaa_cart` in LocalStorage)
- `isCartOpen` and `isCheckoutOpen` flags control modal visibility
- `clearCart` removes both state and LocalStorage entry
- `generateWhatsAppUrl(customerInfo)` and `sendOrderOnWhatsApp(customerInfo)` available via hook
- `SOCIAL_LINKS` exported for use in Header, Footer, Contact sections

**Status:** [x] done — `src/context/CartContext.jsx` implemented

---

### Task 4 — Header
**Intent:** Build the sticky responsive header with logo, nav links, and cart icon button with live item count badge.
**Expected Outcomes:**
- Logo renders from `assets/designs/Logo normal.png`
- Nav links (Home, Menu, About, Contact) are anchor links (`#menu`, `#about` etc.)
- Social icons (WhatsApp `ri-whatsapp-line`, Instagram `ri-instagram-line`) in header — link to `SOCIAL_LINKS` from CartContext
- Cart button shows `totalItems` badge (amber circle, hidden when 0)
- Header background transitions from transparent → solid `[#3B1A0E]` on scroll (using `scroll` event + `useState`)
- Mobile: nav links hidden, hamburger button shown; clicking opens `MobileNavDrawer`
**Todo:**
- [ ] Create `src/components/layout/Header.jsx`
- [ ] Import `useCart` — wire `totalItems` to badge; import `SOCIAL_LINKS`
- [ ] Implement scroll-aware background with `useEffect` + `window.addEventListener`
- [ ] Build `MobileNavDrawer.jsx` as a fixed overlay with `ri-close-line`
- [ ] Cart icon: `ri-shopping-basket-2-line`; hamburger: `ri-menu-line`
**Status:** [ ] pending

---

### Task 5 — Hero Section
**Intent:** Build the full-width hero with dark-brown background, headline text, CTA button, and product photography.
**Expected Outcomes:**
- Dark brown (`#3B1A0E`) background, white headline text
- "Order Now" CTA button scrolls smoothly to `#menu`
- Hero image (rounded, positioned right on desktop, below text on mobile)
- Responsive: single column on mobile, two-column on desktop
**Todo:**
- [ ] Create `src/components/sections/HeroSection.jsx`
- [ ] Import hero product image from assets
- [ ] CTA onClick: `document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })`
**Status:** [ ] pending

---

### Task 6 — Menu Section + Category Tabs + Product Cards
**Intent:** Build the full menu section with tab navigation, category panels, product cards, and variant rows including "+ Order" buttons that add items to cart.
**Expected Outcomes:**
- Active tab is filled amber pill; inactive tabs are outline pills
- Clicking a tab renders that category's `CategoryPanel`
- Each `ProductCard` shows product name, variant rows with price + "+ Order" button
- "+ Order" calls `addItem(variant, productName)` from `useCart()`
- "Quick Order On WhatsApp" link opens `wa.me` URL directly (bypasses cart)
- Dashed/dotted border on product cards matches design
- Category description and WhatsApp enquiry link shown above cards
- Disclaimer ("Prices are in Nigerian Naira...") shown at bottom of panel
- Tab strip scrolls horizontally on mobile without scrollbar visible
**Todo:**
- [ ] Create `src/components/menu/CategoryTabs.jsx` — pill tabs, `overflow-x-auto scrollbar-hide`
- [ ] Create `src/components/menu/CategoryPanel.jsx` — header + product grid
- [ ] Create `src/components/menu/ProductCard.jsx` — dashed border card with variants
- [ ] Create `src/components/menu/VariantRow.jsx` — label, price, "+ Order" dark-brown pill button; `ri-add-line` icon
- [ ] Create `src/components/sections/MenuSection.jsx` — amber background, wave top divider, section id="menu"
- [ ] Wire `CategoryTabs` active state with `useState` (default first category)
**Status:** [ ] pending

---

### Task 7 — Cart Drawer
**Intent:** Build the slide-in cart drawer that appears when `isCartOpen` is true, listing all cart items with quantity controls and a CTA to proceed to checkout.
**Expected Outcomes:**
- Drawer slides in from right on desktop, full-screen bottom sheet on mobile
- Backdrop overlay closes drawer on click
- Each `CartItemRow` shows: product name, variant label, price × qty, quantity stepper (−/+), "Remove" link in amber
- Estimated total shown; "Delivery fee confirmed on WhatsApp" note beneath
- "Send Order On WhatsApp" button calls `openCheckout()` and `closeCart()`
- Empty cart state shows friendly message + "Browse Menu" link
**Todo:**
- [ ] Create `src/components/cart/CartDrawer.jsx`
- [ ] Create `src/components/cart/CartItemRow.jsx`
- [ ] Wire quantity stepper to `updateQuantity`; "Remove" to `removeItem`
- [ ] Use `ri-add-line`, `ri-subtract-line`, `ri-close-line` icons
- [ ] Render `CartDrawer` at root level in `App.jsx` (outside section flow)
- [ ] Apply `translate-x-full` / `translate-x-0` transition for slide animation
**Status:** [ ] pending

---

### Task 8 — Checkout Modal + WhatsApp Redirect
**Intent:** Build the checkout modal that collects customer details and triggers the WhatsApp order.
**Expected Outcomes:**
- Modal shows current order summary at top (product, variant, price) matching the design
- Form fields: Your Name, Delivery/Pickup, Date Needed, Delivery Address, Flavour/Design/Cake Message
- "Send Order On WhatsApp" button calls `sendOrderOnWhatsApp(customerInfo)` from `useCart()`
- After sending, cart is cleared and both modal + drawer are closed automatically (handled inside `sendOrderOnWhatsApp`)
- Form validates that "Your Name" is not empty before allowing send
**Todo:**
- [ ] No separate whatsapp utils needed — `sendOrderOnWhatsApp` lives in `CartContext.jsx`
- [ ] Create `src/components/cart/CheckoutForm.jsx` with all 5 fields (controlled inputs)
- [ ] Create `src/components/cart/CheckoutModal.jsx` — centered modal with backdrop, `ri-close-line`
- [ ] Wire send button → `sendOrderOnWhatsApp(formState)`
- [ ] Render `CheckoutModal` at root level in `App.jsx` alongside `CartDrawer`
**Status:** [ ] pending

---

### Task 9 — Supporting Sections
**Intent:** Build the remaining page sections: How to Order, About, Gallery, Contact, Footer.
**Expected Outcomes:**
- How to Order: 3 dark-brown cards with numbered steps and icons
- About: split layout with `Image 87865.png` (Liaa brand square) and brand story copy
- Gallery: responsive photo grid using the product photography images
- Contact: dark-brown background; WhatsApp link from `SOCIAL_LINKS.whatsapp`, Instagram from `SOCIAL_LINKS.instagram`; `ri-whatsapp-line`, `ri-instagram-line` icons
- Footer: logo + "© Liaa Bakes" copyright + same social icon links
**Todo:**
- [ ] Create `src/components/sections/HowToOrderSection.jsx`
- [ ] Create `src/components/sections/AboutSection.jsx` — import `Image 87865.png`
- [ ] Create `src/components/sections/GallerySection.jsx` — import `image 01.png` through `image 05.png`
- [ ] Create `src/components/sections/ContactSection.jsx` — use `SOCIAL_LINKS` from CartContext; `ri-whatsapp-line`, `ri-instagram-line`
- [ ] Create `src/components/layout/Footer.jsx` — logo + copyright + social icons (`ri-whatsapp-line`, `ri-instagram-line`)
**Status:** [ ] pending

---

### Task 10 — Polish + Responsive QA
**Intent:** Final pass to ensure full mobile responsiveness, accessibility basics, and visual fidelity against the design files.
**Expected Outcomes:**
- All sections render correctly at 375px, 768px, 1280px
- Cart badge hidden when `totalItems === 0`
- Tab strip does not show horizontal scrollbar on mobile
- All amber CTA buttons are full-width on mobile, auto-width on desktop
- Images have `alt` text
- `aria-label` on icon-only buttons (cart, close, hamburger)
- `AGENTS.md` updated with final build/lint/test commands
**Todo:**
- [ ] Audit every section at mobile breakpoint
- [ ] Add `scrollbar-hide` utility (via `tailwind-scrollbar-hide` plugin or custom CSS)
- [ ] Ensure `focus-visible` ring styles on interactive elements
- [ ] Final review of all prices against design files
- [ ] Update `AGENTS.md` with `npm run dev`, `npm run build`, `npm run preview` commands
**Status:** [ ] pending
