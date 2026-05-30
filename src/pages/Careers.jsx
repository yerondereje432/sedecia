import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import CTASection from '@components/sections/CTASection';

export default function Careers() {
  return (
    <>
      <Helmet>
  <title>Careers — SEDECIA | Join Ethiopia's AI Innovation Team</title>
  <meta name="description" content="Join SEDECIA and help build the future of AI in Ethiopia. We're looking for passionate developers, designers, and innovators to grow with us." />
  <meta name="keywords" content="SEDECIA careers, tech jobs Ethiopia, AI jobs Addis Ababa, software developer jobs Ethiopia, join SEDECIA" />
  <meta property="og:title" content="Careers — SEDECIA | Join Ethiopia's AI Innovation Team" />
  <meta property="og:description" content="Grow your career at SEDECIA. We're hiring passionate people to build AI solutions that impact real lives in Ethiopia and beyond." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.sedecia.com/careers" />
  <link rel="canonical" href="https://www.sedecia.com/careers" />
</Helmet>
      <section style={{ paddingTop:'calc(var(--section-padding) + 80px)', background:'var(--white)', textAlign:'center', paddingBottom:'var(--section-padding)', minHeight:'60vh' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <span className="badge badge-orange">Careers</span>
            <h1 className="display-xl" style={{ color:'var(--navy)', marginBlock:'1rem' }}>
              Careers <span className="gradient-text">Coming Soon</span>
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
