import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Section = () => {
  return (
    <>
    <div className="bg-dark text-white p-5 position-relative">
      <div className="container text-center">
        <h1 className="display-4">Welcome to Your Favorite Store</h1>
        <p className="lead mt-4">Discover the latest trends with our modern collection</p>
      </div>
      <div className="d-grid gap-5 d-md-block text-center">
        <Link to="/product">
          <button className="btn bg-white rounded-pill text-black shadow-sm hover:bg-dark transition-all" type="button">
            Shop Now
          </button>
        </Link>
      </div>
      
      {/* Product Offer Section */}
      <div className="bg-light text-dark p-5 mt-5 text-center">
        <h2 className="fw-bold">Limited Time Offer!</h2>
        <p className="lead">Get up to 50% off on selected items. Hurry up, offer ends soon!</p>
        <Link to="/offers">
          <button className="btn btn-primary rounded-pill shadow-sm">View Offers</button>
        </Link>
      </div>
      <div className="bg-light text-dark p-5 mt-5 text-center">
        <h2 className="fw-bold">Limited Time Offer!</h2>
        <p className="lead">Get up to 50% off on selected items. Hurry up, offer ends soon!</p>
        <Link to="/offers">
          <button className="btn btn-primary rounded-pill shadow-sm">View Offers</button>
        </Link>
      </div>  
      <div className="bg-light text-dark p-5 mt-5 text-center">
        <h2 className="fw-bold">Limited Time Offer!</h2>
        <p className="lead">Get up to 50% off on selected items. Hurry up, offer ends soon!</p>
        <Link to="/offers">
          <button className="btn btn-primary rounded-pill shadow-sm">View Offers</button>
        </Link>
      </div>
      {/* Footer Section */}
     
    </div>
    <Footer />
    </>
    
  );
}

export default Section;
