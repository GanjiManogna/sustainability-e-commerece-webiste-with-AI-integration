// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';  // If you have custom styling for your header

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/path-to-your-logo/logo.svg" alt="Sustainify" />
        </Link>
      </div>
      
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sell">Sell</Link></li>
          <li><Link to="/redesign">Redesign</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
