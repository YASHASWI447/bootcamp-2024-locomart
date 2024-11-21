import React, { useState } from 'react';
import './signup.css'; // Import CSS file for styling
import axios from 'axios'

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
    const contactRegex = /^\d{10}$/; // Exactly 10 digits

    if (!formData.name || !formData.contact || !formData.email || !formData.password || !formData.address) {
      return 'All fields are required!';
    }

    if (!nameRegex.test(formData.name)) {
      return 'Name should contain only letters.';
    }

    if (!contactRegex.test(formData.contact)) {
      return 'Contact number must be exactly 10 digits.';
    }

    if (formData.password.length < 8) {
      return 'Password must be at least 8 characters.';
    }

    return '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Validate form fields
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
  
    try {
      // API call to backend
      const response = await axios.post('http://localhost:5000/api/auth/signup/user', formData);
  
      // Reset error and show success message
      console.log('Signup successful:', response.data);
      setError('');
      alert('Signup successful! You can now log in.');
    } catch (err: any) {
      // Handle backend errors
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    }
  };
  

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact" className="form-label">Contact Number:</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            className="form-input"
            placeholder="Enter your contact number"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" className="form-label">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-input"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

