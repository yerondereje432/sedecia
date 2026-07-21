import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CTASection from '@components/sections/CTASection';
import './Services.css';

const SERVICES = [
  { number: '01', title: 'Web Development', desc: 'Fast, reliable websites and web platforms built around the way your organization actually works.', features: ['Responsive frontend development', 'CMS and content systems', 'Performance and accessibility', 'Deployment-ready delivery'] },
  { number: '02', title: 'Web Design', desc: 'Clear, distinctive digital experiences that make your organization easier to understand and easier to trust.', features: ['Visual direction and layout', 'Brand-aware interface design', 'Responsive design systems', 'Prototypes and design handoff'] },
  { number: '03', title: 'Custom Software', desc: 'Practical software for specific workflows—built from the real problem rather than from a template.', features: ['Workflow mapping', 'Custom dashboards and portals', 'Role-based experiences', 'Iteration and maintenance'] },
  { number: '04', title: 'UI/UX Design', desc: 'Thoughtful interfaces that help people complete important tasks with less friction and more confidence.', features: ['User flows and information architecture', 'Wireframes and prototypes', 'Design systems', 'Usability-focused refinement'] },
];

const reveal = { hidden: { opacity: 0, y: 28 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * .1, duration: .6, ease: [.16, 1, .3, 1] } }) };

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services — SEDECIA Technologies</title>
        <meta name="description" content="SEDECIA specializes in web development, web design, custom software, and UI/UX design for schools, universities, hotels, tour guides, and gyms." />
        <meta property="og:title" content="Services — SEDECIA Technologies" />
        <meta property="og:description" content="Focused web, software, and UI/UX services for organizations that need a clear digital presence and practical tools." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://sedecia.com/services" />
      </Helmet>
      <main className="services-page">
        <section className="services-page__hero section">
          <div className="services-page__glow" aria-hidden="true" />
          <div className="container">
            <motion.div initial="hidden" animate="visible" variants={reveal}>
              <span className="badge badge-orange">What we do</span>
              <h1 className="display-xl services-page__title"><span>Focused tools</span><br /><span className="gradient-text">for real work</span></h1>
              <p className="body-lg services-page__intro">SEDECIA builds websites, interfaces, and custom software for organizations that want to communicate clearly and work better.</p>
            </motion.div>
          </div>
        </section>
        <section className="services-page__list section">
          <div className="container">
            <div className="services-page__eyebrow">Our capabilities</div>
            <div className="services-page__grid">
              {SERVICES.map((service, index) => (
                <motion.article key={service.title} className="services-page__card" custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal}>
                  <div className="services-page__card-top"><span>{service.number}</span><span>SEDECIA</span></div>
                  <h2>{service.title}</h2>
                  <p>{service.desc}</p>
                  <ul>{service.features.map(feature => <li key={feature}><span>+</span>{feature}</li>)}</ul>
                  <Link to="/contact" className="services-page__link">Discuss this work <span>↗</span></Link>
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
