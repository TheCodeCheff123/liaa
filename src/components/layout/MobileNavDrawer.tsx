import { useEffect } from 'react';
import { SOCIAL_LINKS, WA_LINKS } from '../../context/CartContext';

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Menu', href: '#menu' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <nav
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-[#3B1A0E] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="text-white font-bold text-lg font-serif">liaa</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="text-white hover:text-[#F5A623] transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl" />
          </button>
        </div>

        {/* Links */}
        <ul className="flex flex-col py-6 px-6 gap-1 flex-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={onClose}
                className="block text-white/80 hover:text-[#F5A623] font-medium text-base py-3 border-b border-white/10 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Footer socials */}
        <div className="px-6 py-6 flex items-center gap-4">
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="ri-instagram-line text-xl text-white/60 hover:text-[#F5A623] transition-colors" />
          </a>
          <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <i className="ri-tiktok-line text-xl text-white/60 hover:text-[#F5A623] transition-colors" />
          </a>
          <a href={WA_LINKS.footer} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <i className="ri-whatsapp-line text-xl text-white/60 hover:text-[#F5A623] transition-colors" />
          </a>
        </div>
      </nav>
    </>
  );
}
