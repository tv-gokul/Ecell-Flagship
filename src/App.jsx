import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import FlagshipHero from './components/FlagshipHero';
import GallerySection from './components/GallerySection';
import FinalSection from './components/FinalSection';
import Navbar from './components/Navbar';

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
        {!loading && <FlagshipHero key="flagship-hero" active={!loading} />}
        <div className="app-sections">
          <section>
            <div className="section-inner">
              <GallerySection />
            </div>
          </section>
          <section>
            <div className="section-inner">
              <FinalSection />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}