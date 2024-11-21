import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [role, setRole] = useState<'customer' | 'vendor'>('customer');
  const [customerData, setCustomerData] = useState({
    name: '',
    contact: '',
    address: '',
    email: '',
    password: '',
  });

  const [vendorData, setVendorData] = useState({
    vendorName: '',
    contactNo: '',
    shopName: '',
    address: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); 
  
  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleVendorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let endpoint = '';
      let data = {};

      if (role === 'customer') {
        endpoint = '/api/auth/signup/user';
        data = customerData;

        if (!customerData.name || !customerData.contact || !customerData.email || !customerData.password || !customerData.address) {
          setError('All fields are required for Customer signup.');
          setSuccess('');
          return;
        }
      } else {
        endpoint = '/api/auth/signup/vendor';
        data = vendorData;

        if (!vendorData.vendorName || !vendorData.contactNo || !vendorData.email || !vendorData.password || !vendorData.shopName || !vendorData.address) {
          setError('All fields are required for Vendor signup.');
          setSuccess('');
          return;
        }
      }

      const response = await axios.post(`http://localhost:5000${endpoint}`, data);
      setSuccess(response.data.message);
      setError('');

      if (role === 'customer') {
        setCustomerData({
          name: '',
          contact: '',
          address: '',
          email: '',
          password: '',
        });
      } else {
        setVendorData({
          vendorName: '',
          contactNo: '',
          shopName: '',
          address: '',
          email: '',
          password: '',
        });
      }

      // Redirect to login page after successful signup
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      {/* Logo Section */}
      <div className="logo-container">
        <img src="/assets/logo.jpg" alt="Logo" className="logo" /> {/* Logo Image */}
      </div>

      <h2 className="signup-title">Sign Up</h2>

      <div className="role-toggle">
        <button
          className={`role-button ${role === 'customer' ? 'active' : ''}`}
          onClick={() => setRole('customer')}
        >
          Customer
        </button>
        <button
          className={`role-button ${role === 'vendor' ? 'active' : ''}`}
          onClick={() => setRole('vendor')}
        >
          Vendor
        </button>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        {role === 'customer' && (
          <>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                placeholder="Enter your full name"
                value={customerData.name}
                onChange={handleCustomerChange}
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
                value={customerData.contact}
                onChange={handleCustomerChange}
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
                value={customerData.address}
                onChange={handleCustomerChange}
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
                value={customerData.email}
                onChange={handleCustomerChange}
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
                value={customerData.password}
                onChange={handleCustomerChange}
              />
            </div>
          </>
        )}

        {role === 'vendor' && (
          <>
            <div className="form-group">
              <label htmlFor="vendorName" className="form-label">Vendor Name:</label>
              <input
                type="text"
                id="vendorName"
                name="vendorName"
                className="form-input"
                placeholder="Enter your vendor name"
                value={vendorData.vendorName}
                onChange={handleVendorChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="shopName" className="form-label">Shop Name:</label>
              <input
                type="text"
                id="shopName"
                name="shopName"
                className="form-input"
                placeholder="Enter your shop name"
                value={vendorData.shopName}
                onChange={handleVendorChange}
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
                value={vendorData.address}
                onChange={handleVendorChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactNo" className="form-label">Contact Number:</label>
              <input
                type="tel"
                id="contactNo"
                name="contactNo"
                className="form-input"
                placeholder="Enter your contact number"
                value={vendorData.contactNo}
                onChange={handleVendorChange}
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
                value={vendorData.email}
                onChange={handleVendorChange}
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
                value={vendorData.password}
                onChange={handleVendorChange}
              />
            </div>
          </>
        )}

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
