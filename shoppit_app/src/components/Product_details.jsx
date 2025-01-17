import React from 'react';
import book from '../assets/img/book.jpg';

const Product_details = () => {
  // Inline styles for the image
  const imageStyle = {
    width: '500px',
    height: '450px',
    objectFit: 'cover',
  };

  return (
    <div>
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src={book} alt="Book" style={imageStyle} />
          </div>
          <div className="col-md-6">
            <h5>SKU: BST-498</h5>
            <h2>HP EliteBook</h2>
            <h4>$200.00</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni, accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?
            </p>
            <button className="btn btn-primary btn-lg mt-3">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_details;
