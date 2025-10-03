"use client";
import React from 'react';
import './Speakers.css';
import speaker1 from '../assets/Speakers/6.png';
import speaker2 from '../assets/Speakers/7.png';
import speaker3 from '../assets/Speakers/8.png';

// --- Speaker Data ---
// Add the social media links for each speaker.
const speakers = [
  {
    name: 'Anup Gupta',
    title: 'Founder, MathonGo & Angel Investor',
    image: speaker1,
  },
  {
    name: 'Tharun Naik',
    title: 'Founder, Adko; 3X TEDx Speaker, IIT KGP Alumnus',
    image: speaker2,
  },
  {
    name: 'Sanjay Arora',
    title: 'Founder & CEO, Shells Advertisement',
    image: speaker3,
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
            <img
              src={speaker.image}
              alt={speaker.name}
              className="picture"
              loading="lazy"
              width="400"
              height="300"
            />
            <div className="speaker-info">
              <h3 className="speaker-name">{speaker.name}</h3>
              <p className="speaker-title">{speaker.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}