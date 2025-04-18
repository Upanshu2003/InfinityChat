import React, { useState, useEffect } from 'react';
import HeroSection from '../components/herosection/herosection';
import FeatureSection from '../components/featureSection/featureSection';
import Planet from '../assets/genrated_image.webp';
import AboutSection from '../components/aboutSection/aboutSection';
import ContactSection from '../components/contact/contactSection';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-80 z-0 transition-all duration-700"
        style={{
          backgroundImage: `url(${Planet})`,
          transform: `scale(${1 + scrollPosition * 0.0003})`,
          filter: `blur(${Math.min(scrollPosition * 0.02, 5)}px)`
        }}
      />
      <div className="relative z-10">
        <HeroSection />
        <FeatureSection />
        <AboutSection />
        <ContactSection />
      </div>
    </div>
  );
};

export default Home;
