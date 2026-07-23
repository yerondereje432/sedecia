import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CTASection from '@components/sections/CTASection';
import HolographicWall from '@components/ui/HolographicWall';
import './Portfolio.css';

const PROJECTS = [
  {
    number: '01',
    type: 'Education platform',
    title: 'HUSSS Website',
    description: 'A public-facing school website and editable content platform for Haramaya University Special Non-Boarding Secondary School.',
    work: 'Website design · Public pages · Admin content system · Multilingual-ready structure',
    status: 'Delivered',
    image: '/portfolio-husss.png',
    link: 'https://schoolweb-beige-delta.vercel.app/',
    accent: 'orange',
  },
  {
    number: '02',
    type: 'AI learning product',
    title: 'GROOT',
    description: 'A curriculum-locked AI tutor for Ethiopian high-school students. GROOT grounds answers in grade and subject-specific textbook content.',
    work: 'Product interface · AI chat experience · Curriculum-aware learning flow · RAG vertical slice',
    status: 'Under Development',
    image: '/groot-logo.png',
    link: null,
    accent: 'navy',
  },
  {
    number: '03',
    type: 'School management',
    title: 'Sunday School Portal',
    description: 'A practical school operations portal supporting lessons, assignments, attendance, grading, and student progress.',
    work: 'Portal interface · Student views · Admin workflows · Learning management features',
    status: 'Delivered',
    image: '/portfolio-sunday.png',
    link: 'https://web-production-71a88.up.railway.app/',
    accent: 'orange',
  },
  {
    number: '04',
    type: 'Employment platform',
    title: 'Konyx',
    description: 'A digital job marketplace in development, designed to connect job seekers with employers through a clearer hiring experience.',
    work: 'Product interface · Job discovery · Employer and job-seeker workflows',
    status: 'Under Development',
    image: '/portfolio-konyx.png',
    link: null,
    accent: 'navy',
  },
];

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: (index = 0) => ({ opacity: 1, y: 0, transition: { delay: index * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] } }),
};

export default function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Portfolio — SEDECIA Technologies</title>
        <meta name="description" content="Explore selected websites, learning products, and school software built by SEDECIA Technologies." />
        <meta property="og:title" content="Portfolio — SEDECIA Technologies" />
        <meta property="og:description" content="Selected digital products and software experiences built by SEDECIA Technologies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sedecia.com/portfolio" />
        <link rel="canonical" href="https://sedecia.com/portfolio" />
      </Helmet>

      <main className="portfolio-page">
        <section className="portfolio-hero section">
          <div className="portfolio-hero__glow" aria-hidden="true" />
          <div className="container portfolio-hero__layout">
            <motion.div initial="hidden" animate="visible" variants={reveal}>
              <span className="badge badge-orange">Selected work</span>
              <motion.h1 className="display-xl portfolio-hero__title">
                <motion.span className="portfolio-hero__reveal-line" initial={{ opacity: 0, y: 34, rotateX: -35 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: .22, duration: .7 }}>Things we</motion.span><br />
                <motion.span className="portfolio-hero__reveal-line gradient-text" initial={{ opacity: 0, y: 34, rotateX: -35 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: .38, duration: .7 }}>have built</motion.span>
              </motion.h1>
              <p className="body-lg portfolio-hero__sub">
                A small selection of real products and digital experiences created for education, learning, and growing organizations.
              </p>
            </motion.div>
            <motion.div className="portfolio-hero__visual" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .25, duration: .8 }}>
              <HolographicWall intensity={0.75} radius={180} />
              <span className="portfolio-hero__visual-label">From idea to interface</span>
            </motion.div>
          </div>
        </section>

        <section className="portfolio-list section">
          <div className="container">
            <div className="portfolio-list__intro">
              <span className="section-label">03 / Work</span>
              <p>Focused work, built with care.</p>
            </div>
            <div className="portfolio-grid">
              {PROJECTS.map((project, index) => (
                <motion.article key={project.title} className={`portfolio-card portfolio-card--${project.accent}`} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal}>
                  <div className="portfolio-card__top"><span>{project.number}</span><span>{project.type}</span></div>
                  <div className="portfolio-card__visual">{project.image ? <img src={project.image} alt={`${project.title} project`} /> : <div className="portfolio-card__mark">{project.title.charAt(0)}</div>}<div className="portfolio-card__visual-overlay"><span>{project.number}</span></div></div>
                  <div className="portfolio-card__content">
                    <motion.h2 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .12, duration: .55 }}>{project.title}</motion.h2>
                    <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .2, duration: .55 }}>{project.description}</motion.p>
                    <div className="portfolio-card__work"><span>SEDECIA did</span>{project.work}</div>
                    <div className="portfolio-card__bottom"><span className={`portfolio-card__status portfolio-card__status--${project.status === 'Delivered' ? 'delivered' : 'development'}`}>{project.status}</span>{project.link && <a className="portfolio-card__visit" href={project.link} target="_blank" rel="noreferrer">Visit project <span>↗</span></a>}</div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CTASection />
    </>
  );
}
