import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Grid, Search, Compass } from 'lucide-react';
import Masonry from 'react-masonry-css';
import PhotoCard from '../components/PhotoCard';
import MapView from '../components/MapView';
import api from '../services/api';
import './HomePage.css';
import ParallaxText from '../components/ParallaxText';

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
        <div className="hero-text-container">
          <ParallaxText>
            <h1 className="kreativ-title animate-reveal">
              Visual Story / <br/>
              Human Journey
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
          <div className="minimal-loader">Loading Tales...</div>
        ) : viewMode === 'gallery' ? (
          <div className="minimal-grid">
            {photos.map(photo => (
              <PhotoCard key={photo._id} photo={photo} />
            ))}
          </div>
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
