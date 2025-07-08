import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      setMessage('Error fetching users: ' + error.message);
    }
  };

  // Add new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', newUser);
      setMessage('User created successfully!');
      setNewUser({ username: '', email: '', password: '' });
      fetchUsers(); // Refresh the list
    } catch (error) {
      setMessage('Error creating user: ' + error.message);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setMessage('User deleted successfully!');
      fetchUsers(); // Refresh the list
    } catch (error) {
      setMessage('Error deleting user: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Management</h2>
      
      {/* Add User Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <button type="submit">Add User</button>
      </form>

      {/* Message Display */}
      {message && (
        <div style={{ margin: '10px 0', color: message.includes('Error') ? 'red' : 'green' }}>
          {message}
        </div>
      )}

      {/* Users List */}
      <h3>Users List</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li key={user._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
            <strong>Username:</strong> {user.username} |{' '}
            <strong>Email:</strong> {user.email} |{' '}
            <button onClick={() => handleDelete(user._id)} style={{ color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList; 