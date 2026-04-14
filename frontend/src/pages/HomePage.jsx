import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Grid, Search, Compass } from 'lucide-react';
import Masonry from 'react-masonry-css';
import PhotoCard from '../components/PhotoCard';
import MapView from '../components/MapView';
import api from '../services/api';
import './HomePage.css';

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
    <div className="container animate-fade-in" style={{ paddingBottom: '60px' }}>
      <div className="hero-section" style={{
        backgroundImage: photos.length > 0 ? `url(${photos[0].imageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        {/* Dynamic Blur Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'var(--surface-hover)', opacity: photos.length > 0 ? 0.85 : 1, backdropFilter: 'blur(30px)', zIndex: 0 }}></div>

        <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="hero-badge">✨ Explore the best travel moments</span>
          
          <h1 className="hero-title">Find your next adventure</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ display: 'flex' }}>
              {['Oliver', 'Mia', 'Lucas', 'Emma'].map((seed, index) => (
                <img key={seed} src={`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=transparent`} alt="avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid var(--surface-hover)', marginLeft: index === 0 ? '0' : '-16px', background: 'var(--secondary-bg)', zIndex: 5 - index }} />
              ))}
            </div>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Join 10,000+ travelers exploring the world</span>
          </div>

          <div className="hero-search-container">
            <div className="hero-search-box" onClick={() => navigate('/search')}>
              <Search size={20} className="search-icon" />
              <input type="text" placeholder={typedText} readOnly />
              <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); navigate('/search'); }}>Search</button>
            </div>
            <div className="hero-tags">
              <span>Trending:</span>
              <button className="tag-pill" onClick={() => navigate('/search')}>Mountains</button>
              <button className="tag-pill" onClick={() => navigate('/search')}>Beaches</button>
              <button className="tag-pill" onClick={() => navigate('/search')}>Europe</button>
              <button className="tag-pill" onClick={() => navigate('/search')}>Pets</button>
            </div>
          </div>

          <div className="hero-view-toggles">
            <button 
              className={`btn ${viewMode === 'gallery' ? 'btn-primary' : 'btn-outline'}`} 
              onClick={() => setViewMode('gallery')}
              style={{ background: viewMode !== 'gallery' ? 'var(--surface)' : '' }}
            >
              <Grid size={18} /> Gallery
            </button>
            <button 
              className={`btn ${viewMode === 'map' ? 'btn-primary' : 'btn-outline'}`} 
              onClick={() => setViewMode('map')}
              style={{ background: viewMode !== 'map' ? 'var(--surface)' : '' }}
            >
              <Map size={18} /> Map View
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <Masonry
          breakpointCols={{ default: 3, 1100: 3, 768: 2, 500: 1 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="glass-card" style={{ height: `${200 + (i % 3) * 100}px`, marginBottom: '24px', animation: 'fadeIn 1s infinite alternate', background: 'var(--surface-hover)', border: 'none' }}></div>
          ))}
        </Masonry>
      ) : viewMode === 'gallery' ? (
        <Masonry
          breakpointCols={{ default: 3, 1100: 3, 768: 2, 500: 1 }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {photos.map(photo => (
            <PhotoCard key={photo._id} photo={photo} />
          ))}
        </Masonry>
      ) : (
        <div className="animate-fade-in">
          <MapView photos={photos} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
