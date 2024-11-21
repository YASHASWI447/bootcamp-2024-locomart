import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './signup';
import Home from './home'; // Import the Home component
import Cart from './cart';
import Products from './products';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        
        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />
        
        {/* Home Page */}
        <Route path="/home" element={<Home />} />

         {/* Cart Page */}
        <Route path="/cart" element={<Cart />} />

        {/* Products Page */}
        <Route path="/products" element={<Products />} />


        {/* Default Route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;