import React, { useState } from 'react';
import { Star } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/useAuth';
import './RatingStars.css';

const RatingStars = ({ photoId, currentRatingObj, onRatingChange }) => {
  const { user } = useAuth();
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const average = currentRatingObj?.average || 0;
  const count = currentRatingObj?.count || 0;

  const handleRating = async (value) => {
    if (!user) return alert('Please login to rate');
    
    setSubmitting(true);
    try {
      await api.post(`/photos/${photoId}/ratings`, { value });
      onRatingChange(); 
    } catch (error) {
      console.error('Failed to submit rating', error);
    }
    setSubmitting(false);
  };

  return (
    <div className="rating-container">
      <div className="stars-row">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= (hoveredRating || Math.round(average));
          return (
            <Star
              key={star}
              size={22}
              className={`star-icon ${isFilled ? 'filled' : ''} ${user ? 'active' : ''}`}
              onMouseEnter={() => user && setHoveredRating(star)}
              onMouseLeave={() => user && setHoveredRating(0)}
              onClick={() => !submitting && handleRating(star)}
            />
          );
        })}
      </div>
      <div className="rating-meta">
        <span className="rating-average">{average}</span>
        <span>•</span>
        <span>{count} {count === 1 ? 'review' : 'reviews'}</span>
      </div>
    </div>
  );
};

export default RatingStars;
