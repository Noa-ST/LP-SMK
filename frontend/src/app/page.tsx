import React from 'react';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import AboutUs from '@/components/landing/AboutUs';
import CafeMenu from '@/components/landing/CafeMenu';
import KidsPlayground from '@/components/landing/KidsPlayground';
import Footer from '@/components/landing/Footer';
import ScrollProgress from '@/components/landing/ScrollProgress';
import FloatingToysBackground from '@/components/landing/FloatingToysBackground';

export default function LandingPage() {
  return (
    <div className="min-h-screen selection:bg-accent selection:text-white overflow-x-hidden relative mesh-gradient">
      {/* Nền động đồ chơi */}
      <FloatingToysBackground />
      <ScrollProgress />
      <Header />
      
      <main>
        <HeroSection />
        
        <section id="about">
          <AboutUs />
        </section>
        
        <section id="menu">
          <CafeMenu />
        </section>
        
        <section id="play">
          <KidsPlayground />
        </section>
      </main>

      <Footer />
    </div>
  );
}
