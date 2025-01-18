import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductDetails = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    image: null, // Image field initialized as null
    description: "",
    price: "",
    category: "",
    username: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:2000/shopapp/api/category/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:2000/shopapp/api/product/");
      const updatedProducts = response.data.map((product) => ({
        ...product,
        // image: `http://localhost:2000/${product.image}/`, 
        image: `http://localhost:2000${product.image.startsWith("/") ? product.image : `/${product.image}`}`,
      }));
      
      
      setProducts(updatedProducts);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] }); // Handle file input
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      if (isEditMode) {
        await axios.put("http://localhost:2000/shopapp/api/product/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product updated successfully!");
      } else {
        await axios.post("http://localhost:2000/shopapp/api/product/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product created successfully!");
      }

      setFormData({ id: "", name: "", image: null, description: "", price: "", category: "", username: "" });
      setIsEditMode(false);
      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      image: null, 
      price: product.price,
      category: product.category,
      description: product.description,
      username: product.username,
    });
    setIsEditMode(true);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm ">
                <h4 className="card-title text-center">
                  {isEditMode ? "Edit Product" : "Create Product"}
                </h4>
              </nav>
              <br />
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                      className="form-control"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      onChange={handleChange}
                      required={!isEditMode}
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    {isEditMode ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm ">
                <h4 className="card-title text-center">Product List</h4>
              </nav>
              <br />
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Username</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.name}</td>
                      <td>
                        <img src={product.image} alt={product.name} width="50" height="50"/>
                      </td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.username}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(product)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
