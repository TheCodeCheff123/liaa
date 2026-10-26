import { useEffect, useRef, useState } from 'react';
import { useCart } from '../../context/CartContext';

interface FormState {
  name: string;
  deliveryPickup: string;
  dateNeeded: string;
  deliveryAddress: string;
  cakeMessage: string;
}

interface FormErrors {
  name?: string;
  deliveryPickup?: string;
  dateNeeded?: string;
}

const EMPTY_FORM: FormState = {
  name: '',
  deliveryPickup: '',
  dateNeeded: '',
  deliveryAddress: '',
  cakeMessage: '',
};

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, sendOrderOnWhatsApp, totalPriceNGN, formatNaira } =
    useCart();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCheckoutOpen) {
      const raf = requestAnimationFrame(() => firstInputRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
  }, [isCheckoutOpen]);

  useEffect(() => {
    if (!isCheckoutOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckoutOpen]);

  function handleClose() {
    closeCheckout();
    setForm(EMPTY_FORM);
    setErrors({});
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name in errors) setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your name.';
    if (!form.deliveryPickup.trim()) newErrors.deliveryPickup = 'Please choose Delivery or Pickup.';
    if (!form.dateNeeded.trim()) newErrors.dateNeeded = 'Please enter the date you need your order.';
    return newErrors;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    sendOrderOnWhatsApp(form);
    setForm(EMPTY_FORM);
    setErrors({});
  }

  if (!isCheckoutOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order Details"
      className="fixed inset-0 flex items-end sm:items-center justify-center px-0 sm:px-4"
      style={{ zIndex: 60 }}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={handleClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal panel */}
      <div className="relative z-10 w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92dvh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <h2 className="text-[#3B1A0E] font-bold text-xl">Order Details</h2>
          <button
            onClick={handleClose}
            aria-label="Close order details"
            className="text-[#3B1A0E] hover:text-[#F5A623] transition-colors cursor-pointer p-1 -mr-1"
          >
            <i className="ri-close-line text-2xl" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-4"
        >
          <Field label="Your Name" required error={errors.name}>
            <input
              ref={firstInputRef}
              id="field-name"
              name="name"
              type="text"
              placeholder="e.g. Ada"
              value={form.name}
              onChange={handleChange}
              className={inputCls(errors.name)}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Delivery / Pickup" required error={errors.deliveryPickup}>
              <select
                id="field-deliveryPickup"
                name="deliveryPickup"
                value={form.deliveryPickup}
                onChange={handleChange}
                className={inputCls(errors.deliveryPickup)}
              >
                <option value="">Select…</option>
                <option value="Delivery">Delivery</option>
                <option value="Pickup">Pickup</option>
              </select>
            </Field>

            <Field label="Date Needed" required error={errors.dateNeeded}>
              <input
                id="field-dateNeeded"
                name="dateNeeded"
                type="date"
                min={todayString()}
                value={form.dateNeeded}
                onChange={handleChange}
                className={inputCls(errors.dateNeeded)}
              />
            </Field>
          </div>

          <Field label="Delivery Address" hint="(optional for Pickup)">
            <input
              id="field-deliveryAddress"
              name="deliveryAddress"
              type="text"
              placeholder="e.g. 12 Bakery Lane, Lekki"
              value={form.deliveryAddress}
              onChange={handleChange}
              className={inputCls()}
            />
          </Field>

          <Field label="Flavour, Design or Cake Message" hint="(optional)">
            <textarea
              id="field-cakeMessage"
              name="cakeMessage"
              rows={3}
              placeholder="e.g. Vanilla, gold & white theme 'Happy Birthday Chichi'"
              value={form.cakeMessage}
              onChange={handleChange}
              className={`${inputCls()} resize-none`}
            />
          </Field>
        </form>

        {/* Sticky footer */}
        <div className="border-t border-gray-100 px-6 py-5 shrink-0 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#3B1A0E] font-semibold text-sm">Estimated total</p>
              <p className="text-gray-400 text-xs">Delivery fee is confirmed on WhatsApp.</p>
            </div>
            <p className="text-[#3B1A0E] font-extrabold text-lg">{formatNaira(totalPriceNGN)}</p>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-[#F5A623] hover:bg-amber-400 text-[#3B1A0E] font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <i className="ri-whatsapp-line text-lg" />
            Send Order On WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function inputCls(error?: string) {
  return [
    'w-full rounded-lg border px-3 py-2.5 text-sm text-[#3B1A0E]',
    'placeholder:text-gray-300 bg-white outline-none',
    'transition-colors duration-150',
    error
      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
      : 'border-gray-200 focus:border-[#F5A623] focus:ring-2 focus:ring-amber-100',
  ].join(' ');
}

function todayString() {
  return new Date().toISOString().split('T')[0];
}

interface FieldProps {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, hint, required, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[#3B1A0E] text-xs font-semibold">
        {label}
        {required && <span className="text-[#F5A623] ml-0.5">*</span>}
        {hint && <span className="text-gray-400 font-normal ml-1">{hint}</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
  );
}
