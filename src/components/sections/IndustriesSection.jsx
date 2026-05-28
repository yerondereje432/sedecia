import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './IndustriesSection.css';

const INDUSTRIES = [
  { icon: '🏦', title: 'Banking & Finance',   desc: 'AI-powered fraud detection, smart banking, and fintech solutions.' },
  { icon: '🏥', title: 'Healthcare',           desc: 'Digital health platforms, AI diagnostics, and hospital management.' },
  { icon: '🎓', title: 'Education',            desc: 'Smart learning systems, e-learning platforms, and EdTech tools.' },
  { icon: '🏭', title: 'Manufacturing',        desc: 'Industrial automation, predictive maintenance, and supply chain AI.' },
  { icon: '🛒', title: 'Retail & eCommerce',   desc: 'Personalization engines, inventory AI, and customer analytics.' },
  { icon: '🏛️', title: 'Government',           desc: 'Smart city infrastructure, digital governance, and citizen services.' },
  { icon: '🚚', title: 'Logistics',            desc: 'Route optimization, fleet management, and real-time tracking AI.' },
  { icon: '🌱', title: 'Agriculture',          desc: 'Precision farming, crop prediction, and agri-tech automation.' },
];

export default function IndustriesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="industries section" ref={ref}>
      <div className="container">
        <motion.div
          className="industries__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="badge badge-navy">Industries We Serve</span>
          <h2 className="display-lg industries__title">
            Built for <span className="gradient-text">Every Sector</span>
          </h2>
          <p className="body-lg">
            Our AI solutions are tailored to the unique demands of diverse industries worldwide.
          </p>
        </motion.div>

        <div className="industries__grid">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.title}
              className="industries__card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <span className="industries__icon">{ind.icon}</span>
              <h3 className="industries__card-title">{ind.title}</h3>
              <p className="industries__card-desc">{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
