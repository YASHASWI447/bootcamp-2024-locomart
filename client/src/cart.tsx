import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './cart.css';

const Cart: React.FC = () => {
  const location = useLocation();
  const cartItems = location.state ? location.state.cart : []; // Get cart items passed from the home page

  const [orderSuccess, setOrderSuccess] = useState(false); // State to track if order is successful

  const handleOrder = () => {
    setOrderSuccess(true); // Set order to successful when next button is clicked
  };

  return (
    <div className="cart-container">
      {/* Navbar with Logo */}
      <nav className="navbar">
        <img src="/assets/logo.jpg" alt="Logo" className="logo" /> {/* Logo Image */}
        <div className="navbar-title">Cart</div>
      </nav>

      {/* Cart Items Section */}
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item: any, index: number) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>{item.quantity}</p>
                <p className="price">{item.price}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delivery Information Section */}
      <div className="delivery-section">
        <h3>Delivery Information</h3>

        <div className="input-container">
          <label htmlFor="area">Area</label>
          <input
            type="text"
            id="area"
            className="delivery-input"
            placeholder="Enter your area"
          />
        </div>

        <div className="input-container">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            className="delivery-input"
            placeholder="Enter your city"
          />
        </div>

        <div className="input-container">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            className="delivery-input"
            placeholder="Enter your state"
          />
        </div>

        <div className="input-container">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            className="delivery-input"
            placeholder="Enter your country"
          />
        </div>

        <div className="input-container">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            id="pincode"
            className="delivery-input"
            placeholder="Enter your pincode"
          />
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="payment-section">
        <h3>Payment Method</h3>
        <select className="payment-select">
          <option>Credit/Debit Card</option>
          <option>UPI</option>
          <option>Cash on Delivery</option>
        </select>
      </div>

      {/* Next Button */}
      <div className="next-button-container">
        <button className="next-button" onClick={handleOrder}>Next</button>
      </div>

      {/* Success Message */}
      {orderSuccess && (
        <div className="order-success-message">
          <p>Order is Successful! Thank you for shopping with us.</p>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Locomart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Cart;