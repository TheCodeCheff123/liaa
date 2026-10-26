/**
 * Liaa Bakes — Product Catalogue
 * Source of truth: assets/designs/Group 2–6.png design assets
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
      'Classic butter cream celebration cakes in single, double and triple layers.',
    whatsappEnquiryLink: enquiry("Hi Liaa! I'd like to ask about Birthday Cakes."),
  },
  'Bento & Parfait': {
    subtitle: 'BENTO CAKES · CAKE PARFAIT',
    description:
      'Cute single-serve cakes and layered parfait cups, perfect for gifting.',
    whatsappEnquiryLink: enquiry("Hi Liaa! I'd like to ask about Bento and Parfait."),
  },
  'Cupcakes & Foil Cakes': {
    subtitle: 'BOXES AND INDIVIDUAL FOIL CAKES',
    description:
      'Soft, fresh cupcakes by the box and foil cakes in two sizes.',
    whatsappEnquiryLink: enquiry("Hi Liaa! I'd like to ask about Cupcakes and Foil Cakes."),
  },
  'Naked Cakes': {
    subtitle: 'AVAILABLE IN 6", 7" AND 8"',
    description:
      'Classic butter cream celebration cakes in single, double and triple layers.',
    whatsappEnquiryLink: enquiry("Hi Liaa! I'd like to ask about Naked Cakes."),
  },
  'Loaf Cakes': {
    subtitle: 'CORNMEAL · BANANA',
    description:
      'Tender, homestyle loaf cakes for tea time and gifting.',
    whatsappEnquiryLink: enquiry("Hi Liaa! I'd like to ask about Loaf Cakes."),
  },
  'Pastries & Box Treats': {
    subtitle: 'MEAT PIES, SMALL CHOPS, COOKIES AND MORE',
    description:
      'Savoury and sweet baked treats — meat pies, small chops trays, cookies, brownies, chin chin and pastry boxes.',
    whatsappEnquiryLink: enquiry("Hi Liaa! I'd like to ask about Pastries and Box Treats."),
  },
};

const products: Product[] = [

  // ─── Birthday Cakes ──────────────────────────────────────────────────────────
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

  // ─── Bento & Parfait ─────────────────────────────────────────────────────────
  {
    id: 'bento-cakes',
    name: 'Bento Cakes',
    category: 'Bento & Parfait',
    subtitle: 'MINI CELEBRATION',
    description: 'Cute single-serve bento cakes, perfect as a personal treat or gift.',
    variants: [
      { id: 'bento-regular',     label: 'Regular Bento',  priceNGN: 10500 },
      { id: 'bento-customised',  label: 'Customised',     priceNGN: 12500 },
    ],
  },
  {
    id: 'cake-parfait',
    name: 'Cake Parfait',
    category: 'Bento & Parfait',
    subtitle: 'LAYERED DESSERT',
    description: 'Creamy layered parfait cups with sponge cake, fruit and whipped cream.',
    variants: [
      { id: 'parfait-big',   label: 'Big Size',   priceNGN: 6000 },
      { id: 'parfait-small', label: 'Small Size', priceNGN: 5000 },
    ],
  },

  // ─── Cupcakes & Foil Cakes ───────────────────────────────────────────────────
  {
    id: 'cupcakes',
    name: 'Cupcakes',
    category: 'Cupcakes & Foil Cakes',
    subtitle: 'BUTTER CREAM FROSTED',
    description: 'Soft, fresh cupcakes by the box — with or without toppings.',
    variants: [
      { id: 'cupcakes-6-with',    label: 'Box of 6 with toppings',    priceNGN: 8500  },
      { id: 'cupcakes-6-without', label: 'Box of 6 without toppings', priceNGN: 5500  },
      { id: 'cupcakes-12-with',   label: 'Box of 12 with toppings',   priceNGN: 15500 },
      { id: 'cupcakes-12-without',label: 'Box of 12 without toppings',priceNGN: 10000 },
    ],
  },
  {
    id: 'foil-cakes',
    name: 'Foil Cakes',
    category: 'Cupcakes & Foil Cakes',
    subtitle: 'INDIVIDUAL FOIL CAKES',
    description: 'Individually baked foil cakes in small and big sizes — great for events and gifting.',
    variants: [
      { id: 'foil-small-with',    label: 'Small with toppings',    priceNGN: 2700 },
      { id: 'foil-small-without', label: 'Small without toppings', priceNGN: 2500 },
      { id: 'foil-big-with',      label: 'Big with toppings',      priceNGN: 4000 },
      { id: 'foil-big-without',   label: 'Big without toppings',   priceNGN: 3800 },
    ],
  },

  // ─── Naked Cakes ─────────────────────────────────────────────────────────────
  {
    id: 'naked-vanilla',
    name: 'Vanilla',
    category: 'Naked Cakes',
    subtitle: 'NAKED CAKE',
    description: 'Classic vanilla naked cake with rustic buttercream finish.',
    variants: [
      { id: 'naked-vanilla-6', label: '6"', priceNGN: 7500  },
      { id: 'naked-vanilla-7', label: '7"', priceNGN: 8500  },
      { id: 'naked-vanilla-8', label: '8"', priceNGN: 10000 },
    ],
  },
  {
    id: 'naked-marble',
    name: 'Marble',
    category: 'Naked Cakes',
    subtitle: 'NAKED CAKE',
    description: 'Marbled sponge naked cake with a striking swirl finish.',
    variants: [
      { id: 'naked-marble-6', label: '6"', priceNGN: 7500  },
      { id: 'naked-marble-7', label: '7"', priceNGN: 8500  },
      { id: 'naked-marble-8', label: '8"', priceNGN: 10000 },
    ],
  },
  {
    id: 'naked-chocolate',
    name: 'Chocolate',
    category: 'Naked Cakes',
    subtitle: 'NAKED CAKE',
    description: 'Rich chocolate naked cake, light and moist.',
    variants: [
      { id: 'naked-choc-6', label: '6"', priceNGN: 6500 },
      { id: 'naked-choc-7', label: '7"', priceNGN: 7500 },
      { id: 'naked-choc-8', label: '8"', priceNGN: 8500 },
    ],
  },
  {
    id: 'naked-red-velvet',
    name: 'Red Velvet',
    category: 'Naked Cakes',
    subtitle: 'NAKED CAKE',
    description: 'Vibrant red velvet naked cake with cream cheese style finish.',
    variants: [
      { id: 'naked-rv-6', label: '6"', priceNGN: 6500 },
      { id: 'naked-rv-7', label: '7"', priceNGN: 7500 },
      { id: 'naked-rv-8', label: '8"', priceNGN: 8500 },
    ],
  },
  {
    id: 'naked-blackforest',
    name: 'Blackforest',
    category: 'Naked Cakes',
    subtitle: 'NAKED CAKE',
    description: 'Classic blackforest naked cake with cherries and cream.',
    variants: [
      { id: 'naked-bf-6', label: '6"', priceNGN: 7500 },
      { id: 'naked-bf-7', label: '7"', priceNGN: 8000 },
      { id: 'naked-bf-8', label: '8"', priceNGN: 8500 },
    ],
  },
  {
    id: 'naked-carrot',
    name: 'Carrot',
    category: 'Naked Cakes',
    subtitle: 'NAKED CAKE',
    description: 'Spiced carrot naked cake — moist, fluffy and full of flavour.',
    variants: [
      { id: 'naked-carrot-6', label: '6"', priceNGN: 8000  },
      { id: 'naked-carrot-7', label: '7"', priceNGN: 9000  },
      { id: 'naked-carrot-8', label: '8"', priceNGN: 10000 },
    ],
  },

  // ─── Loaf Cakes ──────────────────────────────────────────────────────────────
  {
    id: 'cornmeal-loaf',
    name: 'Cornmeal Loaf',
    category: 'Loaf Cakes',
    subtitle: 'CLASSIC BAKE',
    description: 'Tender, homestyle cornmeal loaf cake — perfect for tea time and gifting.',
    variants: [
      { id: 'cornmeal-loaf', label: 'Loaf', priceNGN: 12000 },
    ],
  },
  {
    id: 'banana-loaf',
    name: 'Banana Loaf',
    category: 'Loaf Cakes',
    subtitle: 'CLASSIC BAKE',
    description: 'Moist and flavourful banana loaf cake, great as a snack or gift.',
    variants: [
      { id: 'banana-loaf', label: 'Loaf', priceNGN: 7500 },
    ],
  },

  // ─── Pastries & Box Treats ───────────────────────────────────────────────────
  {
    id: 'meat-pies',
    name: 'Meat Pies',
    category: 'Pastries & Box Treats',
    subtitle: 'SAVOURY PASTRY',
    description: 'Golden, flaky-crusted meat pies filled with seasoned minced beef and vegetables.',
    variants: [
      { id: 'meatpie-box6',  label: 'Box of 6',  priceNGN: 9500  },
      { id: 'meatpie-box12', label: 'Box of 12', priceNGN: 19000 },
    ],
  },
  {
    id: 'small-chops-tray',
    name: 'Tray of Small Chops',
    category: 'Pastries & Box Treats',
    subtitle: 'EVENT FAVOURITE',
    description: '10 samosa, 10 spring rolls, 15 puff puff and 6 pieces of peppered chicken.',
    variants: [
      { id: 'smallchops-tray', label: 'Tray', priceNGN: 35000 },
    ],
  },
  {
    id: 'choc-chip-cookies',
    name: 'Chocolate Chip Cookies',
    category: 'Pastries & Box Treats',
    subtitle: 'FRESHLY BAKED',
    description: 'Freshly baked chocolate chip cookies, packaged in a gift box.',
    variants: [
      { id: 'cookies-box', label: 'Box', priceNGN: 11500 },
    ],
  },
  {
    id: 'brownies',
    name: 'Brownies',
    category: 'Pastries & Box Treats',
    subtitle: 'RICH & FUDGY',
    description: 'Box of 12 cuts or slices of rich, fudgy brownies.',
    variants: [
      { id: 'brownies-box', label: 'Box', priceNGN: 12500 },
    ],
  },
  {
    id: 'pastry-bento',
    name: 'Bento Cakes',
    category: 'Pastries & Box Treats',
    subtitle: 'PER SLICE',
    description: 'Individual bento cake slices — great as a sweet single treat.',
    variants: [
      { id: 'pastry-bento-slice', label: 'Per Slice', priceNGN: 5500 },
    ],
  },
  {
    id: 'chin-chin',
    name: 'Chin Chin',
    category: 'Pastries & Box Treats',
    subtitle: 'CRUNCHY SNACK',
    description: 'Crunchy, lightly sweetened chin chin in a jar.',
    variants: [
      { id: 'chinchin-jar', label: 'Jar', priceNGN: 12000 },
    ],
  },
  {
    id: 'pastry-box',
    name: 'Pastry Box',
    category: 'Pastries & Box Treats',
    subtitle: 'ASSORTED BOX',
    description: '2 sausage rolls, 2 fish rolls, 2 meat pies, 2 chicken frank rolls and 2 cinnamon rolls.',
    variants: [
      { id: 'pastry-box-std', label: 'Box', priceNGN: 18000 },
    ],
  },
];

export default products;
