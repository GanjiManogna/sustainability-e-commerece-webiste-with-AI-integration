// src/pages/FAQPage.js
import React, { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { faqData } from '../data/faqData'; // Import the FAQ data
import './FAQPage.css'; // Import CSS

const FAQPage = () => {
  const location = useLocation();
  const highlightedRef = useRef(null); // Ref to manage previously highlighted element

  useEffect(() => {
    // Clear previous highlight effect if any
    if (highlightedRef.current) {
      highlightedRef.current.classList.remove('highlighted');
      highlightedRef.current = null;
    }

    const hash = location.hash.substring(1); // Get hash without '#' e.g., 'how-to-sell'
    
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        // Scroll to the element, centering it vertically if possible
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Add highlight class
        element.classList.add('highlighted');
        highlightedRef.current = element; // Store reference to the currently highlighted element

        // Optional: Remove highlight after a delay
        const timer = setTimeout(() => {
          if (element) { // Check if element still exists
             element.classList.remove('highlighted');
             highlightedRef.current = null; // Clear ref after timeout
          }
        }, 3000); // Highlight for 3 seconds

        // Cleanup the timer if the component unmounts or the hash changes before timeout
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash]); // Re-run the effect if the hash changes

  return (
    <div className="faq-page-container">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqData.length > 0 ? (
          faqData.map((faq) => (
            // Add id attribute matching the slug for scrolling/highlighting
            <div key={faq.id} id={faq.slug} className="faq-item">
              <h2 className="faq-question">{faq.question}</h2>
              <p className="faq-answer">{faq.answer}</p>
            </div>
          ))
        ) : (
          <p>No FAQs available at the moment.</p>
        )}
      </div>
       <p className="faq-more-questions">
        Still have questions? <Link to="/contact">Contact Us</Link> directly!
       </p>
    </div>
  );
};

export default FAQPage;
