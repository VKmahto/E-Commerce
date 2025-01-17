import React from 'react';
import book from '../assets/img/book.jpg';
import laptop from '../assets/img/hp.jpg';
import iphone from '../assets/img/iphone.jpg';
import shoe from '../assets/img/shoe.jpg';

const Product = () => {
  // Define consistent dimensions for the images
  const imageStyle = {
    height: '200px',
    objectFit: 'cover',
  };

  return (
    <div>
      <div className="container my-5 text-center">
        <h3 className="navbar-brand-3 fy-3 fw-bold">Our Product</h3>
        <br />
        <br />
        <div className="row">
          {/* Card 1 */}
          <div className="col-md-3 mb-4">
            <div className="card">
              <img
                src={book}
                className="card-img-top"
                alt="Product 1"
                style={imageStyle} 
              />
              <div className="card-body">
                <h5 className="_cardTitle_od9ca_37 mb-8">Historical Fiction</h5>
                <h6 class="_cardText_od9ca_44">$100.00</h6>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-3 mb-4">
            <div className="card">
              <img
                src={laptop}
                className="card-img-top"
                alt="Product 2"
                style={imageStyle} // Apply consistent image styling
              />
              <div className="card-body">
                <h5 className="_cardTitle_od9ca_37 mb-1">HP LiteBook</h5>
                <h6 class="_cardText_od9ca_44">$500.00</h6>
                {/* <button className="btn btn-primary">Add to Cart</button> */}
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-3 mb-4">
            <div className="card">
              <img
                src={iphone}
                className="card-img-top"
                alt="Product 3"
                style={imageStyle} // Apply consistent image styling
              />
              <div className="card-body">
                <h5 className="_cardTitle_od9ca_37 mb-1">IPhone</h5>
                <h6 class="_cardText_od9ca_44">$400.00</h6>
                {/* <button className="btn btn-primary">Add to Cart</button> */}
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-md-3 mb-4">
            <div className="card">
              <img
                src={shoe}
                className="card-img-top"
                alt="Product 4"
                style={imageStyle} // Apply consistent image styling
              />
              <div className="card-body">
                <h5 className="_cardTitle_od9ca_37 mb-1">Gucci</h5>
                <h6 class="_cardText_od9ca_44">$600.00</h6>
                {/* <button className="btn btn-primary">Add to Cart</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
