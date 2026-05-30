import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CTASection from '@components/sections/CTASection';

export default function Solutions() {
  return (
    <>
      <Helmet>
  <title>Solutions — SEDECIA | AI-Powered Business Solutions</title>
  <meta name="description" content="Explore SEDECIA's intelligent business solutions designed to digitally transform organizations across Ethiopia and Africa using AI and modern technology." />
  <meta name="keywords" content="AI solutions Ethiopia, business solutions Africa, digital transformation Ethiopia, SEDECIA solutions" />
  <meta property="og:title" content="Solutions — SEDECIA | AI-Powered Business Solutions" />
  <meta property="og:description" content="SEDECIA builds intelligent solutions for businesses, schools, and enterprises across Ethiopia." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sedecia.com/solutions" />
  <link rel="canonical" href="https://sedecia.com/solutions" />
</Helmet>
      <section style={{ paddingTop:'calc(var(--section-padding) + 80px)', background:'var(--white)', textAlign:'center', paddingBottom:'var(--section-padding)', minHeight:'60vh' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <span className="badge badge-orange">Solutions</span>
            <h1 className="display-xl" style={{ color:'var(--navy)', marginBlock:'1rem' }}>
              Solutions <span className="gradient-text">Coming Soon</span>
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
