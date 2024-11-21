import React from 'react';
import './home.css';

const Home: React.FC = () => {
  const products = [
    { id: 1, name: 'Milk', quantity: '1 L', price: '₹50', vendor: 'Local Dairy', image: '/assets/milk.jpg' },
    { id: 2, name: 'Rice', quantity: '5 Kg', price: '₹250', vendor: 'Grocery Mart', image: '/assets/rice.jpg' },
    { id: 3, name: 'Flowers', quantity: '1 Bunch', price: '₹100', vendor: 'Bloom Store', image: '/assets/flowers.jpg' },
    { id: 4, name: 'Bread', quantity: '400 g', price: '₹40', vendor: 'Bakery Fresh', image: '/assets/bread.jpg' },
    { id: 5, name: 'Bananas', quantity: '1 Dozen', price: '₹60', vendor: 'Fruit Market', image: '/assets/bananas.jpg' },
    { id: 6, name: 'Eggs', quantity: '12 Pieces', price: '₹75', vendor: 'Egg Mart', image: '/assets/eggs.jpg' },
    { id: 7, name: 'Tomatoes', quantity: '1 Kg', price: '₹30', vendor: 'Veggie Store', image: '/assets/tomatoes.jpg' },
    { id: 8, name: 'Onions', quantity: '1 Kg', price: '₹25', vendor: 'Veggie Store', image: '/assets/onions.jpg' },
    
  ];

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Locomart</div>
        <div className="nav-icons">
          <i className="fas fa-home"></i>
          <input type="text" className="search-bar" placeholder="Search products..." />
          <i className="fas fa-bell"></i>
          <i className="fas fa-shopping-bag"></i>
          <i className="fas fa-user-circle"></i>
        </div>
      </nav>

      {/* Products Section */}
      <div className="products-container">
        <div className="products">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-quantity">{product.quantity}</p>
              <div className="price-and-button">
                <p className="product-price">{product.price}</p>
                <button className="add-button">Add</button>
              </div>
              <p className="product-vendor">{product.vendor}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Locomart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;



