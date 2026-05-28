import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import './ServicesSection.css';

const SERVICES = [
  { key: 'ai',         icon: '🤖', color: '#F47920', title: 'AI Automation',         desc: 'Intelligent automation that learns, adapts, and scales with your operations.' },
  { key: 'chatbot',    icon: '💬', color: '#1B2A4A', title: 'AI Chatbots',           desc: 'Conversational AI that engages customers 24/7 with human-like precision.' },
  { key: 'software',   icon: '⚙️', color: '#F47920', title: 'Custom Software',       desc: 'Bespoke software engineered to solve your unique business challenges.' },
  { key: 'web',        icon: '🌐', color: '#1B2A4A', title: 'Web Development',       desc: 'Premium, high-performance web platforms for the modern digital era.' },
  { key: 'mobile',     icon: '📱', color: '#F47920', title: 'Mobile App Development', desc: 'Native and cross-platform mobile experiences that users love.' },
  { key: 'cyber',      icon: '🔐', color: '#1B2A4A', title: 'Cybersecurity',         desc: 'Enterprise-grade protection that shields your digital assets 24/7.' },
  { key: 'data',       icon: '📊', color: '#F47920', title: 'Data Analytics',        desc: 'Transform raw data into strategic insights for smarter decisions.' },
  { key: 'enterprise', icon: '🏢', color: '#1B2A4A', title: 'Enterprise AI',         desc: 'Full-scale AI integration for large organizations and complex workflows.' },
  { key: 'consulting', icon: '🎯', color: '#F47920', title: 'IT Consulting',         desc: 'Strategic technology advisory to align your IT roadmap with business goals.' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
};

export default function ServicesSection() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hovered, setHovered] = useState(null);

  return (
    <section className="services-section section" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="services-section__header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">
            <span className="badge badge-orange">{t('services.badge')}</span>
          </div>
          <h2 className="display-lg services-section__title">
            {t('services.title').split(' ').map((word, i) =>
              i === 2 ? <span key={i} className="gradient-text"> {word}</span> : ` ${word}`
            )}
          </h2>
          <p className="body-lg services-section__sub">{t('services.subtitle')}</p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="services-section__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.key}
              variants={cardVariants}
              className={`service-card ${hovered === i ? 'service-card--hovered' : ''}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="service-card__icon-wrap">
                <span className="service-card__icon">{service.icon}</span>
                <div className="service-card__icon-glow" />
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.desc}</p>
              <Link to="/services" className="service-card__link">
                Learn more
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>
              <div className="service-card__number">0{i + 1}</div>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div variants={cardVariants} className="service-card service-card--cta">
            <div className="service-card__cta-content">
              <div className="service-card__cta-icon">✨</div>
              <h3>Need a Custom Solution?</h3>
              <p>Tell us about your unique challenge and we'll engineer the perfect solution.</p>
              <Link to="/contact" className="btn btn-primary">Start a Project</Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
