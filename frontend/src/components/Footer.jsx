import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Github, Globe, ArrowUpRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="exec-footer">
      <div className="footer-top">
        <div className="footer-brand-area">
          <h2 className="footer-logo">ALISHAGRAM</h2>
          <p className="footer-tagline">
            A curated collection of human moments, captured across the globe. 
            Join the exhibition of life.
          </p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <span className="footer-label">Navigation</span>
            <Link to="/">Home</Link>
            <Link to="/search">Explore</Link>
            <Link to="/upload">Upload</Link>
          </div>
          <div className="footer-col">
            <span className="footer-label">Social</span>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={12}/></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter <ArrowUpRight size={12}/></a>
            <a href="https://github.com" target="_blank" rel="noreferrer">Github <ArrowUpRight size={12}/></a>
          </div>
          <div className="footer-col">
            <span className="footer-label">Legal</span>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Cookies</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          © 2024 ALISHAGRAM. ALL RIGHTS RESERVED.
        </div>
        <div className="footer-est">
          ESTABLISHED IN TURKIYE · SERVING THE WORLD
        </div>
      </div>
    </footer>
  );
};

export default Footer;
