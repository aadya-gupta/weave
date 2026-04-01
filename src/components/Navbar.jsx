import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <span className="logo-text">Weave</span>
        <span className="logo-tag">Curiosity Map</span>
      </div>

      <div className="navbar__actions">
        <button className="btn-outline">Sign Up</button>
        <button className="btn-outline">Login</button>
      </div>
    </nav>
  );
}