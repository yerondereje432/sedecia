import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatbotWidget from '@components/ui/ChatbotWidget';
import ScrollToTop from '@components/ui/ScrollToTop';

export default function Layout({ children }) {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    };
    resetScroll();
    const frame = requestAnimationFrame(resetScroll);
    const timer = window.setTimeout(resetScroll, 80);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [location.pathname]);

  // Smooth scroll with Lenis (graceful degradation if not loaded)
  useEffect(() => {
    let lenis;
    let active = true;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });
      lenisRef.current = lenis;
      function raf(time) {
        if (!active) return;
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }).catch(() => {});

    return () => { active = false; lenisRef.current = null; if (lenis) lenis.destroy(); };
  }, []);

  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
      <ChatbotWidget />
      <ScrollToTop />
    </>
  );
}
