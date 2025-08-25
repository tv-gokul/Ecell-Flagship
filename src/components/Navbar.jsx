import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.png'; // replace with your logo path

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#events', label: 'Events' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <a className="brand" href="#home" aria-label="Home">
          <img src={logo} alt="logo" className="brand-logo" />
        </a>

        <button
          className={`nav-toggle${open ? ' is-open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="hamburger" />
        </button>

        <nav className={`nav-links-wrap${open ? ' open' : ''}`} aria-label="Primary">
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <a href="#register" className="btn btn-primary" onClick={() => setOpen(false)}>
              Register
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}