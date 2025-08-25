import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import Preloader from './components/Preloader';
import HeroSection from './components/Herosection';
import GallerySection from './components/GallerySection';
import FinalSection from './components/FInalSection';
import Navbar from './components/Navbar';

export default function App() {
  const [loading, setLoading] = useState(true);

  // add "is-loading" class while loader is active
  useEffect(() => {
    if (loading) {
      document.body.classList.add('is-loading');
    } else {
      document.body.classList.remove('is-loading');
    }
    // cleanup on unmount
    return () => document.body.classList.remove('is-loading');
  }, [loading]);

  return (
    <>
      <Background />          
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      <main className="w-full">
        <Navbar />
        <HeroSection />
        <GallerySection />
        <FinalSection />
      </main>
    </>
  );
}