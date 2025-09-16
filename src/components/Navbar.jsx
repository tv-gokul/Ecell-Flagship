"use client";
import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from '../assets/logo.png';
import logo2 from '../assets/ecell.png';

// Define your navigation links here
const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#speakers', label: 'Speakers' },
  // The "Contact" link is removed
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const observer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Create an observer to watch which section is on screen
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting)?.target;
        if (visibleSection) {
          setActiveSection(visibleSection.id);
        }
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Trigger when section is in the middle of the screen
        threshold: 0,
      }
    );

    // Observe each section by its ID
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      observer.current.observe(section);
    });

    // Cleanup observer on component unmount
    return () => {
      sections.forEach((section) => {
        observer.current.unobserve(section);
      });
    };
  }, []);

  return (
    <header className={`nav-shell ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-bar">
        {/* Group the logos on the left */}
        <div className="nav-left">
          <a href="#home">
            <img src={logo2} alt="E-Cell VNIT Logo" className="navbar-logo-img ecell-logo" />
          </a>
          <a href="#home">
            <img src={logo} alt="Flagship Logo" className="navbar-logo-img flagship-logo" />
          </a>
        </div>
      
        <nav className="nav-center">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${activeSection === link.href.substring(1) ? 'is-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
          {/* The Register button is now part of the central navigation */}
          <button className="cta-btn">Register</button>
        </nav>

        <div className="nav-right">
          {/* The standalone Register button is removed, only the hamburger remains */}
          <button
            className="nav-hamburger"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className={`hamburger ${open ? 'open' : ''}`}></div>
          </button>
        </div>
      </div>

      <div className={`nav-overlay ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="overlay-inner">
          <div className="overlay-head">
            <a href="#" className="overlay-logo">
              FLAGSHIP
            </a>
            <button
              className="close-btn"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <span />
              <span />
            </button>
          </div>
          <ul className="overlay-links">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="overlay-footer">
            <button
              className="cta-btn wide"
              onClick={() => setOpen(false)}
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}