import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import './ServicesSection.css';

const SERVICES = [
  { number: '01', icon: '↗', title: 'Web Development', desc: 'Fast, reliable websites and web platforms built around the way your organization works.' },
  { number: '02', icon: '✦', title: 'Web Design', desc: 'Clear, distinctive digital experiences that make your organization easier to understand and trust.' },
  { number: '03', icon: '⌘', title: 'Custom Software', desc: 'Practical software for specific workflows—built from the real problem rather than from a template.' },
  { number: '04', icon: '◈', title: 'UI/UX Design', desc: 'Thoughtful interfaces that help people complete important tasks with less friction.' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 45, rotateX: 8 },
  visible: (index = 0) => ({ opacity: 1, y: 0, rotateX: 0, transition: { delay: index * .1, duration: .7, ease: [.16, 1, .3, 1] } }),
};

export default function ServicesSection() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: .12 });

  return (
    <section className="services-section section" ref={ref}>
      <div className="container">
        <div className="services-section__layout">
          <motion.div className="services-section__header" initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: .7 }}>
            <span className="badge badge-orange">{t('services.badge')}</span>
            <h2 className="display-lg services-section__title">What we <span className="gradient-text">build</span></h2>
            <p className="body-lg services-section__sub">{t('services.subtitle')}</p>
            <Link to="/services" className="services-section__all-link">Explore our services <span>↗</span></Link>
          </motion.div>

          <motion.div className="services-section__grid" initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            {SERVICES.map((service, index) => (
              <motion.article key={service.title} className="service-card" custom={index} variants={cardVariants} whileHover={{ y: -8, rotateY: index % 2 ? -2 : 2 }}>
                <div className="service-card__top"><span>{service.number}</span><span className="service-card__icon">{service.icon}</span></div>
                <div className="service-card__body">
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
                <Link to="/contact" className="service-card__link" aria-label={`Discuss ${service.title}`}>Discuss this work <span>↗</span></Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
