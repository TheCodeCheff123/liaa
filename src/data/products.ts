/**
 * Liaa Bakes — Product Catalogue
 *
 * Structure:
 *   - CATEGORIES: ordered array of tab labels.
 *   - CATEGORY_META: per-category subtitle, description and enquiry link.
 *   - products: all orderable products with variants (prices in NGN).
 */

export interface ProductVariant {
  id: string;
  label: string;
  priceNGN: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  variants: ProductVariant[];
}

export interface CategoryMeta {
  subtitle: string;
  description: string;
  whatsappEnquiryLink: string;
}

const WA = 'https://wa.me/2349137164903';

function enquiry(text: string) {
  return `${WA}?text=${encodeURIComponent(text)}`;
}

export const CATEGORIES = [
  'Birthday Cakes',
  'Bento & Parfait',
  'Cupcakes & Foil Cakes',
  'Naked Cakes',
  'Loaf Cakes',
  'Pastries & Box Treats',
] as const;

export type CategoryLabel = (typeof CATEGORIES)[number];

export const CATEGORY_META: Record<CategoryLabel, CategoryMeta> = {
  'Birthday Cakes': {
    subtitle: 'BUTTER CREAM',
    description:
      'Classic butter cream celebration cakes in single, double and triple layers. Ask about Birthday Cakes on WhatsApp.',
    whatsappEnquiryLink: enquiry("Hi Liaa! 🎂 I'd like to ask about Birthday Cakes."),
  },
  'Bento & Parfait': {
    subtitle: 'MINI CELEBRATION · LAYERED DESSERT',
    description:
      'Adorable single-portion bento cakes and creamy layered parfait cups, perfect as personal treats or gifts.',
    whatsappEnquiryLink: enquiry("Hi Liaa! 🎂 I'd like to ask about Bento Cakes & Parfait."),
  },
  'Cupcakes & Foil Cakes': {
    subtitle: 'BUTTER CREAM FROSTED · INDIVIDUAL PORTIONS',
    description:
      'Fluffy butter cream frosted cupcakes and individually baked foil cakes — great for events and gifting.',
    whatsappEnquiryLink: enquiry("Hi Liaa! 🎂 I'd like to ask about Cupcakes & Foil Cakes."),
  },
  'Naked Cakes': {
    subtitle: 'RUSTIC & ELEGANT',
    description:
      'Semi-frosted rustic cakes with exposed sponge, fresh fruits and florals.',
    whatsappEnquiryLink: enquiry("Hi Liaa! 🎂 I'd like to ask about Naked Cakes."),
  },
  'Loaf Cakes': {
    subtitle: 'CLASSIC BAKES',
    description:
      'Moist, sliceable loaf cakes in classic flavours like cornmeal and banana.',
    whatsappEnquiryLink: enquiry("Hi Liaa! 🎂 I'd like to ask about Loaf Cakes."),
  },
  'Pastries & Box Treats': {
    subtitle: 'SAVOURY & SWEET',
    description:
      'Golden meat pies, party small chops boxes, chin chin, cookies, brownies and more.',
    whatsappEnquiryLink: enquiry("Hi Liaa! 🎂 I'd like to ask about Pastries & Box Treats."),
  },
};

