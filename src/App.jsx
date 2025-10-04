import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Galaxy from './components/Galaxy';
import AboutSection from './components/Aboutsection';
import GallerySection from './components/GallerySection';
import Speakers from './components/Speakers';
import FinalSection from './components/FInalSection';

export default function App() {
  useEffect(() => {
    // Prevent horizontal scroll
    const handler = () => { 
      if (window.scrollX !== 0) window.scrollTo(0, window.scrollY); 
    };
    window.addEventListener('scroll', handler, { passive: true });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <main className="app-root">
        {/* Galaxy background */}
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100vw', 
          height: '100vh', 
          zIndex: -1,
          willChange: 'auto',
          transform: 'translateZ(0)'
        }}>
          <Galaxy 
            mouseRepulsion={true}
            mouseInteraction={true}
            density={0.5}
            glowIntensity={0.2}
            saturation={0.3}
            hueShift={240}
          />
        </div>

        <div className="wrapper-row">
          <Navbar />
        </div>
        
        <section id="home">
          <HeroSection key="hero-section" />
        </section>

        <div className="app-sections">
          <section id="about">
            <div className="section-inner">
              <AboutSection />
            </div>
          </section>

          <section id="speakers">
            <div className="section-inner">
              <Speakers />
            </div>
          </section>

          <section id="gallery">
            <GallerySection />
          </section>

          <section id="register">
            <div className="section-inner">
              <FinalSection />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
