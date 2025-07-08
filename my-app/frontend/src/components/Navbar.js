// src/components/Navbar.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuActive, setMobileMenuActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
    
    // Get cart items count
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItemCount(cartItems.length);

    // Listen for changes in localStorage to update login status and cart count
    const handleStorageChange = () => {
      const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedInStatus);
      const currentCartItems = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItemCount(currentCartItems.length);
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check on component mount/update in case the event listener doesn't catch all scenarios
    handleStorageChange();

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };

  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuActive(!isMobileMenuActive);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    localStorage.removeItem('cart');
    setCartItemCount(0);
    navigate('/');
  };

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handler for search form submission
  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    if (searchQuery.trim()) { // Only navigate if query is not empty
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      // setSearchQuery(''); // Optional: Clear search bar after submit
    }
  };

  return (
    <header>
      <div className="top-bar">
        <Link to="/" className="logo">ECO<span>REVIVE</span></Link>
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
          />
          <button type="submit">Search</button>
        </form>
        <div className="user-actions">
          {isLoggedIn ? (
            <>
              <Link to="/cart" className="cart-icon">
                🛒
                {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
              </Link>
              <Link to="/profile" className="profile-icon">👤</Link>
              <button onClick={handleLogoutClick} className="btn btn-outline">Logout</button>
            </>
          ) : (
            <>
              <button className="btn btn-outline" onClick={() => navigate('/login')}>Login</button>
              <button className="btn btn-primary" onClick={() => navigate('/register')}>Register</button>
            </>
          )}
        </div>
      </div>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/sell" className="nav-link">Sell</Link>
        <Link to="/redesign" className="nav-link">Redesign</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>
    </header>
  );
};

export default Navbar;
