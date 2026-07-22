import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const SERVICES = ['Web Development', 'Web Design', 'Custom Software', 'UI/UX Design'];
const COMPANY_LINKS = [
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
];
const SOCIALS = [
  { name: 'LinkedIn', mark: 'in' },
  { name: 'Facebook', mark: 'f' },
  { name: 'YouTube', mark: 'yt' },
];

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return <footer className="footer"><div className="footer__topline" aria-hidden="true" /><div className="footer__body"><div className="container"><div className="footer__lead"><div><span className="footer__eyebrow">Have something in mind?</span><h2>Let&apos;s make it<br /><span>clear and useful.</span></h2></div><Link to="/contact" className="footer__lead-cta">Start a project <span>↗</span></Link></div><div className="footer__rule" /><div className="footer__grid"><div className="footer__brand"><Link to="/" className="footer__logo"><div className="footer__logo-icon"><img src="/sedecia-icon.png" alt="SEDECIA icon" /></div><div className="footer__logo-text"><strong>SEDECIA</strong><small>Technologies</small></div></Link><p>{t('footer.desc')}</p><div className="footer__socials">{SOCIALS.map((social) => <a key={social.name} href="#" aria-label={social.name}>{social.mark}</a>)}</div></div><div className="footer__col"><h3>Explore</h3>{COMPANY_LINKS.map((link) => <Link key={link.path} to={link.path}>{link.label}</Link>)}</div><div className="footer__col"><h3>Capabilities</h3>{SERVICES.map((service) => <Link key={service} to="/services">{service}</Link>)}</div><div className="footer__contact"><h3>Contact</h3><a href="mailto:info@sedecia.com">info@sedecia.com</a><a href="tel:+251859018065">+251-85-90-18-65</a><span>Harar, Ethiopia</span></div></div><div className="footer__bottom"><span>© {year} SEDECIA Technologies. {t('footer.rights')}</span><span>Built with care from Ethiopia.</span></div></div></div></footer>;
}
