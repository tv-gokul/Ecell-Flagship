import React, { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import FlagshipHero from './components/FlagshipHero';

// Lazy load ALL heavy components including Galaxy
const Galaxy = lazy(() => import('./components/Galaxy'));
const AboutSection = lazy(() => import('./components/Aboutsection'));
const GallerySection = lazy(() => import('./components/GallerySection'));
const Speakers = lazy(() => import('./components/Speakers'));
const FinalSection = lazy(() => import('./components/FInalSection'));

export default function App() {
  useEffect(() => {
    const handler = () => { if (window.scrollX !== 0) window.scrollTo(0, window.scrollY); };
    window.addEventListener('scroll', handler, { passive:true });
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
          zIndex: -1
        }}>
          <Suspense fallback={<div style={{ width: '100%', height: '100%', backgroundColor: '#0a0e1a' }} />}>
            <Galaxy 
              mouseRepulsion={true}
              mouseInteraction={true}
              density={0.5}
              glowIntensity={0.2}
              saturation={0.3}
              hueShift={240}
            />
          </Suspense>
        </div>

        <div className="wrapper-row">
          <Navbar />
        </div>
        
        <section id="home">
          <FlagshipHero key="flagship-hero" active={true} />
        </section>

        <div className="app-sections">
          <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
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
              <div style={{ width: '100vw', height: '100vh' }}>
                <GallerySection grayscale={false} />
              </div>
            </section>

            <section id="register">
              <div className="section-inner">
                <FinalSection />
              </div>
            </section>
          </Suspense>
        </div>
      </main>
    </>
  );
}
