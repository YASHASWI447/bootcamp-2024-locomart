import React from 'react';
import { useLocation } from 'react-router-dom';
import './cart.css'; // Make sure to create a cart.css file for styling

// Define the Product interface
interface Product {
  id: number;
  name: string;
  quantity: string;
  price: string;
  vendor: string;
  image: string;
}

const Cart: React.FC = () => {
  const location = useLocation();
  const cartItems: Product[] = location.state?.cart || []; // Get cart items from location state

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item: Product, index: number) => (
            <div className="cart-item" key={index}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-quantity">{item.quantity}</p>
                <p className="cart-item-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <footer className="cart-footer">
        <p>&copy; 2024 Locomart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Cart;