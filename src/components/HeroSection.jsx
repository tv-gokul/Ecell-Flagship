"use client";
import React, { useEffect, useRef, useState } from "react";
import "./Herosection.css";

export default function HeroSection() {
  const titleRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el || el.dataset.split) return;

    const rawText = el.textContent || "";
    el.innerHTML = "";
    el.dataset.split = "true";

    rawText.split("").forEach((char, index) => {
      const wrap = document.createElement("span");
      wrap.className = "char-wrap";
      // Set the index as a CSS variable for dynamic delay
      wrap.style.setProperty("--char-index", index);

      const inner = document.createElement("span");
      inner.className = "char";
      inner.textContent = char === " " ? "\u00A0" : char;
      wrap.appendChild(inner);
      el.appendChild(wrap);
    });

    const startAnimation = () => setIsReady(true);

    if (window.__preloaderDone) {
      startAnimation();
    } else {
      window.addEventListener("preloader:done", startAnimation, { once: true });
    }

    return () => {
      window.removeEventListener("preloader:done", startAnimation);
    };
  }, []);

  return (
    <section id="home" className="hero-section section-blend">
      <div id="hero-logo-dock" className="hero-logo-dock" />
      <div className="hero-content">
        <h1
          className={`hero-title ${isReady ? "title-animate" : ""}`}
          ref={titleRef}
          aria-label="FLAGSHIP 25"
        >
          FLAGSHIP 25
        </h1>
        <p className={`hero-tagline ${isReady ? "tagline-animate" : ""}`}>
          Tagline or brief description goes here.
        </p>
      </div>
    </section>
  );
}