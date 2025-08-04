import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Features</Link></li>
          <li className="nav-item"><Link to={"/"} className="nav-link px-2 text-body-secondary">Home</Link></li>
        </ul>
        <p className="text-center text-body-secondary">© 2025 All Rights are reseved</p>
      </footer>
    </div>
  );
}

export default Footer;
