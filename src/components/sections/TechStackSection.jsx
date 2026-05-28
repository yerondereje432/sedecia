import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './TechStackSection.css';

const TECHS = [
  { name: 'React', emoji: '⚛️' },    { name: 'Python', emoji: '🐍' },
  { name: 'TensorFlow', emoji: '🧠' }, { name: 'AWS', emoji: '☁️' },
  { name: 'Node.js', emoji: '🟢' },   { name: 'Docker', emoji: '🐳' },
  { name: 'Kubernetes', emoji: '⚙️' },{ name: 'OpenAI', emoji: '🤖' },
  { name: 'PostgreSQL', emoji: '🗄️' },{ name: 'MongoDB', emoji: '🍃' },
  { name: 'Firebase', emoji: '🔥' },  { name: 'Next.js', emoji: '▲' },
  { name: 'Swift', emoji: '🍎' },     { name: 'Flutter', emoji: '💙' },
  { name: 'GCP', emoji: '🌐' },       { name: 'Azure', emoji: '💠' },
];

export default function TechStackSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <section className="techstack section" ref={ref}>
      <div className="container">
        <motion.div className="techstack__header" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="badge badge-orange">Technology Stack</span>
          <h2 className="display-md techstack__title">Built with <span className="gradient-text">Best-in-Class</span> Tools</h2>
        </motion.div>
        <div className="techstack__track-wrap" aria-label="Technology stack">
          <div className="techstack__track">
            {[...TECHS, ...TECHS].map((tech, i) => (
              <div key={i} className="techstack__chip">
                <span>{tech.emoji}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
