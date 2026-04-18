import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import FeaturesStorytelling from './components/FeaturesStorytelling';
import GalleryPreview from './components/GalleryPreview';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';

export default function HomepagePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesStorytelling />
        <GalleryPreview />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}