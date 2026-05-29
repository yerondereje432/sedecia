import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Analytics } from '@vercel/analytics/react';
import '@/i18n';
import '@/styles/globals.css';

import Layout from '@components/layout/Layout';
import LoadingScreen from '@components/ui/LoadingScreen';

// Lazy-loaded pages for code splitting
const Home       = lazy(() => import('@pages/Home'));
const About      = lazy(() => import('@pages/About'));
const Services   = lazy(() => import('@pages/Services'));
const Solutions  = lazy(() => import('@pages/Solutions'));
const Industries = lazy(() => import('@pages/Industries'));
const Portfolio  = lazy(() => import('@pages/Portfolio'));
const Blog       = lazy(() => import('@pages/Blog'));
const Contact    = lazy(() => import('@pages/Contact'));
const Careers    = lazy(() => import('@pages/Careers'));
const FAQ        = lazy(() => import('@pages/FAQ'));
const NotFound   = lazy(() => import('@pages/NotFound'));

export default function App() {
  const { i18n } = useTranslation();

  // Apply RTL direction for Arabic
  useEffect(() => {
    const lang = i18n.language;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <HelmetProvider>
      <Router>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: 'var(--font-body)',
              borderRadius: '12px',
              border: '1px solid var(--mid-gray)',
              boxShadow: 'var(--shadow-md)',
            },
            success: {
              iconTheme: { primary: '#F47920', secondary: '#fff' },
            },
          }}
        />
        <Suspense fallback={<LoadingScreen />}>
          <Layout>
            <Routes>
              <Route path="/"           element={<Home />} />
              <Route path="/about"      element={<About />} />
              <Route path="/services"   element={<Services />} />
              <Route path="/solutions"  element={<Solutions />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/portfolio"  element={<Portfolio />} />
              <Route path="/blog"       element={<Blog />} />
              <Route path="/contact"    element={<Contact />} />
              <Route path="/careers"    element={<Careers />} />
              <Route path="/faq"        element={<FAQ />} />
              <Route path="*"           element={<NotFound />} />
            </Routes>
          </Layout>
        </Suspense>
        <Analytics />
      </Router>
    </HelmetProvider>
  );
}
