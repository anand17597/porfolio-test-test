import { lazy } from "react";
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {ArrowRight} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Redesign',
    description: 'A complete overhaul of a fashion e-commerce platform, focusing on user flow optimization and visual appeal.',
    image: 'https://images.unsplash.com/photo-1496171368155-e7bb529b5317?auto=format&fit=crop&w=1600&q=90',
    link: '#',
  },
  {
    id: 'project-2',
    title: 'Mobile Banking App',
    description: 'Designing a secure and intuitive mobile banking application for a financial institution, enhancing user trust.',
    image: 'https://images.unsplash.com/photo-1579762715118-a6f17dc97f79?auto=format&fit=crop&w=1600&q=90',
    link: '#',
  },
  {
    id: 'project-3',
    title: 'Healthcare Dashboard',
    description: 'Developing a user-friendly dashboard for healthcare professionals to manage patient data and appointments efficiently.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4cd085?auto=format&fit=crop&w=1600&q=90',
    link: '#',
  },
  {
    id: 'project-4',
    title: 'SaaS Platform UX',
    description: 'Improving the user experience of a B2B SaaS platform, focusing on onboarding and complex feature accessibility.',
    image: 'https://images.unsplash.com/photo-1557804506-669a04a50d6a?auto=format&fit=crop&w=1600&q=90',
    link: '#',
  },
];

interface FeaturedProjectsProps {
  setSectionRef: (element: HTMLElement | null) => void;
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ setSectionRef }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="projects"
      ref={(el) => {
        setSectionRef(el);
        (ref as React.MutableRefObject<HTMLElement | null>).current = el; // framer-motion ref
      }}
      className="py-12 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-white"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A selection of my recent work showcasing a blend of user-centered design and intuitive interfaces.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-gray-50 rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
              variants={itemVariants}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError="this.onerror=null;this.src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=90';"
              />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-dark mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors duration-200"
                  onClick={(e) => e.preventDefault()} // Prevent actual navigation for demo
                >
                  View Case Study <ArrowRight size={18} className="ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;