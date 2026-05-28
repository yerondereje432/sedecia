import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CTASection from '@components/sections/CTASection';

const SERVICES = [
  { icon: '🤖', title: 'AI Automation', desc: 'End-to-end intelligent automation solutions that eliminate manual work, reduce errors, and scale effortlessly with your business.', features: ['RPA & Workflow Automation','Intelligent Document Processing','AI-Powered Decision Engines','Process Mining & Optimization'] },
  { icon: '💬', title: 'AI Chatbots', desc: 'Conversational AI that delivers human-like customer experiences 24/7 across web, mobile, and messaging platforms.', features: ['NLP-Powered Conversations','Multi-Channel Deployment','CRM Integration','Analytics Dashboard'] },
  { icon: '⚙️', title: 'Custom Software', desc: 'Tailor-made software solutions engineered from the ground up to solve your specific business challenges.', features: ['Agile Development','API-First Architecture','Scalable Infrastructure','Ongoing Maintenance'] },
  { icon: '🌐', title: 'Web Development', desc: 'High-performance, visually stunning web platforms built with modern technologies for speed, SEO, and conversions.', features: ['React / Next.js','PWA Development','CMS Integration','Performance Optimization'] },
  { icon: '📱', title: 'Mobile Apps', desc: 'Native iOS & Android and cross-platform mobile applications that delight users and drive engagement.', features: ['React Native / Flutter','Offline-First Design','Push Notifications','App Store Optimization'] },
  { icon: '🔐', title: 'Cybersecurity', desc: 'Comprehensive security solutions that protect your digital assets, data, and reputation around the clock.', features: ['Penetration Testing','SOC Monitoring','Zero Trust Architecture','Compliance & Auditing'] },
  { icon: '📊', title: 'Data Analytics', desc: 'Transform your raw data into strategic intelligence with beautiful dashboards and actionable insights.', features: ['Business Intelligence','Data Warehousing','Real-Time Analytics','Data Pipeline Engineering'] },
  { icon: '🏢', title: 'Enterprise AI', desc: 'Large-scale AI integration tailored for complex enterprise environments and mission-critical workflows.', features: ['AI Strategy Consulting','Enterprise LLM Deployment','Legacy System Integration','Change Management'] },
  { icon: '🎯', title: 'IT Consulting', desc: 'Strategic technology advisory to align your IT investments, roadmap, and team with business objectives.', features: ['Technology Assessment','Digital Roadmap','Vendor Selection','IT Governance'] },
];

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services — SEDECIA | AI & Digital Transformation Solutions</title>
        <meta name="description" content="Explore SEDECIA' full range of AI services: automation, chatbots, software development, cybersecurity, and more." />
      </Helmet>

      <section className="page-hero" style={{ paddingTop:'calc(var(--section-padding) + 80px)', background:'var(--white)', textAlign:'center', paddingBottom:'var(--section-padding)' }}>
        <div className="page-hero__orb" style={{ position:'absolute', width:'600px', height:'600px', background:'radial-gradient(circle, rgba(244,121,32,0.08) 0%, transparent 70%)', top:'-20%', left:'50%', transform:'translateX(-50%)', borderRadius:'50%', filter:'blur(40px)', pointerEvents:'none' }} aria-hidden="true" />
        <div className="container" style={{ position:'relative', zIndex:2 }}>
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <span className="badge badge-orange">Our Services</span>
            <h1 className="display-xl" style={{ color:'var(--navy)', marginBlock:'1rem' }}>
              Everything You Need to <span className="gradient-text">Grow with AI</span>
            </h1>
            <p className="body-lg" style={{ maxWidth:'580px', marginInline:'auto' }}>
              From strategy to deployment — we deliver end-to-end AI and technology solutions that transform how your organization operates.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ background:'var(--off-white)' }}>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(340px, 1fr))', gap:'1.5rem' }}>
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} className="card" initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i * 0.05, duration:0.5 }}
                style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                <div style={{ fontSize:'2.5rem' }}>{s.icon}</div>
                <h2 style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', fontWeight:700, color:'var(--navy)' }}>{s.title}</h2>
                <p style={{ fontSize:'0.9rem', color:'var(--text-gray)', lineHeight:1.7 }}>{s.desc}</p>
                <ul style={{ display:'flex', flexDirection:'column', gap:'0.4rem', marginTop:'0.5rem' }}>
                  {s.features.map(f => (
                    <li key={f} style={{ display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.85rem', color:'var(--text-gray)' }}>
                      <span style={{ color:'var(--orange)', fontWeight:700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn btn-outline btn-sm" style={{ marginTop:'auto', alignSelf:'flex-start' }}>
                  Get Started →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
