// src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Slider from './components/Slider';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
import UserDashboard from './pages/UserDashboard';
import ProductManagement from './pages/ProductManagement';

// Pages
import Home from './pages/Home';
import Category from './pages/Category';
import CategoryDetails from './pages/CategoryDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Sell from './pages/Sell';
import Redesign from './pages/Redesign';
import Upload from './pages/Upload';
import AllProducts from './pages/AllProducts';
import FAQPage from './pages/FAQPage';

import './App.css';

// Layout component to handle common UI
const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isLoginOrRegister =
    location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <>
      {!isLoginOrRegister && <Navbar />}
      {!isLoginOrRegister && isHome && <Hero />}
      {!isLoginOrRegister && isHome && <Slider />}
      <main>{children}</main>
      {!isLoginOrRegister && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:categoryName" element={<CategoryDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sell/:productId?" element={<Sell />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/redesign" element={<Redesign />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/users" element={<UserDashboard />} />
          <Route path="/manage-products" element={<ProductManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
