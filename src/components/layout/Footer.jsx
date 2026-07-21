import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const SERVICES = [
  'Web Development', 'Web Design', 'Custom Software', 'UI/UX Design',
];

const COMPANY_LINKS = [
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
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
              <h3 className="footer__col-title">Start a project</h3>
              <p className="footer__desc" style={{ marginBottom: '1rem' }}>
                Have a website, interface, or software idea? Tell us what you are building.
              </p>
              <Link to="/contact" className="btn btn-primary" style={{ marginBottom: '1.5rem' }}>
                Tell us about it →
              </Link>
              <div className="footer__contact-info">
                <div className="footer__contact-item">
                  <span className="footer__contact-icon">✉</span>
                  <a href="mailto:info@sedecia.com" className="footer__link">info@sedecia.com</a>
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
