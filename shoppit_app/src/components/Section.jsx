import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { Smartphone, Laptop, Headphones, Tv, ShoppingCart } from 'lucide-react';
import samsung from '../../src/asstes/image/samsung (1).png';
import apple from '../../src/asstes/image/apple-logo.png';
import sony from '../../src/asstes/image/sony.png';
import dell from '../../src/asstes/image/dell (1).png';

const categories = [
  { id: 1, name: "Smartphones", icon: <Smartphone size={32} /> },
  { id: 2, name: "Laptops", icon: <Laptop size={32} /> },
  { id: 3, name: "Audio", icon: <Headphones size={32} /> },
  { id: 4, name: "TVs", icon: <Tv size={32} /> },
];

const featuredProducts = [
  { id: 1, name: "Ultra HD Smart TV", price: "₹49,999", image: "../../src/asstes/image/43F3_4K_LinuxTV9_Front-700x500.jpg" },
  { id: 2, name: "Wireless Earbuds", price: "₹7,999", image: "../../src/asstes/image/daniel-romero-6V5vTuoeCZg-unsplash.jpg" },
  { id: 3, name: "Gaming Laptop", price: "₹89,999", image: "../../src/asstes/image/istockphoto-1398991128-612x612.jpg" },
  { id: 4, name: "Smartphone Pro", price: "₹59,999", image: "../../src/asstes/image/photo-1613727798351-6873d1836998.avif" },
];

const brands = [
  { id: 1, name: "Samsung", image: samsung },
  { id: 2, name: "Apple", image: apple },
  { id: 3, name: "Sony", image: sony },
  { id: 4, name: "Dell", image: dell },
];

const Section = () => {
  return (
    <>
      {/* Hero Banner */}
      <div className="position-relative text-white text-center" style={{ backgroundImage: 'url("/placeholder.svg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '400px' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
        <div className="position-relative z-1 d-flex flex-column justify-content-center align-items-center h-100">
          <h1 className="display-4 fw-bold">Tech Wonderland</h1>
          <p className="lead">Discover the latest innovations in electronics</p>
          <Link to="/product" className="btn btn-light rounded-pill mt-3 px-4 fw-medium">Shop Now</Link>
        </div>
      </div>

      {/* Shop By Category */}
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Shop By Category</h2>
        <div className="row text-center">
          {categories.map((cat) => (
            <div className="col-6 col-md-3 mb-4" key={cat.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column align-items-center">
                  {cat.icon}
                  <h5 className="mt-3">{cat.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Deals */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Tech Deals</h2>
          <div className="row">
            {[1].map((id) => (
              <div className="col-md-12 mb-4" key={id}>
                <div className="card shadow-sm">
                  <img src="../../src/asstes/image/sale.webp" className="card-img-top" alt="Deal" style={{ height: '300px'}} />
                  <div className="card-body text-center">
                    <h5 className="card-title">Tech Flash Sale</h5>
                    <p className="text-success fw-semibold">Up to 50% OFF</p>
                    <Link to="/offers" className="btn rounded-pill" style={{ background: 'black', color: 'white' }}>Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Featured Electronics</h2>
        <div className="row">
          {featuredProducts.map((product) => (
            <div className="col-6 col-lg-3 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img src={product.image} className="card-img-top p-3" alt={product.name} style={{ height: '200px', objectFit: 'contain' }} />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="text-muted">{product.price}</p>
                  <button className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2">
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Top Electronics Brands</h2>
          <div className="row text-center">
            {brands.map((brand) => (
              <div className="col-6 col-md-3 mb-4" key={brand.id}>
                <div className="card h-100 shadow-sm d-flex flex-column justify-content-center align-items-center p-3">
                  <img src={brand.image} alt={brand.name} style={{ height: '80px', objectFit: 'contain' }} />
                  <h6 className="mt-3">{brand.name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Section;

