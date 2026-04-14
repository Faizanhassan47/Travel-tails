import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Heart, MessageCircle } from 'lucide-react';
import './PhotoCard.css';

const optimizeCloudinaryUrl = (url) => {
  if (url && url.includes('cloudinary.com/') && !url.includes('/f_auto,q_auto/')) {
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  }
  return url;
};

const PhotoCard = ({ photo }) => {
  const navigate = useNavigate();

  return (
    <div className="photo-card glass-card" onClick={() => navigate(`/photo/${photo._id}`)}>
      <div className="photo-wrapper">
        <img src={optimizeCloudinaryUrl(photo.imageUrl)} alt={photo.title} className="photo-img" loading="lazy" />
        <div className="photo-overlay">
          <div className="photo-actions">
            <button className="icon-btn" onClick={(e) => { e.stopPropagation(); navigate(`/photo/${photo._id}`); }}>
              <Heart size={18} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, marginLeft: '4px' }}>{photo.likes?.length || 0}</span>
            </button>
            <button className="icon-btn" onClick={(e) => { e.stopPropagation(); navigate(`/photo/${photo._id}`); }}>
              <MessageCircle size={18} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, marginLeft: '4px' }}>{photo.comments?.length || 0}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="photo-info">
        <h3 className="photo-title">{photo.title}</h3>
        <p className="photo-location">
          <MapPin size={14} className="location-icon" />
          {photo.city}, {photo.country}
        </p>
        <div className="photo-meta">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img 
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${photo.authorName || photo._id}&backgroundColor=transparent`} 
              alt="Avatar" 
              style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--surface-hover)', border: '1px solid var(--border)' }} 
            />
            <span className="photo-author">{photo.authorName || 'Traveler'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard;
