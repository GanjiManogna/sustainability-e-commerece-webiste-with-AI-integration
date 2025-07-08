import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import './Sell.css'; // Ensure CSS is linked
import axios from 'axios';

const Sell = () => {
  const navigate = useNavigate(); // Initialize if using navigate for redirects
  const { productId } = useParams(); // Get productId from URL
  const isEditMode = Boolean(productId); // Check if we are in edit mode
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    condition: 'Used - Like New',
    description: '',
    // images: [], // We'll handle image separately for edit mode
  });
  const [imageFile, setImageFile] = useState(null); // Store the new file if selected
  const [imagePreview, setImagePreview] = useState(''); // Existing or new preview
  const [submitStatus, setSubmitStatus] = useState(''); 

  // Categories from previous version (ensure this list is accurate)
  const categories = [
    { id: "electronics", name: "Electronics" },
    { id: "fashion", name: "Fashion" },
    { id: "books", name: "Books" },
    { id: "homedecor", name: "Home Decor" },
    { id: "toys", name: "Toys" },
    { id: "kitchen", name: "Kitchen" },
    { id: "furniture", name: "Furniture" },
    { id: "automotive", name: "Automotive" },
    { id: "sports", name: "Sports" },
    { id: "health", name: "Health & Wellness" },
    { id: "beauty", name: "Beauty" },
    { id: "garden", name: "Garden" },
    { id: "pets", name: "Pets" },
    { id: "art", name: "Art" }
  ];

  // Effect to load product data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const allProducts = JSON.parse(localStorage.getItem('products')) || [];
      const productToEdit = allProducts.find(p => p.id === productId);
      
      if (productToEdit) {
        setFormData({
          title: productToEdit.title,
          category: productToEdit.category,
          price: productToEdit.price,
          condition: productToEdit.condition,
          description: productToEdit.description,
        });
        // Set the existing image preview
        setImagePreview(productToEdit.image || ''); 
      } else {
        console.error("Product not found for editing.");
        alert("Product not found. Redirecting...");
        navigate('/profile'); // Redirect if product not found
      }
    }
    // Reset form if navigating from edit mode back to create mode (though unlikely with current setup)
    // You might want more robust reset logic depending on navigation patterns
  }, [productId, isEditMode, navigate]);

  // Clear status message after a few seconds
  useEffect(() => {
      if (submitStatus) {
          const timer = setTimeout(() => setSubmitStatus(''), 4000);
          return () => clearTimeout(timer);
      }
  }, [submitStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImageFile(file); // Store the file object
        // Generate and set the new preview
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
        // Clean up the object URL when the component unmounts or preview changes
        // return () => URL.revokeObjectURL(previewUrl); // This cleanup needs careful placement, perhaps in a useEffect
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('');

    // Basic validation (image optional for edit if already exists)
    if (!formData.title || !formData.category || !formData.price || !formData.condition || !formData.description || (!isEditMode && !imageFile)) {
      setSubmitStatus('error');
      alert('Please fill in all required fields and upload an image (required for new listings).');
      return;
    }

    // Get current user email
    const ownerEmail = localStorage.getItem('userEmail');
    if (!ownerEmail) {
        alert('Error: Could not identify user. Please log in again.');
        setSubmitStatus('error');
      return;
    }

    const processProductSave = (imageData) => {
        const productData = {
            id: isEditMode ? productId : Date.now().toString(), // Keep existing ID or generate new one
            title: formData.title,
            category: formData.category,
            price: parseFloat(formData.price).toFixed(2),
            condition: formData.condition,
            description: formData.description,
            image: imageData, // Use new or existing image data
            dateAdded: isEditMode ? (JSON.parse(localStorage.getItem('products')).find(p=>p.id===productId)?.dateAdded || new Date().toISOString()) : new Date().toISOString(), // Keep original date or set new
            ownerEmail: ownerEmail
        };

        // Save to localStorage
        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
        let updatedProducts;

        if (isEditMode) {
            updatedProducts = existingProducts.map(p => p.id === productId ? productData : p);
        } else {
            updatedProducts = [...existingProducts, productData];
        }
        
        localStorage.setItem('products', JSON.stringify(updatedProducts));

        // Show success message & redirect or reset
        setSubmitStatus('success');
        if (isEditMode) {
            alert('Product updated successfully!');
            navigate(`/product/${productId}`); // Navigate back to product detail
        } else {
            // Reset form for new product
            setFormData({ title: '', category: '', price: '', condition: 'Used - Like New', description: '' });
            setImageFile(null);
            setImagePreview('');
            if(document.getElementById('image-upload')) {
               document.getElementById('image-upload').value = null; // Clear file input
            }
        }
    };

    // If a new image was selected, read it
    if (imageFile) {
        const reader = new FileReader();
        // reader.onloadend = () => {
        //     processProductSave(reader.result); // Use the new base64 image data
        // };
        reader.onloadend = async () => {
          // Prepare product data for backend
          const userId = localStorage.getItem('userId'); // or get from your auth context
          // Map 'Used - Like New' to 'Like New' for backend
          const mappedCondition = formData.condition === 'Used - Like New' ? 'Like New' : formData.condition;
          const productData = {
              title: formData.title,
              category: formData.category,
              price: parseFloat(formData.price),
              condition: mappedCondition, // mapped to match backend enum
              description: formData.description,
              image: reader.result, // base64 string
              seller: userId // must be called 'seller'
          };
          try {
              await axios.post('http://localhost:5001/api/products', productData);
              console.log('SELLER:', userId);
              console.log('Product Data:', productData);
              setSubmitStatus('success');
              // Optionally reset form or redirect
              setFormData({ title: '', category: '', price: '', condition: 'Used - Like New', description: '' });
              setImageFile(null);
              setImagePreview('');
              if(document.getElementById('image-upload')) {
                  document.getElementById('image-upload').value = null;
              }
          } catch (error) {
              setSubmitStatus('error');
              alert('There was an error saving your product to the database.');
          }
      };
        reader.onerror = () => {
            console.error("Error reading file");
            setSubmitStatus('error');
            alert('There was an error processing the new image.');
        }
        reader.readAsDataURL(imageFile);
    } else if (isEditMode && imagePreview) {
        // If editing and no new image, use the existing image data (which is in imagePreview as base64)
        processProductSave(imagePreview);
    } else {
         // Should not happen due to validation, but as a fallback
         alert('Image is missing.');
         setSubmitStatus('error');
    }
  };

  return (
    <div className="sell-page-container">
      <h2 className="sell-heading">{isEditMode ? 'Edit Your Product' : 'Sell Your Product'}</h2>
      <p className="sell-subheading">
        {isEditMode ? 'Update the details of your listing below.' : 'Give your pre-loved item a new story. It\'s easy, sustainable, and rewarding!'}
      </p>
      
      {submitStatus === 'error' && <p className="status-message error">Please check the form for errors.</p>}
      {submitStatus === 'success' && <p className="status-message success">{isEditMode ? 'Product updated successfully!' : 'Product listed successfully!'}</p>}

      <form onSubmit={handleSubmit} className="sell-form">
        <label htmlFor="title">Title *</label>
        <input
                  type="text"
          id="title"
                  name="title"
          placeholder="e.g., Vintage Denim Jacket, Mid-Century Armchair"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />

        <label htmlFor="category">Category *</label>
        <select 
          id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
          <option value="" disabled>Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
        </select>

        <div className="form-group"> {/* Keep price wrapped if needed for styling */} 
          <label htmlFor="price">Price (₹) *</label>
          <input
                  type="number"
            id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
            min="0"
            step="0.01"
          />
        </div>

        <label htmlFor="condition">Condition *</label>
        <select
          id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
        >
          <option>Used - Like New</option>
          <option>Used - Very Good</option>
          <option>Used - Good</option>
          <option>Used - Acceptable</option>
        </select>

        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
                  name="description"
          rows="4"
          placeholder="Describe your item's features, history, and any flaws. Be detailed!"
                  value={formData.description}
                  onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="image-upload" className="upload-label">Upload Image *</label>
        <input
                  type="file"
          id="image-upload"
                  name="images"
          onChange={handleImageChange}
          accept="image/png, image/jpeg, image/webp"
          // Make 'required' conditional for edit mode if an image already exists
          required={!isEditMode || !imagePreview} 
        />
        <div className="sell-image-container">
          {imagePreview ? (
            <img src={imagePreview} alt="Product Preview" />
          ) : (
            <p className="preview-placeholder">Image preview will appear here.</p>
          )}
        </div>

        <button type="submit" className="submit-button">{isEditMode ? 'Update Your Item' : 'List Your Item'}</button>
      </form>
    </div>
  );
};

export default Sell;
