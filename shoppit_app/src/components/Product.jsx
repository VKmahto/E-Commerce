import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Product = () => {
  const [products, setProducts] = useState([]); // State to store fetched products

  const imageStyle = {
    height: '200px',
    objectFit: 'cover',
  };

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:2000/shopapp/api/product/');
        const updatedProducts = response.data.map((product) => ({
          ...product,
          image: `http://localhost:2000${product.image.replace(/\/media\/media\//, '/media/')}`, 
        }));
        setProducts(updatedProducts); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="container my-5 text-center">
        <h3 className="navbar-brand-3 fy-3 fw-bold">Our Products</h3>
        <br />
        <br />
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card">
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={imageStyle}
                />
                <div className="card-body">
                  <h5 className="_cardTitle_od9ca_37 mb-1">{product.name}</h5>
                  <h6 className="_cardText_od9ca_44">₹{product.price}</h6>
                  {/* Uncomment this if you want a button */}
                  {/* <button className="btn btn-primary">Add to Cart</button> */}
                </div>
              </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
