import React, { useState, useEffect, useCallback, useRef } from 'react';
import {Menu,X} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLink {
  label: string;
  id: string;
}

interface NavbarProps {
  navLinks: NavLink[];
  scrollTo: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ navLinks, scrollTo }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Check if section is significantly in view to be considered active
            const rect = entry.target.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const inViewPercentage = (Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)) / viewportHeight;
            
            if (inViewPercentage > 0.4) { // Consider active if more than 40% of section is in view
              setActiveSection(entry.target.id);
            }
          }
        });
      },
      { threshold: [0.1, 0.5, 0.9], rootMargin: '-10% 0px -10% 0px' } // Observe multiple thresholds
    );

    navLinks.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, [navLinks]);


  const handleNavLinkClick = useCallback((id: string) => {
    scrollTo(id);
    setIsMenuOpen(false);
  }, [scrollTo]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 shadow-lg backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleNavLinkClick('hero'); }} className="text-2xl font-bold text-primary">
            UX.
          </a>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavLinkClick(link.id)}
              className={cn(
                "text-base font-medium transition-colors duration-200",
                activeSection === link.id ? "text-primary border-b-2 border-primary" : "text-gray-600 hover:text-primary"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            aria-expanded={isMenuOpen ? "true" : "false"}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "md:hidden absolute top-16 left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavLinkClick(link.id)}
              className={cn(
                "block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                activeSection === link.id ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-50 hover:text-primary"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;