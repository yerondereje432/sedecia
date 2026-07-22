import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 — SEDECIA Technologies</title><meta name="description" content="This SEDECIA page could not be found." /></Helmet>
      <main className="not-found">
        <div className="not-found__grid" aria-hidden="true" />
        <div className="not-found__glow" aria-hidden="true" />
        <div className="container not-found__layout">
          <motion.div className="not-found__copy" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
            <span className="not-found__eyebrow"><i /> Error / 404</span>
            <motion.div className="not-found__number" initial={{ opacity: 0, scale: .75 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .12, duration: .8, type: 'spring', stiffness: 100 }}>404</motion.div>
            <h1>That page isn&apos;t here.</h1>
            <p>The link may be outdated, or the page may have moved. Let&apos;s get you back to the work.</p>
            <div className="not-found__actions"><Link to="/" className="btn btn-primary btn-lg">Back to home <span>↗</span></Link><Link to="/contact" className="btn btn-outline btn-lg">Contact SEDECIA</Link></div>
          </motion.div>
          <motion.div className="not-found__visual" initial={{ opacity: 0, rotate: -12, scale: .8 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ delay: .2, duration: .9 }} aria-hidden="true"><div className="not-found__cube"><span>404</span></div><div className="not-found__plane not-found__plane--one" /><div className="not-found__plane not-found__plane--two" /><div className="not-found__label">route not found</div></motion.div>
        </div>
      </main>
    </>
  );
}
