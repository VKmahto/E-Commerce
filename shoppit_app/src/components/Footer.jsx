import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row gy-4">
          {/* Brand Info */}
          <div className="col-12 col-md-3">
            <h3 className="h5 fw-bold mb-3">Tech Wonderland</h3>
            <p className="text-muted">
              Your one-stop shop for all electronics needs. Stay updated with the latest in tech.
            </p>
          </div>

          {/* Shop Links */}
          <div className="col-6 col-md-3">
            <h4 className="h6 fw-bold mb-3">Shop</h4>
            <ul className="list-unstyled text-muted">
              <li><a href="#" className="text-muted text-decoration-none hover-text-white d-block mb-2">Smartphones</a></li>
              <li><a href="#" className="text-muted text-decoration-none hover-text-white d-block mb-2">Laptops</a></li>
              <li><a href="#" className="text-muted text-decoration-none hover-text-white d-block mb-2">Audio</a></li>
              <li><a href="#" className="text-muted text-decoration-none hover-text-white d-block">TVs</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-6 col-md-3">
            <h4 className="h6 fw-bold mb-3">Support</h4>
            <ul className="list-unstyled text-muted">
              <li><a href="#" className="text-muted text-decoration-none hover-text-white d-block mb-2">Contact Us</a></li>
              <li><a href="#" className="text-muted text-decoration-none hover-text-white d-block mb-2">FAQs</a></li>
              <li><a href="#" className="text-muted text-decoration-none hover-text-white d-block mb-2">Shipping</a></li>
              <li><a href="#" className="text-muted text-decoration-none hover-text-white d-block">Returns</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-12 col-md-3">
            <h4 className="h6 fw-bold mb-3">Connect with Us</h4>
            <div className="d-flex gap-3">
              <a href="#" aria-label="Facebook" className="text-muted hover-text-white">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted hover-text-white">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted hover-text-white">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="text-muted hover-text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-secondary mt-5" />
        <p className="text-center text-muted small mb-0">
          © 2025 Tech Wonderland. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
