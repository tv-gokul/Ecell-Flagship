import React from 'react';
import './Galaxy.css';

export default function Galaxy() {
  return (
    <div className="galaxy-container">
      <div className="stars-layer stars-small"></div>
      <div className="stars-layer stars-medium"></div>
      <div className="stars-layer stars-large"></div>
    </div>
  );
}
