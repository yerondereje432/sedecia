import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import './StatsSection.css';

const STATS = [
  { value: 3, suffix: '', label: 'Selected projects', note: 'Websites, learning products, and school software' },
  { value: 4, suffix: '', label: 'Focused capabilities', note: 'Web, design, software, and UI/UX' },
  { value: 5, suffix: '', label: 'Organization types', note: 'Schools, universities, hotels, guides, and gyms' },
];

function StatCard({ stat, index, inView }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 ? 20 : -12, index % 2 ? -20 : 12]);
  return (
    <motion.article ref={ref} className="stats__card" style={{ y }} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: index * .15, duration: .6 }}>
      <div className="stats__card-number">
        {inView && <CountUp start={0} end={stat.value} duration={1.8} delay={index * .12} />}
        <span className="stats__suffix">{stat.suffix}</span>
      </div>
      <div className="stats__card-copy">
        <h3>{stat.label}</h3>
        <p>{stat.note}</p>
      </div>
      <div className="stats__bar"><motion.div className="stats__bar-fill" initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ delay: .45 + index * .12, duration: 1 }} /></div>
    </motion.article>
  );
}

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: .25 });
  return (
    <section className="stats section" ref={ref}>
      <div className="container">
        <div className="stats__intro">
          <span className="badge badge-orange">A focused studio</span>
          <p>Small enough to care about the details. Focused enough to build the right thing.</p>
        </div>
        <div className="stats__grid">
          {STATS.map((stat, index) => <StatCard key={stat.label} stat={stat} index={index} inView={inView} />)}
        </div>
      </div>
    </section>
  );
}
