import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductDetail.css'; // We'll create this CSS file

const ProductDetail = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    // Find the product by ID (ensure IDs are strings if stored as strings)
    const foundProduct = allProducts.find(p => p && p.id && p.id.toString() === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Check if the current user is the owner
      const userEmail = localStorage.getItem('userEmail');
      setIsOwner(userEmail === foundProduct.ownerEmail);
    } else {
      setProduct(null); // Product not found
    }
    
    setIsLoading(false);
  }, [productId]); // Re-run effect if productId changes

  if (isLoading) {
    return <div className="product-detail-page loading"><p>Loading product details...</p></div>;
  }

  if (!product) {
    return <div className="product-detail-page not-found"><p>Product not found.</p></div>;
  }

  // Function to handle adding to cart (basic example)
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const isAlreadyInCart = cart.some(item => item.id === product.id);
    if (!isAlreadyInCart) {
        const updatedCart = [...cart, product];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert('Product added to cart!');
        // Trigger storage event to update Navbar cart count
        window.dispatchEvent(new Event('storage')); 
    } else {
        alert('Product is already in the cart.');
    }
  };

  // Navigate to the Sell page for editing (assuming Sell page handles edits)
  const handleEditProduct = () => {
    navigate(`/sell/${product.id}`); // Or a dedicated edit route if you have one
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image-section">
          <img 
            src={product.image || './placeholder.png'} 
            alt={product.title || 'Product Image'} 
            className="product-image"
          />
        </div>
        <div className="product-info-section">
          <h1 className="product-title">{product.title || 'No Title'}</h1>
          <p className="product-price">₹{product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}</p>
          
          <div className="product-meta">
            <p className="product-condition"><strong>Condition:</strong> {product.condition || 'N/A'}</p>
            <p className="product-category">
              <strong>Category:</strong> <Link to={`/category/${product.category}`}>{product.category || 'N/A'}</Link>
            </p>
            {/* Optional: Display seller info if needed and not the owner */}
            {!isOwner && product.ownerEmail && (
              <p className="product-seller"><strong>Seller:</strong> {product.ownerEmail.split('@')[0] /* Show username part */}</p>
            )}
          </div>
          
          <p className="product-description">{product.description || 'No description available.'}</p>
          
          <div className="product-actions">
            {isOwner ? (
              // Show Edit button if user is the owner
              <button onClick={handleEditProduct} className="action-button edit-button">
                Edit Your Listing
              </button>
            ) : (
              // Show Add to Cart button if user is not the owner
              <button onClick={handleAddToCart} className="action-button add-to-cart-button">
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 