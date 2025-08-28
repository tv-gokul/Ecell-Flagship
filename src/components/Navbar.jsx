"use client";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png"; // replace with your logo path

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#events", label: "Events" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`nav-shell ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="nav-bar">
        <div className="nav-left">
          <a href="#" className="nav-logo" aria-label="Flagship Home">
            <span className="logo-glow" />
            FLAGSHIP
          </a>
        </div>
        <nav className="nav-center" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="nav-link">
              <span>{l.label}</span>
              <i />
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <button className="cta-btn">Register</button>
          <button
            className={`nav-hamburger ${open ? "is-active" : ""}`}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
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
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
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