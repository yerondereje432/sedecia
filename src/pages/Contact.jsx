import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import './Contact.css';

// ─── Config ─────────────────────────────────────────────────────────────────
// Point this at your Cloudflare Worker route after deploying.
// If you use a custom route like /api/contact, set:  '/api/contact'
// If you use the workers.dev subdomain during testing, paste the full URL.
const CONTACT_API = 'https://sedecia-contact.yerondereje432.workers.dev';;

// ─── Static data ────────────────────────────────────────────────────────────
const SERVICES_LIST = [
  'AI Automation', 'AI Chatbots', 'Custom Software Development',
  'Web Development', 'Mobile App Development', 'Cybersecurity',
  'Data Analytics', 'Enterprise AI Integration', 'IT Consulting', 'Other',
];

const CONTACT_INFO = [
  { icon: '✉️', label: 'Email Us',  value: 'contact@sedecia.com',       href: 'mailto:contact@sedecia.com' },
  { icon: '📞', label: 'Call Us',   value: '+251-85-90-18-65',        href: 'tel:+251859018065' },
  { icon: '📍', label: 'Location',  value: 'Harar, Ethiopia',         href: null },
];

// ─── Component ───────────────────────────────────────────────────────────────
export default function Contact() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const EMPTY_FORM = { name: '', email: '', company: '', service: '', message: '' };
  const [form, setForm]       = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        // Surface the worker's error message if available
        throw new Error(data?.error || 'Something went wrong.');
      }

      toast.success("Message sent! We'll respond within 24 hours. 🚀");
      setForm(EMPTY_FORM);
    } catch (err) {
      console.error('[Contact form]', err);
      toast.error(
        err.message && err.message !== 'Failed to fetch'
          ? err.message
          : 'Could not send message. Please email us directly at info@sedecia.com.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact SEDECIA — Free AI Consultation | Harar, Ethiopia</title>
        <meta name="description" content="Contact SEDECIA for a free consultation on AI automation, custom software, web development and digital transformation. Based in Harar, Ethiopia." />
        <meta name="keywords" content="contact SEDECIA, AI consultation Ethiopia, tech company Harar, free consultation AI" />
        <meta property="og:title" content="Contact SEDECIA — Free AI Consultation" />
        <meta property="og:description" content="Reach out to SEDECIA for a free consultation. Based in Harar, Ethiopia. Responding within 24 hours." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sedecia.com/contact" />
        <link rel="canonical" href="https://sedecia.com/contact" />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
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

      {/* ── Main ─────────────────────────────────────────────────────────── */}
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
                Whether you have a project idea, a technical challenge, or just want to explore
                what AI can do for you — we're here.
              </p>

              <div className="contact-info-panel__items">
                {CONTACT_INFO.map((item) => (
                  <div key={item.label} className="contact-info-item">
                    <div className="contact-info-item__icon">{item.icon}</div>
                    <div>
                      <div className="contact-info-item__label">{item.label}</div>
                      {item.href ? (
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
                  {['LinkedIn', 'Twitter', 'Facebook', 'YouTube'].map((s) => (
                    <a key={s} href="#" className="contact-social-btn" aria-label={s}>{s[0]}</a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="contact-info-panel__map">
                <div className="contact-info-panel__map-inner">
                  <span>🗺️</span>
                  <span>Harar, Ethiopia</span>
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
                    <input
                      id="name" name="name" type="text"
                      className="contact-form__input"
                      placeholder="John Smith"
                      value={form.name} onChange={handleChange} required
                    />
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="email">{t('contact.email')} *</label>
                    <input
                      id="email" name="email" type="email"
                      className="contact-form__input"
                      placeholder="john@company.com"
                      value={form.email} onChange={handleChange} required
                    />
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="company">{t('contact.company')}</label>
                    <input
                      id="company" name="company" type="text"
                      className="contact-form__input"
                      placeholder="Your Company Name"
                      value={form.company} onChange={handleChange}
                    />
                  </div>
                  <div className="contact-form__field">
                    <label className="contact-form__label" htmlFor="service">{t('contact.service')}</label>
                    <select
                      id="service" name="service"
                      className="contact-form__input contact-form__select"
                      value={form.service} onChange={handleChange}
                    >
                      <option value="">Select a service…</option>
                      {SERVICES_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="contact-form__field">
                  <label className="contact-form__label" htmlFor="message">{t('contact.message')} *</label>
                  <textarea
                    id="message" name="message"
                    className="contact-form__input contact-form__textarea"
                    placeholder="Tell us about your project, goals, and challenges…"
                    rows={6} value={form.message} onChange={handleChange} required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg contact-form__submit"
                  disabled={loading}
                >
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
