import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const NAV_LINKS = [
  { key: 'home',      path: '/' },
  { key: 'about',     path: '/about' },
  { key: 'services',  path: '/services' },
  { key: 'portfolio', path: '/portfolio' },
  { key: 'contact',   path: '/contact' },
];

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled]       = useState(false);
  const [progress, setProgress]       = useState(0);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(currentY > 20);
      setProgress(max > 0 ? currentY / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="SEDECIA Home">
          <div className="navbar__logo-icon">
            <img src="/sedecia-icon.png" alt="SEDECIA icon" />
          </div>
          <div className="navbar__logo-text">
            <span className="navbar__logo-name">SEDECIA</span>
            <span className="navbar__logo-sub">Technologies</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links hide-mobile" aria-label="Main navigation">
          {NAV_LINKS.map(({ key, path }) => (
            <NavLink
              key={key}
              to={path}
              onMouseEnter={() => setHoveredPath(path)}
              onMouseLeave={() => setHoveredPath(null)}
              className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  {(isActive || hoveredPath === path) && <motion.span className="navbar__link-pill" layoutId="navbar-pill" transition={{ type: 'spring', stiffness: 420, damping: 30 }} />}
                  <span className="navbar__link-label">{t(`nav.${key}`)}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          {/* CTA Button */}
          <Link to="/contact" className="btn btn-primary btn-sm hide-mobile">
            {t('nav.getStarted')}
          </Link>

          {/* Mobile Hamburger */}
          <button
            className={`navbar__hamburger hide-desktop ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar__mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <nav className="navbar__mobile-links">
              {NAV_LINKS.map(({ key, path }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `navbar__mobile-link ${isActive ? 'active' : ''}`
                    }
                  >
                    {t(`nav.${key}`)}
                  </NavLink>
                </motion.div>
              ))}
              <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
                {t('nav.getStarted')}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
