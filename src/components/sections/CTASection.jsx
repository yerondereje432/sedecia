import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './CTASection.css';

function CTAObject() {
  const [active, setActive] = React.useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [10, -10]), { stiffness: 150, damping: 24 });
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-12, 12]), { stiffness: 150, damping: 24 });
  const handleMove = (event) => { const rect = event.currentTarget.getBoundingClientRect(); pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1); pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1); setActive(true); };
  const reset = () => { pointerX.set(0); pointerY.set(0); setActive(false); };
  return <div className={`cta-section__object-stage ${active ? 'is-active' : ''}`} onMouseMove={handleMove} onMouseLeave={reset} aria-hidden="true"><div className="cta-section__object-grid" /><motion.div className="cta-section__object" style={{ rotateX, rotateY }}><div className="cta-section__object-window"><span>SEDECIA / PROJECT</span><strong>Let&apos;s build<br /><em>something useful.</em></strong><i /><small>WEB · SOFTWARE · DESIGN</small></div><div className="cta-section__object-plane cta-section__object-plane--one" /><div className="cta-section__object-plane cta-section__object-plane--two" /></motion.div><div className="cta-section__object-cursor">↗</div></div>;
}

export default function CTASection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: .2 });
  const reveal = (delay) => ({ initial: { opacity: 0, y: 30, rotateX: -35 }, animate: inView ? { opacity: 1, y: 0, rotateX: 0 } : {}, transition: { delay, duration: .7, ease: [.16, 1, .3, 1] } });
  return <section className="cta-section" ref={ref}><div className="cta-section__grid-bg" aria-hidden="true" /><div className="cta-section__orb cta-section__orb--1" aria-hidden="true" /><div className="cta-section__orb cta-section__orb--2" aria-hidden="true" /><div className="container"><div className="cta-section__layout"><motion.div className="cta-section__copy" initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: .8 }}><span className="cta-section__eyebrow"><i /> The next build</span><h2 className="display-lg cta-section__title"><motion.span className="cta-section__reveal-line" {...reveal(.18)}>Have a project</motion.span><br /><motion.span className="cta-section__reveal-line cta-section__title-accent" {...reveal(.32)}>worth building?</motion.span></h2><motion.p className="body-lg cta-section__sub" {...reveal(.46)}>Bring us the idea, the problem, or the first rough version. We&apos;ll help you turn it into a clear digital experience.</motion.p><motion.div className="cta-section__actions" {...reveal(.58)}><Link to="/contact" className="btn btn-primary btn-lg">Start a project <span>↗</span></Link><Link to="/portfolio" className="cta-section__text-link">See selected work <span>↗</span></Link></motion.div></motion.div><motion.div className="cta-section__visual" initial={{ opacity: 0, x: 35, scale: .9 }} animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}} transition={{ delay: .18, duration: .9 }}><CTAObject /></motion.div></div><div className="cta-section__bottom"><span>Web development</span><b /><span>Web design</span><b /><span>Custom software</span><b /><span>UI/UX</span></div></div></section>;
}
