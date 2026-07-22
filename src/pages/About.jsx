import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import CTASection from '@components/sections/CTASection';
import './About.css';

const MILESTONES = [
  { year: '2025', title: 'Founded', desc: 'SEDECIA was established in Ethiopia with a mission to bring thoughtful digital solutions to organizations of different sizes.' },
  { year: '2025', title: 'First builds', desc: 'The first projects focused on practical websites, education platforms, and software shaped around real workflows.' },
  { year: '2026', title: 'A focused direction', desc: 'SEDECIA is building a clear studio practice around web development, web design, custom software, and UI/UX.' },
];

const VALUES = [
  { number: '01', title: 'Clarity', desc: 'We make complex ideas easier to understand, navigate, and act on.' },
  { number: '02', title: 'Craft', desc: 'We care about the details that turn a working interface into a memorable one.' },
  { number: '03', title: 'Partnership', desc: 'We listen closely and build with the people who understand the problem best.' },
  { number: '04', title: 'Practicality', desc: 'We choose the right level of technology for the people and organization using it.' },
  { number: '05', title: 'Integrity', desc: 'We communicate honestly about what we can build, what we know, and what still needs work.' },
  { number: '06', title: 'Progress', desc: 'We believe a good digital product is made through thoughtful iteration, not empty promises.' },
];

function StoryObject() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  return <motion.div ref={ref} className="about-page__story-object" style={{ rotate, y }}><div className="about-page__story-core">SD</div><div className="about-page__story-frame about-page__story-frame--one" /><div className="about-page__story-frame about-page__story-frame--two" /><span className="about-page__story-label about-page__story-label--one">Founded / 2025</span><span className="about-page__story-label about-page__story-label--two">Harar, Ethiopia</span></motion.div>;
}

export default function About() {
  const [heroRef, heroIn] = useInView({ triggerOnce: true, threshold: .1 });
  const [valuesRef, valuesIn] = useInView({ triggerOnce: true, threshold: .12 });
  const [timelineRef, timelineIn] = useInView({ triggerOnce: true, threshold: .12 });
  return (
    <>
      <Helmet>
        <title>About SEDECIA — A Focused Digital Studio in Ethiopia</title>
        <meta name="description" content="Learn about SEDECIA Technologies, a digital studio founded in Ethiopia and focused on web development, web design, custom software, and UI/UX." />
        <meta property="og:title" content="About SEDECIA Technologies" />
        <meta property="og:description" content="A focused digital studio building clear websites, interfaces, and custom software." />
        <link rel="canonical" href="https://sedecia.com/about" />
      </Helmet>
      <main className="about-page">
        <section className="about-page__hero section" ref={heroRef}>
          <div className="about-page__hero-glow" aria-hidden="true" />
          <div className="container about-page__hero-layout">
            <motion.div className="about-page__hero-copy" initial={{ opacity: 0, y: 34 }} animate={heroIn ? { opacity: 1, y: 0 } : {}} transition={{ duration: .8 }}>
              <span className="badge badge-orange">Who we are</span>
              <h1 className="display-xl about-page__hero-title"><motion.span initial={{ opacity: 0, y: 28 }} animate={heroIn ? { opacity: 1, y: 0 } : {}} transition={{ delay: .15, duration: .7 }}>We are</motion.span><br /><motion.span className="gradient-text" initial={{ opacity: 0, y: 28 }} animate={heroIn ? { opacity: 1, y: 0 } : {}} transition={{ delay: .3, duration: .7 }}>SEDECIA.</motion.span></h1>
              <p className="about-page__hero-sub">A young Ethiopian technology studio building clear digital experiences and practical software for organizations that want to move forward.</p>
            </motion.div>
            <motion.div className="about-page__hero-visual" initial={{ opacity: 0, scale: .9 }} animate={heroIn ? { opacity: 1, scale: 1 } : {}} transition={{ delay: .2, duration: .9 }}><StoryObject /></motion.div>
          </div>
        </section>

        <section className="about-page__mission section">
          <div className="container">
            <div className="about-page__section-intro"><span className="section-label">01 / Direction</span><h2>Technology should feel <span className="gradient-text">clear.</span></h2></div>
            <div className="about-page__mission-grid">
              <article className="about-page__mission-card about-page__mission-card--dark"><span className="about-page__card-number">01</span><h3>Our mission</h3><p>To empower organizations with intelligent, accessible technology that creates measurable, real-world value.</p></article>
              <article className="about-page__mission-card about-page__mission-card--orange"><span className="about-page__card-number">02</span><h3>Our vision</h3><p>A world where businesses, schools, institutions, and communities can use digital tools with confidence.</p></article>
            </div>
          </div>
        </section>

        <section className="about-page__values section" ref={valuesRef}>
          <div className="container">
            <div className="about-page__section-intro about-page__section-intro--split"><div><span className="section-label">02 / Principles</span><h2>How we choose<br /><span className="gradient-text">to work.</span></h2></div><p>We are still a small studio. That means the details matter, the communication is direct, and every project has a real person behind it.</p></div>
            <div className="about-page__values-grid">{VALUES.map((value, index) => <motion.article key={value.title} className="about-page__value" initial={{ opacity: 0, y: 25 }} animate={valuesIn ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * .08, duration: .55 }}><span>{value.number}</span><h3>{value.title}</h3><p>{value.desc}</p></motion.article>)}</div>
          </div>
        </section>

        <section className="about-page__timeline section" ref={timelineRef}>
          <div className="container"><div className="about-page__section-intro about-page__section-intro--light"><span className="section-label">03 / The journey</span><h2>Still early.<br /><span>Already building.</span></h2></div><div className="about-page__timeline-list">{MILESTONES.map((milestone, index) => <motion.article key={milestone.year} className="about-page__timeline-item" initial={{ opacity: 0, x: index % 2 ? 30 : -30 }} animate={timelineIn ? { opacity: 1, x: 0 } : {}} transition={{ delay: index * .12, duration: .6 }}><span className="about-page__timeline-year">{milestone.year}</span><span className="about-page__timeline-dot" /><div><h3>{milestone.title}</h3><p>{milestone.desc}</p></div></motion.article>)}</div></div>
        </section>

        <section className="about-page__founder section"><div className="container about-page__founder-layout"><div><span className="section-label">04 / The person behind it</span><h2>Built with care<br /><span className="gradient-text">from Ethiopia.</span></h2></div><div><p>SEDECIA was founded by Yeron Dereje, a young technology entrepreneur and developer from Ethiopia. The studio exists to make good digital work more accessible to organizations with important things to communicate and build.</p><Link to="/contact" className="btn btn-primary">Work with SEDECIA <span>↗</span></Link></div></div></section>
      </main>
      <CTASection />
    </>
  );
}
