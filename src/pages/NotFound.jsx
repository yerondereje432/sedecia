import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 Not Found — SEDECIA</title></Helmet>
      <section style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--white)', textAlign:'center' }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <div style={{ fontSize:'6rem', marginBottom:'1rem', lineHeight:1 }}>🤖</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'clamp(4rem,12vw,8rem)', fontWeight:800, color:'var(--orange)', lineHeight:1, marginBottom:'1rem' }}>404</div>
            <h1 className="display-md" style={{ color:'var(--navy)', marginBottom:'1rem' }}>Page Not Found</h1>
            <p className="body-lg" style={{ maxWidth:'420px', marginInline:'auto', marginBottom:'2rem' }}>
              Looks like this page got lost in the digital universe. Let's get you back on track.
            </p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
              <Link to="/" className="btn btn-primary btn-lg">← Back Home</Link>
              <Link to="/contact" className="btn btn-outline btn-lg">Contact Support</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
