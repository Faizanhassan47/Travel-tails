import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import api from '../services/api';
import CommentSection from '../components/CommentSection';
import RatingStars from '../components/RatingStars';

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

  if (loading) return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading photo...</div>;
  if (!photo) return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Photo not found.</div>;

  return (
    <div className="container animate-fade-in" style={{ paddingBottom: '60px', marginTop: '40px', maxWidth: '1200px' }}>
      <Helmet>
        <title>{photo.title} - TravelTales</title>
        <meta name="description" content={photo.caption || `A beautiful photo of ${photo.city}, ${photo.country}.`} />
        <meta property="og:title" content={`${photo.title} on TravelTales`} />
        <meta property="og:description" content={photo.caption || `A beautiful photo of ${photo.city}, ${photo.country}.`} />
        <meta property="og:image" content={photo.imageUrl} />
      </Helmet>

      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ border: 'none', background: 'var(--surface-hover)', padding: '12px', borderRadius: '50%', marginBottom: '24px' }}>
        <ArrowLeft size={24} /> 
      </button>

      <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', borderRadius: '32px', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Left Side: Huge Rounded Image */}
        <div style={{ flex: '1 1 500px', background: 'var(--secondary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img 
            src={photo.imageUrl} 
            alt={photo.title} 
            style={{ width: '100%', height: '100%', maxHeight: '85vh', objectFit: 'cover' }} 
          />
        </div>

        {/* Right Side: Sticky Pinterest-style Panel */}
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
          <div style={{ padding: '40px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', fontWeight: 800, letterSpacing: '-0.03em' }}>{photo.title}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '1.1rem' }}>
              <MapPin size={20} style={{ color: 'var(--primary)' }} />
              <span style={{ fontWeight: 500 }}>{photo.city}, {photo.country}</span>
            </div>

            {photo.caption && (
              <p style={{ lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '32px', color: 'var(--text-primary)' }}>
                {photo.caption}
              </p>
            )}

            <div style={{ marginBottom: '32px' }}>
              <RatingStars photoId={photo._id} currentRatingObj={ratingObj} onRatingChange={() => api.get(`/photos/${id}/ratings`).then(res => setRatingObj(res.data))} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
              {photo.tags?.map((tag, idx) => (
                <span key={idx} style={{ background: 'var(--surface-hover)', color: 'var(--text-primary)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.02em' }}>
                  #{tag}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '24px 0', borderTop: '1px solid var(--border)' }}>
              <img 
                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${photo.uploadedBy?.name || 'user'}&backgroundColor=transparent`} 
                alt="Avatar" 
                style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--secondary-bg)', border: '1px solid var(--border)' }} 
              />
              <div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Uploaded by</p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: '700' }}>{photo.uploadedBy?.name || 'Traveler'}</p>
              </div>
            </div>
            
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '16px', fontWeight: 700 }}>Comments</h3>
              <CommentSection photoId={photo._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailsPage;
