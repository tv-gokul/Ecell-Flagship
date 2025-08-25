import React, { useState, useEffect } from 'react';
import './Preloader.css';
import logo from '../assets/logo.png'; // confirm this path exists

export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 3000; // ms visible time
    let rafId = null;

    const tick = (time) => {
      const pct = Math.min(100, ((time - start) / duration) * 100);
      setProgress(Math.round(pct));
      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else {
        // notify others that loader finished (before unmount)
        try {
          window.__preloaderDone = true;
          window.dispatchEvent(new CustomEvent('preloader:done'));
        } catch (e) { /* ignore */ }

        // slight delay so final animation/appearance can complete
        setTimeout(() => onFinish && onFinish(), 450);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [onFinish]);

  return (
    <div className="preloader-container">
      <div className="preloader-content">
        <div className="logo-wrap">
          <img src={logo} alt="logo" className="preloader-logo" />
        </div>

        <p className="logo-subtitle">LOADING</p>

        <div className="preloader-bar-outer" aria-hidden>
          <div
            className="preloader-bar-fill"
            style={{ width: `${progress}%` }}
          />
          <div className="preloader-bar-sparkles" aria-hidden />
        </div>

        <div className="preloader-percent">{progress}%</div>
      </div>
    </div>
  );
}
