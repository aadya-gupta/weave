import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <span className="footer__logo">Weave</span>
          <p className="footer__tagline">
            Curiosity, mapped.<br />Knowledge, connected.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <p className="footer__col-title">Product</p>
            <a href="#">Explore</a>
            <a href="#">How It Works</a>
            <a href="#">Pricing</a>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Company</p>
            <a href="#">About Us</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Legal</p>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© 2025 Weave — Curiosity Map</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}