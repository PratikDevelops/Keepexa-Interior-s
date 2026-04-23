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
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesStorytelling />
        <ProductCards />
        <GalleryPreview />
        <AboutSection />
        <WhychooseUs />
        <AwardsSection/>
        <TestimonialsSection />
        <Faq />
        <ContactSection />
      </main>
      <Footer />

    </>
  );
}