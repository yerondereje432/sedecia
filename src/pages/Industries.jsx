import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CTASection from '@components/sections/CTASection';

export default function Industries() {
  return (
    <>
      <Helmet>
  <title>Industries We Serve — SEDECIA | AI for Every Sector</title>
  <meta name="description" content="SEDECIA delivers AI and technology solutions across healthcare, education, finance, government, retail, and more — transforming industries across Ethiopia." />
  <meta name="keywords" content="AI for healthcare Ethiopia, AI for education, AI fintech Ethiopia, government digital transformation, SEDECIA industries" />
  <meta property="og:title" content="Industries We Serve — SEDECIA" />
  <meta property="og:description" content="SEDECIA serves healthcare, education, finance, government and more with intelligent AI solutions." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sedecia.com/industries" />
  <link rel="canonical" href="https://sedecia.com/industries" />
</Helmet>
      <section style={{ paddingTop:'calc(var(--section-padding) + 80px)', background:'var(--white)', textAlign:'center', paddingBottom:'var(--section-padding)', minHeight:'60vh' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <span className="badge badge-orange">Industries</span>
            <h1 className="display-xl" style={{ color:'var(--navy)', marginBlock:'1rem' }}>
              Industries <span className="gradient-text">Coming Soon</span>
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
