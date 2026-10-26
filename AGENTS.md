# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Status

This repository is in early/design phase. It currently contains only design assets — no source code, package manager configuration, or framework has been established yet.

## Repository Structure

```
assets/
└── designs/          # Design references and brand assets
    ├── Logo normal.png
    ├── Logo white.png
    ├── favicon.png
    ├── Cart Pop Up.png
    ├── contact section.png
    ├── base_basic_shaded.glb   # 3D model asset
    └── image 0[1-5].png        # Product/content images
```
# Liaa Website Project Rules

## Stack
- **Framework:** React + Vite (`.jsx`, not `.tsx` — no TypeScript)
- **Styling:** Tailwind CSS, mobile-first
- **Icons:** `remixicon` — use `<i className="ri-icon-name-line">` (NOT lucide-react)
- **State Management:** React Context API (`src/context/CartContext.jsx`) + `localStorage` key `"liaa_cart"`
- **Architecture:** Client-side only. Orders sent via WhatsApp pre-filled URL.

## Key Constants (in `src/context/CartContext.jsx`)
- WhatsApp number: `2349137164903` (`+234 913 716 4903`)
- `SOCIAL_LINKS.whatsapp` — `https://wa.me/2349137164903`
- `SOCIAL_LINKS.instagram` — `https://www.instagram.com/liaa.bakes`

## Cart Rules
- Cart key is `variantId` (not productId) — same product has multiple orderable variants
- Price is **snapshotted** on `addItem` — not re-read from data file
- Only `items[]` is persisted to localStorage; `isCartOpen`/`isCheckoutOpen` reset on reload
- `clearCart()` removes both reducer state AND the localStorage entry

## Icons to use (remixicon)
- Cart: `ri-shopping-basket-2-line`
- Close: `ri-close-line`
- WhatsApp: `ri-whatsapp-line`
- Instagram: `ri-instagram-line`
- Add: `ri-add-line`
- Subtract: `ri-subtract-line`
- Menu (hamburger): `ri-menu-line`
- Arrow right: `ri-arrow-right-line`

## Notes
- Design assets in `assets/designs/` are the authoritative UI spec.
- Brand colours: amber `#F5A623`, dark brown `#3B1A0E`, cream `#FAF7F2`.
- The `.glb` file (`base_basic_shaded.glb`) is a design asset, not yet used in code.
