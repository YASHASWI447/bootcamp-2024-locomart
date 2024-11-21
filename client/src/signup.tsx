// import React, { useState } from 'react';
// import './signup.css'; // Import CSS file for styling
// import axios from 'axios'

// const Signup: React.FC = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     contact: '',
//     address: '',
//     email: '',
//     password: '',
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces
//     const contactRegex = /^\d{10}$/; // Exactly 10 digits

//     if (!formData.name || !formData.contact || !formData.email || !formData.password || !formData.address) {
//       return 'All fields are required!';
//     }

//     if (!nameRegex.test(formData.name)) {
//       return 'Name should contain only letters.';
//     }

//     if (!contactRegex.test(formData.contact)) {
//       return 'Contact number must be exactly 10 digits.';
//     }

//     if (formData.password.length < 8) {
//       return 'Password must be at least 8 characters.';
//     }

//     return '';
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
  
//     // Validate form fields
//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }
  
//     try {
//       // API call to backend
//       const response = await axios.post('http://localhost:5000/api/auth/signup/user', formData);
  
//       // Reset error and show success message
//       console.log('Signup successful:', response.data);
//       setError('');
//       alert('Signup successful! You can now log in.');
//     } catch (err: any) {
//       // Handle backend errors
//       setError(err.response?.data?.error || 'Signup failed. Please try again.');
//     }
//   };
  

//   return (
//     <div className="signup-container">
//       <h2 className="signup-title">Sign Up</h2>
//       <form className="signup-form" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name" className="form-label">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             className="form-input"
//             placeholder="Enter your full name"
//             value={formData.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="contact" className="form-label">Contact Number:</label>
//           <input
//             type="tel"
//             id="contact"
//             name="contact"
//             className="form-input"
//             placeholder="Enter your contact number"
//             value={formData.contact}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="address" className="form-label">Address:</label>
//           <input
//             type="text"
//             id="address"
//             name="address"
//             className="form-input"
//             placeholder="Enter your address"
//             value={formData.address}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email" className="form-label">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className="form-input"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password" className="form-label">Password:</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             className="form-input"
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={handleChange}
//           />
//         </div>
//         {error && <p className="error-message">{error}</p>}
//         <button type="submit" className="signup-button">Sign Up </button>
        

//       </form>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';

const Signup: React.FC = () => {
  // State to toggle between customer and vendor roles
  const [role, setRole] = useState<'customer' | 'vendor'>('customer');

  // Separate states for customer and vendor
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

  // Handle input changes for customer
  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  // Handle input changes for vendor
  const handleVendorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  // Form submission logic
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let endpoint = '';
      let data = {};

      // Determine the endpoint and data based on role
      if (role === 'customer') {
        endpoint = '/api/auth/signup/user';
        data = customerData;

        // Validation for customer
        if (!customerData.name || !customerData.contact || !customerData.email || !customerData.password || !customerData.address) {
          setError('All fields are required for Customer signup.');
          setSuccess('');
          return;
        }
      } else {
        endpoint = '/api/auth/signup/vendor';
        data = vendorData;

        // Validation for vendor
        if (!vendorData.vendorName || !vendorData.contactNo || !vendorData.email || !vendorData.password || !vendorData.shopName || !vendorData.address) {
          setError('All fields are required for Vendor signup.');
          setSuccess('');
          return;
        }
      }

      // Make API call
      const response = await axios.post(`http://localhost:5000${endpoint}`, data);
      setSuccess(response.data.message);
      setError('');

      // Reset the form based on the role
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
    } catch (err: any) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>

      {/* Role toggle buttons */}
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

      {/* Form */}
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* Customer Form */}
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

        {/* Vendor Form */}
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

        {/* Error and Success Messages */}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;