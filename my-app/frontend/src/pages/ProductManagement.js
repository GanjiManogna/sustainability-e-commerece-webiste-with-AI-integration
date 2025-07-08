import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    condition: 'New'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user's products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Replace userId with actual user ID from authentication
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5001/api/products/user/${userId}`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching products: ' + error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId'); // Get from auth context
      const response = await axios.post('http://localhost:5001/api/products', {
        ...newProduct,
        userId
      });
      
      // Update localStorage with the new product
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      const updatedProducts = [...storedProducts, response.data];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      setNewProduct({
        title: '',
        description: '',
        price: '',
        category: '',
        image: '',
        condition: 'New'
      });
      fetchProducts();
    } catch (error) {
      setError('Error creating product: ' + error.message);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const userId = localStorage.getItem('userId');
        await axios.delete(`http://localhost:5001/api/products/${productId}`, {
          data: { userId }
        });
        
        // Update localStorage by removing the deleted product
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const updatedProducts = storedProducts.filter(product => product._id !== productId);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        
        fetchProducts();
      } catch (error) {
        setError('Error deleting product: ' + error.message);
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add Product Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                value={newProduct.title}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <input
                type="text"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Condition
              </label>
              <select
                value={newProduct.condition}
                onChange={(e) => setNewProduct({ ...newProduct, condition: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              >
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                rows="4"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">{product.title}</h3>
              <p className="text-gray-700 text-base mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-bold">${product.price}</span>
                <span className="text-gray-500">{product.condition}</span>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement; 