const products: Product[] = [
  // ─── Birthday Cakes ────────────────────────────────────────────────────────
  {
    id: 'birthday-6',
    name: '6 Inches',
    category: 'Birthday Cakes',
    subtitle: 'BUTTER CREAM',
    description: 'Classic butter cream celebration cake, 6 inch.',
    variants: [
      { id: 'bday-6-single', label: 'Single Layer', priceNGN: 17500 },
      { id: 'bday-6-double', label: 'Double Layer', priceNGN: 22000 },
    ],
  },
  {
    id: 'birthday-7',
    name: '7 Inches',
    category: 'Birthday Cakes',
    subtitle: 'BUTTER CREAM',
    description: 'Classic butter cream celebration cake, 7 inch.',
    variants: [
      { id: 'bday-7-single', label: 'Single Layer', priceNGN: 20000 },
      { id: 'bday-7-double', label: 'Double Layer', priceNGN: 26500 },
      { id: 'bday-7-triple', label: 'Triple Layer', priceNGN: 35000 },
    ],
  },
  {
    id: 'birthday-8',
    name: '8 Inches',
    category: 'Birthday Cakes',
    subtitle: 'BUTTER CREAM',
    description: 'Classic butter cream celebration cake, 8 inch.',
    variants: [
      { id: 'bday-8-single', label: 'Single Layer', priceNGN: 23500 },
      { id: 'bday-8-double', label: 'Double Layer', priceNGN: 29500 },
      { id: 'bday-8-triple', label: 'Triple Layer', priceNGN: 40000 },
    ],
  },
  {
    id: 'birthday-9',
    name: '9 Inches',
    category: 'Birthday Cakes',
    subtitle: 'BUTTER CREAM',
    description: 'Classic butter cream celebration cake, 9 inch.',
    variants: [
      { id: 'bday-9-single', label: 'Single Layer', priceNGN: 27000 },
      { id: 'bday-9-double', label: 'Double Layer', priceNGN: 37000 },
      { id: 'bday-9-triple', label: 'Triple Layer', priceNGN: 48000 },
    ],
  },

  // ─── Bento & Parfait ───────────────────────────────────────────────────────
  {
    id: 'bento-cakes',
    name: 'Bento Cakes',
    category: 'Bento & Parfait',
    subtitle: 'MINI CELEBRATION',
    description: 'Adorable single-portion bento cakes, perfect as a personal treat or gift.',
    variants: [
      { id: 'bento-standard', label: 'Standard', priceNGN: 12500 },
      { id: 'bento-customised', label: 'Customised', priceNGN: 15000 },
    ],
  },
  {
    id: 'parfait',
    name: 'Parfait Cups',
    category: 'Bento & Parfait',
    subtitle: 'LAYERED DESSERT',
    description: 'Creamy layered parfait cups with sponge cake, fruit and whipped cream.',
    variants: [
      { id: 'parfait-regular', label: 'Regular (250ml)', priceNGN: 5500 },
      { id: 'parfait-large', label: 'Large (500ml)', priceNGN: 9000 },
    ],
  },

  // ─── Cupcakes & Foil Cakes ─────────────────────────────────────────────────
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    category: 'Cupcakes & Foil Cakes',
    subtitle: 'BUTTER CREAM FROSTED',
    description: 'Fluffy butter cream frosted cupcakes — available in packs of 6 or 12.',
    variants: [
      { id: 'cupcakes-6', label: 'Pack of 6', priceNGN: 9000 },
      { id: 'cupcakes-12', label: 'Pack of 12', priceNGN: 16500 },
    ],
  },
  {
    id: 'foil-cakes',
    name: 'Foil Cakes',
    category: 'Cupcakes & Foil Cakes',
    subtitle: 'INDIVIDUAL PORTIONS',
    description: 'Individually baked cake portions in foil cups — great for events and gifting.',
    variants: [
      { id: 'foil-6', label: 'Pack of 6', priceNGN: 7500 },
      { id: 'foil-12', label: 'Pack of 12', priceNGN: 13500 },
    ],
  },

  // ─── Naked Cakes ───────────────────────────────────────────────────────────
  {
    id: 'naked-cakes',
    name: 'Naked Cakes',
    category: 'Naked Cakes',
    subtitle: 'RUSTIC & ELEGANT',
    description: 'Semi-frosted rustic cakes with exposed sponge, fresh fruits and florals.',
    variants: [
      { id: 'naked-6', label: '6 Inches', priceNGN: 25000 },
      { id: 'naked-8', label: '8 Inches', priceNGN: 35000 },
      { id: 'naked-10', label: '10 Inches', priceNGN: 48000 },
    ],
  },

  // ─── Loaf Cakes ────────────────────────────────────────────────────────────
  {
    id: 'loaf-cakes',
    name: 'Loaf Cakes',
    category: 'Loaf Cakes',
    subtitle: 'CLASSIC BAKES',
    description: 'Moist, sliceable loaf cakes in classic flavours like cornmeal and banana.',
    variants: [
      { id: 'loaf-small', label: 'Small Loaf', priceNGN: 8500 },
      { id: 'loaf-medium', label: 'Medium Loaf', priceNGN: 13000 },
      { id: 'loaf-large', label: 'Large Loaf', priceNGN: 18500 },
    ],
  },

  // ─── Pastries & Box Treats ─────────────────────────────────────────────────
  {
    id: 'meat-pie',
    name: 'Meat Pie',
    category: 'Pastries & Box Treats',
    subtitle: 'SAVOURY PASTRY',
    description: 'Golden, flaky-crusted meat pies filled with seasoned minced beef and vegetables.',
    variants: [
      { id: 'meatpie-2', label: 'Pack of 2', priceNGN: 3500 },
      { id: 'meatpie-4', label: 'Pack of 4', priceNGN: 6500 },
      { id: 'meatpie-6', label: 'Pack of 6', priceNGN: 9000 },
    ],
  },
  {
    id: 'small-chops-box',
    name: 'Small Chops Box',
    category: 'Pastries & Box Treats',
    subtitle: 'EVENT FAVOURITE',
    description: 'Party-ready small chops box with spring rolls, puff puff and samosas.',
    variants: [
      { id: 'smallchops-10', label: '10-piece Box', priceNGN: 7000 },
      { id: 'smallchops-20', label: '20-piece Box', priceNGN: 13000 },
      { id: 'smallchops-50', label: '50-piece Box', priceNGN: 30000 },
    ],
  },
  {
    id: 'chin-chin',
    name: 'Chin Chin',
    category: 'Pastries & Box Treats',
    subtitle: 'CRUNCHY SNACK',
    description: 'Crunchy, lightly sweetened chin chin in a resealable gift bag.',
    variants: [
      { id: 'chinchin-200g', label: '200g Bag', priceNGN: 3000 },
      { id: 'chinchin-500g', label: '500g Bag', priceNGN: 6500 },
    ],
  },
];

export default products;
