import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-4 pb-3 mt-5 animate__animated animate__fadeInUp">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Section 1: Hospital Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Ritesh Hospital</h5>
            <p>
              Dedicated to compassionate and cutting-edge healthcare.
              <br />
              Trusted by thousands since 1995.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none">Home</a></li>
              <li><a href="/appointments" className="text-white text-decoration-none">Appointments</a></li>
              <li><a href="/doctors" className="text-white text-decoration-none">Doctors</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact Us</a></li>
            </ul>
          </div>

          {/* Section 3: Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contact</h5>
            <p><i className="bi bi-geo-alt-fill me-2"></i>Pune, Maharashtra, India</p>
            <p><i className="bi bi-telephone-fill me-2"></i>+91 9876543210</p>
            <p><i className="bi bi-envelope-fill me-2"></i>support@riteshcare.com</p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="text-center mt-3 border-top pt-3">
          <small>&copy; {new Date().getFullYear()} Ritesh Hospital. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
