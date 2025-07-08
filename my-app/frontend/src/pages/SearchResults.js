import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
// Assuming you might have a ProductCard component, otherwise display inline
// import ProductCard from '../components/ProductCard'; 
import './SearchResults.css'; // Create this CSS file for styling

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const query = searchParams.get('q');

  useEffect(() => {
    setIsLoading(true);
    if (query) {
      const allProducts = JSON.parse(localStorage.getItem('products')) || [];
      
      const filteredResults = allProducts.filter(product => 
        (product.title && product.title.toLowerCase().includes(query.toLowerCase())) || 
        (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
      );
      
      setResults(filteredResults);
    } else {
      setResults([]); // No query, no results
    }
    setIsLoading(false);
  }, [query]); // Re-run effect if the query changes

  return (
    <div className="search-results-container">
      <h1>Search Results for "{query}"</h1>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="results-grid">
          {results.map(product => (
            // If ProductCard component exists and is suitable:
            // <ProductCard key={product.id} product={product} />
            
            // Simple inline display for now:
            <div key={product.id} className="result-item">
              {/* Ensure product.id exists before creating Link */} 
              {product.id ? (
                <Link to={`/product/${product.id}`} className="result-link">
                  <img src={product.image || './placeholder.png'} alt={product.title || 'Product Image'} className="result-image" />
                  <div className="result-details">
                    <h2>{product.title || 'No Title'}</h2>
                    <p className="result-price">₹{product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}</p>
                    {/* <p className="result-description">{product.description ? product.description.substring(0, 100) + '...' : ''}</p> */}
                  </div>
                </Link>
              ) : (
                // Fallback display if product.id is missing
                <div className="result-link-disabled">
                  <img src={product.image || './placeholder.png'} alt={product.title || 'Product Image'} className="result-image" />
                  <div className="result-details">
                    <h2>{product.title || 'No Title'}</h2>
                    <p className="result-price">₹{product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No products found matching "{query}".</p>
      )}
    </div>
  );
};

export default SearchResults; 