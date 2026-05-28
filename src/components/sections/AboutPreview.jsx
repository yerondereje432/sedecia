import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import './AboutPreview.css';

const VALUES = [
  { icon: '⚡', title: 'Innovation First', desc: 'We push boundaries with cutting-edge AI and technology.' },
  { icon: '🤝', title: 'Client-Centric', desc: 'Every solution is crafted around your unique goals.' },
  { icon: '🔐', title: 'Integrity', desc: 'Transparent, ethical technology you can trust.' },
  { icon: '🌍', title: 'Global Impact', desc: 'Technology that creates real-world change at scale.' },
];

export default function AboutPreview() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="about-preview section" ref={ref}>
      <div className="container">
        <div className="about-preview__layout">
          {/* Left Visual */}
          <motion.div
            className="about-preview__visual"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="about-preview__img-wrap">
              {/* Abstract AI visual */}
              <div className="about-preview__orb-main" />
              <div className="about-preview__rings">
                <div className="about-preview__ring" style={{ animationDelay: '0s' }} />
                <div className="about-preview__ring" style={{ animationDelay: '-1.5s' }} />
                <div className="about-preview__ring" style={{ animationDelay: '-3s' }} />
              </div>
              <div className="about-preview__center-icon">🧠</div>
              {/* Floating stats */}
              <motion.div className="about-preview__float about-preview__float--1"
                animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                <span className="about-preview__float-icon">🚀</span>
                <div><div className="about-preview__float-num">20+</div><div className="about-preview__float-lbl">Solutions</div></div>
              </motion.div>
              <motion.div className="about-preview__float about-preview__float--2"
                animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                <span className="about-preview__float-icon">🇪🇹</span>
                <div><div className="about-preview__float-num">Ethiopia</div><div className="about-preview__float-lbl">Based In</div></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            className="about-preview__content"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="section-label">
              <span className="badge badge-orange">{t('about.badge')}</span>
            </div>
            <h2 className="display-lg about-preview__title">
              {t('about.title').split(' ').slice(0, 2).join(' ')}{' '}
              <span className="gradient-text">{t('about.title').split(' ').slice(2).join(' ')}</span>
            </h2>
            <p className="body-lg" style={{ marginBottom: '2rem' }}>{t('about.body')}</p>

            {/* Values */}
            <div className="about-preview__values">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  className="about-preview__value"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <span className="about-preview__value-icon">{v.icon}</span>
                  <div>
                    <div className="about-preview__value-title">{v.title}</div>
                    <div className="about-preview__value-desc">{v.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to="/about" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Our Full Story
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
