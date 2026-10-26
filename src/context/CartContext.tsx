import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = 'liaa_cart';
const WHATSAPP_NUMBER = '2349137164903';
const WA_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

function waLink(text: string) {
  return `${WA_BASE}?text=${encodeURIComponent(text)}`;
}

// ─── Socials ─────────────────────────────────────────────────────────────────

export const SOCIAL_LINKS = {
  whatsapp: WA_BASE,
  instagram: 'https://www.instagram.com/liaacrea/',
  tiktok: 'https://www.tiktok.com/@liaa_events',
} as const;

// ─── Pre-filled WhatsApp links per context ────────────────────────────────────

export const WA_LINKS = {
  /** Floating button — general enquiry */
  general: waLink(
    "Hi Liaa! 🎂 I'd like to make a cake enquiry. My name is..."
  ),
  /** Hero CTA — view menu / order */
  heroOrder: waLink(
    "Hi Liaa! 🎂 I just saw your menu and I'd like to place an order. My name is..."
  ),
  /** Header "Order Via WhatsApp" button */
  headerOrder: waLink(
    "Hi Liaa! 🎂 I'd like to order a cake. My name is..."
  ),
  /** Contact section — custom date & design */
  contact: waLink(
    "Hi Liaa! 🎂 I'd like to discuss a custom cake. My name is...\nDate needed:\nSize/Design idea:"
  ),
  /** Footer / mobile drawer — general reach-out */
  footer: waLink(
    "Hi Liaa! 🎂 I'd like to get in touch. My name is..."
  ),
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProductVariant {
  id: string;
  label: string;
  priceNGN: number;
}

export interface CartItem {
  variantId: string;
  productName: string;
  variantLabel: string;
  priceNGN: number;
  quantity: number;
}

interface CustomerInfo {
  name: string;
  deliveryPickup: string;
  dateNeeded: string;
  deliveryAddress: string;
  cakeMessage: string;
}

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPriceNGN: number;
  addItem: (variant: ProductVariant, productName: string) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  generateWhatsAppUrl: (customerInfo: CustomerInfo) => string;
  sendOrderOnWhatsApp: (customerInfo: CustomerInfo) => void;
  formatNaira: (amount: number) => string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readStoredItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as CartItem[];
  } catch {
    return [];
  }
}

function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

// ─── Reducer ─────────────────────────────────────────────────────────────────

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { variantId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { variantId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { variantId, productName, variantLabel, priceNGN } = action.payload;
      const existing = items.find((i) => i.variantId === variantId);
      if (existing) {
        return items.map((i) =>
          i.variantId === variantId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...items, { variantId, productName, variantLabel, priceNGN, quantity: 1 }];
    }
    case 'REMOVE_ITEM':
      return items.filter((i) => i.variantId !== action.payload.variantId);
    case 'UPDATE_QUANTITY': {
      const { variantId, quantity } = action.payload;
      if (quantity <= 0) return items.filter((i) => i.variantId !== variantId);
      return items.map((i) => (i.variantId === variantId ? { ...i, quantity } : i));
    }
    case 'CLEAR_CART':
      return [];
    default:
      return items;
  }
}

// ─── Context ─────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, undefined, readStoredItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalPriceNGN = useMemo(
    () => items.reduce((sum, i) => sum + i.priceNGN * i.quantity, 0),
    [items]
  );

  function addItem(variant: ProductVariant, productName: string) {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        variantId: variant.id,
        productName,
        variantLabel: variant.label,
        priceNGN: variant.priceNGN,
      },
    });
  }

  function removeItem(variantId: string) {
    dispatch({ type: 'REMOVE_ITEM', payload: { variantId } });
  }

  function updateQuantity(variantId: string, quantity: number) {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { variantId, quantity } });
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  function openCart() { setIsCartOpen(true); }
  function closeCart() { setIsCartOpen(false); }
  function openCheckout() { setIsCheckoutOpen(true); }
  function closeCheckout() { setIsCheckoutOpen(false); }

  function generateWhatsAppUrl(customerInfo: CustomerInfo): string {
    const { name = '', deliveryPickup = '', dateNeeded = '', deliveryAddress = '', cakeMessage = '' } = customerInfo;

    const orderLines = items
      .map((item) => `  • ${item.quantity}× ${item.productName} (${item.variantLabel}) — ${formatNaira(item.priceNGN * item.quantity)}`)
      .join('\n');

    const message = [
      `Hi Liaa! I'd like to place an order.`,
      ``,
      `*Customer Details*`,
      `Name: ${name}`,
      `Delivery / Pickup: ${deliveryPickup}`,
      `Date Needed: ${dateNeeded}`,
      deliveryAddress ? `Delivery Address: ${deliveryAddress}` : null,
      cakeMessage ? `Flavour / Design / Cake Message: ${cakeMessage}` : null,
      ``,
      `*My Order*`,
      orderLines,
      ``,
      `*Estimated Total: ${formatNaira(totalPriceNGN)}*`,
      `_(Delivery fee to be confirmed on WhatsApp)_`,
    ]
      .filter((line) => line !== null)
      .join('\n');

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function sendOrderOnWhatsApp(customerInfo: CustomerInfo) {
    const url = generateWhatsAppUrl(customerInfo);
    window.open(url, '_blank', 'noopener,noreferrer');
    clearCart();
    closeCheckout();
    closeCart();
  }

  const value: CartContextValue = {
    items,
    totalItems,
    totalPriceNGN,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isCartOpen,
    openCart,
    closeCart,
    isCheckoutOpen,
    openCheckout,
    closeCheckout,
    generateWhatsAppUrl,
    sendOrderOnWhatsApp,
    formatNaira,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>.');
  return ctx;
}

export default CartContext;
