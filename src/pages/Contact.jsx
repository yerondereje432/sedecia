import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import './Contact.css';

const SERVICES_LIST = [
  'AI Automation', 'AI Chatbots', 'Custom Software Development',
  'Web Development', 'Mobile App Development', 'Cybersecurity',
  'Data Analytics',
  'Enterprise AI Integration', 'IT Consulting', 'Other',
];

const CONTACT_INFO = [
  { icon: '✉️', label: 'Email Us',   value: 'yerondereje432@gmail.com', href: 'mailto:yerondereje432@gmail.com' },
  { icon: '📞', label: 'Call Us',    value: '+251-85-90-18-65',          href: 'tel:+251859018065' },
  { icon: '📍', label: 'Location',   value: 'Addis Ababa, Ethiopia',     href: null },
  { icon: '⏰', label: 'Hours',      value: 'Mon–Fri: 8am–6pm (EAT)',    href: null },
];

export default function Contact() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    toast.success('Message sent! We\'ll respond within 24 hours. 🚀');
    setForm({ name: '', email: '', company: '', service: '', message: '' });
  };

  return (
    <>
      <Helmet>
        <title>Contact Us — SEDECIA | Get a Free Consultation</title>
        <meta name="description" content="Get in touch with SEDECIA for a free consultation on AI automation, custom software, web development, and enterprise digital transformation." />
      </Helmet>

      {/* Hero */}
      <section className="contact-hero section" style={{ paddingTop: 'calc(var(--section-padding) + 80px)' }}>
        <div className="contact-hero__orb" aria-hidden="true" />
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="badge badge-orange">{t('contact.badge')}</span>
            <h1 className="display-xl" style={{ color: 'var(--navy)', marginBlock: '1rem' }}>
              {t('contact.title')}{' '}
              <span className="gradient-text">{t('contact.titleAccent')}</span>
            </h1>
            <p className="body-lg" style={{ maxWidth: '540px', marginInline: 'auto' }}>
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main */}
      <section className="contact-main section" ref={ref}>
        <div className="container">
          <div className="contact-main__layout">
            {/* Info Panel */}
            <motion.div
              className="contact-info-panel"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2 className="contact-info-panel__title">Let's Start a Conversation</h2>
              <p className="contact-info-panel__sub">
                Whether you have a project idea, a technical challenge, or just want to explore what AI can do for you — we're here.
              </p>

              <div className="contact-info-panel__items">
                {CONTACT_INFO.map(item => (
                  <div key={item.label} className="contact-info-item">
                    <div className="contact-info-item__icon">{item.icon}</div>
                    <div>
                      <div className="contact-info-item__label">{item.label}</div>
                      {item.href && item.href !== '#' ? (
                        <a href={item.href} className="contact-info-item__value contact-info-item__value--link">
                          {item.value}
                        </a>
                      ) : (
                        <div className="contact-info-item__value">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="contact-info-panel__social">
                <div className="contact-info-panel__social-label">Follow Us</div>
                <div className="contact-info-panel__social-links">
                  {['LinkedIn', 'Twitter', 'Facebook', 'YouTube'].map(s => (
                    <a key={s} href="#" className="contact-social-btn" aria-label={s}>{s[0]}</a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="contact-info-panel__map">
                <div className="contact-info-panel__map-inner">
                  <span>🗺️</span>
                  <span>Addis Ababa, Ethiopia</span>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="contact-form-wrap"
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-form__header">
                  <h3 className="contact-form__title">Send Us a Message</h3>
                  <p className="contact-form__sub">Free consultation · No commitment required</p>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="name">{t('contact.name')} *</label>
                    <input id="name" name="name" type="text" className="contact-form__input"
                      placeholder="John Smith" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="email">{t('contact.email')} *</label>
                    <input id="email" name="email" type="email" className="contact-form__input"
                      placeholder="john@company.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="company">{t('contact.company')}</label>
                    <input id="company" name="company" type="text" className="contact-form__input"
                      placeholder="Your Company Name" value={form.company} onChange={handleChange} />
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="service">{t('contact.service')}</label>
                    <select id="service" name="service" className="contact-form__input contact-form__select"
                      value={form.service} onChange={handleChange}>
                      <option value="">Select a service…</option>
                      {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="message">{t('contact.message')} *</label>
                  <textarea id="message" name="message" className="contact-form__input contact-form__textarea"
                    placeholder="Tell us about your project, goals, and challenges…"
                    rows={6} value={form.message} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary btn-lg contact-form__submit" disabled={loading}>
                  {loading ? (
                    <><span className="contact-form__spinner" />Sending…</>
                  ) : (
                    <>{t('contact.send')} <span>→</span></>
                  )}
                </button>

                <p className="contact-form__privacy">
                  🔐 Your information is 100% secure. We never share your data.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
