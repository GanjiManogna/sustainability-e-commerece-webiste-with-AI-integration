import React from "react";
import "./About.css"; // Ensure styling is included

const About = () => {
  return (
    <div className="about-page-container">
      {/* Hero/Intro Section */}
      <section className="about-hero">
        <h1>About ECOREVIVE</h1>
        <p className="about-subtitle">Giving Pre-Loved Items a New Chapter</p>
        <p className="about-intro-text">
          Welcome to ECOREVIVE, where sustainability meets style and savings! We believe that every item deserves a second chance, and our platform is dedicated to fostering a vibrant community around the reuse and redesign of pre-loved goods. We're more than just a marketplace; we're a movement towards a more conscious and circular way of living.
        </p>
      </section>

      {/* Mission/Vision Section */}
      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          To empower individuals to make sustainable choices by providing an easy, enjoyable, and impactful platform for buying, selling, and redesigning second-hand items. We aim to significantly reduce waste, promote mindful consumption, and build a community passionate about environmental responsibility.
        </p>
      </section>

      {/* Why Choose ECOREVIVE Section */}
      <section className="about-why-choose">
        <h2>Why Choose ECOREVIVE?</h2>
        <p className="why-choose-intro">Our platform is designed with sustainability at its core. Here's how joining ECOREVIVE makes a difference:</p>
        <div className="why-choose-cards">
          {/* Reason 1 */}
          <div className="why-choose-card">
            <span className="why-choose-icon">♻️</span>
            <h3>Reduce Waste</h3>
            <p>
              By extending the life of products, we help reduce what goes to landfill and decrease demand for new manufacturing. Every item traded is a win for the planet!
            </p>
          </div>
          {/* Reason 2 */}
          <div className="why-choose-card">
            <span className="why-choose-icon">💰</span>
            <h3>Save & Earn Money</h3>
            <p>
              Find quality second-hand items at a fraction of their original price, or turn your unused items into cash. Sustainable living can be budget-friendly too!
            </p>
          </div>
          {/* Reason 3 */}
          <div className="why-choose-card">
            <span className="why-choose-icon">🌱</span>
            <h3>Support Sustainability</h3>
            <p>
              Every transaction on our platform contributes to a more circular economy and promotes sustainable consumption habits. Be part of the solution!
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="about-cta">
          <h2>Join the ECOREVIVE Movement!</h2>
          <p>Ready to make a difference? Start exploring, selling, or redesigning today and contribute to a more sustainable future, one item at a time.</p>
          {/* Optional: Add buttons linking to Sell page or Explore Categories */}
          {/* <button className="cta-button">Start Selling</button> */}
          {/* <button className="cta-button">Explore Products</button> */}
      </section>
    </div>
  );
};

export default About;
