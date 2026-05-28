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
        <title>SEDECIA — Smart Solutions | AI-Powered Digital Transformation</title>
        <meta name="description" content="SEDECIA delivers AI automation, custom software, web development, cybersecurity, and digital transformation solutions for businesses." />
        <meta property="og:title" content="SEDECIA — Smart Solutions" />
        <link rel="canonical" href="https://sedeciatechnologies.com/" />
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
