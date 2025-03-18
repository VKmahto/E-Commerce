import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-drak text-light">
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" style={{ height: "69px" }}>
          <div className="container d-flex justify-content-center">
            <div className="d-flex gap-3">
              <a href="#" className="text-dark text-decoration-none">Privacy Policy</a>
              <a href="#" className="text-dark text-decoration-none">Terms of Service</a>
              <a href="#" className="text-dark text-decoration-none">Contact Us</a>
            </div>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;