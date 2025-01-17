import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
// import Section from './components/Section';
import Product from './components/Product';
import Product_details from './components/Product_details';
import Category from './components/Category';

const App = () => {
  return (
    <Router>
      <Header />
      {/* <Section/> */}
      {/* <Product /> */}
      <Routes>
        <Route path="/product" element={<Product />} />
        <Route path='/product/hp' element={<Product_details/>} ></Route>
        <Route path="/category" element={<Category/>}/>
      </Routes>
    </Router>
  );
};

export default App;
