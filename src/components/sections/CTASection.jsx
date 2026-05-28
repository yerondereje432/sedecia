import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './CTASection.css';

export default function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="cta-section" ref={ref}>
      {/* Animated background grid */}
      <div className="cta-section__grid-bg" aria-hidden="true" />

      {/* Orbs */}
      <div className="cta-section__orb cta-section__orb--1" aria-hidden="true" />
      <div className="cta-section__orb cta-section__orb--2" aria-hidden="true" />

      <div className="container">
        <motion.div
          className="cta-section__inner"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="badge" style={{
              background: 'rgba(244,121,32,0.15)',
              color: 'var(--orange)',
              border: '1px solid rgba(244,121,32,0.3)',
            }}>
              🚀 &nbsp; Ready to Transform?
            </span>
          </motion.div>

          <h2 className="display-lg cta-section__title">
            Let's Build Your
            <br />
            <span className="cta-section__title-accent">AI-Powered Future</span>
            <br />
            Together
          </h2>

          <p className="body-lg cta-section__sub">
            Ready to take your business to the next level with AI and smart technology?
            SEDECIA is here to help. Your journey starts with one conversation.
          </p>

          <div className="cta-section__actions">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Start Your Project
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link to="/portfolio" className="btn btn-white btn-lg">
              View Case Studies
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="cta-section__trust">
            <div className="cta-section__trust-item">
              <span className="cta-section__trust-icon">✓</span>
              Free Consultation
            </div>
            <div className="cta-section__trust-sep" />
            <div className="cta-section__trust-item">
              <span className="cta-section__trust-icon">✓</span>
              No Commitment Required
            </div>
            <div className="cta-section__trust-sep" />
            <div className="cta-section__trust-item">
              <span className="cta-section__trust-icon">✓</span>
              Response Within 24h
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
