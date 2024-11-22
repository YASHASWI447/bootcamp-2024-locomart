// import React, { useEffect, useState } from "react";
// import axios from "./services/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import "./home.css";

// interface Product {
//   id: number;
//   productName: string;
//   stock: number;
//   price: string; // For currency formatting
//   image: string;
//   vendorId: number;
//   vendor: string; // Vendor name
// }

// const Home: React.FC = () => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [cart, setCart] = useState<Product[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get<{ products: Product[] }>("/api/products");
//         setProducts(response.data.products);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Add product to cart
//   const addToCart = (product: Product) => {
//     setCart((prevCart) => [...prevCart, product]);
//   };

//   // Navigate to cart
//   const goToCart = () => {
//     navigate("/cart", { state: { cart } });
//   };

//   // Filter products based on search query
//   const filteredProducts = products.filter((product) =>
//     product.productName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="home-container">
//       <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

//       <h1>Customer Dashboard</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : filteredProducts.length === 0 ? (
//         <p>No products available</p>
//       ) : (
//         <div className="products-container">
//           {filteredProducts.map((product) => (
//             <div className="product-card" key={product.id}>
//               <img src={product.image} alt={product.productName} />
//               <h3>{product.productName}</h3>
//               <p>Stock: {product.stock}</p>
//               <div className="price-and-button">
//                 <p>{product.price}</p>
//                 <button onClick={() => addToCart(product)}>Add</button>
//               </div>
//               <p>{product.vendor}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="next-button-container">
//         <button onClick={goToCart}>Next</button>
//       </div>

//       <footer>
//         <p>&copy; 2024 Locomart. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import axios from "./services/axiosInstance";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./home.css";

interface Product {
  id: number;
  productName: string;
  stock: number;
  price: string; // For currency formatting
  image: string;
  vendorId: number;
  vendor: string; // Vendor name
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ products: Product[] }>("/api/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Navigate to cart
  const goToCart = () => {
    navigate("/cart", { state: { cart } });
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* Navbar */}
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="dashboard-header">
        <h1>Customer Dashboard</h1>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-products-container">
          <p>No products available</p>
        </div>
      ) : (
        <div className="products-container">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.productName} />
              <h3>{product.productName}</h3>
              <p>Stock: {product.stock}</p>
              <div className="price-and-button">
                <p>{product.price}</p>
                <button className="add-button" onClick={() => addToCart(product)}>
                  Add
                </button>
              </div>
              <p>{product.vendor}</p>
            </div>
          ))}
        </div>
      )}

      {/* Next Button */}
      <div className="next-button-container">
        <button className="next-button" onClick={goToCart}>
          Proceed to Cart
        </button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Locomart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
