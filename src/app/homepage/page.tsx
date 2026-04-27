import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import FeaturesStorytelling from './components/FeaturesStorytelling';
import GalleryPreview from './components/GalleryPreview';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import WhychooseUs from './components/WhychooseUs';
import Faq from './components/Faq';
import ProductCards from './components/Productcards';
import AwardsSection from './components/AwardsSection';

export default function HomepagePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* - w-full: Ensures components take up full width.
          - max-w-screen-2xl: Prevents content from stretching too wide on ultra-wide monitors.
          - mx-auto: Centers the content.
          - px-4/sm:px-6/lg:px-8: Adds responsive horizontal padding.
          - space-y-16/md:space-y-24: Adds consistent vertical spacing between sections.
      */}
      <main className="flex-grow w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-24 py-8 md:py-12">
        <HeroSection />
        <FeaturesStorytelling />
        <ProductCards />
        <GalleryPreview />
        <AboutSection />
        <WhychooseUs />
        <AwardsSection />
        <TestimonialsSection />
        <Faq />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}