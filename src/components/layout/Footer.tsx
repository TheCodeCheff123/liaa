import { SOCIAL_LINKS, WA_LINKS } from '../../context/CartContext';
import logoWhite from '../../../assets/designs/Logo white.png';

export default function Footer() {
  return (
    <footer className="bg-[#3B1A0E] text-white/60 py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main footer row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/10">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <img src={logoWhite} alt="Liaa Bakes" className="h-10 w-auto max-w-[120px] object-contain object-left" />
            <p className="text-xs uppercase tracking-widest text-white/40">
              Luxury • Homemade • Freshly Baked
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm">
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 hover:text-[#F5A623] transition-colors">
              <i className="ri-instagram-fill text-base" />
              Instagram: @liaacrea
            </a>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 hover:text-[#F5A623] transition-colors">
              <i className="ri-tiktok-line text-base" />
              TikTok: @liaa_events
            </a>
            <a href={WA_LINKS.footer} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 hover:text-[#F5A623] transition-colors">
              <i className="ri-whatsapp-line text-base" />
              WhatsApp: 09137164903
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs text-white/40">
          <span>
            © 2026 Liaa. All rights reserved. Designed by{' '}
            <a
              href="https://linktr.ee/macedonlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 underline underline-offset-2 hover:text-[#F5A623] transition-colors"
            >
              MacedonLabs
            </a>
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
