// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css'; // We'll create this CSS file next

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    username: '',
    bio: '',
    location: ''
  });
  const [profileMessage, setProfileMessage] = useState(''); // State for notifications

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedIn) {
      navigate('/login');
      return;
    }

    // Get user email from localStorage
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.error("User email not found");
      navigate('/login');
      return;
    }
    
    const userProfileKey = `userProfile_${userEmail}`;
    const allUserProfilesKey = 'allUserProfiles';
    const wishlistKey = `wishlist_${userEmail}`;

    // Get user profile data using user-specific key
    const userProfile = JSON.parse(localStorage.getItem(userProfileKey)) || {};
    const allUserProfiles = JSON.parse(localStorage.getItem(allUserProfilesKey)) || {};
    
    // Generate a unique username if not already set
    if (!userProfile.username) {
      // Create a unique username based on email and timestamp
      let uniqueUsername;
      let isUsernameUnique = false;
      let attempts = 0;
      const baseUsername = userEmail.split('@')[0];

      // Ensure the generated username is truly unique across all profiles
      while (!isUsernameUnique && attempts < 10) { // Limit attempts to avoid infinite loops
        const timestamp = new Date().getTime().toString().slice(-4 - attempts); // Vary timestamp slightly
        uniqueUsername = `${baseUsername}${timestamp}`;
        
        isUsernameUnique = !Object.values(allUserProfiles).some(profile => profile.username === uniqueUsername);
        attempts++;
      }
      
      // If we couldn't find a unique name after attempts, fallback to a simpler unique name
      if (!isUsernameUnique) {
        uniqueUsername = `${baseUsername}${new Date().getTime()}`;
      }

      userProfile.username = uniqueUsername;
      userProfile.joinDate = userProfile.joinDate || new Date().toISOString().split('T')[0]; // Ensure joinDate is set
      
      // Update user-specific profile
      localStorage.setItem(userProfileKey, JSON.stringify(userProfile));
      
      // Update allUserProfiles
      allUserProfiles[userEmail] = userProfile;
      localStorage.setItem(allUserProfilesKey, JSON.stringify(allUserProfiles));
    } else {
        // Ensure existing profile is in allUserProfiles (for backward compatibility or edge cases)
        if (!allUserProfiles[userEmail]) {
            allUserProfiles[userEmail] = userProfile;
            localStorage.setItem(allUserProfilesKey, JSON.stringify(allUserProfiles));
        }
    }
    
    // Set user info with email and profile data
    setUserInfo({ 
      email: userEmail,
      username: userProfile.username,
      bio: userProfile.bio || 'No bio added yet',
      location: userProfile.location || 'Location not specified',
      joinDate: userProfile.joinDate || new Date().toISOString().split('T')[0] // Use consistent joinDate
    });

    // Set edited info for editing mode
    setEditedInfo({
      username: userProfile.username,
      bio: userProfile.bio || '',
      location: userProfile.location || ''
    });

    // Get user's products
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    const usersOwnProducts = allProducts.filter(product => product.ownerEmail === userEmail);
    setUserProducts(usersOwnProducts);

    // Get orders and wishlist (placeholder data for now)
    setOrders([
      { id: '123', date: '2024-07-20', total: '₹45.99', status: 'Delivered', items: ['Used Book', 'Old Lamp'] },
      { id: '456', date: '2024-07-15', total: '₹102.50', status: 'Shipped', items: ['Vintage Jacket'] },
    ]);

    // Load user's wishlist
    const storedWishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    setWishlist(storedWishlist);
  }, [navigate]);

  // Effect to clear profile message
  useEffect(() => {
    if (profileMessage) {
      const timer = setTimeout(() => {
        setProfileMessage('');
      }, 3000); // Clear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [profileMessage]);

  const handleRemoveFromWishlist = (productIdToRemove) => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return; // Should be logged in, but check anyway
    
    const wishlistKey = `wishlist_${userEmail}`;
    const updatedWishlist = wishlist.filter(item => item.id !== productIdToRemove);
    
    setWishlist(updatedWishlist);
    localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist));
    setProfileMessage('Item removed from wishlist.'); // Set message instead of alert
  };

  const handleDeleteProduct = (e, productId) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this product?')) {
      const allProducts = JSON.parse(localStorage.getItem('products')) || [];
      const updatedProducts = allProducts.filter(product => product.id !== productId);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      // Update state with the filtered list relevant to the user
      setUserProducts(updatedProducts.filter(product => product.ownerEmail === userInfo.email));
      setProfileMessage('Product deleted successfully!'); // Use message state here too
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    // Validate username
    if (!editedInfo.username.trim()) {
      setProfileMessage('Username cannot be empty'); // Use message state
      return;
    }
    
    const currentUserEmail = userInfo.email;
    const userProfileKey = `userProfile_${currentUserEmail}`;
    const allUserProfilesKey = 'allUserProfiles';
    
    // Check if username is already taken by another user
    const allUserProfiles = JSON.parse(localStorage.getItem(allUserProfilesKey)) || {};
    
    // Only check for username conflicts with other users
    const usernameConflict = Object.entries(allUserProfiles).some(([email, profile]) => {
      return email !== currentUserEmail && profile.username === editedInfo.username.trim();
    });
    
    if (usernameConflict) {
      setProfileMessage('This username is already taken. Please choose another one.'); // Use message state
      return;
    }
    
    // Update user profile object
    const userProfile = {
      username: editedInfo.username.trim(), // Trim username
      bio: editedInfo.bio,
      location: editedInfo.location,
      joinDate: userInfo.joinDate
    };
    
    // Update user-specific profile in localStorage
    localStorage.setItem(userProfileKey, JSON.stringify(userProfile));
    
    // Update in allUserProfiles
    allUserProfiles[currentUserEmail] = userProfile;
    localStorage.setItem(allUserProfilesKey, JSON.stringify(allUserProfiles));
    
    // Update user info state
    setUserInfo({
      ...userInfo,
      username: userProfile.username,
      bio: editedInfo.bio,
      location: editedInfo.location
    });
    
    setIsEditing(false);
    setProfileMessage('Profile updated successfully!'); // Use message state
  };

  const handleCancelEdit = () => {
    // Reset edited info to current user info
    setEditedInfo({
      username: userInfo.username,
      bio: userInfo.bio,
      location: userInfo.location
    });
    
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo({
      ...editedInfo,
      [name]: value
    });
  };

  const handleHelpClick = () => {
    navigate('/contact');
  };

  if (!userInfo) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      {/* Display Profile Message */} 
      {profileMessage && <div className="profile-message show">{profileMessage}</div>}
      
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {userInfo.username.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="profile-title">
          <h1>Welcome, {userInfo.username}!</h1>
          <p className="profile-email">{userInfo.email}</p>
          <p className="profile-join-date">Member since: {userInfo.joinDate}</p>
        </div>
      </div>

      {/* User Information Section */}
      <section className="profile-section user-info">
        <div className="section-header">
          <h2>Profile Information</h2>
          {!isEditing ? (
            <button className="edit-btn" onClick={handleEditProfile}>
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button className="save-btn" onClick={handleSaveProfile}>Save</button>
              <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
            </div>
          )}
        </div>
        
        {isEditing ? (
          <div className="edit-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={editedInfo.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
              />
              <small className="form-help">Choose a unique username that represents you</small>
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={editedInfo.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
                rows="3"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={editedInfo.location}
                onChange={handleInputChange}
                placeholder="Enter your location"
              />
            </div>
          </div>
        ) : (
          <div className="profile-details">
            <div className="detail-item">
              <span className="detail-label">Username:</span>
              <span className="detail-value">{userInfo.username}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Bio:</span>
              <span className="detail-value">{userInfo.bio}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{userInfo.location}</span>
            </div>
          </div>
        )}
      </section>

      {/* User's Products Section Updated */}
      <section className="profile-section user-products">
        <h2>{userInfo.username}'s Products</h2>
        {userProducts.length === 0 ? (
          <div className="empty-state">
            <p>You haven't listed any products yet.</p>
            <button className="add-product-btn" onClick={() => navigate('/sell')}>
              List Your First Product
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {userProducts.map(product => (
              <div key={product.id} className="profile-product-card-container">
                <Link to={`/product/${product.id}`} className="product-card-link">
                  <div className="product-card">
                    <div className="product-image">
                      {product.image ? (
                        <img src={product.image} alt={product.title} />
                      ) : (
                        <div className="no-image">No Image Available</div>
                      )}
                    </div>
                    <div className="product-info">
                      <h3>{product.title}</h3>
                      <p className="price">₹{product.price}</p>
                      <p className="condition">Condition: {product.condition}</p>
                      {/* Description Removed */}
                    </div>
                  </div>
                </Link>
                {/* Delete button outside the Link */}
                <button 
                  className="delete-btn profile-delete-btn" // Added profile-delete-btn for specific styling if needed
                  onClick={(e) => handleDeleteProduct(e, product.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Orders List Section */}
      <section className="profile-section order-list">
        <h2>{userInfo.username}'s Order History</h2>
        {orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <ul>
            {orders.map(order => (
              <li key={order.id} className="order-item">
                <strong>Order #{order.id}</strong> ({order.date}) - Total: {order.total} - Status: {order.status}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Wishlist Section Updated */}
      <section className="profile-section wishlist">
        <h2>{userInfo.username}'s Wishlist</h2>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="wishlist-grid">
            {wishlist.map(item => (
              <div key={item.id} className="wishlist-item-card">
                <Link to={`/product/${item.id}`} className="product-card-link">
                  <div className="product-card">
                    <div className="product-image">
                      {item.image ? (
                        <img src={item.image} alt={item.title} />
                      ) : (
                        <div className="no-image">No Image Available</div>
                      )}
                    </div>
                    <div className="product-info">
                      <h3>{item.title}</h3>
                      <p className="price">₹{item.price ? parseFloat(item.price).toFixed(2) : 'N/A'}</p>
                    </div>
                  </div>
                </Link>
                <button 
                  className="remove-wishlist-btn" 
                  onClick={() => handleRemoveFromWishlist(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Help Section */}
      <section className="profile-section help-section">
        <h2>Need Help?</h2>
        <button onClick={handleHelpClick} className="profile-button help-btn">
          Contact Support
        </button>
      </section>
    </div>
  );
};

export default Profile; 