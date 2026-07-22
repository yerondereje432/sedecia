import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import '@/i18n';
import '@/styles/globals.css';

import Layout from '@components/layout/Layout';
import LoadingScreen from '@components/ui/LoadingScreen';

// Lazy-loaded pages for code splitting
const Home       = lazy(() => import('@pages/Home'));
const About      = lazy(() => import('@pages/About'));
const Services   = lazy(() => import('@pages/Services'));
const Industries = lazy(() => import('@pages/Industries'));
const Portfolio  = lazy(() => import('@pages/Portfolio'));
const Contact    = lazy(() => import('@pages/Contact'));
const NotFound   = lazy(() => import('@pages/NotFound'));

export default function App() {
  const { i18n } = useTranslation();
  const [showIntroLoader, setShowIntroLoader] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.location.pathname === '/' && !sessionStorage.getItem('sedecia-intro-seen');
  });

  React.useEffect(() => {
    if (!showIntroLoader) return undefined;
    const timer = window.setTimeout(() => {
      sessionStorage.setItem('sedecia-intro-seen', 'true');
      setShowIntroLoader(false);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [showIntroLoader]);

  // Apply RTL direction for Arabic
  useEffect(() => {
    const lang = i18n.language;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <HelmetProvider>
      <Router>
        {showIntroLoader && <LoadingScreen />}
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
              <Route path="/industries" element={<Industries />} />
              <Route path="/portfolio"  element={<Portfolio />} />
              <Route path="/contact"    element={<Contact />} />
              <Route path="*"           element={<NotFound />} />
            </Routes>
          </Layout>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}
