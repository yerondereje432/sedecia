import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CTASection from '@components/sections/CTASection';
import './Industries.css';

const AUDIENCES = [
  { number: '01', title: 'Schools', desc: 'Websites, content platforms, and practical digital tools for school communities.' },
  { number: '02', title: 'Universities', desc: 'Clear institutional experiences that help people find information and take action.' },
  { number: '03', title: 'Hotels', desc: 'Digital touchpoints that present hospitality brands clearly and help guests plan with confidence.' },
  { number: '04', title: 'Tour Guides', desc: 'Web experiences that make local knowledge, trips, and services easier to discover.' },
  { number: '05', title: 'Gyms', desc: 'Useful digital tools for memberships, programs, schedules, and communities.' },
];

function Audience({ item, index, active }) {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [index % 2 ? 22 : -16, index % 2 ? -22 : 16]), { stiffness: 120, damping: 24 });
  return <motion.article ref={ref} className="industries-page__row" style={{ x }} initial={{ opacity: 0, y: 25 }} animate={active ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * .1, duration: .6 }}><span className="industries-page__number">{item.number}</span><div className="industries-page__marker" /><div><h2>{item.title}</h2><p>{item.desc}</p></div><span className="industries-page__arrow">↗</span></motion.article>;
}

export default function Industries() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: .12 });
  return <><Helmet><title>Who We Build For — SEDECIA Technologies</title><meta name="description" content="SEDECIA builds websites, interfaces, and custom software for schools, universities, hotels, tour guides, and gyms." /><meta property="og:title" content="Who We Build For — SEDECIA Technologies" /><meta property="og:description" content="Focused digital work for organizations with real people and real things to communicate." /><link rel="canonical" href="https://sedecia.com/industries" /></Helmet>
    <main className="industries-page">
      <section className="industries-page__hero section"><div className="industries-page__glow" /><div className="container"><motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}><span className="badge badge-orange">Who we build for</span><h1 className="display-xl industries-page__title">Different contexts.<br /><span className="gradient-text">Same care.</span></h1><p className="industries-page__intro">SEDECIA works with organizations that need to communicate clearly, serve their people better, or replace a manual process with something more useful.</p></motion.div></div></section>
      <section className="industries-page__list section" ref={ref}><div className="container"><div className="industries-page__list-layout"><div className="industries-page__list-note"><span>01 / Focus</span><p>We do not try to build for every industry. We focus on the places where thoughtful digital work can make a real difference.</p></div><div className="industries-page__rows">{AUDIENCES.map((item, index) => <Audience key={item.title} item={item} index={index} active={inView} />)}</div></div></div></section>
    </main><CTASection /></>;
}
