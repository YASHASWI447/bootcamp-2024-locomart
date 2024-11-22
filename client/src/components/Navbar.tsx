import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="logo-link">
        <img src="/assets/logo.jpg" alt="Locomart Logo" className="logo" />
      </Link>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/cart" className="nav-link">
          Cart
        </Link>
      </div>

      {/* Search Bar */}
      <div className="nav-search">
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button className="search-button">Search</button>
      </div>
    </nav>
  );
};

export default Navbar;
