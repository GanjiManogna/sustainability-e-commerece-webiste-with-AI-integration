// src/components/CategoryCard.js

import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({ 
  title = 'Category', 
  description = '', 
  image = '/default-image.jpg',
  id = '',
  onExploreClick
}) => {
  // Use the id if provided, otherwise format the title
  const categoryPath = id || title.toLowerCase().replace(/\s+/g, '_');

  const handleClick = (e) => {
    e.preventDefault();
    if (onExploreClick) {
      onExploreClick(id);
    }
  };

  return (
    <div className="category-card">
      <img src={image} alt={title} className="category-image" />
      <div className="category-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a 
          href={`/category/${categoryPath}`} 
          className="category-btn" 
          aria-label={`Explore ${title}`}
          onClick={handleClick}
        >
          Explore
        </a>
      </div>
    </div>
  );
};

export default CategoryCard;
