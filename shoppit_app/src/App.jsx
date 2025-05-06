import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Section from "./components/Section"
import Product from "./components/Product"
import Product_details from "./components/Product_details"
import Category from "./components/Category"
import Login from "./components/Login"
import Register from "./components/Register"
import Product_view_dtls from "./components/Product_view_dtls"
import Cart from "./components/Cart"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import Chatbot from "./components/ui/Chatbot"; // No changes needed here


const App = () => {
  // const currentPath = window.location.pathname
  // const showSection = currentPath === "/"

  return (
    <PayPalScriptProvider options={{ "client-id": "AVPSEXS4X0vdMr_zWY2dYAR35cYNYM1hXu1GDw266Mf98A6wqpivCCKlPU0bgickW6qbk1qF6tE_hVTi" }}>
      <Router>
        <div className="app-container">
          <Header />
          <br />
          <br />
          <main className="main-content">
            {/* {showSection && <Section />} */}
            <Routes>
              <Route path="/" element={<Section />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product_details" element={<Product_details />} />
              <Route path="/Product/:id" element={<Product_view_dtls />} />
              <Route path="/category" element={<Category />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Chatbot />
        </div>
      </Router>
    </PayPalScriptProvider>
  );
}

export default App

