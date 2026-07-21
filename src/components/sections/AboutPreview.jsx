import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import './AboutPreview.css';

const VALUES = [
  { mark: '01', title: 'Clarity', desc: 'We make digital products easier to understand and use.' },
  { mark: '02', title: 'Craft', desc: 'We care about the details people feel in every interaction.' },
  { mark: '03', title: 'Partnership', desc: 'We work closely with the people who know the problem best.' },
  { mark: '04', title: 'Practicality', desc: 'We build useful solutions that fit the organization behind them.' },
];

function AboutObject() {
  const ref = React.useRef(null);
  const [active, setActive] = React.useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [9, -9]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-12, 12]), { stiffness: 180, damping: 22 });
  const moveX = useSpring(useTransform(pointerX, [-1, 1], [-12, 12]), { stiffness: 160, damping: 25 });
  const moveY = useSpring(useTransform(pointerY, [-1, 1], [-10, 10]), { stiffness: 160, damping: 25 });
  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
    setActive(true);
  };
  const handleLeave = () => { pointerX.set(0); pointerY.set(0); setActive(false); };
  return (
    <div className={`about-preview__stage ${active ? 'is-active' : ''}`} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <motion.div ref={ref} className="about-preview__object" style={{ rotate: scrollRotate, y: scrollY, rotateX, rotateY, x: moveX }}>
        <div className="about-preview__object-aura" />
        <motion.div className="about-preview__object-core" animate={{ y: [0, -10, 0], rotateZ: [-4, 3, -4] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}><span>SD</span></motion.div>
        <motion.div className="about-preview__object-plane about-preview__object-plane--one" animate={{ rotateZ: [-12, -8, -12] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="about-preview__object-plane about-preview__object-plane--two" animate={{ rotateZ: [24, 30, 24] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="about-preview__object-line about-preview__object-line--one" />
        <div className="about-preview__object-line about-preview__object-line--two" />
        <div className="about-preview__object-tag about-preview__object-tag--one"><span>03</span> selected projects</div>
        <div className="about-preview__object-tag about-preview__object-tag--two"><span>ET</span> built in Ethiopia</div>
      </motion.div>
    </div>
  );
}

export default function AboutPreview() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: .15 });
  return (
    <section className="about-preview section" ref={ref}>
      <div className="container">
        <div className="about-preview__layout">
          <motion.div className="about-preview__visual" initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: .8, ease: [.16, 1, .3, 1] }}>
            <AboutObject />
          </motion.div>
          <motion.div className="about-preview__content" initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: .8, delay: .15, ease: [.16, 1, .3, 1] }}>
            <span className="badge badge-orange">{t('about.badge')}</span>
            <h2 className="display-lg about-preview__title">{t('about.title').split(' ').slice(0, 2).join(' ')} <span className="gradient-text">{t('about.title').split(' ').slice(2).join(' ')}</span></h2>
            <p className="body-lg about-preview__body">{t('about.body')}</p>
            <div className="about-preview__values">
              {VALUES.map((value, index) => <motion.div key={value.title} className="about-preview__value" initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: .4 + index * .1, duration: .5 }}><span className="about-preview__value-mark">{value.mark}</span><div><div className="about-preview__value-title">{value.title}</div><div className="about-preview__value-desc">{value.desc}</div></div></motion.div>)}
            </div>
            <Link to="/about" className="btn btn-primary" style={{ marginTop: '2rem' }}>Our Full Story <span>↗</span></Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
