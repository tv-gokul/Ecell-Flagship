import React from 'react';
import './FinalSection.css';

export default function FinalSection() {
  const handleSubmit = (event) => {
    event.preventDefault();
   
    alert('Thank you for registering!');
  };

  return (
    <section id="register" className="final-section-shell">
      <div className="final-section-heading">
        <p className="final-section-subtitle">Get Your Pass</p>
        <h2 className="final-section-title">Register for Flagship '25</h2>
      </div>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" id="name" name="name" className="form-input" placeholder="Enter your full name" autoComplete="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input type="email" id="email" name="email" className="form-input" placeholder="Enter your email address" autoComplete="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="college" className="form-label">College / Organization</label>
          <input type="text" id="college" name="college" className="form-input" placeholder="Enter your college or organization" autoComplete="organization" required />
        </div>
        <button type="submit" className="submit-button">
          Register Now
        </button>
      </form>
    </section>
  );
}
