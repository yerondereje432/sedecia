import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CTASection from '@components/sections/CTASection';

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog — SEDECIA</title>
        <meta name="description" content="SEDECIA Blog page." />
      </Helmet>
      <section style={{ paddingTop:'calc(var(--section-padding) + 80px)', background:'var(--white)', textAlign:'center', paddingBottom:'var(--section-padding)', minHeight:'60vh' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <span className="badge badge-orange">Blog</span>
            <h1 className="display-xl" style={{ color:'var(--navy)', marginBlock:'1rem' }}>
              Blog <span className="gradient-text">Coming Soon</span>
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
