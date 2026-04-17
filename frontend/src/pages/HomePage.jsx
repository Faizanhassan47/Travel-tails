import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Grid, Search, Compass } from 'lucide-react';
import Masonry from 'react-masonry-css';
import PhotoCard from '../components/PhotoCard';
import MapView from '../components/MapView';
import api from '../services/api';
import './HomePage.css';
import ParallaxText from '../components/ParallaxText';
import Marquee from '../components/Marquee';

const HomePage = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' or 'map'
  const navigate = useNavigate();

  const placeholders = ['Search destinations, memories...', 'Explore Tokyo, Japan...', 'Find hidden beaches...', 'Discover mountain peaks...'];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const current = placeholders[placeholderIndex];
      if (!isDeleting) {
        setTypedText(current.substring(0, typedText.length + 1));
        if (typedText.length === current.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setTypedText(current.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }
      }
    }, isDeleting ? 30 : 80);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, placeholderIndex]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await api.get('/photos');
        setPhotos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching photos', error);
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <div className="kreativ-home">
      <section className="kreativ-hero">
        <div className="hero-visual-bg">
          <img src="/src/assets/alishagram_hero_bg.png" alt="Hero Background" className="hero-img-bg" />
          <div className="hero-vignette"></div>
          <div className="hero-grid-overlay"></div>
        </div>
        
        <Marquee text="1996 ALISHAGRAM " speed={30} />
        <div className="marquee-reverse-wrapper">
          <Marquee text=" ARCHIVE / VOL 01 / " speed={45} />
        </div>

        <div className="hero-text-container">
          <div className="hero-meta-top animate-fade-in">
            <span>FILE: AL_ARCHIVE_01</span>
            <span>LOC: EARTH / 2026</span>
          </div>
          
          <ParallaxText>
            <h1 className="kreativ-title animate-reveal">
              STYLE FILES / <br/>
              ALISHAGRAM
            </h1>
          </ParallaxText>
          
          <div className="hero-bottom-info">
            <div className="scroll-indicator animate-fade-in" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
               <span>Scroll</span>
            </div>
            
            <p className="kreativ-description animate-reveal-slow">
              We're not just a travel platform. We're a living <br />
              journal of human connection through <br />
              the lens of every journey.
            </p>
          </div>
        </div>
      </section>

      <section className="kreativ-gallery">
        <div className="gallery-header-minimal">
          <h2 className="minimal-title">Featured Stories</h2>
          <div className="minimal-controls">
            <button className={viewMode === 'gallery' ? 'active' : ''} onClick={() => setViewMode('gallery')}>Grid</button>
            <button className={viewMode === 'map' ? 'active' : ''} onClick={() => setViewMode('map')}>Map</button>
          </div>
        </div>

        {loading ? (
          <div className="editorial-masonry-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="editorial-masonry-grid_column">
                <div className="brutalist-skeleton"></div>
              </div>
            ))}
          </div>
        ) : viewMode === 'gallery' ? (
          <Masonry
            breakpointCols={{ default: 3, 1200: 2, 768: 1 }}
            className="editorial-masonry-grid"
            columnClassName="editorial-masonry-grid_column"
          >
            {photos.map(photo => (
              <PhotoCard key={photo._id} photo={photo} />
            ))}
          </Masonry>
        ) : (
          <div className="map-minimal-container">
            <MapView photos={photos} />
          </div>
        )}
      </section>
    </div>

  );
};

export default HomePage;
