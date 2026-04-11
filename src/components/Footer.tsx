import React from 'react';
import { cn } from '@/lib/utils';

interface NavLink {
  label: string;
  id: string;
}

interface FooterProps {
  navLinks: NavLink[];
  scrollTo: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ navLinks, scrollTo }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-gray-300 py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo and Tagline */}
        <div>
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="text-3xl font-bold text-primary block mb-2">
            UX.
          </a>
          <p className="text-gray-400 text-sm">
            Crafting experiences, one pixel at a time.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="text-gray-400 hover:text-primary transition-colors duration-200 text-base"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <p className="text-gray-400 mb-2">
            Email: <a href="mailto:hello@uxdesigner.com" className="hover:text-primary transition-colors duration-200">hello@uxdesigner.com</a>
          </p>
          <p className="text-gray-400 text-sm">
            Based in New York, NY
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-sm">
        &copy; {currentYear} UX Designer Portfolio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;