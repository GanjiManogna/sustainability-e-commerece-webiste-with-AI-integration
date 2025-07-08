import '../pages/Home.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    
    const filtered = allProducts.filter(
      (product) => product.category.toLowerCase() === categoryName.toLowerCase()
    );
    setProducts(filtered);
    
    const formattedTitle = categoryName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setCategoryTitle(formattedTitle);
    
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail');
    setIsLoggedIn(loggedInStatus);
    setUserEmail(email);
    if (loggedInStatus && email) {
      const storedWishlist = JSON.parse(localStorage.getItem(`wishlist_${email}`)) || [];
      setWishlist(storedWishlist);
    }

  }, [categoryName]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  const isInWishlist = (productId) => {
    return Array.isArray(wishlist) && wishlist.some(item => item && item.id === productId);
  };

  const handleToggleWishlist = (e, product) => {
    e.stopPropagation(); 
    e.preventDefault();

    if (!isLoggedIn) {
      setMessage('Please log in to manage your wishlist.');
      return;
    }
    
    if (product.ownerEmail === userEmail) {
       setMessage("You cannot add your own product to the wishlist.");
      return;
    }

    let updatedWishlist;
    const wishlistItemExists = isInWishlist(product.id);

    if (wishlistItemExists) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
      setMessage(`${product.title} removed from wishlist.`);
    } else {
      updatedWishlist = [...(wishlist || []), product];
      setMessage(`${product.title} added to wishlist.`);
    }

    setWishlist(updatedWishlist);
    localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); 
    e.preventDefault();
    
    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', location.pathname + location.search);
      setMessage('Please log in to add items to your cart.');
      return;
    }

    if (product.ownerEmail === userEmail) {
      setMessage("You cannot add your own product to the cart.");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const isAlreadyInCart = existingCart.some(item => item.id === product.id);
    if (isAlreadyInCart) {
      setMessage('This item is already in your cart.');
      return;
    }
    
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setMessage(`${product.title} added to cart!`);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="category-details-page products-section">
      {message && <div className="wishlist-message show">{message}</div>}
      
      <h2>Products in {categoryTitle}</h2>
      
      {products.length === 0 ? (
        <div className="no-products">
          <p>No products found in this category.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => {
             const isProductOwner = product.ownerEmail === userEmail;
             const inWishlist = isInWishlist(product.id);
             
             return (
                <Link key={product.id} to={`/product/${product.id}`} className="product-card-link">
                  <div className="product-card">
                     {isLoggedIn && !isProductOwner && (
                        <button 
                            className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
                            onClick={(e) => handleToggleWishlist(e, product)}
                            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                            {inWishlist ? '♥' : '♡'} 
                        </button>
                    )}
                    <div className="product-image">
                      {product.image ? (
                        <img src={product.image} alt={product.title} />
                      ) : (
                        <div className="no-image">No Image Available</div>
                      )}
                    </div>
                    <div className="product-info">
                      <h3>{product.title}</h3>
                      <p className="price">₹{product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}</p>
                      <p className="condition">Condition: {product.condition || 'N/A'}</p>
                      {!isProductOwner && (
                        <button 
                          className="add-to-cart-btn" 
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </Link>
             );
          })}
        </div>
      )}
    </div>
  );
};

export default CategoryDetails;
