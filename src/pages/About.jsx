import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import CTASection from '@components/sections/CTASection';
import './About.css';

const TEAM = [
  {
    name: 'Yeron Dereje',
    role: 'Founder & CEO',
    avatar: '👨‍💼',
    bio: 'A young and visionary tech entrepreneur and developer from Ethiopia.',
  },
];

const MILESTONES = [
  {
    year: '2025',
    title: 'Founded',
    desc: 'SEDECIA was established in Ethiopia with a mission to bring AI and digital solutions to businesses of all sizes.',
  },
  {
    year: '2025',
    title: 'First Solutions',
    desc: 'Delivered our first AI automation and web development projects for local clients in Ethiopia.',
  },
  {
    year: '2026',
    title: '20+ Solutions',
    desc: 'Surpassed 20 delivered solutions spanning AI automation, chatbots, custom software, and web development.',
  },
];

const VALUES = [
  {
    icon: '⚡',
    title: 'Innovation',
    desc: 'We relentlessly push boundaries, embracing emerging technologies to solve complex problems.',
  },
  {
    icon: '🤝',
    title: 'Partnership',
    desc: "We build lasting relationships, treating every client's success as our own mission.",
  },
  {
    icon: '🔐',
    title: 'Integrity',
    desc: 'We operate with radical transparency and unwavering ethical standards.',
  },
  {
    icon: '🌍',
    title: 'Impact',
    desc: 'We build technology that creates meaningful change for communities and organizations.',
  },
  {
    icon: '🎯',
    title: 'Excellence',
    desc: 'We hold ourselves to the highest standards in every line of code and every design.',
  },
  {
    icon: '🔄',
    title: 'Adaptability',
    desc: 'We evolve rapidly, keeping our clients ahead of the technology curve.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

export default function About() {
  const [heroRef, heroIn] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [teamRef, teamIn] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [valRef, valIn] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [timeRef, timeIn] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <Helmet>
  <title>About SEDECIA — AI Company Founded in Ethiopia | Yeron Dereje</title>
  <meta name="description" content="SEDECIA is an AI-powered tech company founded in 2025 in Ethiopia by Yeron Dereje. Delivering 10+ solutions in AI automation, software, and digital transformation." />
  <meta name="keywords" content="SEDECIA, about SEDECIA, AI company Ethiopia, Yaron Rejig, tech startup Ethiopia" />
  <meta property="og:title" content="About SEDECIA — AI Company Founded in Ethiopia" />
  <meta property="og:description" content="Founded in 2025 by Yeron Dereje, SEDECIA delivers AI and digital solutions across Ethiopia and beyond." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sedecia.com/about" />
  <link rel="canonical" href="https://sedecia.com/about" />
</Helmet>
      {/* Hero */}
      <section className="about-hero section" ref={heroRef}>
        <div className="about-hero__orb" aria-hidden="true" />
        <div className="container">
          <motion.div
            className="about-hero__content"
            initial="hidden"
            animate={heroIn ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <span className="badge badge-orange">Who We Are</span>

            <h1 className="display-xl about-hero__title">
              We Are <span className="gradient-text">SEDECIA</span>
            </h1>

            <p className="body-lg about-hero__sub">
              An AI-powered solutions company on a mission to democratize advanced
              technology for every business, institution, and organization —
              regardless of size or sector.
            </p>

            <div className="about-hero__stats">
              {[
                ['2025', 'Founded'],
                ['20+', 'Solutions Delivered'],
                ['Ethiopia', 'Based In'],
              ].map(([num, lbl]) => (
                <div key={lbl} className="about-hero__stat">
                  <div className="about-hero__stat-num">{num}</div>
                  <div className="about-hero__stat-lbl">{lbl}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="about-mv section">
        <div className="container">
          <div className="about-mv__grid">
            {[
              {
                icon: '🎯',
                title: 'Our Mission',
                color: 'orange',
                text: 'To empower organizations worldwide with intelligent technology that drives measurable, real-world impact — making AI accessible, affordable, and transformative for all.',
              },
              {
                icon: '🔭',
                title: 'Our Vision',
                color: 'navy',
                text: 'A world where every business, school, hospital, and government operates smarter, faster, and more efficiently through the power of artificial intelligence.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className={`about-mv__card about-mv__card--${item.color}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="about-mv__icon">{item.icon}</div>

                <h2 className="about-mv__title">{item.title}</h2>

                <p className="about-mv__text">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values section" ref={valRef}>
        <div className="container">
          <motion.div
            className="about-values__header"
            initial="hidden"
            animate={valIn ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <span className="badge badge-orange">Core Values</span>

            <h2
              className="display-lg"
              style={{ color: 'var(--navy)', marginTop: '1rem' }}
            >
              What Drives <span className="gradient-text">Everything We Do</span>
            </h2>
          </motion.div>

          <div className="about-values__grid">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                className="about-values__card"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={valIn ? 'visible' : 'hidden'}
              >
                <div className="about-values__icon">{v.icon}</div>

                <h3 className="about-values__title">{v.title}</h3>

                <p className="about-values__desc">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline section" ref={timeRef}>
        <div className="container">
          <motion.div
            className="about-timeline__header"
            initial="hidden"
            animate={timeIn ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <span className="badge badge-navy">Our Journey</span>

            <h2
              className="display-lg"
              style={{ color: 'var(--white)', marginTop: '1rem' }}
            >
              From Startup to{' '}
              <span style={{ color: 'var(--orange)' }}>Problem Solver</span>
            </h2>
          </motion.div>

          <div className="about-timeline__items">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                className="timeline-item"
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                animate={timeIn ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="timeline-item__year">{m.year}</div>

                <div className="timeline-item__dot" />

                <div className="timeline-item__content">
                  <h3 className="timeline-item__title">{m.title}</h3>

                  <p className="timeline-item__desc">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team section" ref={teamRef}>
        <div className="container">
          <motion.div
            className="about-team__header"
            initial="hidden"
            animate={teamIn ? 'visible' : 'hidden'}
            variants={fadeUp}
          >
            <span className="badge badge-orange">Leadership Team</span>

            <h2
              className="display-lg"
              style={{ color: 'var(--navy)', marginTop: '1rem' }}
            >
              The Minds Behind{' '}
              <span className="gradient-text">SEDECIA</span>
            </h2>
          </motion.div>

          <div className="about-team__grid">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                className="team-card"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={teamIn ? 'visible' : 'hidden'}
                whileHover={{ y: -8 }}
              >
                <div className="team-card__avatar">{member.avatar}</div>

                <div className="team-card__info">
                  <h3 className="team-card__name">{member.name}</h3>

                  <div className="team-card__role">{member.role}</div>

                  <p className="team-card__bio">{member.bio}</p>
                </div>

                <div className="team-card__socials">
                  <a
                    href="https://t.me/yeronderejee"
                    className="team-card__social"
                    aria-label="Telegram"
                  >
➤
                  </a>
                  <a
                    href="https://x.com/yerondereje432"
                    className="team-card__social"
                    aria-label="Twitter"
                  >
                    𝕏
                  </a>
<a
                    href="https://github.com/yerondereje432"
                    className="team-card__social"
                    aria-label="GitHub"
                  >
                  💻
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}