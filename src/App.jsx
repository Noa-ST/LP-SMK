import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutUs from './components/AboutUs';
import CafeMenu from './components/CafeMenu';
import KidsPlayground from './components/KidsPlayground';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

const SectionWrapper = ({ children, id }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    id={id}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <div className="min-h-screen bg-white selection:bg-accent selection:text-white overflow-x-hidden">
      <ScrollProgress />
      <Header />
      
      <main>
        <HeroSection />
        
        <SectionWrapper id="about">
          <AboutUs />
        </SectionWrapper>
        
        <SectionWrapper id="menu">
          <CafeMenu />
        </SectionWrapper>
        
        <SectionWrapper id="play">
          <KidsPlayground />
        </SectionWrapper>
      </main>

      <Footer />
    </div>
  );
}

export default App;
