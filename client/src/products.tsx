// import React, { useState } from "react";
// import "./products.css"; // Add this for styling

// function Products() {
//   const [formData, setFormData] = useState({
//     productname: "",
//     stock: "",
//     price: "",
//     image: "",
//   });

//   const [statusMessage, setStatusMessage] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3000/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         setStatusMessage("Product added successfully!");
//         setFormData({
//           productname: "",
//           stock: "",
//           price: "",
//           image: "",
//         });
//       } else {
//         setStatusMessage("Failed to add product. Please try again.");
//       }
//     } catch (error) {
//       setStatusMessage("Error: Unable to connect to the server.");
//     }
//   };

//   return (
//     <div className="product-container">
//       {/* Logo and Title Section */}
//       <div className="logo-container">
//         <img src="/assets/logo.jpg" alt="Logo" className="logo" /> {/* Logo Image */}
//       </div>

//       <div className="product-card">
//         <h1 className="form-title">Vendor Product Form</h1>
//         <form onSubmit={handleSubmit}>
//           {/* Product Name */}
//           <div className="form-group">
//             <label htmlFor="productname">Product Name:</label>
//             <input
//               id="productname"
//               type="text"
//               name="productname"
//               value={formData.productname}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Stock */}
//           <div className="form-group">
//             <label htmlFor="stock">Stock:</label>
//             <input
//               id="stock"
//               type="number"
//               name="stock"
//               value={formData.stock}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Price */}
//           <div className="form-group">
//             <label htmlFor="price">Price:</label>
//             <input
//               id="price"
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Image URL */}
//           <div className="form-group">
//             <label htmlFor="image">Image URL:</label>
//             <input
//               id="image"
//               type="text"
//               name="image"
//               value={formData.image}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button type="submit" className="submit-button">
//             Add Product
//           </button>
//         </form>

//         {statusMessage && <p className="status-message">{statusMessage}</p>}
//       </div>
//     </div>
//   );
// }

// export default Products;
import React, { useState } from "react";
import "./products.css"; // Add this for styling

function Products() {
  const [formData, setFormData] = useState({
    productname: "",
    stock: "",
    price: "",
    image: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const vendorId = localStorage.getItem("vendorId"); // Assuming vendorId is stored in localStorage
      if (!vendorId) {
        setStatusMessage("Vendor ID is missing. Please log in again.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, vendorId }),
      });

      if (response.ok) {
        setStatusMessage("Product added successfully!");
        setFormData({
          productname: "",
          stock: "",
          price: "",
          image: "",
        });
      } else {
        setStatusMessage("Failed to add product. Please try again.");
      }
    } catch (error) {
      setStatusMessage("Error: Unable to connect to the server.");
    }
  };

  return (
    <div className="product-container">
      {/* Logo and Title Section */}
      <div className="logo-container">
        <img src="/assets/logo.jpg" alt="Logo" className="logo" />
      </div>

      <div className="product-card">
        <h1 className="form-title">Vendor Product Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="form-group">
            <label htmlFor="productname">Product Name:</label>
            <input
              id="productname"
              type="text"
              name="productname"
              value={formData.productname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Stock */}
          <div className="form-group">
            <label htmlFor="stock">Stock:</label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>

          {/* Price */}
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image URL */}
          <div className="form-group">
            <label htmlFor="image">Image URL:</label>
            <input
              id="image"
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Add Product
          </button>
        </form>

        {statusMessage && <p className="status-message">{statusMessage}</p>}
      </div>
    </div>
  );
}

export default Products;
