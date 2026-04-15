import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import CommentSection from '../components/CommentSection';
import RatingStars from '../components/RatingStars';
import './PhotoDetailsPage.css';

const PhotoDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [ratingObj, setRatingObj] = useState({ average: 0, count: 0 });
  const [loading, setLoading] = useState(true);

  const fetchPhotoData = async () => {
    try {
      const [photoRes, ratingRes] = await Promise.all([
        api.get(`/photos/${id}`),
        api.get(`/photos/${id}/ratings`)
      ]);
      setPhoto(photoRes.data);
      setRatingObj(ratingRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load photo', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotoData();
  }, [id]);

  if (loading) return <div className="kreativ-details" style={{ textAlign: 'center' }}>Loading photo...</div>;
  if (!photo) return <div className="kreativ-details" style={{ textAlign: 'center' }}>Photo not found.</div>;

  return (
    <div className="kreativ-details">
      <div className="bg-blob blob-red"></div>
      <div className="bg-blob blob-blue"></div>
      <Helmet>
        <title>{photo.title} - TravelTales</title>
      </Helmet>

      <button onClick={() => navigate(-1)} className="minimal-back-btn">
        <ArrowLeft size={16} />
        <span>Back to Stories</span>
      </button>

      <div className="title-giant-header">
        <h1 className="title-giant-text animate-reveal">{photo.title}</h1>
      </div>

      <div className="details-main-grid">
        {/* Visual Column */}
        <div className="details-visual-col">
          <div className="details-image-container">
            <img src={photo.imageUrl} alt={photo.title} />
          </div>
        </div>

        {/* Info Column */}
        <div className="details-info-col">
          <div className="details-meta-top">
            <div className="details-author-badge">
              <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${photo.uploadedBy?.name || 'user'}&backgroundColor=transparent`} alt="avatar" />
              <div className="details-author-info">
                <span className="label">Captured by</span>
                <span className="name">{photo.uploadedBy?.name || 'Traveler'}</span>
              </div>
            </div>
            <div className="details-location-tag">
              <MapPin size={18} />
              <span>{photo.city}, {photo.country}</span>
            </div>
          </div>

          <p className="details-caption">
            {photo.caption || "A moment frozen in time, capturing the essence of the journey through light and shadow."}
          </p>

          <RatingStars photoId={photo._id} currentRatingObj={ratingObj} onRatingChange={() => api.get(`/photos/${id}/ratings`).then(res => setRatingObj(res.data))} />

          <div className="details-journal-section">
            <span className="details-section-label">Journal Entries</span>
            <CommentSection photoId={photo._id} />
          </div>
        </div>
      </div>
    </div>

  );
};

export default PhotoDetailsPage;
