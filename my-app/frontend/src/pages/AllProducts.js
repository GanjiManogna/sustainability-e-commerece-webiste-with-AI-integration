import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AllProducts.css'; // We'll create this CSS file next

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Load all products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleAddToCart = (product) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', location.pathname + location.search);
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.title} added to cart!`);
    // Optionally, trigger a storage event or update context if Navbar needs immediate update
    window.dispatchEvent(new Event('storage')); 
  };

  return (
    <div className="all-products-page">
      <h2>All Products</h2>
      {products.length === 0 ? (
        <p className="no-products-message">No products available yet.</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.image ? (
                  <img src={product.image} alt={product.title} />
                ) : (
                  <div className="no-image">No Image Available</div>
                )}
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <p className="category-tag">{product.category}</p>
                <p className="price">₹{product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}</p>
                <p className="description">{product.description}</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts; 