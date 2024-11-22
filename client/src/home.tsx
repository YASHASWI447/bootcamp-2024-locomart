import React, { useEffect, useState } from "react";
import axios from "./services/axiosInstance"; // Import your axios instance
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar
import "./home.css";

interface Product {
  id: number;
  productName: string;
  stock: number;
  price: string; // Keep as string for currency formatting
  image: string;
  vendorId: number;
  vendor: string; // Adding vendor field for display
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get<{ products: Product[] }>("/api/products");
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const goToCart = () => {
    navigate("/cart", { state: { cart } });
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} /> {/* Pass search props */}
      
      <h1>Customer Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="products-container">
          <div className="products">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.productName} className="product-image" />
                <h3 className="product-name">{product.productName}</h3>
                <p className="product-quantity">Stock: {product.stock}</p>
                <div className="price-and-button">
                  <p className="product-price">{product.price}</p>
                  <button className="add-button" onClick={() => addToCart(product)}>
                    Add
                  </button>
                </div>
                <p className="product-vendor">{product.vendor}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="next-button-container">
        <button className="next-button" onClick={goToCart}>
          Next
        </button>
      </div>

      <footer className="footer">
        <p>&copy; 2024 Locomart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
