import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProjects from '@/components/FeaturedProjects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import {ArrowUp} from 'lucide-react';
import { cn } from '@/lib/utils';

const IndexPage: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Contact", id: "contact" },
  ];

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToTop = useCallback(() => {
    scrollTo('hero');
  }, [scrollTo]);

  const setSectionRef = useCallback((id: string, element: HTMLElement | null) => {
    sectionsRef.current[id] = element;
  }, []);

  return (
    <>
      <Navbar navLinks={navLinks} scrollTo={scrollTo} />
      <main>
        <Hero setSectionRef={(el) => setSectionRef('hero', el)} scrollTo={scrollTo} />
        <FeaturedProjects setSectionRef={(el) => setSectionRef('projects', el)} />
        <Skills setSectionRef={(el) => setSectionRef('skills', el)} />
        <Contact setSectionRef={(el) => setSectionRef('contact', el)} />
      </main>
      <Footer navLinks={navLinks} scrollTo={scrollTo} />

      <button
        onClick={handleBackToTop}
        className={cn(
          "fixed bottom-6 right-6 p-3 bg-primary text-white rounded-full shadow-lg transition-all duration-300 z-40",
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        aria-label="Back to top"
      >
        <ArrowUp size={24} />
      </button>
    </>
  );
};

export default IndexPage;