import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [wishlistMessage, setWishlistMessage] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);

  useEffect(() => {
    // Load products
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
    // Check login status and get user email
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail');
    setIsLoggedIn(loggedInStatus);
    setUserEmail(email);
    // Load wishlist if logged in
    if (loggedInStatus && email) {
      const storedWishlist = JSON.parse(localStorage.getItem(`wishlist_${email}`)) || [];
      setWishlist(storedWishlist);
    }
  }, []);

  useEffect(() => {
    if (wishlistMessage) {
      const timer = setTimeout(() => {
        setWishlistMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [wishlistMessage]);

  const categories = [
    {
      title: 'Electronics',
      description: 'Phones, gadgets, and devices ready for a second life.',
      image: '/electronics-category.jpg',
      id: 'electronics'
    },
    {
      title: 'Fashion',
      description: 'Trendy second-hand clothing and accessories.',
      image: '/fashion-category.jpg',
      id: 'fashion'
    },
    {
      title: 'Books',
      description: 'Books for every age and interest, waiting for a new home.',
      image: '/books-category.jpg',
      id: 'books'
    },
    {
      title: 'Home Decor',
      description: 'Stylish and sustainable home decor items.',
      image: '/homedecor-category.jpg',
      id: 'homedecor'
    },
    {
      title: 'Toys',
      description: 'Second-hand toys in great condition.',
      image: '/toys-category.jpg',
      id: 'toys'
    },
    {
      title: 'Kitchen',
      description: 'Quality kitchen items for your home.',
      image: '/kitchen-category.jpg',
      id: 'kitchen'
    },
    {
      title: 'Automotive',
      description: 'Auto parts and accessories.',
      image: '/automotive-category.jpg',
      id: 'automotive'
    },
    {
      title: 'Sports',
      description: 'Sports equipment and gear.',
      image: '/sports-category.jpg',
      id: 'sports'
    },
    {
      title: 'Health & Wellness',
      description: 'Health and wellness products.',
      image: '/health&wellness-category.jpg',
      id: 'health'
    },
    {
      title: 'Beauty',
      description: 'Beauty and personal care items.',
      image: '/beauty-category.jpg',
      id: 'beauty'
    },
    {
      title: 'Furniture',
      description: 'Used furniture with charm and character.',
      image: '/furniture-category.jpg',
      id: 'furniture'
    },
    {
      title: 'Garden',
      description: 'Garden tools and supplies.',
      image: '/garden-category.jpg',
      id: 'garden'
    },
    {
      title: 'Pets',
      description: 'Pet supplies and accessories.',
      image: '/pets-category.jpg',
      id: 'pets'
    },
    {
      title: 'Art',
      description: 'Art pieces and collectibles.',
      image: '/art-category.jpg',
      id: 'art'
    }
  ];

  const categoriesToShow = showAllCategories ? categories : categories.slice(0, 4);

  const handleExploreClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };
  
  const isInWishlist = (productId) => {
    return Array.isArray(wishlist) && wishlist.some(item => item && item.id === productId);
  };

  const handleToggleWishlist = (e, product) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isLoggedIn) {
      setWishlistMessage('Please log in to manage your wishlist.');
      return;
    }
    
    if (product.ownerEmail === userEmail) {
      setWishlistMessage("You cannot add your own product to the wishlist.");
      return;
    }

    let updatedWishlist;
    const wishlistItemExists = isInWishlist(product.id);

    if (wishlistItemExists) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id);
      setWishlistMessage(`${product.title} removed from wishlist.`);
    } else {
      updatedWishlist = [...(wishlist || []), product];
      setWishlistMessage(`${product.title} added to wishlist.`);
    }

    setWishlist(updatedWishlist);
    localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(updatedWishlist));
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', location.pathname + location.search);
      setWishlistMessage('Please log in to add items to your cart.');
      return;
    }

    if (product.ownerEmail === userEmail) {
      setWishlistMessage("You cannot add your own product to the cart.");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const isAlreadyInCart = existingCart.some(item => item.id === product.id);
    if (isAlreadyInCart) {
      setWishlistMessage('This item is already in your cart.');
      return;
    }
    
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setWishlistMessage(`${product.title} added to cart!`);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="home">
      {wishlistMessage && <div className="wishlist-message show">{wishlistMessage}</div>}
      
      <section className="category-section" id="explore-section">
        <h2>Explore Categories</h2>
        <div className="category-cards">
          {categoriesToShow.map((cat, index) => (
            <CategoryCard
              key={cat.id}
              title={cat.title}
              description={cat.description}
              image={cat.image}
              id={cat.id}
              onExploreClick={() => handleExploreClick(cat.id)}
            />
          ))}
        </div>
        {categories.length > 4 && (
          <button 
            className="toggle-categories-btn"
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            {showAllCategories ? 'Show Less Categories' : 'Show More Categories'}
          </button>
        )}
      </section>

      <section className="products-section">
        <h2>All Products</h2>
        {products.length === 0 ? (
          <div className="no-products">
            <p>No products available yet.</p>
            <p>Be the first to list a product!</p>
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
                      <p className="category-tag">{product.category}</p>
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
      </section>
    </div>
  );
};

export default Home;
