import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Section from "./components/Section"
import Product from "./components/Product"
import Product_details from "./components/Product_details"
import Category from "./components/Category"
import Login from "./components/Login"
import Register from "./components/Register"

const App = () => {
  const currentPath = window.location.pathname
  const showSection = currentPath === "/"
  return (
    <Router>
      <div className="app-container">
        {" "}
        <Header />
        <br />
        <br />
        <main className="main-content">
          {" "}
          {/* Add this main element */}
          {showSection && <Section />}
          <Routes>
            <Route path="/product" element={<Product />} />
            <Route path="/product_details" element={<Product_details />} />
            <Route path="/category" element={<Category />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

