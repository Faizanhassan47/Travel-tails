import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, ArrowUpRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="exec-footer">

      {/* Giant Logo Band */}
      <div className="footer-giant-band">
        <span className="footer-logo-giant">ALISHAGRAM</span>
        <div className="footer-edition-strip">
          <span className="footer-edition-label">Executive Edition — Vol. 01</span>
          <span className="footer-edition-year">EST. 2024</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="footer-main-section">

        {/* Brand Column */}
        <div className="footer-main-col">
          <p className="footer-tagline">
            A curated exhibition of human moments, captured across the globe. 
            Built for those who see travel as art.
          </p>
          <div className="footer-status-row">
            <div className="status-pulse" />
            <Globe size={12} />
            <span>API HEALTHY · PRODUCTION LIVE</span>
          </div>
        </div>

        {/* Nav Column */}
        <div className="footer-main-col">
          <span className="footer-col-label">Collection</span>
          <nav className="footer-nav-links">
            <Link to="/">Home</Link>
            <Link to="/search">Explore</Link>
            <Link to="/upload">Submit Entry</Link>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Join Executive</Link>
          </nav>
        </div>

        {/* Social Column */}
        <div className="footer-main-col">
          <span className="footer-col-label">Connect</span>
          <div className="footer-social-list">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-text-link">
              INSTAGRAM <ArrowUpRight size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-text-link">
              TWITTER <ArrowUpRight size={16} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-text-link">
              GITHUB <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        {/* Stats Column */}
        <div className="footer-main-col">
          <span className="footer-col-label">Exhibition Stats</span>
          <div className="footer-stat-item">
            <div className="footer-stat-num">128+</div>
            <div className="footer-stat-label">Countries Covered</div>
          </div>
          <div className="footer-stat-item">
            <div className="footer-stat-num">4.2K</div>
            <div className="footer-stat-label">Stories Published</div>
          </div>
          <div className="footer-stat-item">
            <div className="footer-stat-num">99.9%</div>
            <div className="footer-stat-label">Uptime SLA</div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2024 Alishagram. All Rights Reserved. Designed for the bold.
        </p>
        <div className="footer-bottom-links">
          <Link to="#">Privacy</Link>
          <Link to="#">Terms</Link>
          <Link to="#">Cookies</Link>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
