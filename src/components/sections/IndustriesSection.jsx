import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './IndustriesSection.css';

const AUDIENCES = [
  { number: '01', title: 'Schools', desc: 'Clear websites and practical digital tools for school communities.' },
  { number: '02', title: 'Universities', desc: 'Organized platforms that help institutions communicate and serve people better.' },
  { number: '03', title: 'Hotels', desc: 'Thoughtful digital experiences for hospitality brands and their guests.' },
  { number: '04', title: 'Tour Guides', desc: 'Web experiences that make local knowledge, trips, and services easier to discover.' },
  { number: '05', title: 'Gyms', desc: 'Useful digital touchpoints for memberships, programs, schedules, and communities.' },
];

function AudienceRow({ item, index, inView }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 ? 8 : -6, index % 2 ? -8 : 6]);
  return (
    <motion.article ref={ref} className="industries__row" style={{ x }} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * .1, duration: .6, ease: [.16, 1, .3, 1] }}>
      <span className="industries__number">{item.number}</span>
      <span className="industries__marker" aria-hidden="true" />
      <div className="industries__row-copy"><h3>{item.title}</h3><p>{item.desc}</p></div>
      <span className="industries__arrow">↗</span>
    </motion.article>
  );
}

export default function IndustriesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: .12 });
  return (
    <section className="industries section" ref={ref}>
      <div className="container">
        <div className="industries__layout">
          <motion.div className="industries__header" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .7 }}>
            <span className="badge badge-navy">Who we build for</span>
            <h2 className="display-lg industries__title">Built for <span className="gradient-text">real organizations</span></h2>
            <p className="body-lg">We work best with teams that need a clear digital presence, a better interface, or software shaped around the way they work.</p>
            <div className="industries__aside-note">Different contexts.<br /><span>Same care for the details.</span></div>
          </motion.div>
          <div className="industries__list">{AUDIENCES.map((item, index) => <AudienceRow key={item.title} item={item} index={index} inView={inView} />)}</div>
        </div>
      </div>
    </section>
  );
}
