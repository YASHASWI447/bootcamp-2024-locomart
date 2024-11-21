import React, { useState } from "react";

function Products() {
  const [formData, setFormData] = useState({
    productname: "",
    stock: "",
    price: "",
    image: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  // Specify the event type for the change event
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>  // This is the fix
  ) => {
    const { name, value } = e.target;  // e.target will be an HTMLInputElement
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
    <div className="App">
      <h1>Vendor Product Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            type="text"
            name="productname"
            value={formData.productname}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Stock:
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add Product</button>
      </form>

      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
}

export default Products;
