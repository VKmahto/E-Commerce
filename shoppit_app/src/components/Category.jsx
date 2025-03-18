import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    username: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch categories from the backend (GET request)
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:2000/shopapp/api/category/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Handle input change in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for both POST and PUT
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // Update existing category (PUT request)
        await axios.put("http://localhost:2000/shopapp/api/category/", formData);
        alert("Category updated successfully!");
      } else {
        // Create new category (POST request)
        await axios.post("http://localhost:2000/shopapp/api/category/",formData);
        alert("Category created successfully!");
      }
      setFormData({ id: "", name: "", description: "", username: "" });
      setIsEditMode(false);
      fetchCategories(); // Refresh the list
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle edit action
  const handleEdit = (category) => {
    setFormData({
      id: category.id,
      name: category.name,
      description: category.description,
      username: category.username,
    });
    setIsEditMode(true);
  };

  // Render form and categories
  return (
    <div className="container my-5 ">
      <div className="row">
        {/* Form Section (Left Side) */}
        <div className="col-6">
          <div className="card mb-4">
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm ">
                <h4 className="card-title text-center">
                  {isEditMode ? "Edit Category" : "Create Category"}
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
                      placeholder="Name"
                    />
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
                      placeholder="Username"
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
                      placeholder="Description"
                    />
                  </div>
                </div>

                {/* Buttons */}

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    {isEditMode ? "Update" : "Save"}
                  </button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* List Section (Right Side) */}

        <div className="col-6">
        <div className="card mb-4">
           
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <h4 className="card-title text-center">
                    Category List
                </h4>
              </nav>
              <br />
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Username</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>{category.username}</td>
                    <td>
                        <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(category)}
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

export default Category;
