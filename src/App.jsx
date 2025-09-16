import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import FlagshipHero from './components/FlagshipHero';
import AboutSection from './components/AboutSection'; // Import the new component
import GallerySection from './components/GallerySection';
import Speakers from './components/Speakers'; // Import the new component
import FinalSection from './components/FinalSection';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('is-loading', loading);
    return () => document.body.classList.remove('is-loading');
  }, [loading]);

  useEffect(() => {
    const handler = () => { if (window.scrollX !== 0) window.scrollTo(0, window.scrollY); };
    window.addEventListener('scroll', handler, { passive:true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <Preloader onFinish={() => setLoading(false)} />
      <main className="app-root">
        <div className="wrapper-row">
          <Navbar />
        </div>
        
        {/* Assign an ID to each section for navigation */}
        <section id="home">
          {!loading && <FlagshipHero key="flagship-hero" active={!loading} />}
        </section>

        <div className="app-sections">
          {/* Add the new About section here */}
          <section id="about">
            <div className="section-inner">
              <AboutSection />
            </div>
          </section>

          <section id="gallery">
            <div className="section-inner">
              <GallerySection />
            </div>
          </section>

          {/* Add the new Speakers section here */}
          <section id="speakers">
            <div className="section-inner">
              <Speakers />
            </div>
          </section>

          <section id="contact">
            <div className="section-inner">
              <FinalSection />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}