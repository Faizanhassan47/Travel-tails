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
    <div className="minimal-photo-card" onClick={() => navigate(`/photo/${photo._id}`)}>
      <div className="minimal-img-wrapper">
        <img src={optimizeCloudinaryUrl(photo.imageUrl)} alt={photo.title} className="minimal-img" loading="lazy" />
        <div className="minimal-overlay">
          <div className="minimal-overlay-content">
            <span className="minimal-location-tag">{photo.city} / {photo.country}</span>
          </div>
        </div>
      </div>
      <div className="minimal-card-info">
        <h3 className="minimal-card-title">{photo.title}</h3>
        <p className="minimal-author-text">by {photo.authorName || 'Explorer'}</p>
      </div>
    </div>

  );
};

export default PhotoCard;
