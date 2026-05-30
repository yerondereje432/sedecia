import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CTASection from '@components/sections/CTASection';

export default function Portfolio() {
  return (
    <>
      <Helmet>
  <title>Portfolio — SEDECIA | AI & Software Projects in Ethiopia</title>
  <meta name="description" content="Explore SEDECIA's portfolio of delivered AI automation, web development, chatbot, and custom software projects for clients across Ethiopia." />
  <meta name="keywords" content="SEDECIA portfolio, AI projects Ethiopia, software portfolio Africa, web development projects Ethiopia" />
  <meta property="og:title" content="Portfolio — SEDECIA | AI & Software Projects" />
  <meta property="og:description" content="See the real-world AI and software solutions SEDECIA has delivered across Ethiopia." />
  <meta property="og:type" content="website" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sedecia.com/portfolio" />
  <link rel="canonical" href="https://sedecia.com/portfolio" />
</Helmet>
      <section style={{ paddingTop:'calc(var(--section-padding) + 80px)', background:'var(--white)', textAlign:'center', paddingBottom:'var(--section-padding)', minHeight:'60vh' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <span className="badge badge-orange">Portfolio</span>
            <h1 className="display-xl" style={{ color:'var(--navy)', marginBlock:'1rem' }}>
              Portfolio <span className="gradient-text">Coming Soon</span>
            </h1>
            <p className="body-lg" style={{ maxWidth:'540px', marginInline:'auto', marginBottom:'2rem' }}>
              We're building this page with full content. In the meantime, explore our other sections or get in touch.
            </p>
            <a href="/contact" className="btn btn-primary btn-lg">Contact Us →</a>
          </motion.div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
