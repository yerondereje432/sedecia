import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './IndustriesSection.css';

const AUDIENCES = [
  { icon: '🎓', title: 'Schools', desc: 'Clear websites and Learning Management Systems for school communities.' },
 { icon: '🏛️', title: 'Universities', desc: 'Custom AI platforms that replace manual admin processes with fast, organized digital systems.' }
  { icon: '🏨', title: 'Hotels', desc: 'Thoughtful digital experiences for hospitality brands and their guests.' },
  { icon: '🧭', title: 'Tour Guides', desc: 'Web experiences that make local knowledge, trips, and services easier to discover.' },
  { icon: '🏋️', title: 'Gyms', desc: 'Useful digital touchpoints for memberships, programs, schedules, and communities.' },
];

export default function IndustriesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section className="industries section" ref={ref}>
      <div className="container">
        <motion.div className="industries__header" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .6 }}>
          <span className="badge badge-navy">Who we build for</span>
          <h2 className="display-lg industries__title">Built for <span className="gradient-text">real organizations</span></h2>
          <p className="body-lg">We work best with teams that need a clear digital presence, a better interface, or software shaped around the way they work.</p>
        </motion.div>
        <div className="industries__grid">
          {AUDIENCES.map((item, index) => (
            <motion.div key={item.title} className="industries__card" initial={{ opacity: 0, y: 26, scale: .96 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ delay: index * .09, duration: .55, ease: [.16, 1, .3, 1] }}>
              <span className="industries__icon">{item.icon}</span>
              <h3 className="industries__card-title">{item.title}</h3>
              <p className="industries__card-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
