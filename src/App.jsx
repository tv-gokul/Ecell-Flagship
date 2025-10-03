import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import Galaxy from './components/Galaxy';
import Navbar from './components/Navbar';
import FlagshipHero from './components/FlagshipHero';
import AboutSection from './components/Aboutsection';
import GallerySection from './components/GallerySection';
import Speakers from './components/Speakers';
import FinalSection from './components/FInalSection';

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
      {!loading && (
        <main className="app-root">
          <Galaxy />
          <div className="wrapper-row">
            <Navbar />
          </div>
          
          <section id="home">
            <FlagshipHero key="flagship-hero" active={!loading} />
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
              <div className="section-inner">
                <GallerySection />
              </div>
            </section>

            <section id="register">
              <div className="section-inner">
                <FinalSection />
              </div>
            </section>
          </div>
        </main>
      )}
    </>
  );
}
