// src/pages/ExploreCategories.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import './ExploreCategories.css';

const ExploreCategories = () => {
  const navigate = useNavigate();

  const handleExploreClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

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
      title: 'Other',
      description: 'Other miscellaneous items.',
      image: '/other-category.jpg',
      id: 'other'
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
      image: '/health-category.jpg',
      id: 'health'
    },
    {
      title: 'Beauty',
      description: 'Beauty and personal care items.',
      image: '/beauty-category.jpg',
      id: 'beauty'
    },
    {
      title: 'Home Appliances',
      description: 'Quality home appliances.',
      image: '/appliances-category.jpg',
      id: 'appliances'
    },
    {
      title: 'Furniture',
      description: 'Used furniture with charm and character.',
      image: '/furniture-category.jpg',
      id: 'furniture'
    },
    {
      title: 'Outdoors',
      description: 'Outdoor gear and equipment.',
      image: '/outdoors-category.jpg',
      id: 'outdoors'
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

  return (
    <div className="explore">
      <section className="category-section">
        <h2>Explore Categories</h2>
        <div className="category-cards">
          {categories.map((cat, index) => (
            <CategoryCard
              key={index}
              title={cat.title}
              description={cat.description}
              image={cat.image}
              id={cat.id}
              onExploreClick={handleExploreClick}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExploreCategories;
