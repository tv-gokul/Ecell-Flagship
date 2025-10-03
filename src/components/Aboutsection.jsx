import React, { useState, useEffect, useRef } from 'react';
import './Aboutsection.css';
import logo from '../assets/logo.webp';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // When the section is at least 40% visible, trigger the animation
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entries[0].target); // Stop observing once visible
        }
      },
      { threshold: 0.8 } // Changed from 0.6 to 0.4 to trigger the effect sooner
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="about-shell" ref={sectionRef}>
      <div className="about-content">
        <div className="about-text">
          <h2 className="about-title">About Flagship</h2>
          <p>
            Flagship'25 is the inaugural event of entrepreneurship Cell of VNIT that aims to foster innovation, entrepreneurship, and leadership among young minds. This event marks the conclave of pioneering personalities that have proven themselves in different walks of life. Elite speakers who have demonstrated their expertise on the international stage and can inspire the crowd with their interactions are invited every year. Last year Flagship'23 was graced by some of the esteemed personalities like Ishan Sharma, Neha Agarwal and Sonal Goel.
          </p>
        </div>
        {/* The 'is-visible' class triggers the animation */}
        <div className={`about-logo-container ${isVisible ? 'is-visible' : ''}`}>
          <img src={logo} alt="E-Cell VNIT Logo" className="about-logo" loading="lazy" width="200" height="200" />
        </div>
      </div>
    </div>
  );
}
