import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@components/sections/HeroSection';
import StatsSection from '@components/sections/StatsSection';
import ServicesSection from '@components/sections/ServicesSection';
import AboutPreview from '@components/sections/AboutPreview';
import IndustriesSection from '@components/sections/IndustriesSection';
import TestimonialsSection from '@components/sections/TestimonialsSection';
import CTASection from '@components/sections/CTASection';
import TechStackSection from '@components/sections/TechStackSection';

export default function Home() {
  return (
    <>
      <Helmet>
  <title>SEDECIA — AI-Powered Digital Transformation | Ethiopia</title>
  <meta name="description" content="SEDECIA is Ethiopia's leading AI solutions company. We deliver AI automation, custom software, web development, cybersecurity, and digital transformation for businesses of all sizes." />
  <meta name="keywords" content="AI company Ethiopia, digital transformation Ethiopia, software development Addis Ababa, AI automation, SEDECIA Technologies" />
  <meta property="og:title" content="SEDECIA Technologies — AI-Powered Digital Transformation" />
  <meta property="og:description" content="Ethiopia's AI solutions company. Automation, software, web, cybersecurity and more — built for businesses that want to grow." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sedecia.vercel.app/" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="SEDECIA — AI-Powered Digital Transformation" />
  <meta name="twitter:description" content="Ethiopia's AI solutions company delivering automation, software, and digital transformation." />
  <link rel="canonical" href="https://sedecia.com/" />
</Helmet>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutPreview />
      <TechStackSection />
      <IndustriesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
