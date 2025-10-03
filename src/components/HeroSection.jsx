import React, { useEffect, useRef, useState } from "react";
import "./Herosection.css";
import logo from "../assets/logo.webp";

function StatCounter({ value, label }) {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (end - start) * eased);
            
            if (ref.current) {
              ref.current.textContent = current.toLocaleString();
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [hasAnimated, value]);

  return (
    <div className="stat-item">
      <p className="stat-number">
        <span ref={ref}>0</span>+
      </p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

export default function Herosection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* Presents Text */}
        <p className={`hero-presents ${isVisible ? 'visible' : ''}`}>
          E-Cell VNIT presents
        </p>

        {/* Logo - Small at top */}
        <div className={`hero-logo-wrapper ${isVisible ? 'visible' : ''}`}>
          <img 
            src={logo} 
            alt="E-Cell VNIT" 
            className="hero-logo"
            width="120"
            height="120"
            loading="eager"
          />
        </div>

        {/* Main Title */}
        <h1 className={`hero-main-title ${isVisible ? 'visible' : ''}`}>
          <span className="title-flagship">FLAGSHIP</span>
        </h1>

        {/* Subtitle */}
        <p className={`hero-subtitle ${isVisible ? 'visible' : ''}`}>
          October 5, 2025 • VNIT Auditorium • 5 PM onwards
        </p>

        {/* CTA Buttons */}
        <div className={`hero-cta ${isVisible ? 'visible' : ''}`}>
          <a href="#register" className="cta-button cta-primary">Register now</a>
        </div>
      </div>
    </section>
  );
}
