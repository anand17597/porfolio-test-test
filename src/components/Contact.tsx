import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {Mail} from 'lucide-react';

interface ContactProps {
  setSectionRef: (element: HTMLElement | null) => void;
}

const Contact: React.FC<ContactProps> = ({ setSectionRef }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="contact"
      ref={(el) => {
        setSectionRef(el);
        (ref as React.MutableRefObject<HTMLElement | null>).current = el; // framer-motion ref
      }}
      className="py-12 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have a project in mind or just want to chat about UX? Feel free to reach out. I'm always open to new opportunities and collaborations.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="mailto:hello@uxdesigner.com"
            className="inline-flex items-center px-8 py-3 bg-primary text-white text-lg font-semibold rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1"
          >
            <Mail size={24} className="mr-3" />
            Email Me
          </a>
          <p className="text-gray-500 text-sm">
            (Please note: This is a static demo. Actual form submission is not supported.)
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;