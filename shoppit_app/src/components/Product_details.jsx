import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductDetails = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState({}); // Store images per product ID
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    username: "",
  });

  const [imageFiles, setImageFiles] = useState([null]);
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
      const productsData = response.data;

      setProducts(productsData);

      productsData.forEach((product) => {
        fetchProductImages(product.id);
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchProductImages = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:2000/shopapp/api/product/${productId}/images/`);
      setProductImages((prevImages) => ({
        ...prevImages,
        [productId]: response.data,
      }));
    } catch (error) {
      console.error(`Error fetching images for product ${productId}:`, error);
    }
  };

  const handleChange = (e, index = null) => {
    const { name, value, files } = e.target;
    if (name === "images" && index !== null) {
      let newImages = [...imageFiles];
      newImages[index] = files[0];
      setImageFiles(newImages);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addImageField = () => {
    setImageFiles([...imageFiles, null]);
  };

  const removeImageField = (index) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      imageFiles.forEach((img) => {
        if (img) {
          data.append("images", img);
        }
      });

      if (isEditMode) {
        await axios.put(`http://localhost:2000/shopapp/api/product/${formData.id}/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product updated successfully!");
      } else {
        await axios.post("http://localhost:2000/shopapp/api/product/", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product created successfully!");
      }

      setFormData({ id: "", name: "", description: "", price: "", category: "", username: "" });
      setImageFiles([null]);
      setIsEditMode(false);
      fetchProducts();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      username: product.username,
    });
    setImageFiles([null]);
    setIsEditMode(true);
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm ">
                <h4 className="card-title text-center">{isEditMode ? "Edit Product" : "Create Product"}</h4>
              </nav>
              <br />
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-control" name="category" value={formData.category} onChange={handleChange} required>
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                  </div>
                  
                  {!isEditMode && (
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Upload Images</label>
                      <button type="button" className="btn btn-success btn-sm" onClick={addImageField}> + </button>
                      {imageFiles.map((img, index) => (
                        <div key={index} className="d-flex align-items-center mb-2">
                          <input type="file" className="form-control me-2" name="images" onChange={(e) => handleChange(e, index)} />
                          {index > 0 && <button type="button" className="btn btn-danger btn-sm" onClick={() => removeImageField(index)}>×</button>}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">{isEditMode ? "Update" : "Save"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>

       
        {/* Product List */}
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
                    <th>Images</th>
                    <th>Price</th>
                    <th>Username</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>
                        {productImages[product.id]?.length > 0 ? (
                          <img 
                            src={`http://localhost:2000${productImages[product.id][0].image}`} 
                            alt={product.name} 
                            width="50" 
                            height="50" 
                            className="me-1" 
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>{product.price}</td>
                      <td>{product.username}</td>
                      <td>
                        <button className="btn btn-warning btn-sm" onClick={() => handleEdit(product)}>Edit</button>
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
