// src/pages/Cart.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    // Load cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
    
    // Initialize quantities for each item
    const initialQuantities = {};
    cartItems.forEach((item, index) => {
      initialQuantities[index] = 1;
    });
    setQuantities(initialQuantities);
    
    // Calculate initial total
    calculateTotal(cartItems, initialQuantities);
  }, []);

  const calculateTotal = (items, qty) => {
    const totalAmount = items.reduce((acc, product, index) => {
      return acc + (parseFloat(product.price) * (qty[index] || 1));
    }, 0);
    setTotal(totalAmount);
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedQuantities = { ...quantities };
    updatedQuantities[index] = newQuantity;
    setQuantities(updatedQuantities);
    
    calculateTotal(cart, updatedQuantities);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    
    const updatedQuantities = { ...quantities };
    delete updatedQuantities[index];
    
    // Reindex the quantities
    const reindexedQuantities = {};
    Object.keys(updatedQuantities).forEach(key => {
      const newKey = parseInt(key) > index ? parseInt(key) - 1 : parseInt(key);
      reindexedQuantities[newKey] = updatedQuantities[key];
    });
    
    setCart(updatedCart);
    setQuantities(reindexedQuantities);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    calculateTotal(updatedCart, reindexedQuantities);
  };

  const handleCheckout = () => {
    // In a real app, this would redirect to a payment processor
    alert('Proceeding to checkout! Total amount: ₹' + total.toFixed(2));
    // Clear the cart after checkout
    localStorage.setItem('cart', JSON.stringify([]));
    setCart([]);
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((product, idx) => (
              <div key={idx} className="cart-item">
                <div className="cart-item-image">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="cart-item-details">
                  <h4>{product.title}</h4>
                  <p className="category">{product.category}</p>
                  <p className="condition">Condition: {product.condition}</p>
                  <p className="description">{product.description}</p>
                  <div className="price-quantity">
                    <p className="price">₹{product.price}</p>
                    <div className="quantity-controls">
                      <button 
                        onClick={() => handleQuantityChange(idx, quantities[idx] - 1)}
                        disabled={quantities[idx] <= 1}
                      >
                        -
                      </button>
                      <span>{quantities[idx]}</span>
                      <button 
                        onClick={() => handleQuantityChange(idx, quantities[idx] + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveFromCart(idx)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-item">
              <span>Subtotal:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-item total">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button 
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            <Link to="/" className="continue-shopping">Continue Shopping</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
