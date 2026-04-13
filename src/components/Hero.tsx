import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface HeroProps {
  scrollTo: (id: string) => void;
  setSectionRef: (element: HTMLElement | null) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollTo, setSectionRef }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="hero"
      ref={(el) => {
        setSectionRef(el);
        (ref as React.MutableRefObject<HTMLElement | null>).current = el; // framer-motion ref
      }}
      className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-light to-gray-100 py-12 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 z-10">
        <motion.div
          className="text-center md:text-left md:w-1/2"
          initial={{ opacity: 0.96, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-tight text-dark mb-4">
            Hi, I'm Anandhan V. <br /> A <span className="text-primary">UX Designer</span>.
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
            Crafting intuitive and engaging user experiences that bridge the gap between users and technology.
          </p>
          <button
            onClick={() => scrollTo('projects')}
            className="px-8 py-3 bg-primary text-white text-lg font-semibold rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1"
          >
            View My Work
          </button>
        </motion.div>

        <motion.div
          className="md:w-1/2 mt-12 md:mt-0"
          initial={{ opacity: 0.96, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img
            src="https://images.unsplash.com/photo-1549692520-acc6669e2fde?auto=format&fit=crop&w=1600&q=90"
            alt="UX Designer working on a laptop with design mockups"
            className="w-full max-w-md mx-auto md:max-w-none rounded-lg shadow-2xl object-cover transform hover:scale-105 transition-transform duration-500"
            loading="eager"
            onError={(e) => { const el = e.currentTarget; el.onerror = null; el.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=90'; }}
          />
        </motion.div>
      </div>
      {/* Background shape */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-primary/10 to-transparent z-0 opacity-50"></div>
    </section>
  );
};

export default Hero;