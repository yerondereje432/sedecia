import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './HeroSection.css';

const FLOATING_TAGS = [
  { label: 'AI Automation', x: '8%',  y: '20%', delay: 0 },
  { label: 'AI Chatbots',   x: '78%', y: '15%', delay: 0.3 },
  { label: 'Web Development', x: '85%', y: '65%', delay: 0.6 },
  { label: 'Cybersecurity', x: '5%',  y: '72%', delay: 0.9 },
  { label: 'Data Analytics', x: '60%', y: '85%', delay: 1.2 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] }
  }),
};

export default function HeroSection() {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(80, Math.floor(window.innerWidth / 16));
    for (let i = 0; i < count; i++) {
      particles.push({
        x:   Math.random() * canvas.width,
        y:   Math.random() * canvas.height,
        r:   Math.random() * 2 + 0.5,
        vx:  (Math.random() - 0.5) * 0.4,
        vy:  (Math.random() - 0.5) * 0.4,
        o:   Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244,121,32,${p.o})`;
        ctx.fill();

        // Connect nearby
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(244,121,32,${0.06 * (1 - dist/100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section className="hero" aria-label="Hero">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />

      {/* Background decorations */}
      <div className="hero__bg-orb hero__bg-orb--1" aria-hidden="true" />
      <div className="hero__bg-orb hero__bg-orb--2" aria-hidden="true" />
      <div className="hero__bg-grid" aria-hidden="true" />

      {/* Floating Tech Tags */}
      {FLOATING_TAGS.map((tag, i) => (
        <motion.div
          key={tag.label}
          className="hero__tag"
          style={{ left: tag.x, top: tag.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + tag.delay, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ delay: tag.delay, duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
            className="hero__tag-inner"
          >
            <span className="hero__tag-dot" />
            {tag.label}
          </motion.div>
        </motion.div>
      ))}

      <div className="container hero__container">
        {/* Badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <div className="badge badge-orange hero__badge">
            <span className="hero__badge-pulse" />
            {t('hero.badge')}
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1 className="hero__headline display-xl" variants={fadeUp} initial="hidden" animate="visible" custom={1}>
          <span className="gradient-text">{t('hero.headline1')}</span>
          <br />
          <span className="text-navy">{t('hero.headline2')}</span>
          <br />
          <span className="text-navy">{t('hero.headline3')}</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p className="hero__sub body-lg" variants={fadeUp} initial="hidden" animate="visible" custom={2}>
          {t('hero.subtext')}
        </motion.p>

        {/* CTAs */}
        <motion.div className="hero__ctas" variants={fadeUp} initial="hidden" animate="visible" custom={3}>
          <Link to="/services" className="btn btn-primary btn-lg">
            {t('hero.cta1')}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link to="/portfolio" className="btn btn-outline btn-lg">
            <span className="hero__play-icon" aria-hidden="true">▶</span>
            {t('hero.cta2')}
          </Link>
        </motion.div>

        {/* Trust badges removed */}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        aria-hidden="true"
      >
        <motion.div
          className="hero__scroll-dot"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
