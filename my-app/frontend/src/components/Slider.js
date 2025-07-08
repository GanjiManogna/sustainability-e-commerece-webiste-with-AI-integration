import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = () => {
  const slides = [
    {
      id: 1,
      title: 'Upload Your Product',
      description: 'Easily upload images and details of your used product in seconds.',
      background: '/how1.jpg',
    },
    {
      id: 2,
      title: 'AI Suggestions',
      description: 'Our AI suggests modifications, checks usability, and auto-categorizes items.',
      background: '/how2.jpg',
    },
    {
      id: 3,
      title: 'Sell or Redesign',
      description: 'Choose to sell directly or get a redesigned version with creative ideas.',
      background: '/how3.jpg',
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 6000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      className="slider"
      style={{ backgroundImage: `url(${slides[currentIndex].background})` }}
    >
      <div className="slider-overlay">
        <div className="slide-content">
          <div className="slide-text">
            <div className="slide-text-inner">
              <div className="step-circle">{slides[currentIndex].id}</div>
              <h2>{slides[currentIndex].title}</h2>
              <p>{slides[currentIndex].description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="slider-controls">
        <button className="prev-btn" onClick={prevSlide}>&#10094;</button>
        <button className="next-btn" onClick={nextSlide}>&#10095;</button>
      </div>
    </section>
  );
};

export default Slider;
