"use client";
import React from 'react';
import './Speakers.css';

// --- Speaker Data ---
// Add the social media links for each speaker.
const speakers = [
  {
    name: 'Ishan Sharma',
    title: 'Founder, Markitup',
    image: 'https://i.pravatar.cc/400?u=ishan',
    social: {
      twitter: 'https://twitter.com/ishansharma7390',
      linkedin: 'https://linkedin.com/in/ishansharma7390',
      portfolio: 'https://markitup.in/'
    }
  },
  {
    name: 'Neha Agarwal',
    title: 'CEO, Innopreneur',
    image: 'https://i.pravatar.cc/400?u=neha',
    social: {
      twitter: '#',
      linkedin: '#',
      portfolio: '#'
    }
  },
  {
    name: 'Sonal Goel',
    title: 'IAS Officer',
    image: 'https://i.pravatar.cc/400?u=sonal',
    social: {
      twitter: '#',
      linkedin: '#',
      portfolio: '#'
    }
  },
  {
    name: 'Ankit Singh',
    title: 'Lead Developer, TechCorp',
    image: 'https://i.pravatar.cc/400?u=ankit',
    social: {
      twitter: '#',
      linkedin: '#',
      portfolio: '#'
    }
  },
];

export default function Speakers() {
  return (
    <section className="speakers-shell">
      <div className="speakers-heading">
        <p className="speakers-subtitle">Meet Our</p>
        <h2 className="speakers-main-title">Esteemed Speakers</h2>
      </div>
      <div className="speakers-grid">
        {speakers.map((speaker, index) => (
          <div key={index} className="frame">
            <div
              className="picture"
              style={{ backgroundImage: `url(${speaker.image})` }}
            ></div>
            <div className="social twitter">
              <a href={speaker.social.twitter} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-twitter"></i>
              </a>
            </div>
            <div className="social linkedin">
              <a href={speaker.social.linkedin} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-linkedin"></i>
              </a>
            </div>
            <div className="social portfolio">
              <a href={speaker.social.portfolio} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-link"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}