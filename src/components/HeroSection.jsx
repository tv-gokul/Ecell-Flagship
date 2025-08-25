import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Herosection.css';

export default function HeroSection() {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = titleRef.current;
      if (!el) return;

      // split into chars (preserve spaces)
      const raw = el.textContent || '';
      const chars = Array.from(raw);
      el.innerHTML = chars
        .map(ch => (ch === ' ' ? `<span class="char">&nbsp;</span>` : `<span class="char">${ch}</span>`))
        .join('');

      const charNodes = el.querySelectorAll('.char');
      gsap.set(charNodes, { yPercent: 100, opacity: 1 });

      // create timeline (paused) — will play only after preloader finishes
      tlRef.current = gsap.timeline({ paused: true });

      // Increased durations/stagger for a slightly slower pop
      tlRef.current.to(charNodes, {
        yPercent: 0,
        duration: 1,      // increased from 0.55
        ease: 'power4.out',
        stagger: 0.07       // increased slightly from 0.06
      });

      // also animate tagline slightly after title (optional)
      tlRef.current.fromTo('.hero-tagline', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.55'); // increased from 0.5
    }, rootRef);

    const playTimeline = () => {
      if (tlRef.current && !tlRef.current.isActive()) tlRef.current.play();
    };

    // play if preloader already finished, otherwise listen for event
    if (window.__preloaderDone) {
      playTimeline();
    } else {
      window.addEventListener('preloader:done', playTimeline, { once: true });
    }

    return () => {
      window.removeEventListener('preloader:done', playTimeline);
      if (tlRef.current) {
        tlRef.current.kill();
        tlRef.current = null;
      }
      ctx.revert();
    };
  }, []);

  return (
    <section id="home" ref={rootRef} className="hero-section section-blend">
      <div id="hero-logo-dock" className="hero-logo-dock" />
      <div className="hero-content">
        <h1 className="hero-title" ref={titleRef}>FLAGSHIP 25</h1>
        <p className="hero-tagline">Tagline or brief description goes here.</p>
      </div>
    </section>
  );
}