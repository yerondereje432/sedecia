import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import './Footer.css';

const SERVICES = [
  'AI Automation', 'AI Chatbots', 'Custom Software',
  'Web Development', 'Mobile App Development', 'Cybersecurity',
  'Data Analytics',
];

const COMPANY_LINKS = [
  { label: 'About Us',    path: '/about' },
  { label: 'Services',    path: '/services' },
  { label: 'Portfolio',   path: '/portfolio' },
  { label: 'Blog',        path: '/blog' },
  { label: 'Careers',     path: '/careers' },
  { label: 'Contact',     path: '/contact' },
];

const SOCIALS = [
  { name: 'LinkedIn',  href: '#', icon: 'in' },
  { name: 'Twitter',   href: '#', icon: '𝕏' },
  { name: 'Facebook',  href: '#', icon: 'f' },
  { name: 'YouTube',   href: '#', icon: '▶' },
];

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top Wave */}
      <div className="footer__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 27.5C840 35 960 40 1080 35C1200 30 1320 15 1380 7.5L1440 0V60H0Z" fill="#1B2A4A"/>
        </svg>
      </div>

      <div className="footer__body">
        <div className="container">
          <div className="footer__grid">
            {/* Brand Column */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                <div className="footer__logo-icon">
                  <img src="/sedecia-logo.png" alt="SEDECIA Logo" style={{ height: '38px', width: 'auto', display: 'block' }} />
                </div>
                <div>
                  <div className="footer__logo-name">SEDECIA</div>
                  <div className="footer__logo-tag">{t('footer.tagline')}</div>
                </div>
              </Link>
              <p className="footer__desc">{t('footer.desc')}</p>
              <div className="footer__socials">
                {SOCIALS.map(s => (
                  <a key={s.name} href={s.href} className="footer__social" aria-label={s.name} target="_blank" rel="noopener noreferrer">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div className="footer__col">
              <h3 className="footer__col-title">{t('footer.company')}</h3>
              <ul>
                {COMPANY_LINKS.map(l => (
                  <li key={l.path}>
                    <Link to={l.path} className="footer__link">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer__col">
              <h3 className="footer__col-title">{t('footer.services')}</h3>
              <ul>
                {SERVICES.map(s => (
                  <li key={s}>
                    <Link to="/services" className="footer__link">{s}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer__col footer__newsletter">
              <h3 className="footer__col-title">Stay Updated</h3>
              <p className="footer__desc" style={{ marginBottom: '1rem' }}>
                Get the latest AI insights and company news delivered to your inbox.
              </p>
              <form className="footer__form" onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Your email address"
                  className="footer__input"
                  aria-label="Email for newsletter"
                />
                <button type="submit" className="footer__submit">
                  Subscribe
                </button>
              </form>
              <div className="footer__contact-info">
                <div className="footer__contact-item">
                  <span className="footer__contact-icon">✉</span>
                  <a href="mailto:yerondereje432@gmail.com" className="footer__link">yerondereje432@gmail.com</a>
                </div>
                <div className="footer__contact-item">
                  <span className="footer__contact-icon">📞</span>
                  <a href="tel:+251859018065" className="footer__link">+251-85-90-18-65</a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer__bottom">
            <p className="footer__copyright">
              © {year} SEDECIA. {t('footer.rights')}
            </p>
            <div className="footer__legal">
              <Link to="/privacy" className="footer__link">{t('footer.privacy')}</Link>
              <span className="footer__sep">·</span>
              <Link to="/terms" className="footer__link">{t('footer.terms')}</Link>
              <span className="footer__sep">·</span>
              <Link to="/cookies" className="footer__link">{t('footer.cookies')}</Link>
            </div>
            <p className="footer__made">{t('footer.madeWith')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
