import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { LANGUAGES } from '@i18n/index';
import './Navbar.css';

const NAV_LINKS = [
  { key: 'home',       path: '/' },
  { key: 'about',      path: '/about' },
  { key: 'services',   path: '/services' } ,
  { key: 'industries', path: '/industries' },
  { key: 'portfolio',  path: '/portfolio' },
  { key: 'blog',       path: '/blog' },
  { key: 'contact',    path: '/contact' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [langOpen, setLangOpen]       = useState(false);
  const langRef = useRef(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setLangOpen(false);
  };

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="SEDECIA Home">
          <div className="navbar__logo-icon">
            <img src="/sedecia-logo.png" alt="SEDECIA Logo" style={{ height: '48px', width: 'auto', display: 'block' }} />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links hide-mobile" aria-label="Main navigation">
          {NAV_LINKS.map(({ key, path }) => (
            <NavLink
              key={key}
              to={path}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              {t(`nav.${key}`)}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          {/* Language Switcher */}
          <div className="lang-switcher" ref={langRef}>
            <button
              className="lang-switcher__btn"
              onClick={() => setLangOpen(!langOpen)}
              aria-expanded={langOpen}
              aria-label="Change language"
            >
              <span>{currentLang.flag}</span>
              <span className="lang-switcher__code">{currentLang.code.toUpperCase()}</span>
              <svg className={`lang-switcher__chevron ${langOpen ? 'open' : ''}`} viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  className="lang-switcher__dropdown"
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      className={`lang-switcher__item ${i18n.language === lang.code ? 'active' : ''}`}
                      onClick={() => changeLanguage(lang.code)}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
