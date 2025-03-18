import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const imageStyle = {
    height: '200px',
    objectFit: 'cover',
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:2000/shopapp/api/product/');
        const productsData = response.data;

        // Fetch images for each product
        const updatedProducts = await Promise.all(productsData.map(async (product) => {
          try {
            const imagesRes = await axios.get(`http://localhost:2000/shopapp/api/product/${product.id}/images/`);
            const images = imagesRes.data;

            // Use the first image if available, else fallback
            const mainImage = images.length > 0 
              ? `http://localhost:2000${images[0].image.replace(/\/media\/media\//, '/media/')}`
              : 'http://localhost:2000/media/img/placeholder.jpg'; // Fallback image

            return { ...product, image: mainImage };
          } catch (imgErr) {
            console.error(`Error fetching images for product ${product.id}:`, imgErr);
            return { ...product, image: 'http://localhost:2000/media/img/placeholder.jpg' };
          }
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
