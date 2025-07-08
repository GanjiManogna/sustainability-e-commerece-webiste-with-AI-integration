// // src/pages/Redesign.js

// import React, { useState } from 'react';
// import './Redesign.css';

// const Redesign = () => {
//   const [designRequest, setDesignRequest] = useState({
//     title: '',
//     category: '',
//     description: '',
//     image: null
//   });

//   const [previewImage, setPreviewImage] = useState(null);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDesignRequest({ ...designRequest, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setDesignRequest({ ...designRequest, image: file });
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!designRequest.title || !designRequest.category || !designRequest.description || !designRequest.image) {
//       setError('All fields including the image are required.');
//       return;
//     }

//     setError('');
//     console.log('Redesign Request Submitted:', designRequest);
//     alert('Redesign request submitted successfully!');
//     // Add your API call logic here
//   };
  

//   return (
//     <div className="redesign-container">
//       <h2 className="redesign-heading">Request a Redesign</h2>
//       <p className="redesign-subheading">Let us transform your old treasures into something new and unique!</p>

//       {error && <div className="error-msg">{error}</div>}
//       <form className="redesign-form" onSubmit={handleSubmit}>
        
//         <label>Product Title</label>
//         <input
//           type="text"
//           name="title"
//           placeholder="Product Title"
//           value={designRequest.title}
//           onChange={handleChange}
//         />

//         <label>Select Category</label>
//         <select name="category" value={designRequest.category} onChange={handleChange}>
//           <option value="">Select Category</option>
//           <option value="fashion">Fashion</option>
//           <option value="furniture">Furniture</option>
//           <option value="homedecor">Home Decor</option>
//           <option value="accessories">Accessories</option>
//           <option value="other">Other</option>
//         </select>

//         <label>Description</label>
//         <textarea
//           name="description"
//           placeholder="Describe how you'd like it redesigned..."
//           value={designRequest.description}
//           onChange={handleChange}
//         ></textarea>

//         {/* Image Upload Section */}
//         <label className="upload-label">Upload Image</label>
//         <input type="file" accept="image/*" onChange={handleImageChange} />

//         {previewImage && (
//           <div className="redesign-image-container">
//             <img src={previewImage} alt="Preview" />
//           </div>
//         )}

//         <button type="submit">Request Redesign</button>
//       </form>
//     </div>
//   );
// };
// 'https://ecb35341256029a180.gradio.live'
// export default Redesign;




// src/pages/Redesign.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redesign = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Open Gradio link in new tab
    window.open('https://be5fc780d67baa4e20.gradio.live', '_blank');

    // Navigate the user back to the home page (or any page you prefer)
    navigate('/');
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Opening AI Redesign Tool...</h2>
    </div>
  );
};

export default Redesign;

