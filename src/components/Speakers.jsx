"use client";
import React from 'react';
import './Speakers.css';
import comingSoonImg from '../assets/Speakers/comingsoon.png';

// --- Speaker Data ---
// Add the social media links for each speaker.
const speakers = [
  {
    name: 'Coming Soon',
    title: '',
    image: comingSoonImg,
  },
  {
    name: 'Coming Soon',
    title: '',
    image: comingSoonImg,
  },
  {
    name: 'Coming Soon',
    title: '',
    image: comingSoonImg,
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