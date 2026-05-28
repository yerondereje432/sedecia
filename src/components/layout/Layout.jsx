import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatbotWidget from '@components/ui/ChatbotWidget';
import ScrollToTop from '@components/ui/ScrollToTop';

export default function Layout({ children }) {
  // Smooth scroll with Lenis (graceful degradation if not loaded)
  useEffect(() => {
    let lenis;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }).catch(() => {});

    return () => { if (lenis) lenis.destroy(); };
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
