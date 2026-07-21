import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './TechStackSection.css';

const TECHS = [
  { name: 'React', type: 'Frontend' }, { name: 'Next.js', type: 'Frontend' }, { name: 'Vite', type: 'Frontend' },
  { name: 'TypeScript', type: 'Language' }, { name: 'Tailwind CSS', type: 'Interface' }, { name: 'Framer Motion', type: 'Motion' },
  { name: 'Python', type: 'Backend' }, { name: 'Flask', type: 'Backend' }, { name: 'FastAPI', type: 'Backend' },
  { name: 'PostgreSQL', type: 'Data' }, { name: 'Supabase', type: 'Platform' }, { name: 'Three.js', type: '3D' },
];

function TechChip({ tech, index, inView }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 ? 12 : -8, index % 2 ? -12 : 8]);
  return <motion.div ref={ref} className="techstack__chip" style={{ y }} initial={{ opacity: 0, scale: .92 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: index * .045, duration: .45 }}><span className="techstack__chip-dot" /><span>{tech.name}</span><small>{tech.type}</small></motion.div>;
}

export default function TechStackSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: .2 });
  return (
    <section className="techstack section" ref={ref}>
      <div className="container">
        <div className="techstack__layout">
          <motion.div className="techstack__header" initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .65 }}>
            <span className="badge badge-orange">Our toolkit</span>
            <h2 className="display-md techstack__title">The tools behind the <span className="gradient-text">work</span></h2>
            <p>We choose technology around the product, the people using it, and the problem it needs to solve.</p>
          </motion.div>
          <div className="techstack__grid" aria-label="Technology stack">
            {TECHS.map((tech, index) => <TechChip key={tech.name} tech={tech} index={index} inView={inView} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
