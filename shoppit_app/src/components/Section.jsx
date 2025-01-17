import React from 'react';
import { Link } from 'react-router-dom';


const Section = () => {
  
  return (
    <div className="bg-dark text-white p-5">
      <div className="container text-center">
        <h1 className="display-4">Welcome to Your Favorite Store</h1>
        <p className="lead mt-4">Discover the latest trends with our modern collection</p>
      </div>
      <div className="d-grid gap-5 d-md-block text-center">
        <Link to="/product">
            <button className="btn bg-white rounded-pill text-black shadow-sm 
                hover:bg-dark  transition-all" type="button" href="/purduct">
                Shop Now
            </button>
        </Link>
      </div>

    </div>
  );
}

export default Section;
