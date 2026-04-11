import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {LayoutDashboard,PenTool,Braces,FlaskConical,Users,Puzzle} from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ElementType;
}

const skills: Skill[] = [
  { name: 'User Research', icon: Users },
  { name: 'Wireframing', icon: PenTool },
  { name: 'Prototyping', icon: LayoutDashboard },
  { name: 'UI Design', icon: Puzzle },
  { name: 'Usability Testing', icon: FlaskConical },
  { name: 'Interaction Design', icon: Braces },
];

interface SkillsProps {
  setSectionRef: (element: HTMLElement | null) => void;
}

const Skills: React.FC<SkillsProps> = ({ setSectionRef }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="skills"
      ref={(el) => {
        setSectionRef(el);
        (ref as React.MutableRefObject<HTMLElement | null>).current = el; // framer-motion ref
      }}
      className="py-12 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Leveraging a diverse skillset to create impactful and intuitive digital experiences.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center group hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
            >
              <skill.icon size={48} className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold text-dark">{skill.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;