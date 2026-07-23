import React from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="loading-screen" role="status" aria-label="Loading SEDECIA">
      <div className="loading-screen__grid" aria-hidden="true" />
      <div className="loading-screen__glow loading-screen__glow--one" aria-hidden="true" />
      <div className="loading-screen__glow loading-screen__glow--two" aria-hidden="true" />
      <div className="loading-screen__corner loading-screen__corner--tl" aria-hidden="true">SEDECIA / 01</div>

      <motion.div className="loading-screen__stage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }}>
        <div className="loading-screen__orbit loading-screen__orbit--one" aria-hidden="true" />
        <div className="loading-screen__orbit loading-screen__orbit--two" aria-hidden="true" />
        <motion.div className="loading-screen__logo-wrap" initial={{ opacity: 0, scale: .72, rotateY: -35 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ delay: .15, duration: 1, type: 'spring', stiffness: 90, damping: 18 }}>
          <div className="loading-screen__logo-shadow" />
          <img className="loading-screen__logo" src="/sedecia-logo.png" alt="SEDECIA" />
        </motion.div>
        <motion.div className="loading-screen__brand" initial={{ opacity: 0, letterSpacing: '.45em' }} animate={{ opacity: 1, letterSpacing: '.18em' }} transition={{ delay: .55, duration: .8 }}>
          <span>SEDECIA</span><small>TECHNOLOGIES</small>
        </motion.div>
      </motion.div>

      <div className="loading-screen__footer">
        <div className="loading-screen__status"><span className="loading-screen__status-dot" /> Preparing your experience</div>
        <div className="loading-screen__bar"><motion.div className="loading-screen__progress" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.2, ease: [.16, 1, .3, 1] }} /></div>
        <div className="loading-screen__percent">Loading / 100%</div>
      </div>
    </div>
  );
}
