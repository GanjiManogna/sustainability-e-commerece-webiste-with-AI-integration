// src/components/Hero.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import heroImage from './hero-banner.jpg'; // Keep the existing background image or update if needed

const Hero = () => {
  const navigate = useNavigate();

  // Function to handle smooth scrolling to the categories section
  const scrollToCategories = () => {
    const exploreSection = document.getElementById('explore-section');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback if section not found (e.g., navigate to a general products page)
      navigate('/products');
    }
  };

  return (
    <div className="hero-container new-hero-style"> {/* Added new class for potential specific styling */}
      <img src={heroImage} alt="Sustainable shopping and redesign" className="hero-background" />
      <div className="hero-overlay">
        <div className="hero-content">
          {/* Catchy headline */}
          <h1 className="hero-headline">
            <span className="headline-part">Revive.</span>
            <span className="headline-part">Redesign.</span>
            <span className="headline-part">Reuse.</span>
          </h1>
          {/* Engaging description based on user input */}
          <p className="hero-description">
            Join our sustainable marketplace! Sell your pre-loved items, discover unique second-hand treasures, or get creative redesign suggestions. Your journey to conscious consumption starts here.
          </p>
          {/* Restore original 3 Buttons */}
          <div className="hero-buttons">
            <button
              className="hero-btn green" // Original class
              onClick={() => navigate('/sell')}
            >
              Sell Your Product
            </button>
            <button
              className="hero-btn white" // Original class
              onClick={() => navigate('/redesign')}
            >
              Redesign
            </button>
            <button
              className="hero-btn outline" // Original class
              onClick={scrollToCategories}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
