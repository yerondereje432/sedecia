import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './CTASection.css';

export default function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: .2 });
  const line = (delay) => ({ initial: { opacity: 0, y: 30, rotateX: -35 }, animate: inView ? { opacity: 1, y: 0, rotateX: 0 } : {}, transition: { delay, duration: .7, ease: [.16, 1, .3, 1] } });

  return (
    <section className="cta-section" ref={ref}>
      <div className="cta-section__grid-bg" aria-hidden="true" />
      <div className="cta-section__orb cta-section__orb--1" aria-hidden="true" />
      <div className="cta-section__orb cta-section__orb--2" aria-hidden="true" />
      <div className="container">
        <motion.div className="cta-section__inner" initial={{ opacity: 0, y: 35 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .8, ease: [.16, 1, .3, 1] }}>
          <span className="cta-section__eyebrow"><i /> Let&apos;s work together</span>
          <h2 className="display-lg cta-section__title">
            <motion.span className="cta-section__reveal-line" {...line(.18)}>Have a project</motion.span><br />
            <motion.span className="cta-section__reveal-line cta-section__title-accent" {...line(.32)}>worth building?</motion.span>
          </h2>
          <motion.p className="body-lg cta-section__sub" {...line(.48)}>
            Tell me what you are trying to make, improve, or clarify. We&apos;ll help you find the right digital shape for it.
          </motion.p>
          <motion.div className="cta-section__actions" {...line(.58)}>
            <Link to="/contact" className="btn btn-primary btn-lg">Start a conversation <span>↗</span></Link>
            <Link to="/portfolio" className="btn btn-white btn-lg">See our work</Link>
          </motion.div>
          <div className="cta-section__trust">
            <span>Websites</span><b /> <span>Custom software</span><b /> <span>UI/UX design</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
