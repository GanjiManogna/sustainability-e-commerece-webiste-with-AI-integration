import React from 'react';
import ReactDOM from 'react-dom/client'; // No change if you're using React 18+
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a root element using React 18's createRoot API
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app with StrictMode for better error handling
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Measure performance if required, you can log it to console or send to an analytics endpoint
reportWebVitals(console.log); // Optional: For performance tracking
