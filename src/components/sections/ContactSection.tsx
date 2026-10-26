import { WA_LINKS } from '../../context/CartContext';
import contactBg from '../../../assets/designs/contact-section.png';

export default function ContactSection() {
  return (
    <section id="contact" className="py-12 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{ minHeight: '280px' }}
        >
          {/* Background image */}
          <img
            src={contactBg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#3B1A0E]/80" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center py-16 px-6 gap-4">
            <p className="text-[#F5A623] text-xs font-semibold uppercase tracking-widest">
              Contact
            </p>
            <h2 className="font-serif text-white font-bold text-3xl sm:text-4xl">
              Let's bake something lovely
            </h2>
            <p className="text-white/70 text-sm max-w-md">
              Message us with your date, size and design ideas. We will reply with availability and
              delivery options.
            </p>
            <a
              href={WA_LINKS.contact}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 bg-[#F5A623] text-[#3B1A0E] font-bold px-7 py-3 rounded-full hover:bg-amber-400 transition-colors text-sm"
            >
              <i className="ri-whatsapp-line text-base" />
              Chat With Us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
