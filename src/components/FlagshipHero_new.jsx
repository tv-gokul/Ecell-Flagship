"use client";
import React, { useEffect, useRef } from "react";
import "./FlagshipHero.css";
import logo from "../assets/logo.webp";

function StatCounter({ value, label, active }) {
  const ref = useRef(null);

  useEffect(() => {
    if (active && ref.current) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const startTime = performance.now() + 1500;

      const animate = (currentTime) => {
        if (currentTime < startTime) {
          requestAnimationFrame(animate);
          return;
        }

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
    }
  }, [active, value]);

  return (
    <div className="stat-item">
      <p className="stat-number">
        <span ref={ref}>0</span>+
      </p>
      <p className="stat-label">{label}</p>
    </div>
  );
}

export default function FlagshipHero({ active = false }) {
  const title = "FLAGSHIP";
  const year = "'25";

  return (
    <div className="flagship-hero-shell">
      <div className="flagship-inner">
        <h2 className={`presenter-title ${active ? 'active' : ''}`}>
          E-CELL VNIT presents      
        </h2>
        <img 
          src={logo} 
          alt="E-Cell Logo" 
          className="hero-logo"
          width="250"
          height="250"
          loading="eager"
        />
        <h1 className="flagship-title" aria-label={title + year}>
          <span className="title-content">
            {title.split("").map((char, i) => (
              <span
                key={i}
                className={`letter-wrap ${active ? 'active' : ''}`}
                style={{ 
                  animationDelay: `${0.18 + i * 0.05}s`,
                  '--letter-index': i
                }}
              >
                <span className="letter-core">
                  {char}
                </span>
              </span>
            ))}

            <span className="year-wrap">
              {year.split("").map((c, i) => (
                <span
                  key={c + i}
                  className={`year-char ${active ? 'active' : ''}`}
                  style={{ animationDelay: `${1.0 + i * 0.08}s` }}
                >
                  {c}
                </span>
              ))}
            </span>
          </span>
        </h1>

        <div className="hero-details">
          <p className={`event-info ${active ? 'active' : ''}`}>
            This year Flagship'25 is happening on the 5th of October. Venue: VNIT Auditorium from 5 pm
          </p>

          <div className="stats-container">
            <StatCounter value={10000} label="Reach" active={active} />
            <StatCounter value={5000} label="Footfall" active={active} />
            <StatCounter value={3} label="Speakers" active={active} />
          </div>
        </div>
      </div>
    
    </div>
  );
}
